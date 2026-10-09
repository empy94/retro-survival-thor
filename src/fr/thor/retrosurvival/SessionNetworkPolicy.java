package fr.thor.retrosurvival;

final class SessionNetworkPolicy {
 static boolean blocks(boolean localSession,String method,String route){
  if(!localSession||"GET".equals(method)||"HEAD".equals(method)||route==null)return false;
  // Account progress and recovery remain available in every session.
  return route.equals("/api/leaderboard")||route.startsWith("/api/leaderboard/")||route.equals("/api/run-build")||route.equals("/api/share");
 }
}
