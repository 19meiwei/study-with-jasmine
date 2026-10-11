/* Mandarin pronunciation: try licensed human recording; if absent, use browser zh-CN speech synthesis.
   Human recordings: hugolpz/audio-cmn (Yue Tan / Shtooka), CC BY-SA 3.0 US.
   Browser speech is computer-generated and is clearly labeled as such. */
(function(){
'use strict';
const base='https://cdn.jsdelivr.net/gh/hugolpz/audio-cmn@master/64k/hsk/cmn-';
const audio=new Audio();audio.preload='none';
let request=0;
let activeUtterance=null;
function status(msg){const n=document.getElementById('humanAudioStatus');if(n){n.textContent=msg;n.hidden=false;clearTimeout(status.timer);status.timer=setTimeout(()=>{n.hidden=true},6000)}}
function browserVoice(word,token){
 if(token!==request)return;
 if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){
  status('No recording or Mandarin browser voice is available for '+word+'.');return;
 }
 const synth=window.speechSynthesis;
 synth.cancel();
 const utter=new SpeechSynthesisUtterance(word);
 utter.lang='zh-CN';utter.rate=.82;utter.pitch=1;
 const voices=synth.getVoices();
 const zh=voices.find(v=>/^zh[-_]CN/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));
 if(zh)utter.voice=zh;
 utter.onstart=()=>{if(token===request)status('🔊 Browser-generated Mandarin voice: '+word)};
 utter.onerror=()=>{if(token===request)status('Audio unavailable. Check your device Mandarin voice settings.')};
 activeUtterance=utter;
 try{synth.speak(utter);status('🔊 Using browser-generated Mandarin voice: '+word)}catch(e){status('Unable to play audio on this device.')}
}
window.playHumanMandarin=function(input){
 const word=String(input||'').trim().replace(/[。！？!?，,、；;：:]+$/u,'');
 if(!word){status('No word selected.');return}
 const token=++request;
 try{window.speechSynthesis?.cancel()}catch(e){}
 audio.pause();audio.removeAttribute('src');audio.load();
 audio.onerror=null;
 audio.onplaying=null;
 audio.onerror=()=>browserVoice(word,token);
 audio.onplaying=()=>{if(token===request)status('🎙️ Native-speaker recording: '+word)};
 audio.src=base+encodeURIComponent(word)+'.mp3';
 status('🔊 Loading pronunciation for '+word+'…');
 const play=audio.play();
 if(play&&typeof play.catch==='function')play.catch(()=>browserVoice(word,token));
};
})();
