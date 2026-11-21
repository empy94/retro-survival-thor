package fr.thor.retrosurvival;
import java.io.*;
import java.nio.charset.StandardCharsets;
public final class ModuleResponseTest {
 public static void main(String[] args)throws Exception{
  byte[] bytes=new byte[27000000];bytes[0]=42;bytes[bytes.length-1]=43;
  ModuleResponse response=new ModuleResponse(bytes,"\n// français ✓");
  InputStream first=response.open(),second=response.open();if(first.read()!=42||second.read()!=42)throw new AssertionError("Shared cursor");first.close();
  long read=1;int last=-1,n;byte[] buffer=new byte[16384];while((n=second.read(buffer))!=-1){read+=n;last=buffer[n-1]&255;}second.close();
  if(read!=bytes.length+"\n// français ✓".getBytes(StandardCharsets.UTF_8).length||last<0)throw new AssertionError("Truncated response");
  boolean rejected=false;try{ModuleResponse.read(new ByteArrayInputStream(new byte[11]),-1,10);}catch(IOException expected){rejected=true;}if(!rejected)throw new AssertionError("Unknown length not bounded");
  rejected=false;try{ModuleResponse.read(new ByteArrayInputStream(new byte[0]),11,10);}catch(IOException expected){rejected=true;}if(!rejected)throw new AssertionError("Oversized length accepted");
  System.out.println("27 MB response under a 48 MB heap: independent streams, UTF-8 suffix and download bounds passed");
 }
}
