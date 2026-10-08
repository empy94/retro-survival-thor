package fr.thor.retrosurvival;

public final class TriggerHoldTest {
 private static void check(int expected,int actual,String message){if(expected!=actual)throw new AssertionError(message+": "+actual);}
 public static void main(String[] args){
   TriggerHold hold=new TriggerHold();
   for(int code:new int[]{104,105}){
     check(1,hold.update(code,true,false),"key starts aiming");
     for(int i=0;i<10000;i++)check(0,hold.update(code,false,true),"stick movement with zero trigger axis must not cast");
     check(0,hold.update(code,true,false),"duplicate key press ignored");
     check(-1,hold.update(code,false,false),"actual key release casts once");
     check(0,hold.update(code,false,false),"duplicate release ignored");
     check(1,hold.update(code,true,true),"axis-only controller starts aiming");
     check(0,hold.update(code,true,true),"axis repeat ignored");
     check(-1,hold.update(code,false,true),"axis-only release casts");
     for(boolean keyFirst:new boolean[]{true,false}){
       check(1,hold.update(code,true,!keyFirst),"dual report starts once");
       check(0,hold.update(code,true,keyFirst),"second source does not start twice");
       check(0,hold.update(code,false,!keyFirst),"first released source cannot interrupt remaining hold");
       check(-1,hold.update(code,false,keyFirst),"both released ends once");
     }
   }
   check(1,hold.update(104,true,false),"L2 held");
   check(1,hold.update(105,true,true),"R2 held independently");
   check(-1,hold.update(104,false,false),"L2 release independent");
   check(0,hold.update(105,true,true),"R2 still held");
   hold.clear();
   check(0,hold.update(105,false,true),"reset forgets old inputs");
   check(1,hold.update(104,true,false),"aiming restarts after reset");
   System.out.println("Trigger holds: stick movement, key/axis/dual controllers, duplicate events, independence and reset passed");
 }
}
