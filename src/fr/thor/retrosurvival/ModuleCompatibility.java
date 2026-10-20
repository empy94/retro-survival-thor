package fr.thor.retrosurvival;

import java.util.*;
import java.util.regex.*;
import org.json.*;

/** One startup scan of trusted structural contracts; no parser or work per frame. */
final class ModuleCompatibility {
 static final class Match {
  final Map<String,String> names;final JSONArray hooks;final String family;
  Match(Map<String,String> names,JSONArray hooks,String family){this.names=names;this.hooks=hooks;this.family=family;}
  String symbol(String name){return names.getOrDefault(name,name);}
  String hook(){StringBuilder out=new StringBuilder();try{for(int i=0;i<hooks.length();i++)out.append('\n').append(render(hooks.getJSONArray(i),names));}catch(JSONException error){throw new IllegalArgumentException(error);}return out.toString();}
 }
 static Match resolve(String source,String profile){
  if(source==null||source.length()>8000000||profile==null||profile.length()>1000000)return null;
  try{
   JSONObject p=new JSONObject(profile);if(p.getInt("schema")!=1)return null;
   Map<String,String> names=new HashMap<>(),exports=new HashMap<>();
   Matcher imported=Pattern.compile("import\\{([^}]+)\\}from[\"']([^\"']+)[\"']").matcher(source);
   while(imported.find())for(String entry:imported.group(1).split(",")){String[] pair=entry.trim().split("\\s+as\\s+");if(pair.length>2)return null;String local=pair[pair.length-1].trim();if(identifier(local))exports.put(imported.group(2)+":"+pair[0].trim(),local);}
   JSONObject required=p.getJSONObject("imports");Iterator<String> keys=required.keys();while(keys.hasNext()){String old=keys.next();JSONObject entry=required.getJSONObject(old);String next=exports.get(entry.getString("source")+":"+entry.getString("export"));if(next==null||!bind(names,old,next))return null;}
   JSONArray contracts=p.getJSONArray("contracts");
   for(int i=0;i<contracts.length();i++){
    JSONArray parts=contracts.getJSONObject(i).getJSONArray("parts");int anchor=-1;String literal="";
    for(int j=0;j<parts.length();j++)if(parts.get(j) instanceof String&&parts.getString(j).length()>literal.length()){anchor=j;literal=parts.getString(j);}
    if(literal.length()<8)return null;
    Map<String,String> accepted=null;int from=0,hits=0,occurrences=0;
    while((from=source.indexOf(literal,from))>=0){if(++occurrences>128)return null;Map<String,String> trial=new HashMap<>(names);int start=from;from++;
     if(match(source,parts,anchor-1,start,-1,trial)&&match(source,parts,anchor+1,start+literal.length(),1,trial)){if(++hits>1)return null;accepted=trial;}
    }
    if(accepted==null){if(Boolean.getBoolean("thor.compat.trace"))System.err.println("Contract mismatch: "+contracts.getJSONObject(i).getString("symbol"));return null;}names=accepted;
   }
   return new Match(names,p.getJSONArray("hooks"),p.getString("family"));
  }catch(Exception invalid){return null;}
 }
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

