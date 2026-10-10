package fr.thor.retrosurvival;

import java.net.URI;

/** Local sessions never delegate a request to the network, including reads. */
final class SessionNetworkPolicy {
 static final String LOCAL_HOST="thor-local.invalid";
 static final String LOCAL_URL="https://"+LOCAL_HOST+"/";
 static boolean blocks(boolean localSession,String method,String route){return localSession;}
 static String staticPath(String url){
  try{
   URI uri=new URI(url);String host=uri.getHost(),path=uri.getPath();
   if(!"https".equals(uri.getScheme())||uri.getUserInfo()!=null||(uri.getPort()!=-1&&uri.getPort()!=443)||
     !("retrosurvival.online".equals(host)||LOCAL_HOST.equals(host))||path==null||!path.equals(uri.normalize().getPath())||path.contains("\\")||path.contains("%")||path.matches(".*(?:^|/)\\.\\.?(?:/|$).*"))return null;
   if(path.equals("/")||path.startsWith("/_next/static/")||path.startsWith("/assets/")||path.equals("/favicon.ico"))return path;
  }catch(Exception ignored){}return null;
 }
}
