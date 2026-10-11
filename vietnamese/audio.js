/* Vietnamese audio for all Study with Jasmine Vietnamese pages.
   Primary: online Vietnamese TTS playback; fallback: installed vi-VN browser voice.
   No user voice-pack installation required for online playback.
   Online endpoint is third-party and may change or be blocked. */
(function () {
  'use strict';
  const synth = window.speechSynthesis;
  let player = null;
  let currentRequest = 0;
  let notice = null;

  function message(text) {
    if (!notice) {
      notice = document.createElement('div');
      notice.setAttribute('role', 'status');
      notice.style.cssText = 'position:fixed;bottom:18px;left:18px;right:18px;max-width:540px;margin:auto;z-index:99999;background:#fff9ed;border:1px solid #e1c9a5;border-radius:12px;padding:14px 42px 14px 16px;color:#193c32;box-shadow:0 8px 25px #0002;font:14px/1.5 system-ui';
      const close = document.createElement('button');
      close.type = 'button'; close.textContent = '×'; close.setAttribute('aria-label', 'Close notice');
      close.style.cssText = 'position:absolute;right:12px;top:6px;background:none;border:0;font-size:24px;cursor:pointer';
      close.onclick = () => notice.remove();
      notice.append(close);
    }
    [...notice.childNodes].filter(n => n.nodeType === 3).forEach(n => n.remove());
    notice.insertBefore(document.createTextNode(text), notice.firstChild);
    document.body.append(notice);
  }
  function viVoice() {
    if (!synth) return null;
    return synth.getVoices().find(v => /^vi(?:[-_]|$)/i.test(v.lang)) || null;
  }
  function browserFallback(text) {
    const voice = viVoice();
    if (!voice || !window.SpeechSynthesisUtterance) {
      message('Không tải được âm thanh tiếng Việt trực tuyến. Hãy kiểm tra kết nối Internet rồi thử lại. Website không sử dụng giọng tiếng Anh thay thế.');
      return;
    }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'vi-VN'; u.voice = voice; u.rate = 0.86;
    synth.cancel(); synth.speak(u);
  }
  function chunks(text, limit = 150) {
    const result = [];
    let rest = text.trim().replace(/\s+/g, ' ');
    while (rest.length > limit) {
      let cut = rest.lastIndexOf(' ', limit);
      if (cut < 40) cut = limit;
      result.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) result.push(rest);
    return result;
  }
  function stop() {
    ++currentRequest;
    if (player) { player.pause(); player.removeAttribute('src'); player.load(); }
    if (synth) synth.cancel();
  }
  function speak(text) {
    if (text == null || !String(text).trim()) return;
    stop();
    const request = currentRequest;
    const segments = chunks(String(text));
    if (!player) { player = new Audio(); player.preload = 'auto'; }
    let i = 0;
    function playNext() {
      if (request !== currentRequest) return;
      if (i >= segments.length) return;
      const segment = segments[i++];
      // Browser audio element can play cross-origin media without exposing its bytes to JS.
      const url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=' + encodeURIComponent(segment);
      player.onended = playNext;
      player.onerror = () => { if (request === currentRequest) browserFallback(segments.join(' ')); };
      player.src = url;
      const p = player.play();
      if (p && p.catch) p.catch(() => { if (request === currentRequest) browserFallback(segments.join(' ')); });
    }
    playNext();
  }
  window.JasmineVietnameseAudio = {
    speak, stop,
    hasVietnameseVoice: () => !!viVoice(),
    version: 'online-vi-20261011',
    voiceInfo: () => ({name: 'Vietnamese online audio', lang: 'vi-VN'})
  };
})();
