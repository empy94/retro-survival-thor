package fr.thor.retrosurvival;

/** Only audited game builds may receive native adapters. */
final class GameModuleVersions {
 static boolean oct24(String hash){return "05a3de5ec6d741ca5ba39c034cde29876c10f83cf817ef01136309cf4c27ac46".equals(hash);}
 static boolean sharedPath(String path){return path!=null&&path.matches("/_next/static/chunks/discord-identity-[A-Za-z0-9_-]+\\.js");}
 static boolean oct22(String hash){return "fc2c0e3e3bc60df5ae464ce53a88d798f4da8fb5975d56df9c97f4ec934671f0".equals(hash);}
 static boolean oct22Shared(String hash){return "1dd7f9facf3a3a87da6c1b3e71c5d20e5d0b9095bfecc321144b2db154a72f98".equals(hash);}
 static boolean oct21c(String hash){return "3fa14e69936de4f7d17314731b869240a406688f8ba5be7c61ea2fb98c4b23da".equals(hash);}
 static boolean oct21cShared(String hash){return "8b4385222d15257b1ac6256ee5c03cf1780d0f58d1c964aa0b95cab2006e48a5".equals(hash);}
 static boolean oct21b(String hash){return "0332b462a33fc0cb692b532e209b269826d5294bfd30a0d6a63fff45edd296d3".equals(hash);}
 static boolean oct21bShared(String hash){return "d8d1203c56505d5e535831a6fcea928046f4f59e08dc305c5de00b06d949623b".equals(hash);}
 static boolean oct21(String hash){return "257fef2cedf1d5f0f065a026da1dad8a729fe38b9fe7965a80bda2ffed85c66b".equals(hash);}
 static boolean oct21Shared(String hash){return "5bcd46ed7a03fa4e2252ded4083159b10306c4c75de6d77990c47252d720ac8d".equals(hash);}
 static boolean oct20c(String hash){return "03e4768020c7b58114b82b628526f4313739e3eb3f29219748de338ad203ae4c".equals(hash);}
 static boolean oct20cShared(String hash){return "cd3ea78d85b12946c572a5098d452ae134d876cd326d48ce8d42c969748b2ed2".equals(hash);}
 static boolean oct20(String hash){return "511ac6afd270438a8011f12e228269868dbb8ae176a8ae9c1a9a7032a94f27c1".equals(hash);}
 static boolean oct20Shared(String hash){return "b6c21e218ffeb9e2eb14bbfc4ef25ba1237b1b8fee970709b69043f1134e4826".equals(hash);}
 static boolean oct19b(String hash){return "843e12753edb91179a804da52a4bd65af6be7edce58b6e4e34ce5b785fcfd269".equals(hash);}
 static boolean oct19bShared(String hash){return "7a9a8a55f0e9f828f2ccb6a016e6c3d026ba5d0cd3a3fb17bb3157fd46d0b3e7".equals(hash);}
 static boolean oct19(String hash){return "ea54faf3fbdab1d304764b85cf1a1087b2a23d4172589c3f3d83a5e863ce12f6".equals(hash);}
 static boolean oct19Shared(String hash){return "dd11a2dafbfe3568aeda998b50431276424dc77b9a0c286e0aab35476739c6b6".equals(hash);}
 static boolean oct18(String hash){return "0ece8d95aeb0e97879c45350227ceb83ff10b7788a9802de4a6b208c5c64bcf5".equals(hash);}
 static boolean oct18Shared(String hash){return "a161ca10ffe43612c1b8015e4b03fca63d6c5425430793b7388a4de3206d1eb4".equals(hash);}
 static boolean docked(String hash){return "707fcdf646b13f086b261af84039a2bf517a1f656352b8a18e13ef19b2b7518b".equals(hash);}
 static boolean dockedShared(String hash){return "147bdcf4f603c279dbd38995aa3a4b137e592d3f2f6cd6d49c82d57db6156f6c".equals(hash);}
 static boolean oct17(String hash){return "1b97b721d070bcbe2f280813318d5b59605a4a0863d13a73db302e49f348c9a3".equals(hash);}
 static boolean oct17Shared(String hash){return "5487ff3251ae4881d60089eb496f10616af9679522c83c21402bf07d979b1202".equals(hash);}
 static boolean live(String hash){return "c3f2557230b1ea96cf1e33d0730864d48a31efa1367bc135e95b605724ec3149".equals(hash);}
 static boolean newest(String hash){return "53641e4311a21c12e3e176a4d32f0d12b79d870db7ea37addd9de121e0cf47b4".equals(hash);}
 static boolean latest(String hash){return "1d0ca84d7f804519dbeeb7a1eb9233292d6e3a770ffbe04511dcc16dff3491b4".equals(hash)||"ff04eaec039abe829416ee8fb2a48b4edf81b85acae21b26be6cf9b14a92159e".equals(hash);}
 static boolean current(String hash){return "200389afa2729d9ad2204b18d3605c3a8c3df59afae449cbb7da9587db616ca3".equals(hash);}
 static boolean previous9(String hash){return "c2af351bcb11f37c5a5e0545295186420b7581fef3eb52c929fba7986194c35f".equals(hash);}
 static boolean previous8(String hash){return "767dba829cdc81e035c43934762c427be444499a96aa84357f7311178db9d0eb".equals(hash);}
 static boolean previous7(String hash){return "31348dc9ef6c2cff13d23f0f37d708f0a79c02d6414f2259c880fa48c34119cd".equals(hash)||"04dd91fe93a041fa743ba9e2926a61d3177dce9f5f4c9f5607e46acfb2e28dd0".equals(hash);}
 static boolean previous6(String hash){return "45b98330489267a4de67380f852ac518fa847159a50c53876d8438a8f86f424e".equals(hash);}
 static boolean previous5(String hash){return "1a6a5c9f90637b122e8df3cd395466518727f4b8d9557a16fbb9d8d3193824be".equals(hash);}
 static boolean previous4(String hash){return "9b75f2de166e5940fa13c107b46b505f31ac0f1f75174345108b9789a4006106".equals(hash);}
 static boolean previous3(String hash){return "fb819a5e5509d0ab0a03f1f250a1794bd054a9fb2864e6bc1bdbf4f7aad158a9".equals(hash);}
 static boolean previous2(String hash){return "a14150ba87429dbc69ff354a7de00274f356148304deb74d54d6760e780a63e7".equals(hash);}
 static boolean previous(String hash){return "fbe576762c5685fcd399a879391b29a8b5b62106fac1664ab16bacc2246fe677".equals(hash);}
 static boolean supported(String hash){
  return oct24(hash)||oct22(hash)||oct21c(hash)||oct21b(hash)||oct21(hash)||oct20c(hash)||oct20(hash)||oct19b(hash)||oct19(hash)||oct17(hash)||live(hash)||newest(hash)||latest(hash)||current(hash)||previous9(hash)||previous8(hash)||previous7(hash)||previous6(hash)||previous5(hash)||previous4(hash)||previous3(hash)||previous2(hash)||previous(hash)||"67677958563db3126df72cb8c8dda684d3bff8256de0e4e15ca7adede66870e2".equals(hash)
    || "5a385b4cf6390e0b0713dab4effab3c322d177a148776472743fd38546a4d6a6".equals(hash)
    || "4a9870e8c536ce968ed85b7074d133cd3e3ba40a3b145e86ad5857470cd229ca".equals(hash);
 }
 static boolean companionSupports(String declared,String hash){
  if(!supported(hash)||declared==null)return false;
  for(String candidate:declared.trim().split("\\s+"))if(hash.equals(candidate))return true;
  return false;
 }
}
