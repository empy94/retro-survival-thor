package fr.thor.retrosurvival;
public class GameModuleVersionsTest {
 public static void main(String[] args){
  String old="67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2",current="5a385b4cf6390e0b0713dab4effab3c322d177a148776472743fd38546a4d6a6";
  if(!GameModuleVersions.supported("4a9870e8c536ce968ed85b7074d133cd3e3ba40a3b145e86ad5857470cd229ca")||!GameModuleVersions.supported(old)||!GameModuleVersions.supported(current)||GameModuleVersions.supported("unknown"))throw new AssertionError("audited builds");
  if(!GameModuleVersions.companionSupports(old+"\n"+current,current)||!GameModuleVersions.companionSupports(old,old))throw new AssertionError("companion compatibility");
  if(GameModuleVersions.companionSupports(old,current)||GameModuleVersions.companionSupports("prefix"+current,current)||GameModuleVersions.companionSupports("unknown","unknown")||GameModuleVersions.companionSupports(null,current))throw new AssertionError("exact-match guard");
  String latest="45b98330489267a4de67380f852ac518fa847159a50c53876d8438a8f86f424e";if(!GameModuleVersions.current(latest)||!GameModuleVersions.supported(latest)||!GameModuleVersions.companionSupports(old+"\n"+latest,latest)||GameModuleVersions.current(old))throw new AssertionError("current hook selection");
  if(!GameModuleVersions.previous3("fb819a5e5509d0ab0a03f1f250a1794bd054a9fb2864e6bc1bdbf4f7aad158a9")||!GameModuleVersions.supported("fb819a5e5509d0ab0a03f1f250a1794bd054a9fb2864e6bc1bdbf4f7aad158a9"))throw new AssertionError("prior performance fix selection");
  if(!GameModuleVersions.previous4("9b75f2de166e5940fa13c107b46b505f31ac0f1f75174345108b9789a4006106"))throw new AssertionError("prior hook selection");
  System.out.println("Audited game versions and companion compatibility passed");
 }
}
