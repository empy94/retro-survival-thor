package fr.thor.retrosurvival;

/** Only stable, three-part public release tags are accepted. */
final class ReleaseVersion {
 static boolean valid(String value){return value!=null&&value.matches("v?[0-9]{1,5}\\.[0-9]{1,5}\\.[0-9]{1,5}");}
 static boolean newer(String candidate,String installed){
  if(!valid(candidate)||!valid(installed))return false;
  String[] a=candidate.replaceFirst("^v","").split("\\."),b=installed.replaceFirst("^v","").split("\\.");
  for(int i=0;i<3;i++){int diff=Integer.parseInt(a[i])-Integer.parseInt(b[i]);if(diff!=0)return diff>0;}return false;
 }
 static String download(String tag){return valid(tag)?"https://github.com/empy94/retro-survival-thor/releases/download/"+tag+"/Retro-Survival-Android.apk":null;}
}
