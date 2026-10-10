"use strict";
const $=id=>document.getElementById(id);
const starts={1:[13,25,37,49,61],2:[13,27,41,55,69],3:[13,29,45,61,77]};
const answerStart={1:92,2:128,3:128};
const counts={1:{listening:20,reading:20,writing:0},2:{listening:35,reading:25,writing:0},3:{listening:40,reading:30,writing:10}};
let q=1,loop=null;
function level(){return +$('level').value}function test(){return +$('test').value}function skill(){return $('skill').value}
function key(){return `jasmine-book-hsk-${level()}-test-${test()}-${skill()}`}
function load(){try{return JSON.parse(localStorage.getItem(key()))||{}}catch{return {}}}
function store(data){localStorage.setItem(key(),JSON.stringify(data))}
function total(){return counts[level()][skill()]}
function book(){const l=level(),t=test();$('pdf').src=`./books/HSK${l}-mock-tests.pdf#page=${starts[l][t-1]}&view=FitH`;$('bookTitle').textContent=`HSK ${l} · Đề ${t} / Test ${t}`;$('audio').src=`./audio/mock-test-${l}.mp3`;}
function render(){const d=load(),n=total();if(n===0){$('skill').value='reading';return render()}q=Math.max(1,Math.min(q,n));$('questionTitle').textContent=`Câu ${q} / Question ${q}`;let answered=0;$('navigator').replaceChildren();for(let i=1;i<=n;i++){if(d[i]?.answer)answered++;const b=document.createElement('button');b.textContent=i;b.className=(i===q?'current ':'')+(d[i]?.answer?'done':'');b.onclick=()=>{q=i;render()};$('navigator').append(b)}$('answered').textContent=`${answered}/${n} answered`;$('progress').textContent=`${skill().toUpperCase()} · ${q}/${n}`;for(const b of $('choices').querySelectorAll('button')){b.classList.toggle('chosen',b.dataset.choice===d[q]?.answer)}$('listeningBox').classList.toggle('hidden',skill()!=='listening');const s=d[q]?.start,e=d[q]?.end;$('start').value=Number.isFinite(s)?s:'';$('end').value=Number.isFinite(e)?e:'';$('playClip').disabled=!(Number.isFinite(s)&&Number.isFinite(e)&&e>s);$('audioNote').textContent=$('playClip').disabled?'Chưa xác minh mốc nghe của câu này. Hãy tìm trong audio và đánh dấu thủ công.':`Đã lưu đoạn ${s.toFixed(1)}s–${e.toFixed(1)}s cho câu ${q} trên trình duyệt này.`;$('prev').disabled=q===1;$('next').disabled=q===n;}
for(const b of $('choices').querySelectorAll('button'))b.onclick=()=>{const d=load();d[q]={...d[q],answer:b.dataset.choice};store(d);render()};
$('prev').onclick=()=>{q--;render()};$('next').onclick=()=>{q++;render()};
function saveTime(field,value){const d=load();d[q]={...d[q],[field]:value};store(d);render()}
$('markStart').onclick=()=>saveTime('start',+$('audio').currentTime.toFixed(1));$('markEnd').onclick=()=>saveTime('end',+$('audio').currentTime.toFixed(1));
$('saveClip').onclick=()=>{const s=Number($('start').value),e=Number($('end').value);if(!$('start').value||!$('end').value||e<=s){alert('Mốc audio chưa hợp lệ / Invalid clip boundaries');return}const d=load();d[q]={...d[q],start:s,end:e};store(d);render()};
$('playClip').onclick=()=>{const d=load()[q];if(!d||!Number.isFinite(d.start)||!Number.isFinite(d.end)||d.end<=d.start)return;const a=$('audio');a.currentTime=d.start;a.play().catch(()=>{});clearInterval(loop);loop=setInterval(()=>{if(a.currentTime>=d.end||a.paused){a.pause();clearInterval(loop)}},100)};
$('answerKey').onclick=()=>{$('pdf').src=`./books/HSK${level()}-mock-tests.pdf#page=${answerStart[level()]+test()-1}&view=FitH`};
$('level').onchange=()=>{q=1;book();render()};$('test').onchange=()=>{q=1;book();render()};$('skill').onchange=()=>{q=1;render()};book();render();
