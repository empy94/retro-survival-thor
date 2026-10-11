/* Verified official game module: 10 October 2026 content update. */
;window.thorGameAdapter={cleanProgress:VD,version:"67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2"};
;const thorOriginalCanvas=iM;iM=context=>{window.thorNativeContext=context;return thorOriginalCanvas(context);};
;const thorOriginalLoot=y_;
y_=(state,loot)=>{
 if(window.thorSalePolicy?.enabled&&loot.item&&window.thorSalePolicy.canSell(state.equipment,loot.item))return state.loots.push({id:state.nextLootId++,...v_(state,loot.x,loot.y),kind:'kama-purse',kamas:Qh(loot.item),life:60}),true;
 return thorOriginalLoot(state,loot);
};
