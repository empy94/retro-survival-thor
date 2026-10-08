package fr.thor.retrosurvival;

/** One outstanding WebView request per loop; used only on the UI thread. */
final class EvaluationGate {
 private long sequence=0,pending=0;
 long begin(){if(pending!=0)return 0;pending=++sequence;return pending;}
 boolean complete(long request){if(request==0||pending!=request)return false;pending=0;return true;}
 void invalidate(){pending=0;}
}
