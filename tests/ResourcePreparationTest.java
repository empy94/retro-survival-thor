package fr.thor.retrosurvival;

public final class ResourcePreparationTest {
 interface Check {void run()throws Exception;}
 static void rejects(Check check)throws Exception{try{check.run();}catch(Exception expected){return;}throw new AssertionError("Invalid resource manifest accepted");}
 public static void main(String[] args)throws Exception{
  String hash="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  String head="{\"gameHash\":\""+hash+"\",\"paths\":";
  if(ResourcePreparation.paths(head+"[\"/assets/map.webp\",\"/assets/map.webp\"]}",hash).size()!=1)throw new AssertionError("Duplicate requests");
  if(!ResourcePreparation.paths("",hash).isEmpty())throw new AssertionError("Optional manifest");
  rejects(()->ResourcePreparation.paths(head+"[\"/api/profile/sync\"]}",hash));
  rejects(()->ResourcePreparation.paths(head+"[\"https://example.com/assets/a.webp\"]}",hash));
  rejects(()->ResourcePreparation.paths(head+"[\"/assets/../api/profile\"]}",hash));
  rejects(()->ResourcePreparation.paths(head+"[\"/assets/a.webp?x=y\"]}",hash));
  rejects(()->ResourcePreparation.paths(head+"[\"/assets/a.webp\"]}","different"));
  java.io.ByteArrayOutputStream bytes=new java.io.ByteArrayOutputStream();try(java.util.zip.GZIPOutputStream gzip=new java.util.zip.GZIPOutputStream(bytes)){gzip.write((head+"[\"/assets/map.webp\"]}").getBytes(java.nio.charset.StandardCharsets.UTF_8));}
  String packed="{\"gzip\":\""+java.util.Base64.getEncoder().encodeToString(bytes.toByteArray())+"\"}";
  if(ResourcePreparation.paths(packed,hash).size()!=1)throw new AssertionError("Packed resource manifest");
  rejects(()->ResourcePreparation.paths("{\"gzip\":\"invalid\"}",hash));
  System.out.println("Resource preparation: static paths only, exact version, no API/external/traversal/query requests and deduplication passed");
 }
}
