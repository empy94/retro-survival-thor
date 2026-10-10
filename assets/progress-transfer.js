(function(){'use strict';
 const transfer=window.thorProgressTransfer;
 delete window.thorProgressTransfer;
 if(location.origin!=='https://retrosurvival.online'||!transfer||typeof transfer.id!=='string'||!transfer.id)return;
 const key='retro-survival.progress.v1',applied='thor.progress.transfer-applied';
 if(localStorage.getItem(applied)===transfer.id)return;
 const source=transfer.progress;
 if(!source||typeof source!=='object'||Array.isArray(source)||!source.waveRecords||typeof source.waveRecords!=='object'||Array.isArray(source.waveRecords))throw Error('Invalid progression transfer');
 const progress={waveRecords:{}};
 for(const [name,value] of Object.entries(source.waveRecords)){
  if(!['astrub','wabbit','litneg','gelee'].includes(name)||!Number.isSafeInteger(value)||value<0)throw Error('Invalid wave record');
  progress.waveRecords[name]=value;
 }
 for(const name of ['wabbitUnlocked','litnegUnlocked'])if(name in source){if(typeof source[name]!=='boolean')throw Error('Invalid unlock');progress[name]=source[name];}
 for(const name of ['achievements','collectedDofus','radiantDofus'])if(name in source){if(!Array.isArray(source[name])||!source[name].every(v=>typeof v==='string'))throw Error('Invalid collection');progress[name]=source[name];}
 for(const name of ['cawotteRoll','sufokienRoll','emeraudeRoll'])if(name in source){if(!Number.isFinite(source[name])||source[name]<0)throw Error('Invalid roll');progress[name]=source[name];}
 // Only the permanent progression is copied. No pending scores, tickets or combat checkpoints.
 const previous=localStorage.getItem(key);
 const backupKey='thor.progress.before-transfer:'+transfer.id;
 if(previous&&!localStorage.getItem(backupKey))localStorage.setItem(backupKey,previous);
 localStorage.setItem(key,JSON.stringify(progress));
 localStorage.setItem(applied,transfer.id);
})();
