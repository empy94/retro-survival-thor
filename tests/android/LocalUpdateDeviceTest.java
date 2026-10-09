package fr.thor.retrosurvival;
import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

/** Opt-in debug build only. Uses the real package identity and installed provider. */
public final class LocalUpdateDeviceTest extends Activity {
 public void onCreate(Bundle state){super.onCreate(state);TextView status=new TextView(this);status.setTextSize(20);setContentView(status);
  try{
   boolean expected=getIntent().getBooleanExtra("imported",true);CompanionModule module=new CompanionModule(this);
   String hash="a14150ba87429dbc69ff354a7de00274f356148304deb74d54d6760e780a63e7";
   if(!module.enabled()||module.supportsLocalGame(hash)!=expected||module.supportsLocalGame("unknown")||module.supportsLocalGame("prefix"+hash))throw new AssertionError("Host identity or exact digest guard failed");
   if(expected&&(!module.localMainHook().contains("thorLocalUpdateVersion")||!module.localRulesHook().contains("statUpgrade")||!module.get("bootstrap").contains("thorTraining")))throw new AssertionError("Imported scripts missing");
   status.setText("PASS : fournisseur réel reconnu ; import local="+expected+" ; scripts vérifiés ; version différente refusée.");
  }catch(Throwable error){status.setText("FAIL : "+error.toString());}
 }
}
