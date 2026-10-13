package fr.thor.retrosurvival;
import java.util.Arrays;

/** Raster and UI work only; caller first verifies the complete official module hash. */
final class GameModuleTransforms {
 static String latest(String source){return transform(source,false);}
 static String newest(String source){return transform(source,true);}
 private static String transform(String source,boolean newest){
      String resize="let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);P.width=";
      String render="let u=e.localeRef?.current??`fr`,d=Math.min(devicePixelRatio,2);";
      if(source.indexOf(resize)<0||source.indexOf(resize)!=source.lastIndexOf(resize)||source.indexOf(render)<0||source.indexOf(render)!=source.lastIndexOf(render))return null;
      String particles="for(let e of o.particles)",hud="c&&ee<=0&&(ee=.08,ne(r),T(",clip="(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1)=>{let p=a.current[e];";
      String pairs=newest?"let e=f.x-t.x,n=f.y-t.y,a=Math.hypot(e,n),o=cf(f.kind)&&cf(t.kind),s=(f.r+t.r)*(o?eO:QD);if(a>=s)continue;":"let e=f.x-t.x,n=f.y-t.y,a=Math.hypot(e,n),o=of(f.kind)&&of(t.kind),s=(f.r+t.r)*(o?ZD:YD);if(a>=s)continue;";
      for(String anchor:Arrays.asList(particles,hud,clip,pairs))if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
      source=source.replace(particles,"for(let e of window.thorVisualParticles(o))")
       .replace(hud,"c&&(window.thorHudChanged(r)||ee<=0)&&(ee=window.thorHudInterval(r),ne(r),T(")
       .replace(clip,"(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1)=>{if(window.thorHideCosmeticClip(e,window.thorNativeContext?.gameRef.current))return;let p=a.current[e];")
       .replace(pairs,newest?"let e=f.x-t.x,n=f.y-t.y,o=cf(f.kind)&&cf(t.kind),s=(f.r+t.r)*(o?eO:QD);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;":"let e=f.x-t.x,n=f.y-t.y,o=of(f.kind)&&of(t.kind),s=(f.r+t.r)*(o?ZD:YD);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;");
      source=source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=window.thorDecorativeBlur($1)");
      source=source.replace(resize,"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);P.width=").replace(render,"let u=e.localeRef?.current??`fr`,d=Math.min(devicePixelRatio,window.thorRenderScale??2);");

  return source;
 }
}
