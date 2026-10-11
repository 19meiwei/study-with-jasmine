/* Level-first navigation: reuses existing grammar and vocabulary renderers. */
(()=>{'use strict';
const levels=[['A1','Beginner','Sơ cấp 1'],['A2','Elementary','Sơ cấp 2'],['B1','Intermediate','Trung cấp 1'],['B2','Upper intermediate','Trung cấp 2'],['C1','Advanced','Nâng cao']];
const $=id=>document.getElementById(id);
const grammarTopics=Object.entries(window.GRAMMAR_GROUPS||{}).flatMap(([group,topics])=>topics.map((t,i)=>({level:group==='Foundations'?'A1':group==='Tenses & time'?(i<6?'A2':i<12?'B1':'B2'):group==='Verbs & modals'?'B1':group==='Questions & negatives'?'A2':group==='Clauses & advanced'?(i<9?'B2':'C1'):'B1'})));
const vocab=window.JASMINE_VOCAB||[];
function mount(kind,items){const host=$(kind+'LevelCards'),body=$(kind+'LibraryBody'),bar=$(kind+'SelectedBar'),title=$(kind+'SelectedTitle');let selected=null;
 host.innerHTML=levels.map(([lv,en,vi])=>`<button type="button" class="cefr-card" data-pick="${lv}" aria-pressed="false"><span class="cefr-number">${lv}</span><span class="cefr-name">${en}</span><span class="cefr-vi">${vi}</span><span class="cefr-count">${items.filter(x=>x.level===lv).length} ${kind==='grammar'?'topics':'words'} ↗</span></button>`).join('');
 function pick(lv){selected=lv;body.hidden=!lv;bar.hidden=!lv;title.textContent=lv?`${lv} · ${levels.find(x=>x[0]===lv)[1]} / ${levels.find(x=>x[0]===lv)[2]}`:'';host.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pick===lv)));
 if(kind==='grammar'){$('level').value=lv||'all';$('level').dispatchEvent(new Event('change',{bubbles:true}));}
 else{const button=$('vocabLevels').querySelector(`[data-level="${lv||'all'}"]`);if(button)button.click();}
 if(lv)bar.scrollIntoView({block:'nearest',behavior:'smooth'});
 }
 host.addEventListener('click',e=>{const b=e.target.closest('[data-pick]');if(b)pick(b.dataset.pick)});
 $(kind+'CloseLevel').addEventListener('click',()=>pick(null));
 if(kind==='grammar')$('level').addEventListener('change',e=>{if(e.target.value!==selected&&e.target.value!=='all')pick(e.target.value)});
 }
mount('grammar',grammarTopics);mount('vocab',vocab);
})();
