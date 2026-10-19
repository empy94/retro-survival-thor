package fr.thor.retrosurvival;

import java.io.*;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.*;
import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import org.json.*;

/** Prepare a bounded list of public static resources before changing origin. */
final class ResourcePreparation {
 interface Progress {void update(int done,int total);}
 static List<String> paths(String manifest,String expected)throws Exception{
  if(manifest==null||manifest.isEmpty())return Collections.emptyList();
  if(manifest.length()>220000)throw new IOException("Resource manifest too large");
  JSONObject data=new JSONObject(manifest);
  if(data.has("gzip")){
   try(InputStream input=new java.util.zip.GZIPInputStream(new ByteArrayInputStream(Base64.getDecoder().decode(data.getString("gzip"))));ByteArrayOutputStream output=new ByteArrayOutputStream()){
    byte[] buffer=new byte[8192];int count;while((count=input.read(buffer))!=-1){output.write(buffer,0,count);if(output.size()>1000000)throw new IOException("Expanded manifest too large");}
    data=new JSONObject(new String(output.toByteArray(),StandardCharsets.UTF_8));
   }
  }
  if(!data.getString("gameHash").equals(expected))throw new IOException("Resource version mismatch");
  JSONArray list=data.getJSONArray("paths");if(list.length()>6000)throw new IOException("Too many resources");
  Set<String> paths=new LinkedHashSet<>();
  for(int i=0;i<list.length();i++){
   String path=list.getString(i);
   if(!path.matches("/assets/[A-Za-z0-9_./-]+")||path.contains("..")||path.length()>300)throw new IOException("Invalid public asset path");
   paths.add(path);
  }
  return new ArrayList<>(paths);
 }
 static void prepare(LocalGameCache cache,File directory,String manifest,String expected,String agent,AtomicBoolean cancelled,Progress progress)throws Exception{
  List<String> paths=paths(manifest,expected);if(paths.isEmpty())return;
  byte[] hash=MessageDigest.getInstance("SHA-256").digest(manifest.getBytes(StandardCharsets.UTF_8));StringBuilder name=new StringBuilder("resources-");for(byte b:hash)name.append(String.format(java.util.Locale.ROOT,"%02x",b&255));
  File marker=new File(directory,name.toString());
  if(marker.isFile()){boolean complete=true;for(String path:paths)if(!cache.contains(path)){complete=false;break;}if(complete)return;}
  Set<String> prepared=new HashSet<>();File[] previous=directory.listFiles();if(previous!=null)for(File entry:previous)if(entry.getName().matches("resources-[a-f0-9]{64}")&&entry.length()<220000)try{prepared.addAll(paths(new String(java.nio.file.Files.readAllBytes(entry.toPath()),StandardCharsets.UTF_8),expected));}catch(Exception ignored){}
  ExecutorService workers=Executors.newFixedThreadPool(4);AtomicInteger cursor=new AtomicInteger(),done=new AtomicInteger();List<Future<?>> tasks=new ArrayList<>();
  try{
   for(int worker=0;worker<4;worker++)tasks.add(workers.submit(()->{
    for(int index;(index=cursor.getAndIncrement())<paths.size();){
     if(cancelled.get()||Thread.currentThread().isInterrupted())throw new RuntimeException("Cancelled");
     String path=paths.get(index);HttpURLConnection connection=null;
     try{
      if(prepared.contains(path)&&cache.contains(path)){int completed=done.incrementAndGet();if(completed%20==0)progress.update(completed,paths.size());continue;}
      connection=(HttpURLConnection)new URL("https://retrosurvival.online"+path).openConnection();connection.setInstanceFollowRedirects(false);connection.setConnectTimeout(15000);connection.setReadTimeout(20000);
      if(agent!=null)connection.setRequestProperty("User-Agent",agent);
      if(connection.getResponseCode()!=200)throw new IOException("Resource unavailable");
      try(InputStream input=connection.getInputStream();ByteArrayOutputStream output=new ByteArrayOutputStream()){
       byte[] buffer=new byte[32768];int count;while((count=input.read(buffer))!=-1){if(cancelled.get())throw new IOException("Cancelled");output.write(buffer,0,count);if(output.size()>32000000)throw new IOException("Resource too large");}
       cache.put(path,output.toByteArray());
      }
      int completed=done.incrementAndGet();if(completed%20==0||completed==paths.size())progress.update(completed,paths.size());
      Thread.sleep(40);
     }catch(Exception error){cancelled.set(true);throw new RuntimeException(error);}finally{if(connection!=null)connection.disconnect();}
    }
   }));
   for(Future<?> task:tasks)task.get();if(cancelled.get())throw new IOException("Cancelled");
   try(FileOutputStream output=new FileOutputStream(marker)){output.write(manifest.getBytes(StandardCharsets.UTF_8));output.getFD().sync();}
  }finally{workers.shutdownNow();}
 }
}
