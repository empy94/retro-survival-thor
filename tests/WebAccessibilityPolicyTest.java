package fr.thor.retrosurvival;

import java.util.Arrays;
import java.util.Collections;

public final class WebAccessibilityPolicyTest {
 public static void main(String[] args){
  java.util.List<String> tools=Arrays.asList("com.aure.clustertune","com.odin.gameassistant","com.mastercook777.heimdall","com.moonbench.bifrost","com.example.ayn_thor_bottom_screen_power_tool");
  if(WebAccessibilityPolicy.expose(false,tools))throw new AssertionError("Pointer and console monitors need no game DOM");
  if(!WebAccessibilityPolicy.expose(true,tools))throw new AssertionError("Touch exploration must remain available");
  if(!WebAccessibilityPolicy.expose(false,Arrays.asList("com.example.ayn_thor_bottom_screen_power_tool","com.google.android.marvin.talkback")))throw new AssertionError("Screen reader must remain available alongside pointer");
  if(!WebAccessibilityPolicy.expose(false,Collections.singletonList("unknown.reader")))throw new AssertionError("Unknown services remain accessible");
  if(!WebAccessibilityPolicy.expose(false,null))throw new AssertionError("Unknown service list fails open");
  System.out.println("Accessibility: console pointer excluded, screen readers and unknown services preserved");
 }
}
