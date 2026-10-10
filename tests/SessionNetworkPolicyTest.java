package fr.thor.retrosurvival;
public final class SessionNetworkPolicyTest {
 private static void check(boolean value){if(!value)throw new AssertionError();}
 public static void main(String[] args)throws Exception{
  for(String method:new String[]{"GET","HEAD","POST","PATCH","PUT","DELETE","OPTIONS"})for(String route:new String[]{null,"/","/api/progress","/api/progress/recovery","/api/profile","/api/leaderboard","/api/leaderboard/run","/api/run-build","/api/achievement-event","/api/share","/api/players","/assets/test.png"}){check(SessionNetworkPolicy.blocks(true,method,route));check(!SessionNetworkPolicy.blocks(false,method,route));}
  for(String url:new String[]{"https://retrosurvival.online/api/progress","https://thor-local.invalid/api/profile","https://retrosurvival.online/assets/../api/progress","https://retrosurvival.online/assets/%2e%2e/api/progress","https://retrosurvival.online/assets/%252e%252e/x","https://evil.invalid/assets/test.png","https://retrosurvival.online.evil.invalid/assets/test.png","https://retrosurvival.online:8443/assets/a","http://thor-local.invalid/assets/a","https://user@thor-local.invalid/assets/a"})check(SessionNetworkPolicy.staticPath(url)==null);
  check("/assets/test.png".equals(SessionNetworkPolicy.staticPath("https://thor-local.invalid/assets/test.png")));
  check("/_next/static/chunks/page-test.js".equals(SessionNetworkPolicy.staticPath("https://retrosurvival.online/_next/static/chunks/page-test.js")));
  java.io.File directory=java.nio.file.Files.createTempDirectory("thor-local-cache-test").toFile();LocalGameCache cache=new LocalGameCache(directory);
  check(cache.get("/")==null);cache.put("/","<head>clean root</head>".getBytes("UTF-8"));check(cache.ready());cache.put("/assets/test.png",new byte[]{1,2,3});check(cache.get("/assets/test.png")[2]==3);
  boolean denied=false;try{cache.put("/api/progress",new byte[]{0});}catch(Exception expected){denied=true;}check(denied);
  if(args.length==1){byte[] module=java.nio.file.Files.readAllBytes(java.nio.file.Paths.get(args[0]));String root="<head><script src=\"/_next/static/chunks/page-fixture.js\"></script></head>";cache.put("/_next/static/chunks/page-fixture.js",module);cache.put("/",root.getBytes("UTF-8"));cache.freeze();check(new String(cache.getFrozen("/"),"UTF-8").equals(root));cache.put("/","<head>future unknown root</head>".getBytes("UTF-8"));cache.freeze();check(new String(cache.getFrozen("/"),"UTF-8").equals(root));cache.put("/assets/new.png",new byte[]{8});check(cache.getFrozen("/assets/new.png")[0]==8);check(cache.getFrozen("/assets/missing.png")==null);check(cache.getFrozen("/assets/test.png")[2]==3);cache.put("/assets/test.png",new byte[]{9});check(cache.getFrozen("/assets/test.png")[2]==3);}
  System.out.println("All local methods/endpoints denied; online unchanged; public cache rejects APIs, other hosts and path escapes passed");
 }
}
