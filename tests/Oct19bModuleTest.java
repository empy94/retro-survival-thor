package fr.thor.retrosurvival;
import java.nio.file.*;
public class Oct19bModuleTest {
 public static void main(String[] args)throws Exception {
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct19b(source);
  if(adapted==null||!adapted.contains("window.thorRenderSpellMarker?.")||!adapted.contains("m??a.current[e],vn,u"))throw new AssertionError("Current render anchors");
  String anchor="n.drawImage(r,0,0,t.width,t.height)";
  if(GameModuleTransforms.oct19b(source+anchor)!=null||GameModuleTransforms.oct19b(source.replace(anchor,"changed()"))!=null)throw new AssertionError("Modified anchors refused");
  if(!GameModuleVersions.oct19b("843e12753edb91179a804da52a4bd65af6be7edce58b6e4e34ce5b785fcfd269")||!GameModuleVersions.oct19bShared("7a9a8a55f0e9f828f2ccb6a016e6c3d026ba5d0cd3a3fb17bb3157fd46d0b3e7"))throw new AssertionError("Exact hashes");
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);
  System.out.println("Docked official version: exact transformation anchors and hash guards passed.");
 }
}
