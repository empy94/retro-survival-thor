/* Helpers installed only inside an exact-hash audited official module.
 * Mutable rolls and actor state are read on every call; only static lookups
 * and the scaled background image are cached. */
;(function(){
 'use strict';
 window.thorWorkCache={
  install({slots,items,radiant,target,taunts,fixedBonuses={},summonTargetable=summon=>summon.state!=='appear'&&!(summon.invisibleTimer>0)}){
   const indices=new Map();
   const bonus=(item,stat)=>{
    if(!item)return 0;
    const fixed=fixedBonuses[item.id];if(fixed&&Object.prototype.hasOwnProperty.call(fixed,stat))return fixed[stat];
    let byStat=indices.get(item.id);
    if(!byStat){byStat=new Map();indices.set(item.id,byStat);}
    let index=byStat.get(stat);
    if(index===undefined){index=items[item.id].effects.findIndex(effect=>effect.stat===stat);byStat.set(stat,index);}
    return (index<0?0:item.rolls[index])+(item.radiant?radiant[item.id]?.[stat]??0:0);
   };
   const total=(equipment,stat)=>{
    let value=0;
    for(const slot of slots){const item=equipment[slot];
     if(slot==='ring'||slot==='dofus'){
      if(Array.isArray(item)){for(let i=0;i<item.length;i++)if(i in item)value+=bonus(item[i],stat);}
      else value+=bonus(item,stat);
     }else if(item)value+=bonus(item,stat);
    }
    return value;
   };
   const enemyTarget=(state,enemy)=>{
    if(state.levelId!=='dragoeuf')return target(state,enemy);
    const hidden=(state.osamodas.playerHiddenTimer??0)>0;
    if(enemy.kind==='dragoeuf-flying'&&!hidden)return;
    let nearest,limit=hidden?Infinity:Math.min(300,Math.hypot(state.player.x-enemy.x,state.player.y-enemy.y));
    for(const summon of state.osamodas.summons){
     if(!(summon.hp>0)||!summonTargetable(summon))continue;
     const taunt=taunts(state,summon),dx=summon.x-enemy.x,dy=summon.y-enemy.y;
     const radius=taunt?Math.max(260,limit):limit;
     // Strict > keeps native boundary and first-in-array tie behaviour.
     if(Math.abs(dx)>radius||Math.abs(dy)>radius)continue;
     const distance=Math.hypot(dx,dy);
     if(taunt&&distance<=260)return summon;
     if(distance<limit){nearest=summon;limit=distance;}
    }
    return nearest;
   };
   return {bonus,total,enemyTarget};
  },
  mapPainter(){
   let cache=null;
   return (ctx,image,width,height)=>{
    if(!ctx.getTransform||typeof document!=='object'||!image.complete||!image.naturalWidth)return false;
    const transform=ctx.getTransform(),pixelWidth=Math.max(1,Math.round(width*Math.hypot(transform.a,transform.b))),pixelHeight=Math.max(1,Math.round(height*Math.hypot(transform.c,transform.d)));
    if(pixelWidth*pixelHeight>8000000)return false;
    const source=image.currentSrc||image.src;
    if(!cache||cache.image!==image||cache.width!==pixelWidth||cache.height!==pixelHeight||cache.source!==source||cache.sourceWidth!==image.naturalWidth||cache.sourceHeight!==image.naturalHeight){
     const surface=document.createElement('canvas');surface.width=pixelWidth;surface.height=pixelHeight;
     const paint=surface.getContext('2d');if(!paint)return false;
     paint.imageSmoothingEnabled=true;paint.imageSmoothingQuality='high';paint.drawImage(image,0,0,pixelWidth,pixelHeight);
     cache={image,width:pixelWidth,height:pixelHeight,source,sourceWidth:image.naturalWidth,sourceHeight:image.naturalHeight,surface};
    }
    ctx.drawImage(cache.surface,0,0,width,height);return true;
   };
  }
 };
})();
