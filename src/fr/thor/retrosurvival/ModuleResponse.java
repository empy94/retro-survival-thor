package fr.thor.retrosurvival;
import java.io.*;
import java.nio.charset.StandardCharsets;
/** Replays the audited source and a small adapter without joining large strings. */
final class ModuleResponse {
 private final byte[] source,suffix;
 ModuleResponse(byte[] source,String suffix){this.source=source;this.suffix=suffix.getBytes(StandardCharsets.UTF_8);}
 InputStream open(){return new SequenceInputStream(new ByteArrayInputStream(source),new ByteArrayInputStream(suffix));}
 static byte[] read(InputStream input,int expected,int limit)throws IOException{
  if(expected>limit)throw new IOException("Module too large");
  ByteArrayOutputStream out=new ByteArrayOutputStream(expected>0?expected:8192);
  byte[] buffer=new byte[16384];int count;
  while((count=input.read(buffer))!=-1){if(count>limit-out.size())throw new IOException("Module too large");out.write(buffer,0,count);}
  return out.toByteArray();
 }
}
