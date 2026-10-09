package fr.thor.retrosurvival;

/** Only audited game builds may receive native adapters. */
final class GameModuleVersions {
 static boolean current(String hash){return "9b75f2de166e5940fa13c107b46b505f31ac0f1f75174345108b9789a4006106".equals(hash);}
 static boolean previous3(String hash){return "fb819a5e5509d0ab0a03f1f250a1794bd054a9fb2864e6bc1bdbf4f7aad158a9".equals(hash);}
 static boolean previous2(String hash){return "a14150ba87429dbc69ff354a7de00274f356148304deb74d54d6760e780a63e7".equals(hash);}
 static boolean previous(String hash){return "fbe576762c5685fcd399a879391b29a8b5b62106fac1664ab16bacc2246fe677".equals(hash);}
 static boolean supported(String hash){
  return current(hash)||previous3(hash)||previous2(hash)||previous(hash)||"67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2".equals(hash)
    || "5a385b4cf6390e0b0713dab4effab3c322d177a148776472743fd38546a4d6a6".equals(hash)
    || "4a9870e8c536ce968ed85b7074d133cd3e3ba40a3b145e86ad5857470cd229ca".equals(hash);
 }
 static boolean companionSupports(String declared,String hash){
  if(!supported(hash)||declared==null)return false;
  for(String candidate:declared.trim().split("\\s+"))if(hash.equals(candidate))return true;
  return false;
 }
}
