package fr.thor.retrosurvival;

import java.net.URI;

final class DiscordSignIn {
 static final String START="/api/auth/discord/start";
 private static final String CALLBACK="/api/auth/discord/callback";
 enum Route { START, CALLBACK, RESULT, GAME_HOME, DISCORD, BLOCK }

 static Route route(String url){
  if(url==null)return Route.BLOCK;
  try{
   URI uri=URI.create(url);
   if(!"https".equalsIgnoreCase(uri.getScheme())||uri.getRawUserInfo()!=null||
      (uri.getPort()!=-1&&uri.getPort()!=443))return Route.BLOCK;
   String path=uri.getRawPath();
   if("retrosurvival.online".equalsIgnoreCase(uri.getHost())){
    if(START.equals(path))return Route.START;
    if(CALLBACK.equals(path))return Route.CALLBACK;
    String query=uri.getRawQuery();
    if("/".equals(path)){
     if(query!=null)for(String field:query.split("&"))
      if(field.matches("discord=[a-z-]{1,32}"))return Route.RESULT;
     return Route.GAME_HOME;
    }
   }
   // Login, device verification and authorization are all handled by the same
   // provider origin. The isolated view deliberately has no game bridge.
   if("discord.com".equalsIgnoreCase(uri.getHost()))return Route.DISCORD;
  }catch(IllegalArgumentException ignored){}
  return Route.BLOCK;
 }
}
