const assert=require('node:assert/strict');
for(let x=-100;x<=100;x++)for(let y=-100;y<=100;y++)for(const radius of [2,25,50,120]){
 const skip=Math.abs(x)>=radius||Math.abs(y)>=radius;
 if(skip)assert(Math.hypot(x,y)>=radius,'broad phase must never reject a contacting pair');
 const old=Math.hypot(x,y)<radius,newResult=!skip&&Math.hypot(x,y)<radius;assert.equal(old,newResult);
}
console.log('Distant-pair gate: overlap and boundary decisions preserved on 161604 coordinate/radius cases.');
