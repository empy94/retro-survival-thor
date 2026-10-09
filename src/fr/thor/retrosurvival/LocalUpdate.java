package fr.thor.retrosurvival;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import org.json.JSONObject;

/** A signed, bounded compatibility package. The exact game digest remains mandatory. */
public final class LocalUpdate {
 public static final int MAX_BYTES=250000;
 public static final String[] SCRIPTS={"bootstrap","panelScript","panelStyle","snapshot","frame","command","mainHook","rulesHook"};
 public final String version,gameHash;private final JSONObject scripts;
 private LocalUpdate(JSONObject payload)throws Exception{
  if(payload.getInt("schema")!=1)throw new IOException("Format de mise à jour non reconnu.");
  version=payload.getString("version");gameHash=payload.getString("gameModuleSha256");
  if(!version.matches("[0-9]{1,5}\\.[0-9]{1,5}\\.[0-9]{1,5}")||!gameHash.matches("[a-f0-9]{64}"))throw new IOException("Version ou compatibilité invalide.");
  scripts=payload.getJSONObject("scripts");int total=0;
  for(String key:SCRIPTS){String script=scripts.getString(key);total+=script.length();if(script.trim().isEmpty()||script.length()>60000)throw new IOException("Contenu de mise à jour invalide.");}
  if(total>110000)throw new IOException("Mise à jour trop volumineuse.");
 }
 public String script(String key){return scripts.optString(key,"");}
 public static String read(InputStream input)throws IOException{
  ByteArrayOutputStream out=new ByteArrayOutputStream();byte[] buffer=new byte[8192];int count;
  while((count=input.read(buffer))!=-1){if(out.size()+count>MAX_BYTES)throw new IOException("Fichier trop volumineux.");out.write(buffer,0,count);}
  return new String(out.toByteArray(),StandardCharsets.UTF_8);
 }
 public static byte[] verify(String payload,String signature,String publicKey)throws GeneralSecurityException{
  try{
   if(payload.length()>MAX_BYTES||signature.length()>1024)throw new GeneralSecurityException("Fichier trop volumineux.");
   byte[] bytes=Base64.getDecoder().decode(payload);if(bytes.length>MAX_BYTES)throw new GeneralSecurityException("Fichier trop volumineux.");
   Signature verifier=Signature.getInstance("SHA256withRSA");verifier.initVerify(KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(publicKey.trim()))));verifier.update(bytes);
   if(!verifier.verify(Base64.getDecoder().decode(signature)))throw new GeneralSecurityException("Signature de mise à jour invalide.");
   return bytes;
  }catch(IllegalArgumentException ex){throw new GeneralSecurityException("Fichier de mise à jour invalide.",ex);}
 }
 public static LocalUpdate parse(String envelope,String publicKey)throws Exception{
  if(envelope.length()>MAX_BYTES)throw new IOException("Fichier trop volumineux.");
  try{JSONObject wrapper=new JSONObject(envelope);
   return new LocalUpdate(new JSONObject(new String(verify(wrapper.getString("payload"),wrapper.getString("signature"),publicKey),StandardCharsets.UTF_8)));
  }catch(org.json.JSONException ex){throw new IOException("Ce fichier n’est pas une mise à jour valide ou il est incomplet.",ex);}
 }
}
