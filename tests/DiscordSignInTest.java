package fr.thor.retrosurvival;

import static fr.thor.retrosurvival.DiscordSignIn.Route.*;

public final class DiscordSignInTest {
 public static void main(String[] args){
  expect(START,"https://retrosurvival.online/api/auth/discord/start");
  expect(CALLBACK,"https://retrosurvival.online/api/auth/discord/callback?code=sample&state=sample");
  for(String result:new String[]{"linked","merged","created","switched","cancelled","expired","error"})
   expect(RESULT,"https://retrosurvival.online/?discord="+result);
  expect(DISCORD,"https://discord.com/oauth2/authorize?client_id=sample&state=sample");
  expect(DISCORD,"https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize");
  expect(DISCORD,"https://discord.com/mfa");
  expect(DISCORD,"https://discord.com/verify");
  expect(DISCORD,"https://discord.com/api/oauth2/authorize");
  expect(DISCORD,"https://discord.com/channels/@me");
  expect(RESULT,"https://retrosurvival.online/");
  expect(RESULT,"https://retrosurvival.online/?unrelated=discord=linked");
  expect(RESULT,"https://retrosurvival.online/?discord=");
  expect(RESULT,"https://retrosurvival.online");
  expect(GAME,"https://retrosurvival.online/api/auth/discord/callback/");
  expect(GAME,"https://retrosurvival.online/other?discord=linked");
  expect(GAME,"https://retrosurvival.online/api/auth/discord%2fstart");
  expect(IGNORE,"about:blank");
  expect(IGNORE,"discord://action/oauth2/authorize?state=sample");
  for(String url:new String[]{
    "https://discord.gg/sample","https://discord.com.evil.example/login",
    "https://retrosurvival.online.evil.example/api/auth/discord/start","http://discord.com/login",
    "https://discord.com:8443/login","https://dummy@discord.com/login","https://discord.com@evil.example/login",
    "intent://discord.com/login","discord://untrusted/oauth2/authorize","javascript:alert(1)",null
  })expect(BLOCK,url);
  if(!"example.test".equals(DiscordSignIn.blockedDestination("https://example.test/callback?code=secret#token")))throw new AssertionError("Only the host can be shown");
  System.out.println("Discord routing: provider, callback, game return and invalid URLs passed");
 }
 private static void expect(DiscordSignIn.Route route,String url){
  if(DiscordSignIn.route(url)!=route)throw new AssertionError("Unexpected route for "+url);
 }
}
