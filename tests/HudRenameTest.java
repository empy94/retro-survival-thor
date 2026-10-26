package fr.thor.retrosurvival;
public final class HudRenameTest {
 public static void main(String[] args){
  for(String name:new String[]{"de","ue","$callback"}){String source=name+"=e=>{M({pet:e.pet?e.pet:null})}";String adapted=GameModuleTransforms.hud(source);if(!adapted.contains("window.thorHudDue?.(e)===false"))throw new AssertionError("Renamed callback not throttled");if(!GameModuleTransforms.hud(source+source).equals(source+source))throw new AssertionError("Ambiguous callback changed");}
  String other="ue=e=>{M({something:e.pet})}";if(!GameModuleTransforms.hud(other).equals(other))throw new AssertionError("Unrelated callback changed");
  System.out.println("HUD callback rename, duplicate and unrelated callback guards passed");
 }
}
