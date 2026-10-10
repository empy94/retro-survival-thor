package fr.thor.retrosurvival;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

/** Stores only public resources, never cookies, API responses or adapted scripts. */
final class LocalGameCache {
 private final File root,frozen;
 LocalGameCache(File directory){root=new File(directory,"local-game-public-v1");frozen=new File(directory,"local-game-isolated-v1");root.mkdirs();}
 private File file(String path)throws Exception{
  if(SessionNetworkPolicy.staticPath(SessionNetworkPolicy.LOCAL_URL.substring(0,SessionNetworkPolicy.LOCAL_URL.length()-1)+path)==null)throw new IOException("Not a public resource");
  StringBuilder key=new StringBuilder();for(byte b:MessageDigest.getInstance("SHA-256").digest(path.getBytes(StandardCharsets.UTF_8)))key.append(String.format(java.util.Locale.ROOT,"%02x",b&255));
  return new File(root,key.toString());
 }
 synchronized void put(String path,byte[] bytes)throws Exception{
  if(bytes.length>64000000)throw new IOException("Resource too large");
  File target=file(path),temporary=new File(target.getPath()+".tmp");
  try(FileOutputStream out=new FileOutputStream(temporary)){out.write(bytes);out.getFD().sync();}
  try{java.nio.file.Files.move(temporary.toPath(),target.toPath(),java.nio.file.StandardCopyOption.REPLACE_EXISTING,java.nio.file.StandardCopyOption.ATOMIC_MOVE);}
  catch(java.nio.file.AtomicMoveNotSupportedException unsupported){java.nio.file.Files.move(temporary.toPath(),target.toPath(),java.nio.file.StandardCopyOption.REPLACE_EXISTING);}
 }
 synchronized byte[] get(String path)throws Exception{
  File source=file(path);if(!source.isFile()||source.length()>64000000)return null;
  try(InputStream in=new FileInputStream(source);ByteArrayOutputStream out=new ByteArrayOutputStream()){byte[] buffer=new byte[16384];int n;while((n=in.read(buffer))!=-1)out.write(buffer,0,n);return out.toByteArray();}
 }
 synchronized byte[] getFrozen(String path)throws Exception{
  if(!new File(frozen,"complete").isFile())return null;
  File source=new File(frozen,file(path).getName());
  // Missing public assets may have been visited later in a normal session.
  // Reuse bytes already on disk, never fetch them from this local session.
  if(!source.isFile()&&!"/".equals(path)){
   byte[] cached=get(path);if(cached!=null)try(FileOutputStream out=new FileOutputStream(source)){out.write(cached);}
  }
  if(!source.isFile()||source.length()>64000000)return null;
  return java.nio.file.Files.readAllBytes(source.toPath());
 }
 synchronized void freeze()throws Exception{
  if(new File(frozen,"complete").isFile())return;
  byte[] html=get("/");if(html==null)throw new IOException("No root");
  java.util.regex.Matcher module=java.util.regex.Pattern.compile("/_next/static/chunks/page-[A-Za-z0-9_-]+\\.js").matcher(new String(html,StandardCharsets.UTF_8));
  if(!module.find())throw new IOException("No module");byte[] bytes=get(module.group());if(bytes==null)throw new IOException("No module data");
  StringBuilder hash=new StringBuilder();for(byte b:MessageDigest.getInstance("SHA-256").digest(bytes))hash.append(String.format(java.util.Locale.ROOT,"%02x",b&255));
  if(!GameModuleVersions.supported(hash.toString()))throw new IOException("Unknown game module");
  frozen.mkdirs();File[] entries=root.listFiles();if(entries==null)throw new IOException("Empty cache");
  for(File source:entries)if(source.isFile()&&source.getName().matches("[a-f0-9]{64}"))java.nio.file.Files.copy(source.toPath(),new File(frozen,source.getName()).toPath(),java.nio.file.StandardCopyOption.REPLACE_EXISTING);
  try(FileOutputStream out=new FileOutputStream(new File(frozen,"complete"))){out.write(hash.toString().getBytes(StandardCharsets.UTF_8));out.getFD().sync();}
 }
 boolean ready(){try{byte[] html=new File(frozen,"complete").isFile()?getFrozen("/"):get("/");return html!=null&&new String(html,StandardCharsets.UTF_8).contains("<head>");}catch(Exception ignored){return false;}}
}
