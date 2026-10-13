package fr.thor.retrosurvival;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
public class GameModuleTransformsTest {
 public static void main(String[] args)throws Exception{
  for(String file:args){String source=Files.readString(Path.of(file),StandardCharsets.UTF_8),result=file.contains("perf-live")?GameModuleTransforms.live(source):file.contains("13c")?GameModuleTransforms.newest(source):GameModuleTransforms.latest(source);
   if(result==null||result.equals(source))throw new AssertionError("audited source transformed");
   if(!result.contains("window.thorVisualParticles(o)")||!result.contains(file.contains("perf-live")?"window.thorHudChanged(i)||M<=0":"window.thorHudChanged(r)||ee<=0")||!result.contains("Math.abs(e)>=s||Math.abs(n)>=s")||!result.contains("window.thorDrawMap(n,r,e.width,e.height)"))throw new AssertionError("expected renderer and distance gate");
   if((file.contains("perf-live")?GameModuleTransforms.live(source+"for(let e of o.particles)"):file.contains("13c")?GameModuleTransforms.newest(source+"for(let e of o.particles)"):GameModuleTransforms.latest(source+"for(let e of o.particles)"))!=null)throw new AssertionError("ambiguous anchor refused");
   if((file.contains("perf-live")?GameModuleTransforms.live(source.replace("for(let e of o.particles)","for(let e of changed.particles)")):file.contains("13c")?GameModuleTransforms.newest(source.replace("for(let e of o.particles)","for(let e of changed.particles)")):GameModuleTransforms.latest(source.replace("for(let e of o.particles)","for(let e of changed.particles)")))!=null)throw new AssertionError("changed anchor refused");
   Files.writeString(Path.of(file+".adapted.js"),result,StandardCharsets.UTF_8);
  }
  System.out.println("Audited transformations and changed/duplicate anchor rejection passed");
 }
}
