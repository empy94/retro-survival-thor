package fr.thor.retrosurvival;

import android.app.*;
import android.os.*;
import android.content.*;
import android.content.pm.*;
import android.graphics.drawable.Icon;
import android.view.*;
import android.webkit.*;
import android.widget.*;
import android.hardware.display.DisplayManager;
import android.hardware.input.InputManager;
import org.json.JSONObject;
import java.io.*;
import java.net.*;
import android.webkit.CookieManager;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class MainActivity extends Activity {
 private WebView web;
 private String gameLanguage="fr";
 private JSONObject languageTable=new JSONObject(),spellCatalog=new JSONObject();
 private String ui(String value){return languageTable.optJSONObject(gameLanguage)==null?value:languageTable.optJSONObject(gameLanguage).optString(value,value);}

 private InputManager inputs;
 private int lastInputDevice=-1,nativeClickKey=-1;
 private TextView controllerStatus,displayStatus;
 private final InputManager.InputDeviceListener inputListener=new InputManager.InputDeviceListener(){
   public void onInputDeviceAdded(int id){refreshControllerStatus();}
   public void onInputDeviceChanged(int id){if(id==lastInputDevice)reset();refreshControllerStatus();}
   public void onInputDeviceRemoved(int id){if(id==lastInputDevice){reset();lastInputDevice=-1;}refreshControllerStatus();}
 };
 private boolean isController(InputDevice d){return d!=null&&(d.supportsSource(InputDevice.SOURCE_GAMEPAD)||d.supportsSource(InputDevice.SOURCE_JOYSTICK));}
 private String controllerNames(){List<String> names=new ArrayList<>();for(int id:InputDevice.getDeviceIds()){InputDevice d=InputDevice.getDevice(id);if(isController(d)&&!names.contains(d.getName()))names.add(d.getName());}return names.isEmpty()?ui("Aucune manette détectée — le tactile reste disponible."):ui("Manette détectée : ")+android.text.TextUtils.join(", ",names);}
 private void refreshControllerStatus(){if(controllerStatus!=null)controllerStatus.setText(controllerNames());}
 private float axis(MotionEvent e,int axis){InputDevice d=e.getDevice();InputDevice.MotionRange r=d==null?null:d.getMotionRange(axis,e.getSource());float v=e.getAxisValue(axis);return Math.abs(v)<=Math.max(.16f,r==null?0:r.getFlat())?0:v;}
 private boolean centeredAxis(MotionEvent e,int axis){InputDevice.MotionRange r=e.getDevice()==null?null:e.getDevice().getMotionRange(axis,e.getSource());return r!=null&&r.getMin()<0;}
 private void refreshDisplayStatus(){if(displayStatus!=null){boolean found=false;if(displays!=null)for(Display d:displays.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION))if(d.getDisplayId()!=getWindowManager().getDefaultDisplay().getDisplayId())found=true;displayStatus.setText(found?ui("Second écran compatible détecté."):ui("Un seul écran : toutes les commandes restent sur le jeu."));}}

 private DisplayManager displays;
 private CharacterPresentation characterScreen;
 private String characterData="{\"status\":\"title\"}";
 private final EvaluationGate controlGate=new EvaluationGate(),dashboardGate=new EvaluationGate();
 private final Runnable characterTick=new Runnable(){public void run(){
   if(!active)return;
   if(ready&&characterScreen!=null){final long request=dashboardGate.begin();if(request!=0)web.evaluateJavascript("window.thorDashboard ? window.thorDashboard.snapshot() : {status:'unavailable'}",result->{
     if(!dashboardGate.complete(request)||!active||!ready)return;
     try{if(result.length()>65536)return;String next=new JSONObject(result).toString();if(!next.equals(characterData)){characterData=next;if(characterScreen!=null)characterScreen.update(characterData);}}catch(Exception ignored){}
   });}
   handler.postDelayed(this,500);
 }};
 private final DisplayManager.DisplayListener displayListener=new DisplayManager.DisplayListener(){
   public void onDisplayAdded(int id){showCharacterScreen();refreshDisplayStatus();}
   public void onDisplayRemoved(int id){showCharacterScreen();refreshDisplayStatus();}
   public void onDisplayChanged(int id){showCharacterScreen();refreshDisplayStatus();}
 };
 private final Handler handler=new Handler(Looper.getMainLooper());
 private float lx,ly,rx,ry,hx,hy,px=-1,py=-1;
 private float cursorSensitivity=1f;
 private boolean ready=false,active=false;
 private final Set<String> directions=new HashSet<>();
 private final Set<Integer> held=new HashSet<>();
 private final TriggerHold triggerHold=new TriggerHold();
 private String bootstrap;
 private long previousTick;
 private long clickStart;
 private final Runnable tick=new Runnable(){public void run(){
   if(!active)return;
   long now=SystemClock.uptimeMillis();float dt=Math.min(.05f,(now-previousTick)/1000f);previousTick=now;
   if(ready&&getWindow().getDecorView().hasWindowFocus()){
     final long request=controlGate.begin();if(request!=0){
     float mx=lx,my=ly;
     if(hx!=0)mx=hx;if(hy!=0)my=hy;
     if(held.contains(KeyEvent.KEYCODE_DPAD_LEFT))mx=-1;if(held.contains(KeyEvent.KEYCODE_DPAD_RIGHT))mx=1;
     if(held.contains(KeyEvent.KEYCODE_DPAD_UP))my=-1;if(held.contains(KeyEvent.KEYCODE_DPAD_DOWN))my=1;
     final float rightX=rx,rightY=ry,elapsed=dt;
     boolean digital=held.contains(KeyEvent.KEYCODE_DPAD_LEFT)||held.contains(KeyEvent.KEYCODE_DPAD_RIGHT)||held.contains(KeyEvent.KEYCODE_DPAD_UP)||held.contains(KeyEvent.KEYCODE_DPAD_DOWN);
     web.evaluateJavascript("window.thorControls.stick("+mx+","+my+","+digital+");window.thorControls.rightStick("+rightX+","+rightY+")",radial->{
     if(!controlGate.complete(request))return;
     if(!active||!ready)return;
     if(!"true".equals(radial)&&(Math.abs(rightX)>.16f||Math.abs(rightY)>.16f)){
       if(px<0){px=web.getWidth()/2f;py=web.getHeight()/2f;}
       px=Math.max(2,Math.min(web.getWidth()-2,px+curve(rightX)*900*cursorSensitivity*elapsed));
       py=Math.max(2,Math.min(web.getHeight()-2,py+curve(rightY)*900*cursorSensitivity*elapsed));
       pointer();
     }
     });}
   }
   handler.postDelayed(this,16);
 }};
 private float curve(float v){return Math.abs(v)<=.16f?0:Math.copySign((Math.abs(v)-.16f)/.84f,v);}
 public void onCreate(Bundle state){
   super.onCreate(state);
   gameLanguage=getPreferences(0).getString("gameLanguage","fr");try(InputStream in=getAssets().open("locale.json")){languageTable=new JSONObject(read(in));}catch(Exception ignored){}
   cursorSensitivity=Math.max(25,Math.min(250,getPreferences(0).getInt("cursorSensitivity",100)))/100f;
   getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
   immersive();
   try(InputStream mapping=getAssets().open("spell-bindings.js");InputStream in=getAssets().open("controls.js");InputStream telemetry=getAssets().open("telemetry.js")){try(InputStream menu=getAssets().open("menu-navigation.js")){try(InputStream locale=getAssets().open("locale.js")){try(InputStream collection=getAssets().open("collection.js")){bootstrap=read(collection)+"\n"+read(locale)+"\n"+read(menu)+"\n"+read(mapping)+"\n"+read(in)+"\n"+read(telemetry);try(InputStream auto=getAssets().open("auto-spells.js")){bootstrap+="\n"+read(auto);}}}}}catch(Exception ex){throw new RuntimeException(ex);}
   try(InputStream policy=getAssets().open("spell-policy.js");InputStream catalog=getAssets().open("spell-catalog.json")){bootstrap=read(policy)+"\n"+bootstrap;spellCatalog=new JSONObject(read(catalog));}catch(Exception ex){throw new RuntimeException(ex);}
   inputs=getSystemService(InputManager.class);inputs.registerInputDeviceListener(inputListener,handler);
   displays=getSystemService(DisplayManager.class);displays.registerDisplayListener(displayListener,handler);
   web=new WebView(this);setContentView(web);
   web.addJavascriptInterface(new Object(){@JavascriptInterface public void setLanguage(String code){if(!Arrays.asList("fr","en","es").contains(code))return;runOnUiThread(()->{gameLanguage=code;getPreferences(0).edit().putString("gameLanguage",code).apply();});}@JavascriptInterface public void openSettings(){runOnUiThread(()->{if(web.getUrl()!=null&&web.getUrl().startsWith("https://retrosurvival.online/"))settings();});}},"ThorPreferences");
   WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setMediaPlaybackRequiresUserGesture(false);
   s.setSupportZoom(false);s.setAllowFileAccess(false);s.setAllowContentAccess(false);
   WebView.setWebContentsDebuggingEnabled((getApplicationInfo().flags & android.content.pm.ApplicationInfo.FLAG_DEBUGGABLE)!=0);
   web.setWebChromeClient(new WebChromeClient(){public boolean onConsoleMessage(ConsoleMessage m){android.util.Log.i("ThorRetro",m.message());return true;}});
   web.setWebViewClient(new WebViewClient(){
     public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){
       if("https".equals(r.getUrl().getScheme())&&"retrosurvival.online".equals(r.getUrl().getHost()))return false;
       try{startActivity(new Intent(Intent.ACTION_VIEW,r.getUrl()));}catch(Exception ignored){}return true;
     }
     public WebResourceResponse shouldInterceptRequest(WebView v,WebResourceRequest r){
       if(!r.isForMainFrame()||!"GET".equals(r.getMethod())||!"retrosurvival.online".equals(r.getUrl().getHost())||!"/".equals(r.getUrl().getPath()))return null;
       try{
         HttpURLConnection c=(HttpURLConnection)new URL(r.getUrl().toString()).openConnection();
         c.setConnectTimeout(15000);c.setReadTimeout(20000);c.setRequestProperty("User-Agent",s.getUserAgentString());
         c.setRequestProperty("Accept-Language","fr-FR,fr;q=0.9");
         String cookies=CookieManager.getInstance().getCookie(r.getUrl().toString());if(cookies!=null)c.setRequestProperty("Cookie",cookies);
         int status=c.getResponseCode();if(status!=200){c.disconnect();return null;}
         List<String> setCookies=c.getHeaderFields().get("Set-Cookie");if(setCookies!=null)for(String cookie:setCookies)CookieManager.getInstance().setCookie(r.getUrl().toString(),cookie);
         String html;try(InputStream in=c.getInputStream()){html=read(in);}finally{c.disconnect();}
         int head=html.indexOf("<head>");if(head<0)return null;
         html=html.substring(0,head+6)+"<script>"+bootstrap+"</script>"+html.substring(head+6);
         return new WebResourceResponse("text/html","UTF-8",new ByteArrayInputStream(html.getBytes(StandardCharsets.UTF_8)));
       }catch(Exception ex){android.util.Log.e("ThorRetro","Loading controls",ex);return null;}
     }
     public void onPageStarted(WebView v,String url,android.graphics.Bitmap favicon){ready=false;controlGate.invalidate();dashboardGate.invalidate();directions.clear();held.clear();triggerHold.clear();characterData="{\"status\":\"unavailable\"}";if(characterScreen!=null)characterScreen.update(characterData);}
     public void onPageFinished(WebView v,String url){
       web.evaluateJavascript("!!(window.thorControls&&window.thorControls.move)",result->{ready="true".equals(result);android.util.Log.i("ThorRetro","controlsReady="+ready);if(ready)applySettings();else Toast.makeText(MainActivity.this,ui("Commandes indisponibles. Ferme puis rouvre le jeu."),Toast.LENGTH_LONG).show();});
       if(!getPreferences(0).getBoolean("helpSeen",false)){getPreferences(0).edit().putBoolean("helpSeen",true).apply();help();}
     }
   });
   web.loadUrl("https://retrosurvival.online/");web.requestFocus();
 }
 private void immersive(){getWindow().getDecorView().setSystemUiVisibility(5894);}
 private String read(InputStream in)throws IOException{ByteArrayOutputStream out=new ByteArrayOutputStream();byte[] buf=new byte[8192];int count;while((count=in.read(buf))!=-1)out.write(buf,0,count);return new String(out.toByteArray(),StandardCharsets.UTF_8);}
 private void syncActive(){if(ready&&web!=null)web.evaluateJavascript("window.thorControls.setActive("+(active&&hasWindowFocus())+")",null);}
 public void onWindowFocusChanged(boolean focus){super.onWindowFocusChanged(focus);if(focus)immersive();else reset();syncActive();}
 protected void onResume(){super.onResume();active=true;previousTick=SystemClock.uptimeMillis();handler.post(tick);handler.post(characterTick);if(web!=null)web.onResume();syncActive();showCharacterScreen();}
 protected void onPause(){reset();active=false;syncActive();handler.removeCallbacks(tick);handler.removeCallbacks(characterTick);closeCharacterScreen();if(web!=null)web.onPause();super.onPause();}
 protected void onDestroy(){if(inputs!=null)inputs.unregisterInputDeviceListener(inputListener);if(displays!=null)displays.unregisterDisplayListener(displayListener);closeCharacterScreen();if(web!=null)web.destroy();super.onDestroy();}
 private void closeCharacterScreen(){if(characterScreen!=null){characterScreen.dismiss();characterScreen=null;}}
 private void showCharacterScreen(){
   if(displays==null||!active||!getPreferences(0).getBoolean("characterScreen",true)){closeCharacterScreen();return;}
   Display target=null;for(Display d:displays.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION)){if(d.getDisplayId()!=getWindowManager().getDefaultDisplay().getDisplayId()){target=d;break;}}
   if(target==null){closeCharacterScreen();return;}
   if(characterScreen!=null&&characterScreen.getDisplay().getDisplayId()==target.getDisplayId())return;
   closeCharacterScreen();CharacterPresentation panel=new CharacterPresentation(this,target);characterScreen=panel;
   try{panel.show();}catch(WindowManager.InvalidDisplayException ex){characterScreen=null;}
 }
 private class CharacterPresentation extends Presentation {
   private WebView panel;private boolean loaded;
   CharacterPresentation(Context context,Display display){super(context,display);}
   protected void onCreate(Bundle state){super.onCreate(state);
     getWindow().addFlags(WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE|WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
     getWindow().getDecorView().setSystemUiVisibility(5894);
     panel=new WebView(getContext());setContentView(panel);panel.getSettings().setJavaScriptEnabled(true);panel.getSettings().setAllowFileAccess(false);panel.getSettings().setAllowContentAccess(false);
     panel.addJavascriptInterface(new Object(){@JavascriptInterface public void setSpellManual(String character,String id,boolean manual){runOnUiThread(()->saveSpellManual(character,id,manual));}@JavascriptInterface public void setOption(String name,String value){runOnUiThread(()->savePanelOption(name,value));}},"ThorDeck");
     panel.setWebViewClient(new WebViewClient(){public void onPageFinished(WebView v,String url){loaded=true;update(characterData);}public boolean shouldOverrideUrlLoading(WebView v,WebResourceRequest r){return true;}});
     try(InputStream in=getAssets().open("dashboard.html")){String html=read(in);try(InputStream policy=getAssets().open("spell-policy.js")){html=html.replace("<head>","<head><script>"+read(policy)+"</script>");}try(InputStream locale=getAssets().open("locale.js")){html=html.replace("<head>","<head><script>"+read(locale)+"</script>");}try(InputStream deck=getAssets().open("deck.js")){html=html.replace("</body>","<script>"+read(deck)+"</script></body>");}panel.loadDataWithBaseURL("https://retrosurvival.online/",html,"text/html","UTF-8",null);}catch(Exception ex){android.util.Log.e("ThorRetro","Character screen",ex);}
   }
   void update(String json){if(loaded&&panel!=null)try{JSONObject data=new JSONObject(json);data.put("controls",panelOptions());panel.evaluateJavascript("window.renderThorDashboard("+data.toString()+")",null);}catch(Exception ignored){}}
   public void dismiss(){if(panel!=null){panel.destroy();panel=null;}super.dismiss();}
 }
 private void key(String k,String c,boolean down){if(ready){if("Escape".equals(k)){if(down)web.evaluateJavascript("window.thorControls.pause()",null);}else if(c.startsWith("Digit"))web.evaluateJavascript("window.thorControls.button("+(Integer.parseInt(k)-1)+","+down+")",null);else web.evaluateJavascript("window.thorControls.key("+quote(k)+","+quote(c)+","+down+")",null);}}
 private String quote(String s){return "\""+s+"\"";}
 private void direction(String k,boolean down){if(down&&directions.add(k))key(k,k,true);else if(!down&&directions.remove(k))key(k,k,false);}
 private void reset(){if(nativeClickKey!=-1){click(false);nativeClickKey=-1;}if(ready)web.evaluateJavascript("window.thorControls.cancel()",null);for(String k:new HashSet<>(directions))direction(k,false);for(int k:new HashSet<>(held)){String[] b=binding(k);if(b!=null)key(b[0],b[1],false);}if(ready)web.evaluateJavascript("window.thorControls.stick(0,0)",null);held.clear();triggerHold.clear();lx=ly=rx=ry=hx=hy=0;}
 public boolean dispatchGenericMotionEvent(MotionEvent e){
   if((e.getSource()&InputDevice.SOURCE_JOYSTICK)==InputDevice.SOURCE_JOYSTICK&&e.getAction()==MotionEvent.ACTION_MOVE){
     if(!getWindow().getDecorView().hasWindowFocus())return super.dispatchGenericMotionEvent(e);
     lastInputDevice=e.getDeviceId();
     lx=axis(e,MotionEvent.AXIS_X);ly=axis(e,MotionEvent.AXIS_Y);
     boolean standard=centeredAxis(e,MotionEvent.AXIS_Z)&&centeredAxis(e,MotionEvent.AXIS_RZ);
     rx=axis(e,standard?MotionEvent.AXIS_Z:MotionEvent.AXIS_RX);ry=axis(e,standard?MotionEvent.AXIS_RZ:MotionEvent.AXIS_RY);hx=axis(e,MotionEvent.AXIS_HAT_X);hy=axis(e,MotionEvent.AXIS_HAT_Y);
     trigger(KeyEvent.KEYCODE_BUTTON_L2,Math.max(e.getAxisValue(MotionEvent.AXIS_LTRIGGER),e.getAxisValue(MotionEvent.AXIS_BRAKE))>.5f);
     trigger(KeyEvent.KEYCODE_BUTTON_R2,Math.max(e.getAxisValue(MotionEvent.AXIS_RTRIGGER),e.getAxisValue(MotionEvent.AXIS_GAS))>.5f);
     android.util.Log.d("ThorRetro","sticks "+lx+","+ly+" right "+rx+","+ry);return true;
   }return super.dispatchGenericMotionEvent(e);
 }
 private void trigger(int k,boolean down){triggerInput(k,down,true);}
 private void triggerInput(int k,boolean down,boolean axis){
   int change=triggerHold.update(k,down,axis);if(change==0)return;
   if(change>0)held.add(k);else held.remove(k);
   String[] b=binding(k);key(b[0],b[1],change>0);
 }
 private String[] binding(int k){
   switch(k){
     case KeyEvent.KEYCODE_BUTTON_X:return new String[]{"1","Digit1"};case KeyEvent.KEYCODE_BUTTON_Y:return new String[]{"2","Digit2"};
     case KeyEvent.KEYCODE_BUTTON_L1:return new String[]{"3","Digit3"};case KeyEvent.KEYCODE_BUTTON_R1:return new String[]{"4","Digit4"};
     case KeyEvent.KEYCODE_BUTTON_L2:return new String[]{"5","Digit5"};case KeyEvent.KEYCODE_BUTTON_R2:return new String[]{"6","Digit6"};
     case KeyEvent.KEYCODE_BUTTON_B:case KeyEvent.KEYCODE_BUTTON_START:return new String[]{"Escape","Escape"};
   }return null;
 }
 public boolean dispatchKeyEvent(KeyEvent e){
   if(!getWindow().getDecorView().hasWindowFocus())return super.dispatchKeyEvent(e);
   if(isController(e.getDevice()))lastInputDevice=e.getDeviceId();
   int k=e.getKeyCode();boolean down=e.getAction()==KeyEvent.ACTION_DOWN;
   if(k==KeyEvent.KEYCODE_BUTTON_SELECT){if(down&&e.getRepeatCount()==0)settings();return true;}
   if(k==KeyEvent.KEYCODE_BUTTON_THUMBR||k==KeyEvent.KEYCODE_BUTTON_A){
     if(e.getRepeatCount()==0){if(down){held.add(k);if(ready)web.evaluateJavascript("window.thorMenu ? window.thorMenu.activate() : false",used->{if(!active||!ready||!getWindow().getDecorView().hasWindowFocus())return;if(!"true".equals(used)){click(true);if(held.contains(k))nativeClickKey=k;else click(false);}});}else{held.remove(k);if(nativeClickKey==k){click(false);nativeClickKey=-1;}}}return true;
   }
   if(k>=KeyEvent.KEYCODE_DPAD_UP&&k<=KeyEvent.KEYCODE_DPAD_RIGHT){if(down){held.add(k);if(ready){int x=k==KeyEvent.KEYCODE_DPAD_LEFT?-1:k==KeyEvent.KEYCODE_DPAD_RIGHT?1:0,y=k==KeyEvent.KEYCODE_DPAD_UP?-1:k==KeyEvent.KEYCODE_DPAD_DOWN?1:0;web.evaluateJavascript("window.thorMenu && window.thorMenu."+(e.getRepeatCount()==0?"step":"tick")+"("+x+","+y+",performance.now())",null);}}else held.remove(k);return true;}
   String[] b=binding(k);if(b!=null){if(e.getRepeatCount()==0){if(k==KeyEvent.KEYCODE_BUTTON_L2||k==KeyEvent.KEYCODE_BUTTON_R2)triggerInput(k,down,false);else if(down){if(held.add(k))key(b[0],b[1],true);}else if(held.remove(k))key(b[0],b[1],false);}return true;}
   return super.dispatchKeyEvent(e);
 }
 private void pointer(){float scale=web.getScale();web.evaluateJavascript("window.thorControls.move("+(px/scale)+","+(py/scale)+")",null);}
 private void click(boolean down){
   if(!ready)return;if(px<0){px=web.getWidth()/2f;py=web.getHeight()/2f;}pointer();
   // The mobile game expects a native touchscreen tap at the cursor location.
   long now=SystemClock.uptimeMillis();if(down)clickStart=now;MotionEvent.PointerProperties prop=new MotionEvent.PointerProperties();prop.id=0;prop.toolType=MotionEvent.TOOL_TYPE_FINGER;
   MotionEvent.PointerCoords coords=new MotionEvent.PointerCoords();coords.x=px;coords.y=py;coords.pressure=down?1:0;coords.size=1;
   MotionEvent event=MotionEvent.obtain(clickStart,now,down?MotionEvent.ACTION_DOWN:MotionEvent.ACTION_UP,1,new MotionEvent.PointerProperties[]{prop},new MotionEvent.PointerCoords[]{coords},0,0,1,1,0,0,InputDevice.SOURCE_TOUCHSCREEN,0);
   web.dispatchTouchEvent(event);event.recycle();
 }
 private void help(){reset();new AlertDialog.Builder(this).setTitle(ui("Commandes de jeu et manette"))
   .setMessage(ui("Stick gauche / croix : déplacement\nStick droit : pointeur\nR3 ou A : clic\nL1, R1, L2, R2 : priorité aux sorts à viser\nX, Y : priorité aux sorts instantanés\nStart ou B : pause / reprendre\nSelect ou ⚙ APK : paramètres\n\nLe joystick de déplacement apparaît en bas à gauche. Les touches sur les sorts et leur opacité se règlent dans les paramètres.\n\nPour les sorts à viser, maintiens le bouton, vise avec le stick droit puis relâche. Dans les menus et les choix, stick gauche / croix pour sélectionner, R3 ou A pour valider. Le stick droit permet toujours de choisir au pointeur.\n\nVisée radiale : direction du stick gauche par défaut, stick droit pour choisir la direction. Pour les sorts à placer, incliner le stick pour régler la distance. Relâcher la touche du sort pour lancer.\n\nLa portée suit les améliorations du sort. La visée au pointeur reste disponible dans les paramètres ; Téléportation et Bond restent radiaux.\n\nAndroid 9 ou plus : manette USB ou Bluetooth reconnue automatiquement après connexion dans Android. Les repères suivent les noms de boutons Android. Le second écran est utilisé uniquement si Android le détecte comme écran compatible.\n\nLa sauvegarde de cette application est distincte de Chrome."))
   .setPositiveButton(ui("Jouer"),(d,w)->{web.requestFocus();immersive();}).setNeutralButton(ui("Ajouter à l’accueil"),(d,w)->pin()).show();}
 private String autoMode(){String mode=getPreferences(0).getString("autoSpellMode",getPreferences(0).getBoolean("autoSpells",false)?"full":"off");return Arrays.asList("off","buffs","full").contains(mode)?mode:"off";}
 private JSONObject spellManual(){try{return new JSONObject(getPreferences(0).getString("spellManual","{}"));}catch(Exception ignored){return new JSONObject();}}
 private boolean contains(org.json.JSONArray ids,String id){if(ids==null)return false;for(int i=0;i<ids.length();i++)if(id.equals(ids.optString(i)))return true;return false;}
 private void saveSpellManual(String character,String id,boolean manual){
   JSONObject classes=spellCatalog.optJSONObject("classes");if(classes==null||!contains(classes.optJSONArray(character),id)||contains(spellCatalog.optJSONArray("passive"),id))return;
   try{JSONObject all=spellManual();org.json.JSONArray old=all.optJSONArray(character),next=new org.json.JSONArray();if(old!=null)for(int i=0;i<old.length();i++)if(!id.equals(old.optString(i)))next.put(old.optString(i));if(manual)next.put(id);all.put(character,next);getPreferences(0).edit().putString("spellManual",all.toString()).apply();applySettings();}catch(Exception ignored){}
 }
 private JSONObject panelOptions(){
   JSONObject data=new JSONObject();android.content.SharedPreferences p=getPreferences(0);try{data.put("mode",autoMode());data.put("manual",spellManual());for(String key:Arrays.asList("showLabels","showJoystick","radialAim","hideCombatCursor","combatHelper"))data.put(key,p.getBoolean(key,true));data.put("cursorSensitivity",p.getInt("cursorSensitivity",100));data.put("labelOpacity",p.getInt("labelOpacity",45));}catch(Exception ignored){}return data;
 }
 private void savePanelOption(String name,String value){
   android.content.SharedPreferences.Editor edit=getPreferences(0).edit();
   if("autoSpellMode".equals(name)&&Arrays.asList("off","buffs","full").contains(value))edit.putString(name,value);
   else if(Arrays.asList("showLabels","showJoystick","radialAim","hideCombatCursor","combatHelper").contains(name)&&Arrays.asList("true","false").contains(value))edit.putBoolean(name,"true".equals(value));
   else if(Arrays.asList("cursorSensitivity","labelOpacity").contains(name))try{int v=Integer.parseInt(value),min="cursorSensitivity".equals(name)?25:15,max="cursorSensitivity".equals(name)?250:85;if(v<min||v>max)return;edit.putInt(name,v);if("cursorSensitivity".equals(name))cursorSensitivity=v/100f;}catch(Exception ignored){return;}
   else return;
   edit.apply();applySettings();
 }
 private void applySettings(){if(!ready)return;syncActive();android.content.SharedPreferences p=getPreferences(0);web.evaluateJavascript("window.thorControls.configure({autoSpellMode:\""+autoMode()+"\",spellManual:"+spellManual().toString()+",autoSpells:"+!autoMode().equals("off")+",hideCombatCursor:"+p.getBoolean("hideCombatCursor",true)+",combatHelper:"+p.getBoolean("combatHelper",true)+",radialAim:"+p.getBoolean("radialAim",true)+",showLabels:"+p.getBoolean("showLabels",true)+",labelOpacity:"+(p.getInt("labelOpacity",45)/100.0)+",showJoystick:"+p.getBoolean("showJoystick",true)+"})",null);if(characterScreen!=null)characterScreen.update(characterData);}
 private void settings(){
   reset();if(ready)web.evaluateJavascript("window.thorControls.beginPreferences()",paused->settingsDialog("true".equals(paused)));else settingsDialog(false);
 }
 private void settingsDialog(boolean resumeGame){
   android.content.SharedPreferences p=getPreferences(0);
   LinearLayout layout=new LinearLayout(this);layout.setOrientation(LinearLayout.VERTICAL);int pad=(int)(24*getResources().getDisplayMetrics().density);layout.setPadding(pad,pad/2,pad,pad/2);
   controllerStatus=new TextView(this);refreshControllerStatus();layout.addView(controllerStatus);
   Switch labels=new Switch(this);labels.setText(ui("Touches sur les sorts actifs"));labels.setChecked(p.getBoolean("showLabels",true));layout.addView(labels);
   TextView opacity=new TextView(this);opacity.setText(ui("Opacité des touches : ")+p.getInt("labelOpacity",45)+" %");layout.addView(opacity);
   SeekBar slider=new SeekBar(this);slider.setMax(85);slider.setMin(15);slider.setProgress(p.getInt("labelOpacity",45));layout.addView(slider);
   TextView sensitivity=new TextView(this);sensitivity.setText(ui("Sensibilité du curseur : ")+Math.round(cursorSensitivity*100)+" %");layout.addView(sensitivity);
   SeekBar speed=new SeekBar(this);speed.setMax(250);speed.setMin(25);speed.setProgress(Math.round(cursorSensitivity*100));layout.addView(speed);
   speed.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener(){public void onProgressChanged(SeekBar s,int value,boolean user){cursorSensitivity=value/100f;sensitivity.setText(ui("Sensibilité du curseur : ")+value+" %");p.edit().putInt("cursorSensitivity",value).apply();}public void onStartTrackingTouch(SeekBar s){}public void onStopTrackingTouch(SeekBar s){}});
   TextView autoTitle=new TextView(this);autoTitle.setText(ui("Assistance des sorts"));layout.addView(autoTitle);
   RadioGroup auto=new RadioGroup(this);String[] modes={"off","buffs","full"};String[] names={"Désactivée","Buffs auto uniquement","Tous les sorts intelligents"};
   for(int i=0;i<modes.length;i++){RadioButton choice=new RadioButton(this);choice.setId(View.generateViewId());choice.setTag(modes[i]);choice.setText(ui(names[i]));auto.addView(choice);if(modes[i].equals(autoMode()))auto.check(choice.getId());}layout.addView(auto);
   auto.setOnCheckedChangeListener((group,id)->{RadioButton choice=group.findViewById(id);if(choice!=null){p.edit().putString("autoSpellMode",(String)choice.getTag()).apply();applySettings();}});
   TextView autoHint=new TextView(this);autoHint.setText(ui("Buffs : dès qu’ils sont disponibles. Tous les sorts : buffs, attaques et zones. Tu gardes le déplacement et les choix."));layout.addView(autoHint);
   Switch cursor=new Switch(this);cursor.setText(ui("Masquer le curseur pendant les combats"));cursor.setChecked(p.getBoolean("hideCombatCursor",true));layout.addView(cursor);cursor.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("hideCombatCursor",v).apply();applySettings();});
   Switch helper=new Switch(this);helper.setText(ui("Alerte de PV faibles sur la fiche"));helper.setChecked(p.getBoolean("combatHelper",true));layout.addView(helper);helper.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("combatHelper",v).apply();applySettings();});
   Switch radial=new Switch(this);radial.setText(ui("Visée radiale des sorts à cibler"));radial.setChecked(p.getBoolean("radialAim",true));layout.addView(radial);radial.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("radialAim",v).apply();applySettings();});
   Switch joystick=new Switch(this);joystick.setText(ui("Joystick visuel en bas à gauche"));joystick.setChecked(p.getBoolean("showJoystick",true));layout.addView(joystick);
   Switch second=new Switch(this);second.setText(ui("Personnage sur le second écran"));second.setChecked(p.getBoolean("characterScreen",true));layout.addView(second);
   displayStatus=new TextView(this);refreshDisplayStatus();layout.addView(displayStatus);
   second.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("characterScreen",v).apply();showCharacterScreen();});
   TextView hint=new TextView(this);hint.setText(ui("Les commandes restent actives lorsque leurs repères sont masqués."));hint.setPadding(0,pad/2,0,0);layout.addView(hint);
   labels.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("showLabels",v).apply();applySettings();});
   joystick.setOnCheckedChangeListener((b,v)->{p.edit().putBoolean("showJoystick",v).apply();applySettings();});
   slider.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener(){public void onProgressChanged(SeekBar s,int value,boolean user){opacity.setText(ui("Opacité des touches : ")+value+" %");p.edit().putInt("labelOpacity",value).apply();applySettings();}public void onStartTrackingTouch(SeekBar s){}public void onStopTrackingTouch(SeekBar s){}});
   ScrollView scroll=new ScrollView(this);scroll.addView(layout);
   boolean[] showHelp={false};AlertDialog dialog=new AlertDialog.Builder(this).setTitle(ui("Paramètres de jeu et manette")).setView(scroll).setPositiveButton(ui("Fermer"),null).setNeutralButton(ui("Commandes"),(d,w)->{showHelp[0]=true;help();}).create();
   dialog.setOnDismissListener(d->{controllerStatus=null;displayStatus=null;if(resumeGame&&!showHelp[0]&&ready)web.evaluateJavascript("window.thorControls.endPreferences()",null);web.requestFocus();immersive();});dialog.show();
 }
 private void pin(){ShortcutManager sm=getSystemService(ShortcutManager.class);if(sm.isRequestPinShortcutSupported())sm.requestPinShortcut(new ShortcutInfo.Builder(this,"retro-survival").setShortLabel("Retro Survival").setIcon(Icon.createWithResource(this,fr.thor.retrosurvival.R.drawable.icon)).setIntent(new Intent(this,MainActivity.class).setAction(Intent.ACTION_MAIN)).build(),null);else Toast.makeText(this,ui("L’icône est disponible dans la liste des applications."),Toast.LENGTH_LONG).show();}
}
