package fr.thor.retrosurvival;

import java.util.HashSet;
import java.util.Set;

/** Android controllers may report a trigger as a key, an axis, or both. */
final class TriggerHold {
 private final Set<Integer> keys=new HashSet<>(),axes=new HashSet<>();
 int update(int code,boolean down,boolean axis){
   boolean before=keys.contains(code)||axes.contains(code);
   Set<Integer> source=axis?axes:keys;
   if(down)source.add(code);else source.remove(code);
   boolean after=keys.contains(code)||axes.contains(code);
   return before==after?0:after?1:-1;
 }
 void clear(){keys.clear();axes.clear();}
}
