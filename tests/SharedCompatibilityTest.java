package fr.thor.retrosurvival;
import java.nio.file.*;
public final class SharedCompatibilityTest {
 public static void main(String[] args)throws Exception{
  String source=Files.readString(Path.of(args[0])),profile=Files.readString(Path.of(args[1]));long start=System.nanoTime();
  ModuleCompatibility.Match base=ModuleCompatibility.resolveShared(source,profile);if(base==null)throw new AssertionError("Exact shared source rejected");
  ModuleCompatibility.Match renamed=ModuleCompatibility.resolveShared(Files.readString(Path.of(args[2])),profile);if(renamed==null)throw new AssertionError("Identifier rename rejected");
  if(ModuleCompatibility.resolveShared(Files.readString(Path.of(args[3])),profile)!=null)throw new AssertionError("Changed game logic accepted");
  if(ModuleCompatibility.resolveShared(Files.readString(Path.of(args[9])),profile)!=null)throw new AssertionError("Ambiguous duplicated code accepted");
  String page=Files.readString(Path.of(args[4])),pageProfile=Files.readString(Path.of(args[5]));
  if(ModuleCompatibility.resolve(page.replace("discord-identity-Bz2wS_aw.js","discord-identity-RENAMED.js"),pageProfile)==null)throw new AssertionError("Shared filename-only rename rejected");
  Files.writeString(Path.of(args[6]),source+"\n"+Files.readString(Path.of(args[7]))+"\n"+base.hook());
  Files.writeString(Path.of(args[8]),Files.readString(Path.of(args[2]))+"\n"+Files.readString(Path.of(args[7]))+"\n"+renamed.hook());
  System.out.println("Shared compatibility: native source and binding renames accepted; changed logic and ambiguity rejected; file rename accepted. Checks ms="+(System.nanoTime()-start)/1000000);
 }
}
