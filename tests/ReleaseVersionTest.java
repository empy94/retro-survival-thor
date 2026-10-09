package fr.thor.retrosurvival;
public class ReleaseVersionTest {
 public static void main(String[] args){
  if(!ReleaseVersion.newer("v1.16.0","1.15.2")||!ReleaseVersion.newer("v1.15.10","1.15.2")||ReleaseVersion.newer("v1.15.2","1.15.2")||ReleaseVersion.newer("v1.9.0","1.15.2")||ReleaseVersion.newer("v1.17.0-beta","1.15.2")||ReleaseVersion.newer("999999999.0.0","1.15.2")||ReleaseVersion.download("../../bad")!=null)throw new AssertionError("release guard");
  System.out.println("Release version ordering and URL guards passed");
 }
}
