'use strict';
// Lesson indexes are aligned to the PDF page sequence. Every scanned page is accessible.
(()=>{
 const course={
 2:{count:71,starts:[5,10,15,20,25,30,35,40,45,50,55,60],titles:[
 ['我可以坐这儿吗？','May I sit here?'],['你早上几点起床？','When do you get up in the morning?'],['你的铅笔呢？','Where is your pencil?'],['书包里有两本书。','There are two books in the schoolbag.'],['你会不会做饭？','Can you cook?'],['包子多少钱一个？','How much is one baozi?'],['今天比昨天热。','Today is hotter than yesterday.'],['马丁比我大三岁。','Martin is three years older than me.'],['你今天做什么了？','What did you do today?'],['你怎么了？',"What's wrong with you?"],['我来北京一年了。',"I've been in Beijing for one year."],['复习','Review']]},
 3:{count:64,starts:[5,10,15,20,25,30,35,40,45,50,55,60],titles:[
 ['我三年级。',"I'm in the third grade."],['你喜欢什么运动？',"What's your favorite sport?"],['我在画画儿呢。',"I'm drawing a picture."],['喂，您好！','Hello!'],['再吃几个。','Have some more.'],['我能自己穿。','I can put it on by myself.'],['生日快乐！','Happy birthday!'],['下雪了。',"It's snowing."],['笑一笑！','Smile!'],['谁跑得快？','Who runs fast?'],['妈妈把糖给弟弟了。','Mom has given the candy to your brother.'],['复习','Review']]}
 };
 const level=document.getElementById('yctLevel'),unit=document.getElementById('yctUnit'),img=document.getElementById('yctPageImage'),intro=document.getElementById('yctUnitIntro');
 let page=5;
 function esc(t){return String(t).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
 function endPage(){const c=course[level.value],i=+unit.value;return i===11?c.count:c.starts[i+1]-1}
 function update(){const c=course[level.value],i=+unit.value;page=Math.max(c.starts[i],Math.min(endPage(),page));const file=String(page).padStart(3,'0');img.src=`yct-books/yct${level.value}/${file}.jpg`;img.alt=`YCT ${level.value}, lesson ${i+1}, scanned PDF page ${page}`;document.getElementById('yctPageLabel').textContent=`Page ${page} / ${c.count} · Lesson ${i+1}`;document.getElementById('yctBottomLabel').textContent=`${page} / ${c.count}`;for(const id of ['yctPrev','yctPrevBottom'])document.getElementById(id).disabled=page<=c.starts[i];for(const id of ['yctNext','yctNextBottom'])document.getElementById(id).disabled=page>=endPage()}
 function lesson(){const c=course[level.value],i=+unit.value,t=c.titles[i];page=c.starts[i];intro.innerHTML=`<div class="yct-unit-note"><h3>Lesson ${i+1}: ${esc(t[0])}</h3><p>${esc(t[1])}</p><p><strong>Inside these pages:</strong> vocabulary (Let's learn), key sentence patterns, illustrated conversations, practice activities and story material, where included in the source book.</p><p>Scanned PDF pages ${c.starts[i]}–${endPage()}.</p></div>`;update()}
 function setup(){const c=course[level.value];unit.innerHTML=c.titles.map((t,i)=>`<option value="${i}">Lesson ${i+1} · ${esc(t[1])}</option>`).join('');lesson()}
 level.addEventListener('change',setup);unit.addEventListener('change',lesson);
 for(const id of ['yctPrev','yctPrevBottom'])document.getElementById(id).onclick=()=>{page--;update()};for(const id of ['yctNext','yctNextBottom'])document.getElementById(id).onclick=()=>{page++;update()};
 setup();
})();
