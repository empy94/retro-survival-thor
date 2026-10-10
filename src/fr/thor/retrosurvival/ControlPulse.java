package fr.thor.retrosurvival;

/** Keep active controls responsive without polling an idle menu every frame. */
final class ControlPulse {
 private long last=-1;
 private boolean wasInput;
 boolean due(long now,boolean input){return input||wasInput||last<0||now-last>=200;}
 void sent(long now,boolean input){last=now;wasInput=input;}
 void reset(){last=-1;wasInput=false;}
}
