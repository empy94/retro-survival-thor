package fr.thor.retrosurvival;

import java.util.List;

/** Console app monitors do not need the thousands of nodes of a game WebView. */
final class WebAccessibilityPolicy {
 static boolean expose(boolean touchExploration,List<String> packages){
  if(touchExploration||packages==null)return true;
  for(String name:packages)if(!"com.aure.clustertune".equals(name)&&!"com.odin.gameassistant".equals(name)&&!"com.mastercook777.heimdall".equals(name)&&!"com.moonbench.bifrost".equals(name))return true;
  return false;
 }
}
