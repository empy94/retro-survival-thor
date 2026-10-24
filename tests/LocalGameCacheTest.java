package fr.thor.retrosurvival;

import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.Arrays;

public final class LocalGameCacheTest {
 public static void main(String[] args)throws Exception{
  Path directory=Files.createTempDirectory("local-map-cache-");
  LocalGameCache cache=new LocalGameCache(directory.toFile());
  byte[] original="original map".getBytes(StandardCharsets.UTF_8),sd="SD map".getBytes(StandardCharsets.UTF_8);
  cache.put("/assets/gelee/map-1906.webp",original);
  cache.put("/assets/dragoeuf/map-8254-mirror.webp",original);
  cache.put("/assets/map-7411.webp",original);
  cache.put("/assets/item-sd.webp",original);
  Path frozen=Files.createDirectories(directory.resolve("local-game-isolated-v1"));
  Files.writeString(frozen.resolve("complete"),"unit test of an already prepared cache");
  for(String path:new String[]{"/assets/gelee/map-1906-sd.webp","/assets/dragoeuf/map-8254-mirror-sd.webp","/assets/map-7411-sd.webp"})
   if(!Arrays.equals(cache.getFrozen(path),original))throw new AssertionError("Original map fallback missing: "+path);
  if(cache.getFrozen("/assets/wabbit/map-813-sd.webp")!=null)throw new AssertionError("Absent map was fabricated");
  if(cache.getFrozen("/assets/item-sd-sd.webp")!=null)throw new AssertionError("Non-map resource used fallback");
  cache.put("/assets/gelee/map-1906-sd.webp",sd);
  if(!Arrays.equals(cache.getFrozen("/assets/gelee/map-1906-sd.webp"),sd))throw new AssertionError("Prepared SD map must take priority");
  System.out.println("Local maps: original fallback, mirrored/root maps, missing-map rejection and SD priority passed");
 }
}
