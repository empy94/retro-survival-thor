package fr.thor.retrosurvival;

import android.app.*;
import android.app.job.*;
import android.content.*;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import org.json.*;
import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;

final class UpdateChecker {
 static final String PREFS="updates",CHANNEL="apk-updates",PERMISSION="android.permission.POST_NOTIFICATIONS";
 static final int JOB=16001,NOTICE=16002;
 private static final Object LOCK=new Object();
 static void schedule(Context c){
  try{c.getSystemService(JobScheduler.class).schedule(new JobInfo.Builder(JOB,new ComponentName(c,UpdateJob.class)).setRequiredNetworkType(JobInfo.NETWORK_TYPE_ANY).setPeriodic(24*60*60*1000L).setPersisted(true).build());}catch(RuntimeException ignored){}
 }
 static String available(Context c){
  String tag=c.getSharedPreferences(PREFS,0).getString("available","");
  try{return ReleaseVersion.newer(tag,c.getPackageManager().getPackageInfo(c.getPackageName(),0).versionName)?tag:"";}catch(Exception ignored){return "";}
 }
 static String check(Context c,boolean force){
  synchronized(LOCK){
   android.content.SharedPreferences p=c.getSharedPreferences(PREFS,0);long now=System.currentTimeMillis(),last=p.getLong("lastCheck",0);
   if(!force&&now>=last&&now-last<6*60*60*1000L)return available(c);
   p.edit().putLong("lastCheck",now).apply();HttpURLConnection connection=null;
   try{
    connection=(HttpURLConnection)new URL("https://api.github.com/repos/empy94/retro-survival-thor/releases/latest").openConnection();
    connection.setConnectTimeout(5000);connection.setReadTimeout(8000);connection.setInstanceFollowRedirects(false);
    connection.setRequestProperty("Accept","application/vnd.github+json");connection.setRequestProperty("User-Agent","Retro-Survival-Android-update-check");
    if(connection.getResponseCode()!=200)return available(c);
    ByteArrayOutputStream bytes=new ByteArrayOutputStream();byte[] buffer=new byte[4096];
    try(InputStream in=connection.getInputStream()){for(int n;(n=in.read(buffer))!=-1;){if(bytes.size()+n>262144)throw new IOException("Release response too large");bytes.write(buffer,0,n);}}
    JSONObject release=new JSONObject(new String(bytes.toByteArray(),StandardCharsets.UTF_8));String tag=release.optString("tag_name","");
    if(release.optBoolean("draft",true)||release.optBoolean("prerelease",true)||!ReleaseVersion.valid(tag))return available(c);
    JSONArray assets=release.optJSONArray("assets");boolean apk=false;
    if(assets!=null)for(int i=0;i<assets.length();i++){JSONObject asset=assets.optJSONObject(i);if(asset!=null&&"Retro-Survival-Android.apk".equals(asset.optString("name"))&&"uploaded".equals(asset.optString("state"))&&asset.optLong("size")>0&&ReleaseVersion.download(tag).equals(asset.optString("browser_download_url")))apk=true;}
    if(apk)p.edit().putString("available",tag).apply();return available(c);
   }catch(Exception ignored){return available(c);}finally{if(connection!=null)connection.disconnect();}
  }
 }
 static void notifyAvailable(Context c,String tag){
  if(tag.isEmpty()||!c.getSharedPreferences(PREFS,0).getBoolean("notifications",false))return;
  if(Build.VERSION.SDK_INT>=33&&c.checkSelfPermission(PERMISSION)!=PackageManager.PERMISSION_GRANTED)return;
  NotificationManager manager=c.getSystemService(NotificationManager.class);if(!manager.areNotificationsEnabled())return;
  android.content.SharedPreferences p=c.getSharedPreferences(PREFS,0);if(tag.equals(p.getString("notified","")))return;
  manager.createNotificationChannel(new NotificationChannel(CHANNEL,"Mises à jour du jeu",NotificationManager.IMPORTANCE_DEFAULT));
  Intent open=new Intent(Intent.ACTION_VIEW,Uri.parse(ReleaseVersion.download(tag)));
  PendingIntent action=PendingIntent.getActivity(c,NOTICE,open,PendingIntent.FLAG_UPDATE_CURRENT|PendingIntent.FLAG_IMMUTABLE);
  manager.notify(NOTICE,new Notification.Builder(c,CHANNEL).setSmallIcon(R.drawable.icon).setContentTitle("Retro Survival · "+tag).setContentText("Nouvelle version disponible. Toucher pour télécharger l’APK.").setContentIntent(action).setAutoCancel(true).build());
  p.edit().putString("notified",tag).apply();
 }
 static void show(Activity activity){
  new Thread(()->{String tag=check(activity,true);activity.runOnUiThread(()->{if(activity.isFinishing()||activity.isDestroyed())return;
   if(tag.isEmpty())android.widget.Toast.makeText(activity,"Aucune nouvelle version détectée. Réessaie plus tard si tu es hors connexion.",android.widget.Toast.LENGTH_LONG).show();
   else new AlertDialog.Builder(activity).setTitle("Retro Survival · "+tag).setMessage("Une nouvelle APK est disponible. Tes données sont conservées si tu installes la mise à jour par-dessus le jeu actuel.").setPositiveButton("Télécharger",(d,w)->{try{activity.startActivity(new Intent(Intent.ACTION_VIEW,Uri.parse(ReleaseVersion.download(tag))));}catch(Exception ignored){}}).setNegativeButton("Plus tard",null).show();
  });},"RetroUpdateManual").start();
 }
}
