package fr.thor.retrosurvival;
public final class ControlPulseTest {
 public static void main(String[] args){
  ControlPulse pulse=new ControlPulse();int count=0;for(int n=0;n<1000;n+=16)if(pulse.due(n,false)){pulse.sent(n,false);count++;}if(count>5)throw new AssertionError("idle traffic bounded");
  if(!pulse.due(1000,true))throw new AssertionError("press immediate");pulse.sent(1000,true);
  if(!pulse.due(1016,false)||!pulse.due(1032,false))throw new AssertionError("unsent release stays due");pulse.sent(1032,false);
  if(pulse.due(1048,false)||!pulse.due(1232,false))throw new AssertionError("idle interval after release");
  pulse.reset();if(!pulse.due(0,false))throw new AssertionError("new session");
  java.util.List<String> monitors=java.util.Arrays.asList("com.mastercook777.heimdall","com.odin.gameassistant","com.moonbench.bifrost","com.aure.clustertune");
  if(WebAccessibilityPolicy.expose(false,monitors)||!WebAccessibilityPolicy.expose(true,monitors)||!WebAccessibilityPolicy.expose(false,java.util.Arrays.asList("com.google.android.marvin.talkback"))||!WebAccessibilityPolicy.expose(false,null))throw new AssertionError("readers preserved, monitors bounded");
  System.out.println("Idle polling bounded, active input immediate, reader and unknown service access preserved passed");
 }
}
