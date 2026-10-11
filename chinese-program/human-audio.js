/* Mandarin audio: licensed recordings when available; explicit device-voice fallback. */
(function () {
  'use strict';
  const base = 'https://cdn.jsdelivr.net/gh/hugolpz/audio-cmn@master/64k/hsk/cmn-';
  const player = new Audio();
  player.preload = 'none';
  let serial = 0;
  let timer;
  const voiceHelp = 'No Mandarin audio available. On Mac: System Settings → Accessibility → Spoken Content → System Voice → Manage Voices → Chinese (Mandarin). Install a voice, then restart Chrome.';
  function status(message, long = false) {
    const el = document.getElementById('humanAudioStatus');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(() => { el.hidden = true; }, long ? 14000 : 6500);
  }
  function fallback(word, id) {
    if (id !== serial) return;
    const synth = window.speechSynthesis;
    if (!synth || !window.SpeechSynthesisUtterance) { status(voiceHelp, true); return; }
    const voices = synth.getVoices();
    const voice = voices.find(v => /^zh[-_]CN$/i.test(v.lang)) || voices.find(v => /^zh/i.test(v.lang));
    if (!voice) { status(voiceHelp, true); return; }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    utterance.rate = .85;
    utterance.onstart = () => { if (id === serial) status('🔊 Computer-generated Mandarin voice: ' + word); };
    utterance.onerror = () => { if (id === serial) status(voiceHelp, true); };
    try { synth.speak(utterance); } catch (_) { status(voiceHelp, true); }
  }
  window.playHumanMandarin = function (input) {
    const word = String(input || '').trim().replace(/[。！？!?，,、；;：:]+$/u, '');
    if (!word) return;
    const id = ++serial;
    player.pause();
    player.removeAttribute('src');
    player.load();
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    player.onerror = () => fallback(word, id);
    player.onplaying = () => { if (id === serial) status('🎙️ Native-speaker recording: ' + word); };
    player.src = base + encodeURIComponent(word) + '.mp3';
    status('🔊 Loading recording: ' + word);
    const attempt = player.play();
    if (attempt?.catch) attempt.catch(() => fallback(word, id));
  };
  window.checkMandarinAudio = function () {
    const voices = window.speechSynthesis?.getVoices() || [];
    const zh = voices.filter(v => /^zh/i.test(v.lang));
    status(zh.length ? 'Mandarin voices installed: ' + zh.map(v => v.name).join(', ') : voiceHelp, true);
  };
})();
