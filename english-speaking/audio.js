/* Shared English audio engine — use a matching English voice, never silently substitute a different language. */
(function(){
'use strict';
const synth=window.speechSynthesis;
let voices=[];
function refresh(){try{voices=synth?synth.getVoices():[]}catch(_){voices=[]}return voices}
if(synth){refresh();synth.addEventListener?.('voiceschanged',refresh)}
function choose(lang){const v=refresh().filter(x=>/^en(?:-|$)/i.test(x.lang));return v.find(x=>x.lang.toLowerCase()==='en-us')||v.find(x=>x.lang.toLowerCase().startsWith('en-us'))||v.find(x=>x.default)||v[0]||null}
window.JasmineAudio={
 speak(text,lang='en-US',status){
  const notify=s=>{if(status)status.textContent=s};
  if(!synth||!window.SpeechSynthesisUtterance){notify('Audio is not supported in this browser.');return false}
  const voice=choose(lang);
  if(!voice){notify('No English voice is available in this browser. Audio cannot play correctly.');return false}
  try{ synth.cancel();const u=new SpeechSynthesisUtterance(String(text));u.voice=voice;u.lang=voice.lang;u.rate=.88;u.volume=1;
   u.onstart=()=>notify('Playing English audio…');u.onend=()=>notify('Audio finished.');u.onerror=()=>notify('Audio playback failed. Please check browser audio permissions and try again.');
   synth.resume();synth.speak(u);return true
  }catch(e){notify('Audio playback failed.');return false}
 }
};
})();
