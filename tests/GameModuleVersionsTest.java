package fr.thor.retrosurvival;
public class GameModuleVersionsTest {
 public static void main(String[] args){
  String old="67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2",current="5a385b4cf6390e0b0713dab4effab3c322d177a148776472743fd38546a4d6a6";
  if(!GameModuleVersions.supported(old)||!GameModuleVersions.supported(current)||GameModuleVersions.supported("unknown"))throw new AssertionError("audited builds");
  if(!GameModuleVersions.companionSupports(old+"\n"+current,current)||!GameModuleVersions.companionSupports(old,old))throw new AssertionError("companion compatibility");
  if(GameModuleVersions.companionSupports(old,current)||GameModuleVersions.companionSupports("prefix"+current,current)||GameModuleVersions.companionSupports("unknown","unknown")||GameModuleVersions.companionSupports(null,current))throw new AssertionError("exact-match guard");
  System.out.println("Audited game versions and companion compatibility passed");
 }
}
