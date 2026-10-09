package fr.thor.retrosurvival;

import android.content.*;
import android.content.pm.*;
import android.net.Uri;
import android.os.Bundle;

/** Optional modules are accepted only from the same signing identity as the host. */
final class CompanionModule {
 private Bundle data=new Bundle();
 CompanionModule(Context context){
  PackageManager manager=context.getPackageManager();
  for(ResolveInfo entry:manager.queryIntentServices(new Intent("fr.thor.retrosurvival.COMPANION"),PackageManager.GET_META_DATA))try{
   ServiceInfo service=entry.serviceInfo;
   if(service==null||service.metaData==null||manager.checkSignatures(context.getPackageName(),service.packageName)!=PackageManager.SIGNATURE_MATCH)continue;
   String authority=service.metaData.getString("providerAuthority");if(authority==null)continue;
   ProviderInfo provider=manager.resolveContentProvider(authority,0);if(provider==null||!provider.packageName.equals(service.packageName))continue;
   Bundle result=context.getContentResolver().call(Uri.parse("content://"+authority),"load",null,null);
   if(result==null||result.getInt("protocol")!=1||!result.getBoolean("enabled"))continue;
   for(String key:new String[]{"bootstrap","panelScript","panelStyle","moduleHook","snapshot","frame","command","gameModuleSha256"}){String value=result.getString(key,"");if(value.length()>200000)throw new IllegalArgumentException("Module too large");}
   data=result;break;
  }catch(Exception ignored){}
 }
 boolean enabled(){return data.getBoolean("enabled",false);}
 String get(String key){return data.getString(key,"");}
 boolean localSession(){return enabled()&&data.getBoolean("localSession",false);}
 String snapshot(String expression){return enabled()?"(()=>{const data=("+expression+");data.companion=("+get("snapshot")+");return data;})()":expression;}
 String command(String json){return "("+get("command")+")("+json+")";}
}
