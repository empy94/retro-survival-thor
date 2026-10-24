(function(){'use strict';
 const transfer=window.thorProgressTransfer;delete window.thorProgressTransfer;
 if(location.origin!=='https://retrosurvival.online'||!transfer||typeof transfer.id!=='string'||!transfer.id)return;
 const key='retro-survival.progress.v1',applied='thor.progress.transfer-applied',progress=transfer.progress;
 if(localStorage.getItem(applied)===transfer.id)return;
 if(!progress||typeof progress!=='object'||Array.isArray(progress)||!progress.waveRecords||typeof progress.waveRecords!=='object'||Array.isArray(progress.waveRecords))return;
 const allowed=new Set(['waveRecords','achievements','collectedDofus','radiantDofus','cawotteRoll','emeraudeRoll','sufokienRoll','vulbisRoll','guardianRoll','petExperience','otoMustamLevels','arakneSpell','chaferfuSpell','cawotteSpell','wabbitUnlocked','litnegUnlocked','cawottes']);
 if(Object.keys(progress).some(key=>!allowed.has(key)))return;
 const serialized=JSON.stringify(progress);if(serialized.length>100000)return;
 try{
  const previous=localStorage.getItem(key);
  if(previous)localStorage.setItem('thor.progress.before-transfer:'+transfer.id,previous);
  localStorage.setItem(key,serialized);localStorage.setItem(applied,transfer.id);
  // A local copy is not a server acknowledgement. Native server validation remains authoritative.
  window.thorProgressTransferStatus={state:'copied-locally',serverAccepted:false};
 }catch(error){window.thorProgressTransferStatus={state:'failed',serverAccepted:false};}
})();
