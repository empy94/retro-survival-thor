package fr.thor.retrosurvival;
import java.nio.file.*;
public class Oct17ModuleTest {
 public static void main(String[] args)throws Exception{
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct17(source);
  if(adapted==null)throw new AssertionError("Current audited page must transform");
  if(!adapted.contains("fe=e.thorRefreshHud=H.thorRefreshHud=e=>")||!adapted.contains("window.thorRenderSpellMarker")||!adapted.contains("Math.abs(e)>=s||Math.abs(n)>=s"))throw new AssertionError("Native bridge/render/distance anchors");
  if(GameModuleTransforms.oct17(source+"n.drawImage(r,0,0,t.width,t.height)")!=null||GameModuleTransforms.oct17(source.replace("n.drawImage(r,0,0,t.width,t.height)","changedMap()"))!=null)throw new AssertionError("Reject changed or duplicate anchors");
  if(!GameModuleVersions.oct17("1b97b721d070bcbe2f280813318d5b59605a4a0863d13a73db302e49f348c9a3")||!GameModuleVersions.oct17Shared("5487ff3251ae4881d60089eb496f10616af9679522c83c21402bf07d979b1202")||GameModuleVersions.oct17Shared("1b97b721d070bcbe2f280813318d5b59605a4a0863d13a73db302e49f348c9a3"))throw new AssertionError("Exact page/shared pair");
  if(args.length>1){
   LocalGameCache cache=new LocalGameCache(Files.createTempDirectory("thor-oct17-pair").toFile());
   cache.put("/", "<head><script src=\"/_next/static/chunks/page-BVpugp4s.js\"></script></head>".getBytes("UTF-8"));
   cache.put("/_next/static/chunks/page-BVpugp4s.js",source.getBytes("UTF-8"));
   try{cache.freeze();throw new AssertionError("Incomplete pair frozen");}catch(java.io.IOException expected){}
   cache.put("/_next/static/chunks/discord-identity-v9Gyhq15.js",new byte[]{1,2});
   try{cache.freeze();throw new AssertionError("Mismatched pair frozen");}catch(java.io.IOException expected){}
   byte[] shared=Files.readAllBytes(Path.of(args[1]));cache.put("/_next/static/chunks/discord-identity-v9Gyhq15.js",shared);cache.freeze();
   if(!java.util.Arrays.equals(shared,cache.getFrozen("/_next/static/chunks/discord-identity-v9Gyhq15.js")))throw new AssertionError("Exact pair not retained");
  }
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);System.out.println("Split page/shared hash guards and exact native transformation anchors passed.");
 }
}
