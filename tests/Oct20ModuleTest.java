package fr.thor.retrosurvival;
import java.nio.file.*;
public class Oct20ModuleTest {
 public static void main(String[] args)throws Exception {
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct20(source);
  if(adapted==null||!adapted.contains("window.thorRenderSpellMarker?.")||!adapted.contains("m??a.current[e],mp,u"))throw new AssertionError("Current render anchors");
  String anchor="n.drawImage(r,0,0,t.width,t.height)";
  if(GameModuleTransforms.oct20(source+anchor)!=null||GameModuleTransforms.oct20(source.replace(anchor,"changed()"))!=null)throw new AssertionError("Modified anchors refused");
  if(!GameModuleVersions.oct20("511ac6afd270438a8011f12e228269868dbb8ae176a8ae9c1a9a7032a94f27c1")||!GameModuleVersions.oct20Shared("b6c21e218ffeb9e2eb14bbfc4ef25ba1237b1b8fee970709b69043f1134e4826"))throw new AssertionError("Exact hashes");
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);
  System.out.println("Docked official version: exact transformation anchors and hash guards passed.");
 }
}
