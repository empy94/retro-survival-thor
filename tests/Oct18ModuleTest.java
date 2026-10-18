package fr.thor.retrosurvival;
import java.nio.file.*;
public class Oct18ModuleTest {
 public static void main(String[] args)throws Exception {
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct18(source);
  if(adapted==null||!adapted.contains("window.thorRenderSpellMarker?.")||!adapted.contains("m??a.current[e],tt,u"))throw new AssertionError("Current render anchors");
  String anchor="n.drawImage(r,0,0,t.width,t.height)";
  if(GameModuleTransforms.oct18(source+anchor)!=null||GameModuleTransforms.oct18(source.replace(anchor,"changed()"))!=null)throw new AssertionError("Modified anchors refused");
  if(!GameModuleVersions.oct18("0ece8d95aeb0e97879c45350227ceb83ff10b7788a9802de4a6b208c5c64bcf5")||!GameModuleVersions.oct18Shared("a161ca10ffe43612c1b8015e4b03fca63d6c5425430793b7388a4de3206d1eb4"))throw new AssertionError("Exact hashes");
  Files.writeString(Path.of(args[0]+".adapted.js"),adapted);
  System.out.println("Docked official version: exact transformation anchors and hash guards passed.");
 }
}
