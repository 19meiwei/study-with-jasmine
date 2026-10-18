(()=>{
'use strict';
const script=document.currentScript;
const base=new URL('./',script.src);
let manifestPromise=null,playing=null,utterance=null;
const defaultLanguage=base.pathname.includes('/vietnamese/')?'vi-VN':'en-US';
function notify(text){
 let el=document.getElementById('jasmineAudioStatus');
 if(!el){el=document.createElement('div');el.id='jasmineAudioStatus';el.setAttribute('role','status');el.style.cssText='position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:99999;background:#173b35;color:white;padding:12px 18px;border-radius:12px;box-shadow:0 6px 24px #0003;font:13px system-ui;max-width:90vw';document.body.append(el)}
 el.textContent=text;clearTimeout(el._timer);el._timer=setTimeout(()=>el.remove(),5000);
}
function stop(){if(playing){playing.pause();playing.removeAttribute('src');playing.load();playing=null}if('speechSynthesis' in window){speechSynthesis.cancel()}utterance=null}
function manifest(){if(!manifestPromise)manifestPromise=fetch(new URL('audio-manifest.json',base)).then(r=>{if(!r.ok)throw Error('manifest HTTP '+r.status);return r.json()}).catch(()=>({}));return manifestPromise}
function waitVoices(){return new Promise(resolve=>{
 const synth=window.speechSynthesis;if(!synth)return resolve([]);
 let voices=synth.getVoices();if(voices.length)return resolve(voices);
 let finished=false;const done=()=>{if(finished)return;finished=true;synth.removeEventListener('voiceschanged',done);resolve(synth.getVoices())};
 synth.addEventListener('voiceschanged',done);setTimeout(done,1500);
})}
async function browserVoice(text,lang,status){
 if(!('speechSynthesis' in window)){notify('Audio chưa có MP3 và trình duyệt không hỗ trợ giọng đọc.');return false}
 const voices=await waitVoices();const candidates=voices.filter(v=>v.lang.toLowerCase()===lang.toLowerCase()||v.lang.toLowerCase().startsWith(lang.slice(0,2).toLowerCase()+'-')||v.lang.toLowerCase()===lang.slice(0,2).toLowerCase());
 if(!candidates.length){notify(lang==='vi-VN'?'Chưa có MP3 và thiết bị không có giọng tiếng Việt.':'Chưa có MP3 và thiết bị không có giọng tiếng Anh.');if(status)status.textContent='Audio unavailable';return false}
 const voice=candidates.find(v=>v.lang.toLowerCase()===lang.toLowerCase())||candidates[0];
 stop();const u=new SpeechSynthesisUtterance(text);utterance=u;u.lang=lang;u.voice=voice;u.rate=lang==='vi-VN'?0.9:0.92;
 u.onerror=()=>{notify('Trình duyệt không thể phát giọng đọc.');if(status)status.textContent='Audio unavailable'};
 if(status)status.textContent='Playing…';speechSynthesis.speak(u);return true;
}
async function speak(value,lang=defaultLanguage,status){
 const text=String(value??'').normalize('NFC').trim().replace(/\s+/g,' ');if(!text)return false;
 stop();let rel=null;
 try{const m=await manifest();rel=m[lang]?.[text]||null}catch(e){console.warn('Audio manifest:',e)}
 if(rel){try{
  const url=new URL(rel,base);const response=await fetch(url,{method:'HEAD'});
  if(!response.ok)throw Error('MP3 HTTP '+response.status);
  const a=new Audio(url.href);playing=a;a.onerror=()=>notify('MP3 không phát được: '+text);
  await a.play();if(status)status.textContent='Playing…';return true;
 }catch(e){console.warn('MP3 unavailable; checking local voice:',text,e)}}
 return browserVoice(text,lang,status);
}
window.JasmineAudio={speak,stop,available:()=>true};
window.JasmineVietnameseAudio={speak:(t,status)=>speak(t,'vi-VN',status),stop,hasVietnameseVoice:()=>('speechSynthesis' in window)};
})();
