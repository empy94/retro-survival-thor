package fr.thor.retrosurvival;
import java.nio.file.*;
public class ModuleCompatibilityTest {
 public static void main(String[] args)throws Exception{
  String tiny="{\"schema\":1,\"family\":\"test\",\"imports\":{},\"contracts\":[{\"symbol\":\"f\",\"parts\":[\"function \",{\"symbol\":\"f\"},\"(\",{\"symbol\":\"@1:a\"},\",\",{\"symbol\":\"@1:b\"},\"){return Math.abs(\",{\"symbol\":\"@1:a\"},\".x-\",{\"symbol\":\"@1:b\"},\".x)+17}\"]}],\"hooks\":[[\"window.example=\",{\"symbol\":\"f\"},\";\"]]}";
  if(ModuleCompatibility.resolve("function next(x,y){return Math.abs(x.x-y.x)+17}",tiny)==null)throw new AssertionError("Consistent rename rejected");
  if(ModuleCompatibility.resolve("function next(x,y){return Math.abs(x.x-x.x)+17}",tiny)!=null)throw new AssertionError("Merged local identities accepted");
  if(ModuleCompatibility.resolve("function next(x,y){return Math.abs(x.x-y.x)+18}",tiny)!=null)throw new AssertionError("Changed logic accepted");
  String source=Files.readString(Path.of(args[0])),profile=Files.readString(Path.of(args[1]));long start=System.nanoTime();
  ModuleCompatibility.Match match=ModuleCompatibility.resolve(source,profile);
  if(match==null)throw new AssertionError("Expected compatible contract: "+args[0]);
  Files.writeString(Path.of(args[0]+"."+Path.of(args[1]).getFileName()+".js"),match.hook());
  System.out.println("Compatible function contracts: "+match.names.size()+" bindings in "+((System.nanoTime()-start)/1000000)+"ms");
  if(ModuleCompatibility.resolve(source.replace("discord-identity-mqIdrlji.js","discord-identity-unknown.js"),profile)!=null)throw new AssertionError("Changed shared dependency accepted");
  if(ModuleCompatibility.resolve(source+source,profile)!=null)throw new AssertionError("Ambiguous duplicate accepted");
  String cosmetic=source+"\n// unrelated deployment change\n";
  if(ModuleCompatibility.resolve(cosmetic,profile)==null)throw new AssertionError("Unrelated changes blocked");
  if(ModuleCompatibility.resolve(source.replace(".gameRef", ".incompatibleGameRef").replace("gameRef:","incompatibleGameRef:"),profile)!=null&&args[1].contains("module-contract"))throw new AssertionError("Changed context accepted");
 }
}
