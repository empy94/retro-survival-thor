package fr.thor.retrosurvival;
import java.nio.file.*;
import org.json.*;
public final class Nov5SharedContractsTest {
 public static void main(String[] args)throws Exception{
  String source=Files.readString(Path.of(args[0])),profile=Files.readString(Path.of(args[1]));
  if(ModuleCompatibility.resolveShared(source,profile)==null)throw new AssertionError("Current shared module rejected");
  JSONObject generic=new JSONObject(profile);JSONArray pins=generic.getJSONArray("fixedNames");for(int i=pins.length()-1;i>=0;i--)if(pins.getString(i).equals("Tc"))pins.remove(i);
  if(ModuleCompatibility.resolveShared(source,generic.toString())!=null)throw new AssertionError("Ambiguous generic helper accepted without audited name");
  if(ModuleCompatibility.resolveShared(source+source,profile)!=null)throw new AssertionError("Duplicate shared module accepted");
  if(ModuleCompatibility.resolveShared(source.replace("function Tc(","function changedTc("),profile)!=null)throw new AssertionError("Unknown helper accepted");
  System.out.println("Audited shared helper resolves; generic ambiguity, duplicate module and unknown helper remain rejected");
 }
}
