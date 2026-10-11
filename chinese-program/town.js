/* Little Town: original CSS-only educational mini-game. No AI images. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
let ctx,melodyTimer=null,music=true,sfx=true,playing=false,round=0,score=0,lives=3,seconds=20,tick=null,task=null,locked=false;
function audio(){try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==='suspended')ctx.resume()}catch{}}
function tone(freq,dur=.13,type='sine',vol=.075,delay=0){if(!ctx)return;const o=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);o.connect(g);g.connect(ctx.destination);o.start(t);o.stop(t+dur+.02)}
function fx(ok){if(!sfx)return;audio();if(ok){tone(523,.13);tone(659,.13,'sine',.06,.12);tone(784,.24,'sine',.06,.24)}else{tone(260,.16,'triangle');tone(210,.23,'triangle',.05,.16)}}
function musicLoop(){if(!music||!playing)return;audio();[392,440,523,440,392,330,349,392].forEach((f,i)=>tone(f,.19,'sine',.016,i*.25))}
function beginMusic(){clearInterval(melodyTimer);if(music){musicLoop();melodyTimer=setInterval(musicLoop,2300)}}
function endMusic(){clearInterval(melodyTimer);melodyTimer=null}
$('townMusic').onclick=()=>{music=!music;$('townMusic').textContent=music?'♫ Music ON':'♫ Music OFF';if(music)beginMusic();else endMusic()};
$('townSfx').onclick=()=>{sfx=!sfx;$('townSfx').textContent=sfx?'♪ SFX ON':'♪ SFX OFF'};
const icons={'苹果':'🍎','香蕉':'🍌','水果':'🍎','鸡蛋':'🥚','面包':'🍞','茶':'🍵','咖啡':'☕','书':'📚','本子':'📒','笔':'✏️','衣服':'👕','裤子':'👖','裙子':'👗','鞋':'👟','水':'💧','牛奶':'🥛','米饭':'🍚','鱼':'🐟','猫':'🐈','狗':'🐕','球':'⚽','电脑':'💻','手机':'📱','照片':'🖼️','礼物':'🎁','药':'💊','地图':'🗺️','自行车':'🚲'};
const basics=[
{zh:'苹果',py:'píngguǒ',en:'apple',vi:'táo',icon:'🍎'},
{zh:'香蕉',py:'xiāngjiāo',en:'banana',vi:'chuối',icon:'🍌'},
{zh:'书',py:'shū',en:'book',vi:'sách',icon:'📚'},
{zh:'笔',py:'bǐ',en:'pen',vi:'bút',icon:'✏️'},
{zh:'茶',py:'chá',en:'tea',vi:'trà',icon:'🍵'},
{zh:'鸡蛋',py:'jīdàn',en:'egg',vi:'trứng',icon:'🥚'},
{zh:'衣服',py:'yīfu',en:'clothes',vi:'quần áo',icon:'👕'},
{zh:'面包',py:'miànbāo',en:'bread',vi:'bánh mì',icon:'🍞'}
];
function products(){
const byChinese=new Map(bank.map(w=>[w.zh,w]));
let p=basics.filter(w=>byChinese.has(w.zh));
for(const w of bank){if(icons[w.zh]&&!p.some(x=>x.zh===w.zh))p.push({...w,icon:icons[w.zh]})}
return p.length>=4?p:basics;
}
function sample(arr){return arr[Math.floor(Math.random()*arr.length)]}
function shuffle(arr){return [...arr].sort(()=>Math.random()-.5)}
function renderStats(){$('townRound').textContent=Math.min(round,8);$('townScore').textContent=score;$('townLives').textContent=lives;$('townClock').textContent='⏱ '+seconds+'s'}
function speak(){if(task)window.playHumanMandarin?.(task.target.zh)}
$('townHear').onclick=speak;
function finish(){playing=false;clearInterval(tick);endMusic();$('townProducts').innerHTML='';$('townBubble').textContent=lives>0?'太棒了！ You finished your market shift!':'再试一次！ Try again!';$('townFeedback').textContent=`Final score: ${score} points · ${8-Math.max(0,round-1)} or fewer rounds remaining`; $('townStart').hidden=false;$('townStart').textContent='↻ Play again';$('townNext').hidden=true}
function next(){
clearInterval(tick);if(lives<=0||round>=8){finish();return}
round++;locked=false;seconds=20;
const all=products(),choices=shuffle(all).slice(0,Math.min(6,all.length)),target=sample(choices);
const amount=1+Math.floor(Math.random()*3);
task={target,amount,say:`我要${['','一个','两个','三个'][amount]}${target.zh}。`};
$('townBubble').innerHTML=`<strong>${task.say}</strong><small>Find ${amount} × ${target.en} · ${target.vi}</small>`;
$('townProducts').innerHTML=choices.map(w=>`<button class="town-product" data-item="${w.zh}"><span class="town-icon">${w.icon}</span><b>${w.zh}</b><small>${w.py}</small><span class="town-qty" data-count="${w.zh}">0</span></button>`).join('');
const counts={};choices.forEach(w=>counts[w.zh]=0);
$('townProducts').querySelectorAll('button').forEach(b=>b.onclick=()=>{if(locked)return;audio();const key=b.dataset.item;counts[key]=(counts[key]+1)%4;b.querySelector('.town-qty').textContent=counts[key];if(sfx)tone(480,.07,'sine',.04)});
const submit=document.createElement('button');submit.className='primary town-serve';submit.textContent='🛒 Serve customer';$('townProducts').append(submit);
submit.onclick=()=>{if(locked)return;const good=Object.entries(counts).every(([k,v])=>v===(k===target.zh?amount:0));resolve(good,good?'Perfect order! 太棒了！':`Try again: ${amount} × ${target.zh} (${target.en}).`)};
$('townFeedback').textContent='Tap products to add 0–3 items, then serve the customer.';
$('townNext').hidden=true;renderStats();
tick=setInterval(()=>{seconds--;renderStats();if(seconds<=0)resolve(false,'Time is up! Keep practising.')},1000)
}
function resolve(ok,msg){if(locked)return;locked=true;clearInterval(tick);fx(ok);if(ok)score+=100+seconds*5;else lives--;$('townFeedback').textContent=msg;renderStats();$('townNext').hidden=false;$('townNext').textContent=(round>=8||lives<=0)?'See results →':'Next customer →';$('townProducts').querySelectorAll('button').forEach(b=>b.disabled=true)}
$('townNext').onclick=next;
$('townStart').onclick=()=>{audio();playing=true;round=0;score=0;lives=3;$('townStart').hidden=true;beginMusic();next()};
})();
