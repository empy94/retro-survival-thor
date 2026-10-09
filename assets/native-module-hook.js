/* Verified adapter for the currently deployed official game module. */
;window.thorGameAdapter={cleanProgress:Cv};
;const thorOriginalLoot=rg;
rg=(state,loot)=>{
 if(!window.thorSalePolicy?.enabled||!loot.item)return thorOriginalLoot(state,loot);
 if(window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,x:loot.x,y:loot.y,kind:'kama-purse',kamas:eh(loot.item),life:30}),true;
 return state.loots.push({...loot,id:state.nextLootId++}),true;
};
