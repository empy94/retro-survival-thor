package fr.thor.retrosurvival;

import java.util.*;
import java.util.regex.*;
import org.json.*;

/** One startup scan of trusted structural contracts; no parser or work per frame. */
final class ModuleCompatibility {
 static final class Match {
  final Map<String,String> names;final JSONArray hooks;final String family,raster;
  Match(Map<String,String> names,JSONArray hooks,String family,String raster){this.names=names;this.hooks=hooks;this.family=family;this.raster=raster;}
  String symbol(String name){return names.getOrDefault(name,name);}
  String hook(){StringBuilder out=new StringBuilder();try{for(int i=0;i<hooks.length();i++)out.append('\n').append(render(hooks.getJSONArray(i),names));}catch(JSONException error){throw new IllegalArgumentException(error);}return out.toString();}
 }
 static Match resolve(String source,String profile){return resolve(source,profile,8000000);}
 static Match resolveShared(String source,String profile){return resolve(source,profile,20000000);}
 private static Match resolve(String source,String profile,int sourceLimit){
  if(source==null||source.length()>sourceLimit||profile==null||profile.length()>1000000)return null;
  try{
   JSONObject p=new JSONObject(profile);if(p.getInt("schema")!=1)return null;
   Map<String,String> names=new HashMap<>(),exports=new HashMap<>();
   Matcher imported=Pattern.compile("import\\{([^}]+)\\}from[\"']([^\"']+)[\"']").matcher(source);
   while(imported.find())for(String entry:imported.group(1).split(",")){String[] pair=entry.trim().split("\\s+as\\s+");if(pair.length>2)return null;String local=pair[pair.length-1].trim();if(identifier(local))exports.put(sourceKey(imported.group(2))+":"+pair[0].trim(),local);}
   JSONObject required=p.getJSONObject("imports");Iterator<String> keys=required.keys();while(keys.hasNext()){String old=keys.next();JSONObject entry=required.getJSONObject(old);String next=exports.get(sourceKey(entry.getString("source"))+":"+entry.getString("export"));if(next==null||!bind(names,old,next))return null;}
   if(p.has("exports")){
    Map<String,String> nativeExports=new HashMap<>();Matcher exported=Pattern.compile("export\\{([^}]+)\\}").matcher(source);
    while(exported.find())for(String entry:exported.group(1).split(",")){String[] pair=entry.trim().split("\\s+as\\s+");if(pair.length<=2&&identifier(pair[0].trim()))nativeExports.put(pair[pair.length-1].trim(),pair[0].trim());}
    JSONObject expected=p.getJSONObject("exports");Iterator<String> exportKeys=expected.keys();while(exportKeys.hasNext()){String old=exportKeys.next(),next=nativeExports.get(expected.getString(old));if(next==null||!bind(names,old,next)){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("Export mismatch: "+old+"/"+next);return null;}}
   }
   if(p.has("fixedNames")){JSONArray fixed=p.getJSONArray("fixedNames");for(int i=0;i<fixed.length();i++){String name=fixed.getString(i);if(!identifier(name)||!bind(names,name,name))return null;}}
   JSONArray contracts=p.getJSONArray("contracts");
   for(int i=0;i<contracts.length();i++){
    JSONArray parts=contracts.getJSONObject(i).getJSONArray("parts");int anchor=-1;String literal="";
    for(int j=0;j<parts.length();j++)if(parts.get(j) instanceof String&&parts.getString(j).length()>literal.length()){anchor=j;literal=parts.getString(j);}
    int right=anchor+1;
    if(p.has("exports")){
     String own=contracts.getJSONObject(i).getString("symbol");
     for(int j=0;j<parts.length();j++)if(parts.get(j) instanceof JSONObject&&own.equals(parts.getJSONObject(j).getString("symbol"))&&names.containsKey(own)){
      int begin=j>0&&parts.get(j-1) instanceof String?j-1:j;StringBuilder seed=new StringBuilder();int end=begin;
      while(end<parts.length()){Object value=parts.get(end);if(value instanceof String)seed.append((String)value);else{String name=names.get(((JSONObject)value).getString("symbol"));if(name==null)break;seed.append(name);}end++;}
      if(seed.length()>=3){anchor=begin;right=end;literal=seed.toString();}break;
     }
    }
    if(literal.length()<8&&right==anchor+1){
     int bestStart=-1,bestEnd=-1;String best="";
     for(int j=0;j<parts.length();){int start=j;StringBuilder seed=new StringBuilder();boolean bound=false;
      while(j<parts.length()){Object value=parts.get(j);if(value instanceof String)seed.append((String)value);else{String name=names.get(((JSONObject)value).getString("symbol"));if(name==null)break;seed.append(name);bound=true;}j++;}
      if(bound&&seed.length()>best.length()){best=seed.toString();bestStart=start;bestEnd=j;}if(j==start)j++;
     }
     if(best.length()<3){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("No bound anchor: "+contracts.getJSONObject(i).getString("symbol"));return null;}anchor=bestStart;right=bestEnd;literal=best;
    }
    Map<String,String> accepted=null;int from=0,hits=0,occurrences=0;
    while((from=source.indexOf(literal,from))>=0){if(++occurrences>128){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("Too many anchors: "+contracts.getJSONObject(i).getString("symbol"));return null;}Map<String,String> trial=new HashMap<>(names);int start=from;from++;
     if(match(source,parts,anchor-1,start,-1,trial)&&match(source,parts,right,start+literal.length(),1,trial)){if(++hits>1){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("Ambiguous contract: "+contracts.getJSONObject(i).getString("symbol"));return null;}accepted=trial;}
    }
    if(accepted==null){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("Contract mismatch: "+contracts.getJSONObject(i).getString("symbol"));return null;}names=accepted;
   }
   return new Match(names,p.getJSONArray("hooks"),p.getString("family"),p.optString("raster","Et"));
  }catch(Exception invalid){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("Contract invalid: "+invalid);return null;}
 }
 private static String sourceKey(String path){return path.replaceAll("discord-identity-[A-Za-z0-9_-]+\\.js$","discord-identity.js");}
 private static boolean match(String source,JSONArray parts,int part,int cursor,int direction,Map<String,String> names)throws JSONException{
  for(int i=part;i>=0&&i<parts.length();i+=direction){Object value=parts.get(i);
   if(value instanceof String){String text=(String)value;int at=direction>0?cursor:cursor-text.length();if(at<0||!source.startsWith(text,at))return false;cursor+=direction*text.length();}
   else{int end=cursor,start=cursor;if(direction>0){while(end<source.length()&&identifierChar(source.charAt(end)))end++;}else{while(start>0&&identifierChar(source.charAt(start-1)))start--;}
    String actual=source.substring(start,end);if(!identifier(actual)||!bind(names,((JSONObject)value).getString("symbol"),actual))return false;cursor=direction>0?end:start;
   }
  }return true;
 }
 private static String namespace(String key){return key.startsWith("@")?key.substring(0,key.indexOf(':')):"module";}
 private static boolean bind(Map<String,String> names,String key,String value){String prior=names.get(key);if(prior!=null)return prior.equals(value);String scope=namespace(key);for(Map.Entry<String,String> entry:names.entrySet())if(namespace(entry.getKey()).equals(scope)&&entry.getValue().equals(value))return false;names.put(key,value);return true;}
 private static boolean identifierChar(char c){return c=='$'||c=='_'||c>='a'&&c<='z'||c>='A'&&c<='Z'||c>='0'&&c<='9';}
 private static boolean identifier(String s){return !s.isEmpty()&&identifierChar(s.charAt(0))&&!(s.charAt(0)>='0'&&s.charAt(0)<='9')&&s.chars().allMatch(c->identifierChar((char)c));}
 private static String render(JSONArray parts,Map<String,String> names)throws JSONException{StringBuilder out=new StringBuilder();for(int i=0;i<parts.length();i++){Object p=parts.get(i);if(p instanceof String)out.append((String)p);else{String name=names.get(((JSONObject)p).getString("symbol"));if(name==null)throw new IllegalArgumentException("Unbound symbol");out.append(name);}}return out.toString();}
}

