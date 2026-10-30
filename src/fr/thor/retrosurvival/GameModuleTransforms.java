package fr.thor.retrosurvival;
import java.util.Arrays;

/** Raster and UI work only; caller first verifies the complete official module hash. */
final class GameModuleTransforms {
 static String oct22(String source){String transformed=oct21(source);return transformed==null?null:hud(transformed.replace("m??a.current[e],Et,u))","m??a.current[e],kn,u))"));}
 static String hud(String source){java.util.regex.Matcher match=java.util.regex.Pattern.compile("[A-Za-z_$][A-Za-z0-9_$]*=e=>\\{[A-Za-z_$][A-Za-z0-9_$]*\\(\\{pet:e\\.pet\\?").matcher(source);if(!match.find())return source;String anchor=match.group();if(match.find())return source;return source.replace(anchor,anchor.replace("=e=>{","=e=>{if(window.thorHudDue?.(e)===false)return;"));}
 static String oct21(String source){
  String render="let c=e.localeRef?.current??`fr`,l=Math.min(devicePixelRatio,2);";if(!source.contains(render))render="let c=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,2);";
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);c.width=", render, "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);c.width=", render.replace("devicePixelRatio,2)","devicePixelRatio,window.thorRenderScale??2)"), "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],Et,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String oct20c(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);l.width=", "let c=e.localeRef?.current??`fr`,l=Math.min(devicePixelRatio,2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);l.width=", "let c=e.localeRef?.current??`fr`,l=Math.min(devicePixelRatio,window.thorRenderScale??2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],ro,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String oct20(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);ee.width=", "let l=e.localeRef?.current??`fr`,d=Math.min(devicePixelRatio,2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);ee.width=", "let l=e.localeRef?.current??`fr`,d=Math.min(devicePixelRatio,window.thorRenderScale??2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],mp,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String oct19b(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);ne.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)", "let e=l.x-t.x,n=l.y-t.y,a=Math.hypot(e,n),o=np(l.kind)&&np(t.kind),s=(l.r+t.r)*(o?oe:Nr);if(a>=s)continue;"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);ne.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,window.thorRenderScale??2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],vn,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))", "let e=l.x-t.x,n=l.y-t.y,o=np(l.kind)&&np(t.kind),s=(l.r+t.r)*(o?oe:Nr);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String oct19(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);ne.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)", "let e=m.x-t.x,n=m.y-t.y,a=Math.hypot(e,n),o=Eu(m.kind)&&Eu(t.kind),s=(m.r+t.r)*(o?nm:Pe);if(a>=s)continue;"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);ne.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,window.thorRenderScale??2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],kt,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))", "let e=m.x-t.x,n=m.y-t.y,o=Eu(m.kind)&&Eu(t.kind),s=(m.r+t.r)*(o?nm:Pe);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String oct18(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);I.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)", "let e=h.x-t.x,n=h.y-t.y,a=Math.hypot(e,n),o=zs(h.kind)&&zs(t.kind),s=(h.r+t.r)*(o?tn:op);if(a>=s)continue;"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);I.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,window.thorRenderScale??2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],tt,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))", "let e=h.x-t.x,n=h.y-t.y,o=zs(h.kind)&&zs(t.kind),s=(h.r+t.r)*(o?tn:op);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String docked(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);L.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)", "n.drawImage(r,0,0,t.width,t.height)", "let e=h.x-t.x,n=h.y-t.y,a=Math.hypot(e,n),o=Rs(h.kind)&&Rs(t.kind),s=(h.r+t.r)*(o?$t:op);if(a>=s)continue;"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);L.width=", "let l=e.localeRef?.current??`fr`,u=Math.min(devicePixelRatio,window.thorRenderScale??2);", "(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],W,u))return;let h=m??a.current[e];", "for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))", "(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))", "let e=h.x-t.x,n=h.y-t.y,o=Rs(h.kind)&&Rs(t.kind),s=(h.r+t.r)*(o?$t:op);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String oct17(String source){
  String[] before={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);B.width=","let c=e.localeRef?.current??`fr`,l=Math.min(devicePixelRatio,2);","(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{let h=m??a.current[e];","for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:o.particles)","n.drawImage(r,0,0,t.width,t.height)","f&&a<=0&&(a=.08,se(r),ce(r),fe(r))","fe=e=>{M({statValues:qv(e)","let e=m.x-t.x,n=m.y-t.y,a=Math.hypot(e,n),o=ls(m.kind)&&ls(t.kind),s=(m.r+t.r)*(o?xr:_p);if(a>=s)continue;"};
  String[] after={"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);B.width=","let c=e.localeRef?.current??`fr`,l=Math.min(devicePixelRatio,window.thorRenderScale??2);","(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0,m)=>{if(window.thorRenderSpellMarker?.(n,e,t,r,s,c,d,f,m??a.current[e],Xn,u))return;let h=m??a.current[e];","for(let e of o.wabbitSecret||o.dragoeufSecret?.room?[]:(window.thorVisualParticles?.(o)??o.particles))","(window.thorDrawMap?.(n,r,t.width,t.height)||n.drawImage(r,0,0,t.width,t.height))","f&&(window.thorHudChanged?.(r)||a<=0)&&(a=(window.thorHudInterval?.(r)??.08),se(r),ce(r),fe(r))","fe=e.thorRefreshHud=H.thorRefreshHud=e=>{M({statValues:qv(e)","let e=m.x-t.x,n=m.y-t.y,o=ls(m.kind)&&ls(t.kind),s=(m.r+t.r)*(o?xr:_p);if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;"};
  for(String anchor:before)if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
  for(int i=0;i<before.length;i++)source=source.replace(before[i],after[i]);
  return source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=(window.thorDecorativeBlur?.($1)??$1)");
 }
 static String latest(String source){return transform(source,0);}
 static String newest(String source){return transform(source,1);}
 static String live(String source){return transform(source,2);}
 private static String transform(String source,int family){
      boolean newest=family==1,live=family==2;
      String resize="let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,2);"+(live?"te":"P")+".width=";
      String render="let u=e.localeRef?.current??`fr`,d=Math.min(devicePixelRatio,2);";
      if(source.indexOf(resize)<0||source.indexOf(resize)!=source.lastIndexOf(resize)||source.indexOf(render)<0||source.indexOf(render)!=source.lastIndexOf(render))return null;
      String particles="for(let e of o.particles)",hud=live?"l&&M<=0&&(M=.08,ie(i),E(":"c&&ee<=0&&(ee=.08,ne(r),T(",clip=live?"(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1,p=0)=>{let m=a.current[e];":"(e,t,r,i,o,s,c=1,l=!0,u=0,d=1,f=1)=>{let p=a.current[e];",map="n.drawImage(r,0,0,e.width,e.height)";
      String kind=live?"lf":newest?"cf":"of",near=live?"tO":newest?"eO":"ZD",far=live?"$D":newest?"QD":"YD";
      String pairs="let e=f.x-t.x,n=f.y-t.y,a=Math.hypot(e,n),o="+kind+"(f.kind)&&"+kind+"(t.kind),s=(f.r+t.r)*(o?"+near+":"+far+");if(a>=s)continue;";
      for(String anchor:Arrays.asList(particles,hud,clip,pairs,map))if(source.indexOf(anchor)<0||source.indexOf(anchor)!=source.lastIndexOf(anchor))return null;
      source=source.replace(particles,"for(let e of window.thorVisualParticles(o))")
       .replace(hud,live?"l&&(window.thorHudChanged(i)||M<=0)&&(M=window.thorHudInterval(i),ie(i),E(":"c&&(window.thorHudChanged(r)||ee<=0)&&(ee=window.thorHudInterval(r),ne(r),T(")
       .replace(clip,clip.substring(0,clip.indexOf("{let "))+"{if(window.thorRenderSpellMarker(n,e,t,r,s,c,d,f,a.current[e],"+(live?"qc":newest?"Kc":"Wc")+",u))return;if(window.thorHideCosmeticClip(e,window.thorNativeContext?.gameRef.current))return;let "+(live?"m":"p")+"=a.current[e];")
       .replace(pairs,"let e=f.x-t.x,n=f.y-t.y,o="+kind+"(f.kind)&&"+kind+"(t.kind),s=(f.r+t.r)*(o?"+near+":"+far+");if(Math.abs(e)>=s||Math.abs(n)>=s)continue;let a=Math.hypot(e,n);if(a>=s)continue;");
      source=source.replaceAll("n\\.shadowBlur=([0-9]+(?:\\.[0-9]+)?)","n.shadowBlur=window.thorDecorativeBlur($1)");
      source=source.replace(map,"(window.thorDrawMap(n,r,e.width,e.height)||n.drawImage(r,0,0,e.width,e.height))");
      source=source.replace(resize,"let t=e.getBoundingClientRect(),n=Math.min(devicePixelRatio,window.thorRenderScale??2);"+(live?"te":"P")+".width=").replace(render,"let u=e.localeRef?.current??`fr`,d=Math.min(devicePixelRatio,window.thorRenderScale??2);");

  return source;
 }
}
