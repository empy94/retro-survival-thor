package fr.thor.retrosurvival;
public final class CurrentModuleRoutingTest {
 public static void main(String[] args){
  for(String path:new String[]{"/_next/static/chunks/discord-identity-P8YD35M3.js","/_next/static/chunks/discord-identity-BofEmv2P.js"})if(!GameModuleVersions.sharedPath(path))throw new AssertionError(path);
  for(String path:new String[]{null,"/assets/discord-identity-P8YD35M3.js","/_next/static/chunks/discord-identity-a.js.map","/_next/static/chunks/discord-identity-../a.js"})if(GameModuleVersions.sharedPath(path))throw new AssertionError(path);
  if(!GameModuleVersions.oct21("257fef2cedf1d5f0f065a026da1dad8a729fe38b9fe7965a80bda2ffed85c66b"))throw new AssertionError("page hash");
  if(GameModuleVersions.oct21Shared("unexpected"))throw new AssertionError("hash checks preserved");
  System.out.println("Shared module routing and independent exact hash allowlist passed");
 }
}
