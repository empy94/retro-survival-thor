/* This WebView receives controller input from Android through thorControls. */
;(function(){
 'use strict';
 if(window.thorControllerOwnership)return;
 let blocked=typeof navigator.getGamepads!=='function'||navigator.getGamepads.thorAndroidInputOwner===true;
 if(!blocked){
  const empty=()=>[];
  Object.defineProperty(empty,'thorAndroidInputOwner',{value:true});
  try{Object.defineProperty(navigator,'getGamepads',{value:empty,configurable:false,writable:false});blocked=navigator.getGamepads===empty;}catch{}
 }
 window.thorControllerOwnership=Object.freeze({owner:'android',nativePollingBlocked:blocked});
})();
