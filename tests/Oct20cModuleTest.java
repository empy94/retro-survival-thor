package fr.thor.retrosurvival;
import java.nio.file.*;
public class Oct20cModuleTest {
 public static void main(String[] args)throws Exception {
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct20c(source);
  if(adapted==null||!adapted.contains("window.thorRenderSpellMarker?.")||!adapted.contains("m??a.current[e],ro,u"))throw new AssertionError("Current render anchors");
  String anchor="n.drawImage(r,0,0,t.width,t.height)";
  if(GameModuleTransforms.oct20c(source+anchor)!=null||GameModuleTransforms.oct20c(source.replace(anchor,"changed()"))!=null)throw new AssertionError("Modified anchors refused");
  if(!GameModuleVersions.oct20c("03e4768020c7b58114b82b628526f4313739e3eb3f29219748de338ad203ae4c")||!GameModuleVersions.oct20cShared("cd3ea78d85b12946c572a5098d452ae134d876cd326d48ce8d42c969748b2ed2"))throw new AssertionError("Exact hashes");
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);
  System.out.println("Docked official version: exact transformation anchors and hash guards passed.");
 }
}
