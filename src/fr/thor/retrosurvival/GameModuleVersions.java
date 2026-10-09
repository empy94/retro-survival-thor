package fr.thor.retrosurvival;

/** Only audited game builds may receive native adapters. */
final class GameModuleVersions {
 static boolean supported(String hash){
  return "67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2".equals(hash)
    || "5a385b4cf6390e0b0713dab4effab3c322d177a148776472743fd38546a4d6a6".equals(hash);
 }
 static boolean companionSupports(String declared,String hash){
  if(!supported(hash)||declared==null)return false;
  for(String candidate:declared.trim().split("\\s+"))if(hash.equals(candidate))return true;
  return false;
 }
}
