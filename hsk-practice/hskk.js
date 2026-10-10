
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const audio = $('hskkAudio');
  const title = $('hskkTitle');
  const status = $('hskkStatus');
  const record = $('hskkRecord');
  const stop = $('hskkStop');
  const download = $('hskkDownload');
  const playback = $('hskkRecording');
  let level = 3, recorder = null, stream = null, chunks = [], blob = null, blobURL = null;

  function label(vi,en){return document.documentElement.lang==='en'?en:vi;}
  function setStatus(vi,en){status.textContent=label(vi,en);}
  function releaseStream(){if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;}}
  function resetRecording(){
    if(recorder && recorder.state==='recording')recorder.stop();
    releaseStream();
    if(blobURL){URL.revokeObjectURL(blobURL);blobURL=null;}
    blob=null; playback.replaceChildren();download.disabled=true;
    record.disabled=false;stop.disabled=true;
  }
  function selectLevel(n){
    resetRecording();level=n;audio.pause();audio.src=`./audio/hskk-${n}.mp3`;audio.load();
    title.textContent=`HSKK Level ${n}`;
    document.querySelectorAll('[data-hskk]').forEach(b=>{
      const active=Number(b.dataset.hskk)===n;
      b.classList.toggle('active',active);
      b.setAttribute('aria-pressed',String(active));
    });
    setStatus('Sẵn sàng','Ready');
  }
  document.querySelectorAll('[data-hskk]').forEach(b=>b.addEventListener('click',()=>selectLevel(Number(b.dataset.hskk))));
  record.addEventListener('click',async()=>{
    if(!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder){
      alert(label('Trình duyệt không hỗ trợ ghi âm hoặc trang chưa dùng HTTPS/localhost.','Recording requires a supported browser and HTTPS/localhost.'));return;
    }
    try {
      stream=await navigator.mediaDevices.getUserMedia({audio:true});
      if(blobURL){URL.revokeObjectURL(blobURL);blobURL=null;}
      blob=null;download.disabled=true;playback.replaceChildren();chunks=[];
      const options=MediaRecorder.isTypeSupported('audio/webm')?{mimeType:'audio/webm'}:{};
      recorder=new MediaRecorder(stream,options);
      recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
      recorder.onstop=()=>{
        blob=new Blob(chunks,{type:recorder.mimeType||'audio/webm'});
        blobURL=URL.createObjectURL(blob);
        const player=document.createElement('audio');player.controls=true;player.src=blobURL;
        playback.replaceChildren(player);download.disabled=false;
        record.disabled=false;stop.disabled=true;releaseStream();
        setStatus('Đã ghi âm','Recorded');
      };
      recorder.start();record.disabled=true;stop.disabled=false;
      setStatus('Đang ghi âm','Recording');
    } catch(err){releaseStream();setStatus('Không có quyền dùng micro','Microphone unavailable');}
  });
  stop.addEventListener('click',()=>{
    if(recorder?.state==='recording')recorder.stop();
  });
  download.addEventListener('click',()=>{
    if(!blobURL||!blob)return;
    const a=document.createElement('a');a.href=blobURL;
    a.download=`Study-with-Jasmine-HSKK-${level}-speaking.${blob.type.includes('mp4')?'m4a':'webm'}`;
    document.body.appendChild(a);a.click();a.remove();
  });
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('#hskkSection [data-vi][data-en]').forEach(el=>{
      el.textContent=el.dataset[b.dataset.lang];
    });
    if(recorder?.state==='recording')setStatus('Đang ghi âm','Recording');
    else if(blob)setStatus('Đã ghi âm','Recorded');
    else setStatus('Sẵn sàng','Ready');
  }));
  window.addEventListener('pagehide',releaseStream);
  selectLevel(3);
})();
