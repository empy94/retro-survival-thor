package fr.thor.retrosurvival;

import android.content.*;
import android.content.pm.*;
import android.net.Uri;
import android.os.Bundle;

/** Optional modules are accepted only from the same signing identity as the host. */
final class CompanionModule {
 private Bundle data=new Bundle();
 private LocalUpdate imported;
 CompanionModule(Context context){
  PackageManager manager=context.getPackageManager();
  for(ResolveInfo entry:manager.queryIntentServices(new Intent("fr.thor.retrosurvival.COMPANION"),PackageManager.GET_META_DATA))try{
   ServiceInfo service=entry.serviceInfo;
   if(service==null||service.metaData==null||manager.checkSignatures(context.getPackageName(),service.packageName)!=PackageManager.SIGNATURE_MATCH)continue;
   String authority=service.metaData.getString("providerAuthority");if(authority==null)continue;
   ProviderInfo provider=manager.resolveContentProvider(authority,0);if(provider==null||!provider.packageName.equals(service.packageName))continue;
   Bundle result=context.getContentResolver().call(Uri.parse("content://"+authority),"load",null,null);
   if(result==null||result.getInt("protocol")!=1||!result.getBoolean("enabled"))continue;
   for(String key:new String[]{"bootstrap","panelScript","panelStyle","moduleHook","moduleHookCurrent","moduleHookPrevious7","moduleHookPrevious6","moduleHookPrevious4","moduleHookPrevious5","moduleHookPrevious3","moduleHookPrevious","moduleHookPrevious2","snapshot","frame","command","gameModuleSha256"}){String value=result.getString(key,"");if(value.length()>200000)throw new IllegalArgumentException("Module too large");}
   String envelope=result.getString("localUpdateEnvelope","");
   if(!envelope.isEmpty())try{
    String key;try(java.io.InputStream in=context.getAssets().open("local-update-public-key.txt")){key=LocalUpdate.read(in);}
    imported=LocalUpdate.parse(envelope,key);
    for(String field:new String[]{"bootstrap","panelScript","panelStyle","snapshot","frame","command"})result.putString(field,imported.script(field));
   }catch(Exception invalid){imported=null;}
   data=result;break;
  }catch(Exception ignored){}
 }
 boolean supportsLocalGame(String hash){return enabled()&&imported!=null&&imported.gameHash.equals(hash);}
 String localMainHook(){return imported==null?"":imported.script("mainHook")+"\n;window.thorLocalUpdateVersion=\""+imported.version+"\";";}
 String localRulesHook(){return imported==null?"":imported.script("rulesHook");}
 boolean supportsGameModule(String hash){return GameModuleVersions.companionSupports(get("gameModuleSha256"),hash);}
 boolean enabled(){return data.getBoolean("enabled",false);}
 String get(String key){return data.getString(key,"");}
 String snapshot(boolean local,String expression){return enabled()?"(()=>{const data=("+expression+");data.companion="+(local?"("+get("snapshot")+")":"{available:false}")+";if(data.companion)data.companion.localSession="+local+";return data;})()":expression;}
 String command(String json){return "("+get("command")+")("+json+")";}
}
