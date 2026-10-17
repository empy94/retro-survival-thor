package fr.thor.retrosurvival;
import java.nio.file.*;
public class DockedModuleTest {
 public static void main(String[] args)throws Exception {
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.docked(source);
  if(adapted==null||!adapted.contains("window.thorRenderSpellMarker?.")||!adapted.contains("m??a.current[e],W,u"))throw new AssertionError("Current render anchors");
  String anchor="n.drawImage(r,0,0,t.width,t.height)";
  if(GameModuleTransforms.docked(source+anchor)!=null||GameModuleTransforms.docked(source.replace(anchor,"changed()"))!=null)throw new AssertionError("Modified anchors refused");
  if(!GameModuleVersions.docked("707fcdf646b13f086b261af84039a2bf517a1f656352b8a18e13ef19b2b7518b")||!GameModuleVersions.dockedShared("147bdcf4f603c279dbd38995aa3a4b137e592d3f2f6cd6d49c82d57db6156f6c"))throw new AssertionError("Exact hashes");
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);
  System.out.println("Docked official version: exact transformation anchors and hash guards passed.");
 }
}
