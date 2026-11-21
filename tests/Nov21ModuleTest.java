package fr.thor.retrosurvival;
import java.nio.file.*;
public final class Nov21ModuleTest {
 public static void main(String[] args)throws Exception {
  String page=Files.readString(Path.of(args[0])),shared=Files.readString(Path.of(args[1]));
  String pc=Files.readString(Path.of("assets/module-contract-nov21.json")),sc=Files.readString(Path.of("assets/shared-contract-nov21.json"));
  if(ModuleCompatibility.resolve(page,pc)==null||ModuleCompatibility.resolveShared(shared,sc)==null)throw new AssertionError("Current official modules rejected");
  if(ModuleCompatibility.resolveShared(shared+shared,sc)!=null)throw new AssertionError("Oversized module accepted");
  if(ModuleCompatibility.resolve(page+page,pc)!=null)throw new AssertionError("Ambiguous duplicate accepted");
  String changed=page.replace("(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];","(e,t,r,i,o,s,c=2,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];");
  if(GameModuleTransforms.nov21(changed)!=null)throw new AssertionError("Changed render semantics accepted");
  String adapted=GameModuleTransforms.nov21(page);if(adapted==null||!adapted.contains("thorRenderSpellMarker?.")||!adapted.contains("thorVisualParticles?.")||!adapted.contains("thorDrawMap?.(n,l,t.width,t.height)")||!adapted.contains("n.transferToImageBitmap()"))throw new AssertionError("Current render controls or native cache missing");
  System.out.println("Nov21 modules: enlarged shared source accepted, duplicate/changed code rejected, spell markers and official bitmap cache preserved");
 }
}
