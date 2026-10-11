/* Study with Jasmine: strict Vietnamese-only playback.
   Plays a locally hosted recording when available, otherwise ONLY a vi voice.
   Never silently uses English. */
(() => {
  'use strict';
  const synth = window.speechSynthesis;
  const root = new URL('./audio-files/', document.currentScript?.src || location.href);
  const recordings = window.JASMINE_VI_AUDIO_FILES || {};
  let serial = 0, audio = null, toast = null;
  const normalize = value => String(value ?? '').normalize('NFC').trim().replace(/\s+/g, ' ');
  const voiceForVietnamese = () => {
    if (!synth) return null;
    const voices = synth.getVoices();
    return voices.find(v => /^vi[-_]VN$/i.test(v.lang)) || voices.find(v => /^vi(?:[-_]|$)/i.test(v.lang)) || null;
  };
  const notify = msg => {
    if (!toast) {
      toast = document.createElement('div');
      toast.setAttribute('role', 'status');
      toast.style.cssText = 'position:fixed;bottom:18px;left:50%;transform:translateX(-50%);z-index:99999;max-width:min(560px,92vw);padding:14px 20px;border:1px solid #decbb2;border-radius:12px;background:#fffaf1;color:#173d34;box-shadow:0 12px 28px #0002;font:14px/1.6 system-ui';
    }
    toast.textContent = msg;
    document.body.append(toast);
  };
  const stop = () => {
    ++serial;
    if (audio) { audio.pause(); audio.removeAttribute('src'); audio.load(); audio = null; }
    if (synth) synth.cancel();
  };
  const browserSpeak = (text, token) => {
    const voice = voiceForVietnamese();
    if (!voice || !synth || !window.SpeechSynthesisUtterance) {
      notify('Thiết bị chưa có giọng đọc tiếng Việt. Website sẽ không dùng giọng tiếng Anh thay thế. Để phát trên mọi thiết bị, cần thêm các file MP3 tiếng Việt vào website.');
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = 0.87;
    utterance.pitch = 1;
    utterance.onerror = e => { if (token === serial && e.error !== 'interrupted' && e.error !== 'canceled') notify('Không phát được giọng tiếng Việt trên trình duyệt này.'); };
    synth.cancel();
    synth.speak(utterance);
  };
  const speak = async value => {
    const text = normalize(value);
    if (!text) return;
    stop();
    const token = serial;
    if (toast) toast.remove();
    // Map exact Vietnamese text to an MP3 path: window.JASMINE_VI_AUDIO_FILES = {'xin chào':'xin-chao.mp3'}
    const file = recordings[text] || recordings[text.toLocaleLowerCase('vi')];
    if (file) {
      audio = new Audio(new URL(file, root).href);
      audio.onerror = () => { if (token === serial) browserSpeak(text, token); };
      try { await audio.play(); return; } catch (_) { if (token !== serial) return; }
    }
    if (token !== serial) return;
    // On some browsers the list is populated asynchronously after voiceschanged.
    if (!voiceForVietnamese() && synth) {
      await new Promise(resolve => {
        let done = false;
        const finish = () => { if (done) return; done = true; synth.removeEventListener?.('voiceschanged', finish); clearTimeout(timer); resolve(); };
        synth.addEventListener?.('voiceschanged', finish, {once:true});
        const timer = setTimeout(finish, 900);
      });
    }
    if (token === serial) browserSpeak(text, token);
  };
  window.JasmineVietnameseAudio = {speak, stop, hasVietnameseVoice: () => !!voiceForVietnamese(), voiceInfo: () => ({lang:'vi-VN', name:voiceForVietnamese()?.name || 'Vietnamese voice not available'}), version:'strict-vi-only-20261011'};
})();
