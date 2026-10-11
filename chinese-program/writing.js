(() => {
'use strict';
const el=id=>document.getElementById(id);
const examples={
'你好':[['你好！','nǐ hǎo','Hello!','Xin chào!'],['老师，你好！','lǎo shī, nǐ hǎo','Hello, teacher!','Em chào thầy/cô!']],
'再见':[['老师，再见！','lǎo shī, zài jiàn','Goodbye, teacher!','Tạm biệt thầy/cô!']],
'我':[['我是学生。','wǒ shì xué shēng','I am a student.','Em là học sinh.']],
'什么':[['你叫什么？','nǐ jiào shén me','What is your name?','Bạn tên là gì?']],
'谁':[['他是谁？','tā shì shéi','Who is he?','Anh ấy là ai?']],
'爸爸':[['我爱爸爸。','wǒ ài bà ba','I love Dad.','Con yêu bố.']],
'妈妈':[['我爱妈妈。','wǒ ài mā ma','I love Mom.','Con yêu mẹ.']],
'狗':[['这是谁的狗？','zhè shì shéi de gǒu','Whose dog is this?','Đây là chó của ai?']],
'猫':[['我有一只猫。','wǒ yǒu yì zhī māo','I have a cat.','Tôi có một con mèo.']],
'苹果':[['我吃苹果。','wǒ chī píng guǒ','I eat an apple.','Tôi ăn táo.']],
'水':[['我喝水。','wǒ hē shuǐ','I drink water.','Tôi uống nước.']],
'今天':[['今天星期一。','jīn tiān xīng qī yī','Today is Monday.','Hôm nay là thứ Hai.']],
'现在':[['现在几点？','xiàn zài jǐ diǎn','What time is it now?','Bây giờ là mấy giờ?']]
};
let selected=0,charAt=0,writer=null,renderToken=0;
const terms=[...new Map(bank.map(w=>[w.zh,w])).values()];
const select=el('writeSelect');
terms.forEach((w,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent=`${w.zh} · ${w.py} · Lesson ${w.lesson}`;select.appendChild(o)});
function sentenceRows(w){
const preset=examples[w.zh];
if(preset)return preset;
const word=w.zh;
return [[word+'。',w.py,w.en,w.vi]];
}
function renderExamples(w){
el('exampleList').replaceChildren();
for(const [zh,py,en,vi] of sentenceRows(w)){
const row=document.createElement('div');row.className='example-row';
const copy=document.createElement('div');
for(const [cls,t] of [['cn',zh],['py',py],['meaning','🇬🇧 '+en],['meaning','🇻🇳 '+vi]]){
const div=document.createElement('div');div.className=cls;div.textContent=t;copy.appendChild(div)}
const b=document.createElement('button');b.className='light';b.textContent='🔊';b.title='Listen to example';b.onclick=()=>speech(zh);
row.append(copy,b);el('exampleList').appendChild(row);
}}
function draw(){
const token=++renderToken;
const w=terms[selected];const chars=[...w.zh].filter(ch=>/\p{Script=Han}/u.test(ch));
const ch=chars[charAt]||chars[0];
el('charCounter').textContent=chars.length?`${charAt+1} / ${chars.length}`:'No Hanzi';
const target=el('characterTarget');target.replaceChildren();
writer=null;
if(!ch){el('strokeStatus').textContent='Choose a word with a Chinese character.';return}
if(typeof HanziWriter==='undefined'){el('strokeStatus').textContent='Stroke animation library could not load. Check Internet access.';target.textContent=ch;target.style.fontSize='180px';target.style.textAlign='center';return}
target.style.fontSize='';target.style.textAlign='';
try{
writer=HanziWriter.create(target,ch,{width:296,height:296,padding:12,strokeColor:'#342447',radicalColor:'#dc5c82',outlineColor:'#eadfe7',drawingColor:'#d85f7e',showOutline:true,showCharacter:false,delayBetweenStrokes:220,strokeAnimationSpeed:1.1,
onLoadCharDataSuccess:()=>{if(token===renderToken)el('strokeStatus').textContent='Ready! Press Show stroke order or Practice strokes.'},
onLoadCharDataError:()=>{if(token===renderToken)el('strokeStatus').textContent='Stroke data unavailable for this character. Check Internet access.'}
});
}catch(err){el('strokeStatus').textContent='Unable to load character strokes.'}
}
function render(){
const w=terms[selected];charAt=0;
el('writeWord').textContent=w.zh;el('writePinyin').textContent=w.py;
el('writeMeaning').textContent='🇬🇧 '+w.en+'  ·  🇻🇳 '+w.vi;
renderExamples(w);draw();
}
select.addEventListener('change',()=>{selected=Number(select.value);render()});
el('prevChar').onclick=()=>{const n=[...terms[selected].zh].filter(ch=>/\p{Script=Han}/u.test(ch)).length;charAt=(charAt+n-1)%Math.max(n,1);draw()};
el('nextChar').onclick=()=>{const n=[...terms[selected].zh].filter(ch=>/\p{Script=Han}/u.test(ch)).length;charAt=(charAt+1)%Math.max(n,1);draw()};
el('animateChar').onclick=()=>{if(writer){el('strokeStatus').textContent='Watch the stroke order…';writer.animateCharacter({onComplete:()=>el('strokeStatus').textContent='Animation finished. Try writing it yourself!'})}};
el('quizChar').onclick=()=>{if(writer){el('strokeStatus').textContent='Draw each stroke with your mouse or finger.';writer.quiz({onComplete:()=>el('strokeStatus').textContent='Great writing! Character complete! 🎉'})}};
el('resetChar').onclick=draw;
el('hearWrite').onclick=()=>speech(terms[selected].zh);
document.querySelectorAll('[data-tab="writing"]').forEach(btn=>btn.addEventListener('click',()=>{if(!writer)draw()}));
document.addEventListener('click',event=>{const word=event.target.closest('.word');if(!word||event.target.closest('button'))return;const hanzi=word.querySelector('.cn')?.textContent;const i=terms.findIndex(w=>w.zh===hanzi);if(i<0)return;selected=i;select.value=String(i);render();document.querySelector('[data-tab="writing"]').click();el('writing').scrollIntoView({behavior:'smooth',block:'start'})});
render();
})();
