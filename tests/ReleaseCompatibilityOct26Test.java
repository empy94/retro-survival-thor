package fr.thor.retrosurvival;
import java.nio.file.*;
public final class ReleaseCompatibilityOct26Test {
 public static void main(String[] args)throws Exception{
  for(int i=0;i<4;i+=2){String source=Files.readString(Path.of(args[i])),profile=Files.readString(Path.of(args[i+1]));boolean shared=i==2;
   ModuleCompatibility.Match match=shared?ModuleCompatibility.resolveShared(source,profile):ModuleCompatibility.resolve(source,profile);if(match==null)throw new AssertionError("Audited source rejected");
   String broken=source.replace(".hp", ".incompatibleHp");if((shared?ModuleCompatibility.resolveShared(broken,profile):ModuleCompatibility.resolve(broken,profile))!=null)throw new AssertionError("Changed logic accepted");
   if(!shared&&ModuleCompatibility.resolve(source+source,profile)!=null)throw new AssertionError("Ambiguous contracts accepted");
  }
  System.out.println("Latest page/shared contracts accepted; changed gameplay and duplicate page contracts rejected");
 }
}
