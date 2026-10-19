package fr.thor.retrosurvival;
import java.nio.file.*;
public class Oct19ModuleTest {
 public static void main(String[] args)throws Exception {
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct19(source);
  if(adapted==null||!adapted.contains("window.thorRenderSpellMarker?.")||!adapted.contains("m??a.current[e],kt,u"))throw new AssertionError("Current render anchors");
  String anchor="n.drawImage(r,0,0,t.width,t.height)";
  if(GameModuleTransforms.oct19(source+anchor)!=null||GameModuleTransforms.oct19(source.replace(anchor,"changed()"))!=null)throw new AssertionError("Modified anchors refused");
  if(!GameModuleVersions.oct19("ea54faf3fbdab1d304764b85cf1a1087b2a23d4172589c3f3d83a5e863ce12f6")||!GameModuleVersions.oct19Shared("dd11a2dafbfe3568aeda998b50431276424dc77b9a0c286e0aab35476739c6b6"))throw new AssertionError("Exact hashes");
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);
  System.out.println("Docked official version: exact transformation anchors and hash guards passed.");
 }
}
