package fr.thor.retrosurvival;
import android.app.Activity;import android.os.*;import android.webkit.*;import android.widget.TextView;import java.io.*;import java.util.*;import java.nio.charset.StandardCharsets;
/** Isolated WebView fixture: never loads or changes the user's game/save. */
public final class LocalSessionDeviceTest extends Activity {
 private int resources;private TextView status;
 public void onCreate(Bundle state){super.onCreate(state);status=new TextView(this);status.setText("Test d’isolation…");setContentView(status);
  try{
   WebView view=new WebView(this);view.getSettings().setJavaScriptEnabled(true);view.getSettings().setDomStorageEnabled(true);view.getSettings().setBlockNetworkLoads(true);
   String guard;try(InputStream in=getAssets().open("local-session.js");ByteArrayOutputStream out=new ByteArrayOutputStream()){byte[] buf=new byte[8192];int n;while((n=in.read(buf))!=-1)out.write(buf,0,n);guard=out.toString("UTF-8");}
   final String html="<html><head><script>"+guard+"</script></head><body>Local fixture</body></html>";
   view.setWebViewClient(new WebViewClient(){public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){
    if(SessionNetworkPolicy.LOCAL_HOST.equals(r.getUrl().getHost())&&"/".equals(r.getUrl().getPath()))return new WebResourceResponse("text/html","UTF-8",new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8)));
    if(SessionNetworkPolicy.LOCAL_HOST.equals(r.getUrl().getHost())&&"/assets/test.txt".equals(r.getUrl().getPath())){resources++;return new WebResourceResponse("text/plain","UTF-8",new ByteArrayInputStream("CACHED".getBytes(StandardCharsets.UTF_8)));}
    return new WebResourceResponse("application/json","UTF-8",403,"Blocked",Collections.emptyMap(),new ByteArrayInputStream(new byte[0]));
   }
   public void onPageFinished(WebView v,String url){v.evaluateJavascript("(async()=>{const cached=await fetch('/assets/test.txt').then(r=>r.text());let blocked=0;for(const url of ['/api/progress','https://retrosurvival.online/api/leaderboard','https://example.invalid/'])try{await fetch(url,{method:'PATCH'})}catch{blocked++}return window.thorSession.local&&cached==='CACHED'&&blocked===3&&navigator.sendBeacon('/api/progress','x')===false;})().then(ok=>window.TestResult.finish(ok))",null);}});
   view.addJavascriptInterface(new Object(){@JavascriptInterface public void finish(boolean ok){runOnUiThread(()->status.setText(ok&&resources==1?"PASS : ressources du cache accessibles, réseau et API bloqués, origine locale distincte.":"FAIL : isolation locale"));}},"TestResult");
   view.loadUrl(SessionNetworkPolicy.LOCAL_URL);
  }catch(Exception error){status.setText("FAIL : "+error);}
 }
}
