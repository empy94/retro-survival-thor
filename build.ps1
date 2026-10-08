param(
 [string]$AndroidSdk=$env:ANDROID_SDK_ROOT,
 [string]$JavaHome=$env:JAVA_HOME,
 [string]$BuildToolsVersion='34.0.0',
 [string]$Platform='android-35',
 [switch]$Debug
)
$ErrorActionPreference='Stop'
$project=$PSScriptRoot
if(!$AndroidSdk){$AndroidSdk=Join-Path $env:LOCALAPPDATA 'Android\Sdk'}
if(!$JavaHome){throw 'Set JAVA_HOME or pass -JavaHome with the JDK directory (Java 17 or 19 with build-tools 34).'}
$sdk=$AndroidSdk
$bt=Join-Path $sdk "build-tools\$BuildToolsVersion"
$android=Join-Path $sdk "platforms\$Platform\android.jar"
$jdk=$JavaHome
foreach($required in @("$bt\aapt.exe",$android,"$jdk\bin\javac.exe")){if(!(Test-Path -LiteralPath $required)){throw "Missing build dependency: $required"}}
$env:JAVA_HOME=$jdk
$build=Join-Path $project 'build'
New-Item -ItemType Directory -Force -Path $build,"$build\gen","$build\classes","$build\dex" | Out-Null
$manifest="$project\AndroidManifest.xml"
if($Debug){New-Item -ItemType Directory -Force -Path "$build\debug" | Out-Null;$manifest="$build\debug\AndroidManifest.xml";[IO.File]::WriteAllText($manifest,[IO.File]::ReadAllText("$project\AndroidManifest.xml").Replace('<application ','<application android:debuggable="true" '))}
& "$bt\aapt.exe" package -f -m -M $manifest -S "$project\res" -A "$project\assets" -I $android -J "$build\gen" -F "$build\unsigned.apk"
if($LASTEXITCODE){throw 'Resource packaging failed'}
$sources=@(Get-ChildItem "$project\src","$build\gen" -Recurse -Filter '*.java' | ForEach-Object FullName)
& "$jdk\bin\javac.exe" --release 8 -g -encoding UTF-8 -classpath $android -d "$build\classes" $sources
if($LASTEXITCODE){throw 'Java compilation failed'}
& "$jdk\bin\jar.exe" cf "$build\classes.jar" -C "$build\classes" .
& "$bt\d8.bat" --lib $android --min-api 28 --output "$build\dex" "$build\classes.jar"
if($LASTEXITCODE){throw 'Dex compilation failed'}
Push-Location "$build\dex"
try { & "$bt\aapt.exe" add "$build\unsigned.apk" classes.dex } finally { Pop-Location }
if($LASTEXITCODE){throw 'APK assembly failed'}
& "$bt\zipalign.exe" -f 4 "$build\unsigned.apk" "$build\aligned.apk"
if($LASTEXITCODE){throw 'Alignment failed'}
$keyDir=Join-Path $env:USERPROFILE '.android\thor-retrosurvival'
New-Item -ItemType Directory -Force -Path $keyDir | Out-Null
$keyFile=Join-Path $keyDir 'local.jks'
$passFile=Join-Path $keyDir 'password.txt'
if(!(Test-Path $keyFile)){
 if(Test-Path $passFile){throw 'Password exists without key'}
 $randomBytes=New-Object byte[] 32;[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($randomBytes)
 [IO.File]::WriteAllText($passFile,[Convert]::ToBase64String($randomBytes))
 & "$jdk\bin\keytool.exe" -genkeypair -keystore $keyFile -storepass:file $passFile -keypass:file $passFile -alias retro -dname 'CN=Thor Retro Survival Local' -keyalg RSA -keysize 3072 -validity 10000
 if($LASTEXITCODE){throw 'Key generation failed'}
}
$apk=if($Debug){"$project\Retro-Survival-Android-debug.apk"}else{"$project\Retro-Survival-Android.apk"}
& "$bt\apksigner.bat" sign --ks $keyFile --ks-key-alias retro --ks-pass "file:$passFile" --out $apk "$build\aligned.apk"
if($LASTEXITCODE){throw 'Signing failed'}
& "$bt\apksigner.bat" verify --verbose $apk
if($LASTEXITCODE){throw 'Signature verification failed'}
Get-FileHash $apk -Algorithm SHA256
