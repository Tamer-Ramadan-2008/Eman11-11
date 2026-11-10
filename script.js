const $=s=>document.querySelector(s);
const screens=[...document.querySelectorAll('.screen')];
let current=0, started=false, langIndex=0, letterTimers=[];
const loveWords=[
"I love you","Je t’aime","Te amo","Ich liebe dich","Ti amo","Я тебя люблю","我爱你","사랑해","أحبك","मैं तुमसे प्यार करता हूँ",
"Eu te amo","Ik hou van jou","Jeg elsker deg","Jag älskar dig","Jeg elsker dig","愛してる","Seni seviyorum","Σ’ αγαπώ","אני אוהב אותך","আমি তোমাকে ভালোবাসি",
"நான் உன்னை காதலிக்கிறேன்","ನಾನು ನಿನ್ನನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ","ನಾನು ನಿನ್ನ ಪ್ರೀತಿಸುತ್ತೇನೆ","நான் உன்னை நேசிக்கிறேன்","நான் உன்னை காதலிக்கிறேன்","আমি তোমায় ভালোবাসি","मुझे तुमसे प्यार है","Te iubesc","Miluji tě","Kocham cię",
"Я кохаю тебе","Volim te","Ljubim te","Szeretlek","Mahal kita","Saya cinta kamu","Aku cinta kamu","ฉันรักคุณ","Tôi yêu bạn","ผมรักคุณ",
"אני אוהב אותך","אני אוהבת אותך","愛しています","사랑합니다","Люблю тебя","Обичам те","Te iubesc mult","Aš tave myliu","Es tevi mīlu","Ma armastan sind",
"Ik hou van je","Kuv hlub koj","Mi amas vin","Ndagukunda","Ngiyakuthanda","Nakupenda","Aloha wau iā ʻoe","我鍾意你","我喜欢你","我愛妳",
"Te quiero","Te adoro","Amo-te","Gosto muito de ti","S'agapo","Mwen renmen ou","Mo nifẹ rẹ","Ina son ka","Ke a go rata","Ndiyakuthanda",
"Ya tebya lyublyu","Main tumse pyar karta hoon","Main tumse pyar karti hoon","Tora dust daram","Man tumse mohabbat karta hoon","Mujhe tumse mohabbat hai","Naan unnai kadhalikkiren","Nenu ninnu premistunnanu","Naanu ninnannu preetisuttene","Enakku unnai pidikkum",
"Wo ai ni","Wǒ ài nǐ","Saranghae","Aishiteru","Kocham Cię","Te iubesc","Lubim ta","Obicham te","Ti tengu caru","Mi ta stimabo",
"Me amas","Amo te","Te dua","Të dua","Unë të dua","T'estimo","Et puc estimar","Ik hou van jou","Lubię cię","Love you",
"Maite zaitut","Seni çok seviyorum","Ech hunn dech gär","Tha gaol agam ort","Tá grá agam duit","Rwy'n dy garu di","Kärlek till dig","Jeg er glad i deg","Ég elska þig","T'estimo molt"
].slice(0,100);
const paragraphs=[
"هيححح… هاي هاي، إزيك يمنوشتي؟ عاملة إيه؟ يارب دايمًا بخير ❤️",
"طبعًا الهدايا المميزة والحلوة بتاعتنا لأحلى بنوتة في الدنيا. هو أنا ليا غيرك يعني أعمله وأميّزه؟ حبيبة قلبي اللي خطفت روحي مني. هحاول أطلع كلام جديد عشان عارف يمكن خلصت فيكي كلامي في الحب والغزل من كتر ما أنا مقضيها محن معاكي… بس عشان بحبك والله.",
"بيقولوا النهارده 11/11 يوم الحب العالمي… إيه الموضوع ده؟ أنا أول مرة أعرف أصلًا! كده كده أنا كل يوم بالنسبالي هو يوم حب عالمي عشان إنتِ موجودة معايا، وبس نسي في الدنيا. ربنا يديم وجودك في حياتي يارب، وميبعدناش عن بعض ويقربنا، ونتجوز بقى ونخلص من الحوار ده عشان زهقت من البُعد ده والله.",
"حقيقي مش عارف ألاقي كلام جديد ومش عايز أكرر فتزهقي مني… بس عارفة؟ بيقولوا إن الحب لوحده مش كفاية لو ماكنش معاه قرار. اكتشفت مؤخرًا إني مش بحبك بقلبي بس؛ أنا بحبك بقلبي كمشاعر، وبحبك بعقلي كتفكير فيكي وتفكير في وجودك وحياتنا، وبحبك بعيوني لما بقيت أحط عيني في الأرض قدام أي بنت.",
"دايمًا بحاول أكون ليكي حاجة مهمة، ويبقى وجودي في حياتك له أثر إيجابي، وأقدر أوفرلك كل اللي محتاجاه من دعم عاطفي أو معنوي. دايمًا بحاول أبقى الحب اللي يفهمك لما تبقي ساكتة، ويخفف عنك لما يحس إنك شايلة الهم، ويسندك لما تحسي إنك هتقعي، وأكون الإيد اللي تطبطب عليكي بحنية وقت ما الدنيا تيجي عليكي.",
"يمكن مكونش أنا أول حد تحبيه، بس إنتِ أول حد أحبه، وأتمنى بجد من كل قلبي إن أكون أنا أجمل حب عدى عليكي في حياتك، وأصدق شعور ومشاعر سكنت قلبك، وأكتر واحد حنين عليكي… أكتر من والدك ووالدتك. آه، بحبك أوي.",
"ومتعلق بيكي وبوجودك في حياتي، وبغير عليكي أوي من الهوا والله. يمكن ساعات بتيجي في بالي سيناريوهات إنك ممكن تبقي لحد غيري… متعرفيش والله أنا بولع إزاي وببقى متضايق وقتها أوي، مع إنها مجرد فكرة بس بغير عليكي.",
"وجودك مهم بالنسبالي، وإنتِ مهمة جدًا بالنسبالي. إنتِ قبل ما تبقي حبيبتي، إنتِ صاحبتي وأختي اللي بجري عليها، وأحب إني أشاركها تفاصيل يومي وحياتي، وأهتم بيها وبتفاصيلها وأسألها على كل كبيرة وصغيرة في حياتها.",
"آه يمكن الموضوع ده يخنقك أو يضايقك أو تحسي إني بسأل كتير وبقلق عليكي كتير… بس ده من حبي فيكي والله. يعني الحاجات دي مش بفكر فيها؛ السؤال عليكي بييجي مرة واحدة، بلاقي نفسي بحب أطمن عليكي دايمًا.",
"يعني لو فضلت أحكي مش هخلص، وهفضل أقول وأعيد وأزيد في حبك… ❤️"
];
function showScreen(n){screens[current].classList.remove('active');current=n;screens[current].classList.add('active');window.scrollTo({top:0,behavior:'smooth'});if(n===2) revealLetter();}
function spawnPetal(){const p=document.createElement('span');p.className='petal';p.textContent=['♥','✦','❀','♡'][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+'%';p.style.fontSize=(12+Math.random()*17)+'px';p.style.animationDuration=(8+Math.random()*9)+'s';$('#petals').appendChild(p);setTimeout(()=>p.remove(),18000)}
setInterval(spawnPetal,650);for(let i=0;i<12;i++)setTimeout(spawnPetal,i*250);
function burst(x,y){for(let i=0;i<7;i++){const h=document.createElement('span');h.className='float-heart';h.textContent=['♥','♡','✦'][i%3];h.style.left=x+'px';h.style.top=y+'px';h.style.setProperty('--dx',(Math.random()*150-75)+'px');h.style.fontSize=(14+Math.random()*18)+'px';document.body.appendChild(h);setTimeout(()=>h.remove(),1200)}}
document.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;burst(e.clientX,e.clientY)});
function setLang(){ $('#languageLove').textContent=loveWords[langIndex];$('#languageCount').textContent=`${langIndex+1} / 100`;$('#clockTick').style.transform=`rotate(${langIndex*3.6}deg)`;}
function beginExperience(){
  if(current !== 0) return;
  started = true;
  const audio = $('#music');
  if (audio && audio.getAttribute('src')) {
    audio.play().catch(() => {
      $('#toast').textContent = 'اتأكدي إن ملف eman-song.mp3 موجود بجانب index.html';
      $('#toast').style.opacity = 1;
      setTimeout(() => $('#toast').style.opacity = 0, 3500);
    });
  }
  burst(innerWidth/2, innerHeight/2);
  showScreen(1);
}
document.addEventListener('click', (event) => {
  const button = event.target.closest && event.target.closest('#startBtn');
  if (button) {
    event.preventDefault();
    event.stopPropagation();
    beginExperience();
  }
}, true);
$('#nextLang').addEventListener('click',()=>{if(langIndex<99){langIndex++;setLang()}else showScreen(2);burst(innerWidth/2,innerHeight/2)});
$('#prevLang').addEventListener('click',()=>{langIndex=Math.max(0,langIndex-1);setLang()});
function revealLetter(){const box=$('#letterContent');if(box.dataset.done)return;box.dataset.done='1';paragraphs.forEach((t,i)=>{const p=document.createElement('p');p.textContent=t;box.appendChild(p);setTimeout(()=>p.classList.add('visible'),650+i*1250)});}
$('#replay').addEventListener('click',()=>{const box=$('#letterContent');box.innerHTML='';delete box.dataset.done;revealLetter();window.scrollTo({top:0,behavior:'smooth'})});
setLang();
