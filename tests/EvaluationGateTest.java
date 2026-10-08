package fr.thor.retrosurvival;

public final class EvaluationGateTest {
 private static void check(boolean value,String message){if(!value)throw new AssertionError(message);}
 public static void main(String[] args){
   EvaluationGate gate=new EvaluationGate();long first=gate.begin();check(first!=0,"first request admitted");
   for(int i=0;i<10000;i++)check(gate.begin()==0,"slow renderer must not accumulate work");
   check(!gate.complete(first+1),"foreign callback ignored");check(gate.begin()==0,"foreign callback cannot unlock");
   check(gate.complete(first),"matching result unlocks");check(!gate.complete(first),"duplicate result ignored");
   long old=gate.begin();gate.invalidate();long current=gate.begin();check(current!=old,"navigation creates a fresh identity");
   check(!gate.complete(old),"stale page callback ignored");check(gate.begin()==0,"stale callback cannot unlock new page");
   check(gate.complete(current),"new page callback accepted");check(gate.begin()!=0,"loop resumes after renderer answers");
   System.out.println("Evaluation gate: delayed renderer, bounded queue, duplicate and stale callbacks passed");
 }
}
