package fr.thor.retrosurvival;
public final class SessionNetworkPolicyTest {
 private static void check(boolean value){if(!value)throw new AssertionError();}
 public static void main(String[] args){
  for(String method:new String[]{"GET","POST","PATCH","PUT","DELETE"})for(String route:new String[]{"/api/progress","/api/progress/recovery","/api/profile"})check(!SessionNetworkPolicy.blocks(true,method,route));
  for(String route:new String[]{"/api/leaderboard","/api/leaderboard/run","/api/run-build","/api/share"}){check(SessionNetworkPolicy.blocks(true,"POST",route));check(!SessionNetworkPolicy.blocks(true,"GET",route));check(!SessionNetworkPolicy.blocks(false,"POST",route));}
  check(!SessionNetworkPolicy.blocks(true,"POST",null));System.out.println("Session networking: cloud progress/recovery/profile allowed, result writes isolated, normal sessions intact passed");
 }
}
