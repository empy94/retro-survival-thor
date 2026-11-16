package fr.thor.retrosurvival;

import java.net.URI;

final class DiscordSignIn {
 static final String START="/api/auth/discord/start";
 private static final String CALLBACK="/api/auth/discord/callback";
 enum Route { START, CALLBACK, RESULT, GAME, DISCORD, IGNORE, BLOCK }

 static Route route(String url){
  if(url==null)return Route.BLOCK;
  if("about:blank".equals(url))return Route.IGNORE;
  try{
   URI uri=URI.create(url);
   if("discord".equalsIgnoreCase(uri.getScheme())&&"action".equals(uri.getRawAuthority())&&
      "/oauth2/authorize".equals(uri.getRawPath()))return Route.IGNORE;
   if(!"https".equalsIgnoreCase(uri.getScheme())||uri.getRawUserInfo()!=null||
      (uri.getPort()!=-1&&uri.getPort()!=443))return Route.BLOCK;
   String path=uri.getRawPath();
   if("retrosurvival.online".equalsIgnoreCase(uri.getHost())){
    if(START.equals(path))return Route.START;
    if(CALLBACK.equals(path))return Route.CALLBACK;
    if(path.isEmpty()||"/".equals(path))return Route.RESULT;
    return Route.GAME;
   }
   // Login, device verification and authorization are all handled by the same
   // provider origin. The isolated view deliberately has no game bridge.
   if("discord.com".equalsIgnoreCase(uri.getHost()))return Route.DISCORD;
  }catch(IllegalArgumentException ignored){}
  return Route.BLOCK;
 }
 static String blockedDestination(String url){
  try{
   URI uri=URI.create(url);
   String host=uri.getHost();
   if(host!=null&&"https".equalsIgnoreCase(uri.getScheme())&&uri.getRawUserInfo()==null)return host;
  }catch(IllegalArgumentException|NullPointerException ignored){}
  return "URL";
 }
}
