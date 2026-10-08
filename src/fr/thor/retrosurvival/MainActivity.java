package fr.thor.retrosurvival;

import android.app.*;
import android.os.*;
import android.content.*;
import android.content.pm.*;
import android.graphics.drawable.Icon;
import android.view.*;
import android.webkit.*;
import android.widget.*;
import android.hardware.display.DisplayManager;
import org.json.JSONObject;
import java.io.*;
import java.net.*;
import android.webkit.CookieManager;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class MainActivity extends Activity {
 private WebView web;
 private DisplayManager displays;
 private CharacterPresentation characterScreen;
 private String characterData="{\"status\":\"title\"}";
 private final Runnable characterTick=new Runnable(){public void run(){
   if(!active)return;
   if(ready&&characterScreen!=null)web.evaluateJavascript("window.thorDashboard ? window.thorDashboard.snapshot() : {status:'unavailable'}",result->{
     try{if(result.length()>65536)return;characterData=new JSONObject(result).toString();if(characterScreen!=null)characterScreen.update(characterData);}catch(Exception ignored){}
   });
   handler.postDelayed(this,500);
 }};
 private final DisplayManager.DisplayListener displayListener=new DisplayManager.DisplayListener(){
   public void onDisplayAdded(int id){showCharacterScreen();}
   public void onDisplayRemoved(int id){showCharacterScreen();}
   public void onDisplayChanged(int id){showCharacterScreen();}
 };
 private final Handler handler=new Handler(Looper.getMainLooper());
 private float lx,ly,rx,ry,hx,hy,px=-1,py=-1;
 private boolean ready=false,active=false;
 private final Set<String> directions=new HashSet<>();
 private final Set<Integer> held=new HashSet<>();
 private String bootstrap;
 private long previousTick;
 private long clickStart;
 private final Runnable tick=new Runnable(){public void run(){
   if(!active)return;
   long now=SystemClock.uptimeMillis();float dt=Math.min(.05f,(now-previousTick)/1000f);previousTick=now;
   if(ready){
     float mx=lx,my=ly;
     if(hx!=0)mx=hx;if(hy!=0)my=hy;
     if(held.contains(KeyEvent.KEYCODE_DPAD_LEFT))mx=-1;if(held.contains(KeyEvent.KEYCODE_DPAD_RIGHT))mx=1;
     if(held.contains(KeyEvent.KEYCODE_DPAD_UP))my=-1;if(held.contains(KeyEvent.KEYCODE_DPAD_DOWN))my=1;
     web.evaluateJavascript("window.thorControls.stick("+mx+","+my+")",null);
     if(Math.abs(rx)>.16f||Math.abs(ry)>.16f){
       if(px<0){px=web.getWidth()/2f;py=web.getHeight()/2f;}
       px=Math.max(2,Math.min(web.getWidth()-2,px+curve(rx)*900*dt));
       py=Math.max(2,Math.min(web.getHeight()-2,py+curve(ry)*900*dt));
       pointer();
     }
   }
   handler.postDelayed(this,16);
 }};
 private float curve(float v){return Math.abs(v)<=.16f?0:Math.copySign((Math.abs(v)-.16f)/.84f,v);}
 public void onCreate(Bundle state){
   super.onCreate(state);
   getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
   immersive();
   try(InputStream mapping=getAssets().open("spell-bindings.js");InputStream in=getAssets().open("controls.js");InputStream telemetry=getAssets().open("telemetry.js")){bootstrap=read(mapping)+"\n"+read(in)+"\n"+read(telemetry);}catch(Exception ex){throw new RuntimeException(ex);}
   displays=getSystemService(DisplayManager.class);displays.registerDisplayListener(displayListener,handler);
   web=new WebView(this);setContentView(web);
   web.addJavascriptInterface(new Object(){@JavascriptInterface public void openSettings(){runOnUiThread(()->{if(web.getUrl()!=null&&web.getUrl().startsWith("https://retrosurvival.online/"))settings();});}},"ThorPreferences");
   WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setMediaPlaybackRequiresUserGesture(false);
   s.setSupportZoom(false);s.setAllowFileAccess(false);s.setAllowContentAccess(false);
   WebView.setWebContentsDebuggingEnabled((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE)!=0);
   web.setWebChromeClient(new WebChromeClient(){public boolean onConsoleMessage(ConsoleMessage m){android.util.Log.i("ThorRetro",m.message());return true;}});
   web.setWebViewClient(new WebViewClient(){
     public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){
       if("https".equals(r.getUrl().getScheme())&&"retrosurvival.online".equals(r.getUrl().getHost()))return false;
       try{startActivity(new Intent(Intent.ACTION_VIEW,r.getUrl()));}catch(Exception ignored){}return true;
     }
     public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){
       if(!r.isForMainFrame()||!"GET".equals(r.getMethod())||!"retrosurvival.online".equals(r.getUrl().getHost())||!"/".equals(r.getUrl().getPath()))return null;
       try{
         HttpURLConnection c=(HttpURLConnection)new URL(r.getUrl().toString()).openConnection();
         c.setConnectTimeout(15000);c.setReadTimeout(20000);c.setRequestProperty("User-Agent",s.getUserAgentString());
         c.setRequestProperty("Accept-Language","fr-FR,fr;q=0.9");
         String cookies=CookieManager.getInstance().getCookie(r.getUrl().toString());if(cookies!=null)c.setRequestProperty("Cookie",cookies);
         int status=c.getResponseCode();if(status!=200){c.disconnect();return null;}
         List<String> setCookies=c.getHeaderFields().get("Set-Cookie");if(setCookies!=null)for(String cookie:setCookies)CookieManager.getInstance().setCookie(r.getUrl().toString(),cookie);
         String html;try(InputStream in=c.getInputStream()){html=read(in);}finally{c.disconnect();}
         int head=html.indexOf("<head>");if(head<0)return null;
         html=html.substring(0,head+6)+"<script>"+bootstrap+"</script>"+html.substring(head+6);
         return new WebResourceResponse("text/html","UTF-8",new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8)));
       }catch(Exception ex){android.util.Log.e("ThorRetro","Loading controls",ex);return null;}
     }
     public void onPageStarted(WebView v,String url,android.graphics.Bitmap favicon){ready=false;directions.clear();held.clear();characterData="{\"status\":\"unavailable\"}";if(characterScreen!=null)characterScreen.update(characterData);}
     public void onPageFinished(WebView v,String url){
       web.evaluateJavascript("!!(window.thorControls&&window.thorControls.move)",result->{ready="true".equals(result);android.util.Log.i("ThorRetro","controlsReady="+ready);if(ready)applySettings();else Toast.makeText(MainActivity.this,"Commandes indisponibles. Ferme puis rouvre le jeu.",Toast.LENGTH_LONG).show();});
       if(!getPreferences(0).getBoolean("helpSeen",false)){getPreferences(0).edit().putBoolean("helpSeen",true).apply();help();}
     }
   });
   web.loadUrl("https://retrosurvival.online/");web.requestFocus();
 }
 private void immersive(){getWindow().getDecorView().setSystemUiVisibility(5894);}
 private String read(InputStream in)throws IOException{ByteArrayOutputStream out=new ByteArrayOutputStream();byte[] buf=new byte[8192];int count;while((count=in.read(buf))!=-1)out.write(buf,0,count);return new String(out.toByteArray(),StandardCharsets.UTF_8);}
 public void onWindowFocusChanged(boolean focus){super.onWindowFocusChanged(focus);if(focus)immersive();else reset();}
 protected void onResume(){super.onResume();active=true;previousTick=SystemClock.uptimeMillis();handler.post(tick);handler.post(characterTick);if(web!=null)web.onResume();showCharacterScreen();}
 protected void onPause(){reset();active=false;handler.removeCallbacks(tick);handler.removeCallbacks(characterTick);closeCharacterScreen();if(web!=null)web.onPause();super.onPause();}
 protected void onDestroy(){if(displays!=null)displays.unregisterDisplayListener(displayListener);closeCharacterScreen();if(web!=null)web.destroy();super.onDestroy();}
 private void closeCharacterScreen(){if(characterScreen!=null){characterScreen.dismiss();characterScreen=null;}}
 private void showCharacterScreen(){
   if(displays==null||!active||!getPreferences(0).getBoolean("characterScreen",true)){closeCharacterScreen();return;}
   Display target=null;for(Display d:displays.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION)){if(d.getDisplayId()!=getWindowManager().getDefaultDisplay().getDisplayId()){target=d;break;}}
   if(target==null){closeCharacterScreen();return;}
   if(characterScreen!=null&&characterScreen.getDisplay().getDisplayId()==target.getDisplayId())return;
   closeCharacterScreen();CharacterPresentation panel=new CharacterPresentation(this,target);characterScreen=panel;
   try{panel.show();}catch(WindowManager.InvalidDisplayException ex){characterScreen=null;}
 }
 private class CharacterPresentation extends Presentation {
   private WebView panel;private boolean loaded;
   CharacterPresentation(Context context,Display display){super(context,display);}
   protected void onCreate(Bundle state){super.onCreate(state);
     getWindow().addFlags(WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE|WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
     getWindow().getDecorView().setSystemUiVisibility(5894);
     panel=new WebView(getContext());setContentView(panel);panel.getSettings().setJavaScriptEnabled(true);panel.getSettings().setAllowFileAccess(false);panel.getSettings().setAllowContentAccess(false);
     panel.setWebViewClient(new WebViewClient(){public void onPageFinished(WebView v,String url){loaded=true;update(characterData);}public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){return true;}});
     try(InputStream in=getAssets().open("dashboard.html")){panel.loadDataWithBaseURL("https://retrosurvival.online/",read(in),"text/html","UTF-8",null);}catch(Exception ex){android.util.Log.e("ThorRetro","Character screen",ex);}
   }
   void update(String json){if(loaded&&panel!=null)panel.evaluateJavascript("window.renderThorDashboard("+json+")",null);}
   public void dismiss(){if(panel!=null){panel.destroy();panel=null;}super.dismiss();}
 }
 private void key(String k,String c,boolean down){if(ready){if("Escape".equals(k)){if(down)web.evaluateJavascript("window.thorControls.pause()",null);}else if(c.startsWith("Digit"))web.evaluateJavascript("window.thorControls.button("+(Integer.parseInt(k)-1)+","+down+")",null);else web.evaluateJavascript("window.thorControls.key("+quote(k)+","+quote(c)+","+down+")",null);}}
 private String quote(String s){return "\""+s+"\"";}
 private void direction(String k,boolean down){if(down&&directions.add(k))key(k,k,true);else if(!down&&directions.remove(k))key(k,k,false);}
 private void reset(){if(ready)web.evaluateJavascript("window.thorControls.cancel()",null);for(String k:new HashSet<>(directions))direction(k,false);for(int k:new HashSet<>(held)){String[] b=binding(k);if(b!=null)key(b[0],b[1],false);}if(ready)web.evaluateJavascript("window.thorControls.stick(0,0)",null);held.clear();lx=ly=rx=ry=hx=hy=0;}
 public boolean dispatchGenericMotionEvent(MotionEvent e){
   if((e.getSource()&InputDevice.SOURCE_JOYSTICK)==InputDevice.SOURCE_JOYSTICK&&e.getAction()==MotionEvent.ACTION_MOVE){
     lx=e.getAxisValue(MotionEvent.AXIS_X);ly=e.getAxisValue(MotionEvent.AXIS_Y);rx=e.getAxisValue(MotionEvent.AXIS_Z);ry=e.getAxisValue(MotionEvent.AXIS_RZ);hx=e.getAxisValue(MotionEvent.AXIS_HAT_X);hy=e.getAxisValue(MotionEvent.AXIS_HAT_Y);
     trigger(KeyEvent.KEYCODE_BUTTON_L2,Math.max(e.getAxisValue(MotionEvent.AXIS_LTRIGGER),e.getAxisValue(MotionEvent.AXIS_BRAKE))>.5f);
     trigger(KeyEvent.KEYCODE_BUTTON_R2,Math.max(e.getAxisValue(MotionEvent.AXIS_RTRIGGER),e.getAxisValue(MotionEvent.AXIS_GAS))>.5f);
     android.util.Log.d("ThorRetro","sticks "+lx+","+ly+" right "+rx+","+ry);return true;
   }return super.dispatchGenericMotionEvent(e);
 }
 private void trigger(int k,boolean down){if(down&&!held.contains(k)){held.add(k);String[] b=binding(k);key(b[0],b[1],true);}else if(!down&&held.remove(k)){String[] b=binding(k);key(b[0],b[1],false);}}
 private String[] binding(int k){
   switch(k){
     case KeyEvent.KEYCODE_BUTTON_X:return new String[]{"1","Digit1"};case KeyEvent.KEYCODE_BUTTON_Y:return new String[]{"2","Digit2"};
     case KeyEvent.KEYCODE_BUTTON_L1:return new String[]{"3","Digit3"};case KeyEvent.KEYCODE_BUTTON_R1:return new String[]{"4","Digit4"};
     case KeyEvent.KEYCODE_BUTTON_L2:return new String[]{"5","Digit5"};case KeyEvent.KEYCODE_BUTTON_R2:return new String[]{"6","Digit6"};
     case KeyEvent.KEYCODE_BUTTON_B:case KeyEvent.KEYCODE_BUTTON_START:return new String[]{"Escape","Escape"};
   }return null;
 }
 public boolean dispatchKeyEvent(KeyEvent e){
   int k=e.getKeyCode();boolean down=e.getAction()==KeyEvent.ACTION_DOWN;
   if(k==KeyEvent.KEYCODE_BUTTON_SELECT){if(down&&e.getRepeatCount()==0)settings();return true;}
   if(k==KeyEvent.KEYCODE_BUTTON_THUMBR||k==KeyEvent.KEYCODE_BUTTON_A){
     if(e.getRepeatCount()==0){if(down){held.add(k);click(true);}else{held.remove(k);click(false);}}return true;
   }
   if(k>=KeyEvent.KEYCODE_DPAD_UP&&k<=KeyEvent.KEYCODE_DPAD_RIGHT){if(down)held.add(k);else held.remove(k);return true;}
   String[] b=binding(k);if(b!=null){if(e.getRepeatCount()==0){if(down){if(held.add(k))key(b[0],b[1],true);}else if(held.remove(k))key(b[0],b[1],false);}return true;}
   return super.dispatchKeyEvent(e);
 }
 private void pointer(){float scale=web.getScale();web.evaluateJavascript("window.thorControls.move("+(px/scale)+","+(py/scale)+")",null);}
 private void click(boolean down){
   if(!ready)return;if(px<0){px=web.getWidth()/2f;py=web.getHeight()/2f;}pointer();
   // The mobile game expects a native touchscreen tap at the cursor location.
   long now=SystemClock.uptimeMillis();if(down)clickStart=now;MotionEvent.PointerProperties prop=new MotionEvent.PointerProperties();prop.id=0;prop.toolType=MotionEvent.TOOL_TYPE_FINGER;
   MotionEvent.PointerCoords coords=new MotionEvent.PointerCoords();coords.x=px;coords.y=py;coords.pressure=down?1:0;coords.size=1;
   MotionEvent event=MotionEvent.obtain(clickStart,now,down?MotionEvent.ACTION_DOWN:MotionEvent.ACTION_UP,1,new MotionEvent.PointerProperties[]{prop},new MotionEvent.PointerCoords[]{coords},0,0,1,1,0,0,InputDevice.SOURCE_TOUCHSCREEN,0);
   web.dispatchTouchEvent(event);event.recycle();
 }
 private void help(){reset();new AlertDialog.Builder(this).setTitle("Commandes AYN Thor")
   .setMessage("Stick gauche / croix : déplacement\nStick droit : pointeur\nR3 ou A : clic\nL1, R1, L2, R2 : priorité aux sorts à viser\nX, Y : priorité aux sorts instantanés\nStart ou B : pause / reprendre\nSelect ou ⚙ Thor : paramètres\n\nLe joystick de déplacement apparaît en bas à gauche. Les touches sur les sorts et leur opacité se règlent dans les paramètres.\n\nPour les sorts à viser, maintiens le bouton, vise avec le stick droit puis relâche. Les choix se font au pointeur avec R3.\n\nLa sauvegarde de cette application est distincte de Chrome.")
   .setPositiveButton("Jouer",(d,w)->{web.requestFocus();immersive();}).setNeutralButton("Ajouter à l’accueil",(d,w)->pin()).show();}
 private void applySettings(){if(!ready)return;android.content.SharedPreferences p=getPreferences(0);web.evaluateJavascript("window.thorControls.configure({showLabels:"+p.getBoolean("showLabels",true)+",labelOpacity:"+(p.getInt("labelOpacity",45)/100.0)+",showJoystick:"+p.getBoolean("showJoystick",true)+"})",null);}
 private void settings(){
   reset();if(ready)web.evaluateJavascript("window.thorControls.beginPreferences()",paused->settingsDialog("true".equals(paused)));else settingsDialog(false);
 }
 private void settingsDialog(boolean resumeGame){
   android.content.SharedPreferences p=getPreferences(0);
   LinearLayout layout=new LinearLayout(this);layout.setOrientation(LinearLayout.VERTICAL);int pad=(int)(24*getResources().getDisplayMetrics().density);layout.setPadding(pad,pad/2,pad,pad/2);
   Switch labels=new Switch(this);labels.setText("Touches sur les sorts actifs");labels.setChecked(p.getBoolean("showLabels",true));layout.addView(labels);
   TextView opacity=new TextView(this);opacity.setText("Opacité des touches : "+p.getInt("labelOpacity",45)+" %");layout.addView(opacity);
   SeekBar slider=new SeekBar(this);slider.setMax(85);slider.setMin(15);slider.setProgress(p.getInt("labelOpacity",45));layout.addView(slider);
   Switch joystick=new Switch(this);joystick.setText("Joystick visuel en bas à gauche");joystick.setChecked(p.getBoolean("showJoystick",true));layout.addView(joystick);
   Switch second=new Switch(this);second.setText("Personnage sur l’écran du bas");second.setChecked(p.getBoolean("characterScreen",true));layout.addView(second);
   second.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("characterScreen",v).apply();showCharacterScreen();});
   TextView hint=new TextView(this);hint.setText("Les commandes restent actives lorsque leurs repères sont masqués.");hint.setPadding(0,pad/2,0,0);layout.addView(hint);
   labels.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("showLabels",v).apply();applySettings();});
   joystick.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("showJoystick",v).apply();applySettings();});
   slider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener(){public void onProgressChanged(SeekBar s,int value,boolean user){opacity.setText("Opacité des touches : "+value+" %");p.edit().putInt("labelOpacity",value).apply();applySettings();}public void onStartTrackingTouch(SeekBar s){}public void onStopTrackingTouch(SeekBar s){}});
   boolean[] showHelp={false};AlertDialog dialog=new AlertDialog.Builder(this).setTitle("Paramètres AYN Thor").setView(layout).setPositiveButton("Fermer",null).setNeutralButton("Commandes",(d,w)->{showHelp[0]=true;help();}).create();
   dialog.setOnDismissListener(d->{if(resumeGame&&!showHelp[0]&&ready)web.evaluateJavascript("window.thorControls.endPreferences()",null);web.requestFocus();immersive();});dialog.show();
 }
 private void pin(){ShortcutManager sm=getSystemService(ShortcutManager.class);if(sm.isRequestPinShortcutSupported())sm.requestPinShortcut(new ShortcutInfo.Builder(this,"retro-survival").setShortLabel("Retro Survival").setIcon(Icon.createWithResource(this,fr.thor.retrosurvival.R.drawable.icon)).setIntent(new Intent(this,MainActivity.class).setAction(Intent.ACTION_MAIN)).build(),null);else Toast.makeText(this,"L’icône est disponible dans la liste des applications.",Toast.LENGTH_LONG).show();}
}
