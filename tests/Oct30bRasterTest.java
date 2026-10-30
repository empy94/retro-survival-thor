package fr.thor.retrosurvival;
import java.nio.file.*;
public final class Oct30bRasterTest {
 public static void main(String[] args)throws Exception{
  String source=Files.readString(Path.of(args[0])),adapted=GameModuleTransforms.oct21(source);
  if(adapted==null||!adapted.contains("let c=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,window.thorRenderScale??2);"))throw new AssertionError("Renamed native raster variable rejected");
  if(GameModuleTransforms.oct21(source+source)!=null)throw new AssertionError("Duplicate anchors accepted");
  if(GameModuleTransforms.oct21(source.replace("let c=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,2);","unknownRenderer();"))!=null)throw new AssertionError("Unknown renderer accepted");
  System.out.println("Current native raster variable supported; missing and duplicate render anchors rejected");
 }
}
