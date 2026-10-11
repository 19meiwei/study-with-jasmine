/* Native-speaker audio, not browser TTS. Source: hugolpz/audio-cmn, Yue Tan / Shtooka, CC BY-SA 3.0 US. */
(function(){
'use strict';
const base='https://cdn.jsdelivr.net/gh/hugolpz/audio-cmn@master/64k/hsk/cmn-';
const audio=new Audio();audio.preload='none';
let request=0;
function status(msg){let n=document.getElementById('humanAudioStatus');if(n){n.textContent=msg;n.hidden=false}}
window.playHumanMandarin=function(input){
 const word=String(input||'').trim().replace(/[。！？!?，,、；;：:]+$/u,'');
 if(!word){status('No recording selected.');return}
 const current=++request;
 audio.pause();audio.removeAttribute('src');audio.load();
 // Only whole-word recordings: do not synthesize or stitch syllables.
 audio.src=base+encodeURIComponent(word)+'.mp3';
 status('🔊 Loading native-speaker recording for '+word+'…');
 const p=audio.play();
 if(p&&p.then)p.then(()=>{if(current===request)status('🎙️ Native-speaker recording: '+word)}).catch(()=>{if(current===request)status('Recording unavailable for '+word+'. No AI voice was used.')});
};
})();
