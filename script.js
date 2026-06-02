// ===== WINDOW MANAGEMENT =====
function openWindow(id){
  if(id.indexOf('win-')!==0)id='win-'+id;
  var w=document.getElementById(id);
  if(!w)return;
  w.classList.add('active');
  w.style.zIndex=++zIdx;
  if(w.classList.contains('active'))playRestoreSound();
  updateTabs();
}

function closeWin(id){
  if(id.indexOf('win-')!==0)id='win-'+id;
  var w=document.getElementById(id);
  if(w){w.classList.remove('active');playClickSound()}
  updateTabs();
}

function minimizeWin(id){
  if(id.indexOf('win-')!==0)id='win-'+id;
  var w=document.getElementById(id);
  if(w){w.classList.remove('active');playMinimizeSound()}
  updateTabs();
}

function maximizeWin(id){
  if(id.indexOf('win-')!==0)id='win-'+id;
  var w=document.getElementById(id);
  if(!w)return;
  if(w.dataset.max==='true'){
    w.style.top=w.dataset.origTop;
    w.style.left=w.dataset.origLeft;
    w.style.width=w.dataset.origWidth;
    w.style.height=w.dataset.origHeight;
    w.dataset.max='false';
    w.classList.remove('maximized');
  }else{
    w.dataset.origTop=w.style.top;
    w.dataset.origLeft=w.style.left;
    w.dataset.origWidth=w.style.width;
    w.dataset.origHeight=w.style.height;
    w.style.top='0';
    w.style.left='0';
    w.style.width='100%';
    w.style.height='calc(100vh - 30px)';
    w.dataset.max='true';
    w.classList.add('maximized');
  }
}

var zIdx=10;

function switchWindow(id){
  if(id.indexOf('win-')!==0)id='win-'+id;
  var w=document.getElementById(id);
  if(!w)return;
  if(w.classList.contains('active')){
    minimizeWin(id);
  }else{
    openWindow(id);
  }
}

function updateTabs(){
  document.querySelectorAll('.task-tab').forEach(function(t){
    var w=document.getElementById(t.dataset.win);
    t.classList.toggle('active',w&&w.classList.contains('active'));
  });
}

// ===== DRAGGING =====
var dragEl=null,dragOff={x:0,y:0};

function dragStart(e,id){
  if(id.indexOf('win-')!==0)id='win-'+id;
  var w=document.getElementById(id);
  if(!w||w.dataset.max==='true')return;
  dragEl=w;
  var pos=getEventPos(e);
  dragOff.x=pos.x-w.offsetLeft;
  dragOff.y=pos.y-w.offsetTop;
  w.style.zIndex=++zIdx;
  e.preventDefault();
}

function getEventPos(e){
  if(e.touches&&e.touches.length)return{x:e.touches[0].clientX,y:e.touches[0].clientY};
  return{x:e.clientX,y:e.clientY};
}

function dragMove(e){
  if(!dragEl)return;
  var pos=getEventPos(e);
  dragEl.style.left=(pos.x-dragOff.x)+'px';
  dragEl.style.top=(pos.y-dragOff.y)+'px';
  e.preventDefault();
}

function dragEnd(){dragEl=null}

document.addEventListener('mousemove',dragMove);
document.addEventListener('mouseup',dragEnd);
document.addEventListener('touchmove',dragMove,{passive:false});
document.addEventListener('touchend',dragEnd);

// ===== START MENU =====
function toggleStartMenu(){
  playClickSound();
  document.getElementById('startMenu').classList.toggle('hidden');
}

document.addEventListener('click',function(e){
  if(!e.target.closest('.start-menu')&&!e.target.closest('.start-btn')){
    document.getElementById('startMenu').classList.add('hidden');
  }
});

// ===== ANIMATION TOGGLE =====
function toggleAnim(el){
  document.body.classList.toggle('no-anim');
  el.textContent=el.textContent==='On'?'Off':'On';
}

// ===== DESKTOP ICONS TOGGLE =====
function toggleIcons(el){
  var icons=document.querySelector('.icons');
  icons.style.display=icons.style.display==='none'?'flex':'none';
  el.textContent=icons.style.display==='none'?'Off':'On';
}

// ===== SETTINGS =====
function saveSettings(){closeWin('win-config')}

// ===== PROJECT DETAIL =====
function openWebProjDetail(proj){
  document.getElementById('pdetail-icon').src='https://win98icons.alexmeub.com/icons/png/msie1-2.png';
  document.getElementById('pdetail-title').textContent=proj.t+' - Internet Explorer';
  document.getElementById('pdetail-menubar').innerHTML='<span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Help</span>';
  document.getElementById('pdetail-web-url').textContent='http://localhost/'+proj.name.toLowerCase().replace(/\s+/g,'-')+'/';
  ['pdetail-web','pdetail-java','pdetail-game'].forEach(function(id){
    document.getElementById(id).style.display='none';
  });
  document.getElementById('pdetail-web').style.display='';

  var badge=document.getElementById('pdetail-badge-w');
  badge.textContent='Web Project';
  badge.className='pdetail-badge pbadge-web';

  document.getElementById('pdetail-desc-w').textContent=proj.d;

  var tagBox=document.getElementById('pdetail-tags-w');
  tagBox.innerHTML='';
  if(proj.tags)proj.tags.split(',').forEach(function(t){
    tagBox.innerHTML+='<span class="pdetail-tag">'+t.trim()+'</span>';
  });

  document.getElementById('pdetail-link-w').href=proj.link;

  var wrap=document.getElementById('pdetail-imgwrap-w');
  var shot=document.getElementById('pdetail-screenshot-w');
  if(proj.img){
    shot.src=proj.img;
    wrap.style.display='block';
    wrap.onclick=function(){openImgModal(proj.img,proj.t)};
  }else{wrap.style.display='none'}

  showProjDetailTab('web',proj.t);
}

function openJavaProjDetail(proj){
  document.getElementById('pdetail-icon').src='https://win98icons.alexmeub.com/icons/png/regedit-0.png';
  document.getElementById('pdetail-title').textContent=proj.t+' - Java Console';
  document.getElementById('pdetail-menubar').innerHTML='<span>File</span><span>Edit</span><span>View</span><span>Help</span>';
  ['pdetail-web','pdetail-java','pdetail-game'].forEach(function(id){
    document.getElementById(id).style.display='none';
  });
  document.getElementById('pdetail-java').style.display='';

  document.getElementById('pdetail-link-j').href=proj.link;

  var wrap=document.getElementById('pdetail-imgwrap-j');
  var shot=document.getElementById('pdetail-screenshot-j');
  if(proj.img){
    shot.src=proj.img;
    wrap.style.display='block';
    wrap.onclick=function(){openImgModal(proj.img,proj.t)};
  }else{wrap.style.display='none'}

  // CMD typing animation with integrated info
  var term=document.getElementById('java-term-lines');
  term.innerHTML='';
  var cmd='C:\\Projects\\> java -jar '+proj.exe;
  var lines=[
    '[INFO] Starting '+proj.name+'...',
    '[INFO] Loading dependencies...',
    '[SUCCESS] Application loaded',
    '--- Project Info ---',
    proj.d,
    'Technologies: '+proj.tags
  ];
  var i=0;
  function typeCmd(){
    if(i<cmd.length){
      term.innerHTML='<div class="term-line"><span style="color:#fff">C:\\Projects\\&gt;</span> '+cmd.slice(0,i+1)+'<span class="term-blink">_</span></div>';
      i++;
      setTimeout(typeCmd,40);
    }else{
      term.innerHTML='<div class="term-line"><span style="color:#fff">C:\\Projects\\&gt;</span> '+cmd+'</div>';
      showOutputLines(0);
    }
  }
  function showOutputLines(n){
    if(n<lines.length){
      var sty='';
      if(n===2){sty='color:#fff';} // success
      else if(n===3){sty='color:#888';} // separator
      term.innerHTML+='<div class="term-line" style="'+sty+'">'+lines[n]+'</div>';
      setTimeout(function(){showOutputLines(n+1)},350);
    }else{
      term.innerHTML+='<div class="term-line" style="color:#888">--------------------------------</div>';
      term.innerHTML+='<div class="term-line"><span style="color:#fff">C:\\Projects\\&gt;</span><span class="term-blink">_</span></div>';
    }
  }
  setTimeout(typeCmd,300);

  showProjDetailTab('java',proj.t);
}

function openGameProjDetail(proj){
  document.getElementById('pdetail-icon').src='https://win98icons.alexmeub.com/icons/png/joystick-0.png';
  document.getElementById('pdetail-title').textContent=proj.t+' - Game Launcher';
  document.getElementById('pdetail-menubar').innerHTML='<span>File</span><span>Edit</span><span>View</span><span>Help</span>';
  ['pdetail-web','pdetail-java','pdetail-game'].forEach(function(id){
    document.getElementById(id).style.display='none';
  });
  document.getElementById('pdetail-game').style.display='';

  var badge=document.getElementById('pdetail-badge-g');
  badge.textContent='Visual Novel';
  badge.className='pdetail-badge pbadge-game';

  document.getElementById('pdetail-desc-g').textContent=proj.d;

  var tagBox=document.getElementById('pdetail-tags-g');
  tagBox.innerHTML='';
  if(proj.tags)proj.tags.split(',').forEach(function(t){
    tagBox.innerHTML+='<span class="pdetail-tag">'+t.trim()+'</span>';
  });

  document.getElementById('pdetail-link-g').href=proj.link;

  var splash=document.getElementById('game-splash-img');
  if(proj.img){
    splash.src=proj.img;
    splash.onclick=function(){openImgModal(proj.img,proj.t)};
    splash.style.cursor='pointer';
  }

  // Reset splash
  var splashEl=document.getElementById('game-splash');
  splashEl.classList.remove('launched');

  currentGameProj=proj;
  showProjDetailTab('game',proj.t);
}

var currentGameProj=null;
function launchGame(){
  if(!currentGameProj)return;
  var splash=document.getElementById('game-splash');
  splash.classList.add('launched');
}

function showProjDetailTab(cat,label){
  var tabs=['projdetail','projdetail-web','projdetail-java','projdetail-game'];
  tabs.forEach(function(id){
    document.getElementById('tab-'+id).style.display='none';
  });
  var tabId,tabIconId,tabTextId;
  if(cat==='web'){tabId='tab-projdetail-web';tabIconId='tab-projdetail-icon-web';tabTextId='tab-projdetail-text-web'}
  else if(cat==='java'){tabId='tab-projdetail-java';tabIconId='tab-projdetail-icon-java';tabTextId='tab-projdetail-text-java'}
  else if(cat==='game'){tabId='tab-projdetail-game';tabIconId='tab-projdetail-icon-game';tabTextId='tab-projdetail-text-game'}
  else{tabId='tab-projdetail';tabIconId='tab-projdetail-icon';tabTextId='tab-projdetail-text'}
  document.getElementById(tabId).style.display='';
  var t=label.length>14?label.slice(0,14)+'...':label;
  document.getElementById(tabTextId).textContent=t;
  // Set icon
  var icons={'web':'https://win98icons.alexmeub.com/icons/png/msie1-2.png','java':'https://win98icons.alexmeub.com/icons/png/regedit-0.png','game':'https://win98icons.alexmeub.com/icons/png/joystick-0.png'};
  document.getElementById(tabIconId).src=icons[cat]||'https://win98icons.alexmeub.com/icons/png/notepad-2.png';
}

function openImgModal(src,title){
  var modal=document.getElementById('imgModal');
  var img=document.getElementById('imgModalImg');
  document.getElementById('imgModalTitle').textContent=title||'Screenshot';
  modal.classList.remove('hidden');
  img.style.opacity='0.3';
  img.src=src;
  img.onload=function(){img.style.opacity='1'};
}
function closeImgModal(){
  document.getElementById('imgModal').classList.add('hidden');
  document.getElementById('imgModalImg').src='';
}

// ===== PROJECT EXPLORER =====
var projData=[
  {cat:'web',name:'Portfolio Site',exe:'portfolio.exe',t:'Portfolio Site',d:'A fully interactive Windows 98-themed portfolio that simulates a retro desktop environment. Features draggable windows with title bars and resize handles, a functional taskbar with Start menu, desktop icons, boot/shutdown animations with BIOS screen, a file-explorer style project browser, and a built-in music player. Every element mimics the Win98 UX — from beveled borders and pixel icons to the classic teal wallpaper. Built from scratch with vanilla HTML, CSS, and JavaScript without any frameworks.',tags:'HTML,CSS,JavaScript',link:'https://github.com/shiruri/portfolio-page',img:'Documents/portfolio.png',icon:'https://win98icons.alexmeub.com/icons/png/msie1-2.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'index.html',size:'3 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'style.css',size:'12 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'script.js',size:'8 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'README.md',size:'1 KB'}
   ]},
  {cat:'java',name:'MPOS System',exe:'mpos.exe',t:'MPOS System',d:'A full-featured Point of Sale system built with Java Swing and MySQL. Handles transaction processing with receipt generation, real-time inventory tracking with low-stock alerts, admin dashboard with sales analytics, employee management with role-based access control, and customer loyalty program. Features a clean Swing GUI with responsive layouts and keyboard shortcuts for fast checkout.',tags:'Java,Swing,MySQL,OOP',link:'https://github.com/shiruri/MPOS',img:'Documents/mpos.png',icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'Main.java',size:'6 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'POSFrame.java',size:'18 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'Database.java',size:'4 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',name:'lib/',dir:true}
   ]},
  {cat:'java',name:'Elysium',exe:'elysium.exe',t:'Elysium',d:'A custom programming language interpreter written entirely in Java. Features a BASIC-inspired syntax with a full tokenizer, recursive-descent parser generating an AST, and a tree-walking executor. Supports variables, conditionals, loops, functions, and basic I/O. Includes error reporting with line numbers and a REPL for interactive coding. Demonstrates compiler design principles from the ground up.',tags:'Java,Interpreter,AST',link:'https://github.com/shiruri/Elysium/tree/main',img:'Documents/ELYSIUM.png',icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'Interpreter.java',size:'12 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'Tokenizer.java',size:'8 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'Parser.java',size:'10 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'ASTNode.java',size:'5 KB'}
   ]},
  {cat:'java',name:'Cosnima',exe:'cosnima.exe',t:'Cosnima',d:'A full-stack social platform for cosplay and anime enthusiasts built with Spring Boot and vanilla JavaScript. Features user profiles with cosplay galleries, JWT-authenticated API, post feeds with likes and comments, event organization for conventions, and a marketplace for cosplay commissions. MySQL database with optimized queries for social feed performance.',tags:'Java,Spring Boot,JWT',link:'https://github.com/shiruri/Cosnima',img:'Documents/cosnima.jpeg',icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'Application.java',size:'3 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'UserController.java',size:'7 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'AuthService.java',size:'6 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'application.yml',size:'2 KB'}
   ]},
  {cat:'java',name:'Elysiae HMS',exe:'elysiae.exe',t:'Elysiae HMS',d:'A comprehensive Hospital Management System built with Spring Boot, JWT security, and MySQL. Supports 8 distinct roles (Admin, Doctor, Nurse, Pharmacist, Lab Tech, Receptionist, Patient, Insurance) with fine-grained RBAC. Features full patient lifecycle management from admission to discharge, appointment scheduling, electronic medical records, pharmacy inventory, lab test tracking, billing, and insurance claims. Built with accessibility in mind following WCAG guidelines.',tags:'Java,Spring Boot,MySQL,RBAC',link:'https://github.com/shiruri/Elysiae',img:'Documents/Elysiae_HMS.PNG',icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'HospitalApplication.java',size:'3 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'PatientService.java',size:'9 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'RBACConfig.java',size:'5 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',name:'entities/',dir:true}
   ]},
  {cat:'game',name:'Digital Love',exe:'digitallove.exe',t:'Digital Love',d:"A heartfelt Ren'Py visual novel that blends a romantic coming-of-age story with interactive programming education. Follow the journey of a student who discovers love while learning to code. Features branching dialogue that affects relationships, integrated coding mini-challenges that teach HTML/CSS/JS fundamentals, original character art, multiple endings, and a chiptune soundtrack. Designed to make programming approachable through narrative.",tags:"Ren'Py,Visual Novel",link:'https://shiroi26.itch.io/digital-love',img:'Documents/digital.png',icon:'https://win98icons.alexmeub.com/icons/png/joystick-0.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'script.rpy',size:'24 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'gui.rpy',size:'15 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',name:'audio/',dir:true},
     {icon:'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',name:'images/',dir:true}
   ]},
  {cat:'game',name:'Paperweight',exe:'paperweight.exe',t:'Paperweight',d:"A poignant Ren'Py visual novel exploring student life, mental health, and the weight of expectations. Features branching narrative with meaningful choices that impact the protagonist's mental state, multiple endings reflecting different life paths, original soundtrack, and hand-drawn art. Tackles themes of anxiety, depression, friendship, and self-discovery with sensitivity and authenticity.",tags:'Ren\'Py,Mental Health',link:'https://shiroi26.itch.io/paperweigth',img:'Documents/paperweight.png',icon:'https://win98icons.alexmeub.com/icons/png/joystick-0.png',
   files:[
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'script.rpy',size:'32 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'screens.rpy',size:'12 KB'},
     {icon:'https://win98icons.alexmeub.com/icons/png/directory_closed-0.png',name:'audio/',dir:true},
     {icon:'https://win98icons.alexmeub.com/icons/png/notepad-2.png',name:'README.txt',size:'1 KB'}
   ]}
];

function navigateFolder(cat,el){
  document.querySelectorAll('.tree-item').forEach(function(t){t.classList.remove('tree-active')});
  if(el)el.classList.add('tree-active');
  var path='C:\\My Projects\\';
  if(cat!=='all')path+=cat.charAt(0).toUpperCase()+cat.slice(1)+'\\';
  document.getElementById('projPath').textContent=path;
  var container=document.getElementById('projFiles');
  container.innerHTML='';
  if(cat==='all'){
    // Show projects as folders under each category
    projData.forEach(function(p){
      var row=document.createElement('div');
      row.className='file-item';
      row.innerHTML='<img src="https://win98icons.alexmeub.com/icons/png/directory_closed-0.png" class="file-icon"><span class="file-name file-exe">'+p.name+'\\</span>';
      container.appendChild(row);
    });
  }else{
    // Show project folders for this category
    var projects=projData.filter(function(p){return p.cat===cat});
    projects.forEach(function(p){
      var row=document.createElement('div');
      row.className='file-item';
      row.innerHTML='<img src="https://win98icons.alexmeub.com/icons/png/directory_closed-0.png" class="file-icon"><span class="file-name">'+p.name+'</span>';
      row.onclick=function(){openProjFolder(p)};
      container.appendChild(row);
    });
  }
}

var currentFolder=null;
var currentExe=null;

function openProjFolder(proj){
  currentFolder=proj;
  currentExe=null;
  document.getElementById('projPath').textContent='C:\\My Projects\\'+proj.cat.charAt(0).toUpperCase()+proj.cat.slice(1)+'\\'+proj.name+'\\';
  var container=document.getElementById('projFiles');
  container.innerHTML='';
  // Primary entry
  var isWeb=proj.cat==='web';
  var entryName=isWeb?'index.html':proj.exe;
  var entryRow=document.createElement('div');
  entryRow.className='file-item';
  entryRow.innerHTML='<img src="'+proj.icon+'" class="file-icon"><span class="file-name file-exe">'+entryName+'</span>';
  entryRow.onclick=function(){openProjWithLoad(proj)};
  container.appendChild(entryRow);
  // Separator
  var sep=document.createElement('div');
  sep.style.cssText='border-bottom:1px solid #c0c0c0;margin:4px 8px';
  container.appendChild(sep);
  // Project-specific dummy files
  (proj.files||[]).forEach(function(f){
    var row=document.createElement('div');
    row.className='file-item';
    var cls='file-name'+(f.dir?' file-type-dir':'');
    row.innerHTML='<img src="'+f.icon+'" class="file-icon"><span class="'+cls+'">'+f.name+'</span>';
    if(f.size)row.innerHTML+='<span class="file-size">'+f.size+'</span>';
    container.appendChild(row);
  });
}

function openProjWithLoad(proj){
  // Show loading screen with tag-specific messages
  var msgs={
    web:['Loading web project...','Fetching repository...','Building assets...','Opening browser preview...'],
    java:['Initializing JVM...','Compiling sources...','Loading dependencies...','Starting application...'],
    game:['Loading engine...','Preparing assets...','Initializing rendering...','Launching game...']
  };
  var list=msgs[proj.cat]||['Loading project...'];
  var loadWrap=document.getElementById('projLoadScreen');
  var loadText=document.getElementById('projLoadText');
  loadText.innerHTML='';
  document.getElementById('overlayWrap').classList.remove('hidden');
  loadWrap.classList.add('active');
  list.forEach(function(t,i){
    setTimeout(function(){
      loadText.innerHTML+='<div class="bios-line">'+t+'</div>';
    },i*300);
  });
  setTimeout(function(){
    loadWrap.classList.remove('active');
    loadText.innerHTML='';
    document.getElementById('overlayWrap').classList.add('hidden');
    if(proj.cat==='web')openWebProjDetail(proj);
    else if(proj.cat==='java')openJavaProjDetail(proj);
    else openGameProjDetail(proj);
    openWindow('win-projdetail');
  },list.length*300+300);
}

// Open projects on load
navigateFolder('all',document.querySelector('.tree-root'));

// ===== CLOCK =====
function updateClock(){
  var now=new Date();
  var h=now.getHours()%12||12;
  var m=String(now.getMinutes()).padStart(2,'0');
  var ap=now.getHours()>=12?'PM':'AM';
  document.getElementById('clock').textContent=h+':'+m+' '+ap;
}
setInterval(updateClock,1000);
updateClock();

// ===== WINDOW CLICK TO FOCUS =====
document.querySelectorAll('.window').forEach(function(w){
  w.addEventListener('mousedown',function(){this.style.zIndex=++zIdx});
  w.addEventListener('touchstart',function(){this.style.zIndex=++zIdx},{passive:true});
});

// ===== MUSIC PLAYER =====
var audio=null;
function playMusic(){
  var btn=document.getElementById('playBtn');
  if(audio&&audio.paused===false){
    audio.pause();
    btn.innerHTML='&#9654;';
    document.getElementById('musicGifPlay').style.opacity='0';
    return;
  }
  if(!audio){
    audio=new Audio('Documents/track.mp3');
    audio.volume=document.getElementById('musicVolume').value/100;
    audio.addEventListener('timeupdate',updateMusicProgress);
    audio.addEventListener('ended',function(){
      document.getElementById('playBtn').innerHTML='&#9654;';
      document.getElementById('musicGifPlay').style.opacity='0';
    });
  }
  audio.play();
  btn.innerHTML='&#9646;&#9646;';
  document.getElementById('musicGifPlay').style.opacity='1';
}
function updateMusicProgress(){
  var a=audio;
  if(!a||!a.duration)return;
  var pct=(a.currentTime/a.duration)*100;
  document.getElementById('musicProgress').style.width=pct+'%';
  var cur=Math.floor(a.currentTime);
  var dur=Math.floor(a.duration);
  document.getElementById('musicTime').textContent=
    Math.floor(cur/60)+':'+String(cur%60).padStart(2,'0')+' / '+
    Math.floor(dur/60)+':'+String(dur%60).padStart(2,'0');
}
function setVolume(v){
  if(audio)audio.volume=v/100;
}

// ===== SOUND EFFECTS (Web Audio API) =====
var soundEnabled=localStorage.getItem('sound')!=='off';
var audioCtx=null;
function getAudioCtx(){
  if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq,duration,type,vol,startDelay){
  if(!soundEnabled)return;
  var ctx=getAudioCtx();
  var t=(startDelay||0)+ctx.currentTime;
  var osc=ctx.createOscillator();
  var gain=ctx.createGain();
  osc.type=type||'sine';
  osc.frequency.setValueAtTime(freq,t);
  gain.gain.setValueAtTime(vol||0.15,t);
  gain.gain.exponentialRampToValueAtTime(0.001,t+duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t+duration);
}

function playStartupSound(){
  if(!soundEnabled)return;
  var s=new Audio('Documents/open.wav');
  s.volume=.5;s.play();
}

function playExitSound(callback){
  if(!soundEnabled){if(callback)setTimeout(callback,100);return}
  var s=new Audio('Documents/Exit%20windows.wav');
  s.volume=.5;
  s.onended=function(){if(callback)callback()};
  s.play();
}

function playClickSound(){playTone(660,0.04,'square',0.08)}
function playMinimizeSound(){
  if(!soundEnabled)return;
  var ctx=getAudioCtx();
  var t=ctx.currentTime;
  var osc=ctx.createOscillator();
  var gain=ctx.createGain();
  osc.type='sine';
  osc.frequency.setValueAtTime(500,t);
  osc.frequency.exponentialRampToValueAtTime(180,t+0.12);
  gain.gain.setValueAtTime(0.12,t);
  gain.gain.exponentialRampToValueAtTime(0.001,t+0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t+0.12);
}
function playRestoreSound(){
  if(!soundEnabled)return;
  var ctx=getAudioCtx();
  var t=ctx.currentTime;
  var osc=ctx.createOscillator();
  var gain=ctx.createGain();
  osc.type='sine';
  osc.frequency.setValueAtTime(180,t);
  osc.frequency.exponentialRampToValueAtTime(500,t+0.12);
  gain.gain.setValueAtTime(0.12,t);
  gain.gain.exponentialRampToValueAtTime(0.001,t+0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t+0.12);
}
function playCriticalSound(){
  playTone(440,0.18,'square',0.25);
  setTimeout(function(){playTone(440,0.18,'square',0.25)},250);
}

function toggleSound(el){
  soundEnabled=!soundEnabled;
  localStorage.setItem('sound',soundEnabled?'on':'off');
  el.textContent=soundEnabled?'On':'Off';
}



// ===== WINDOW RESIZE =====
document.querySelectorAll('.window').forEach(function(w){
  var h=document.createElement('div');
  h.className='resize-handle';
  w.appendChild(h);
  h.addEventListener('mousedown',function(e){startResize(e,w)});
  h.addEventListener('touchstart',function(e){startResize(e,w)},{passive:true});
});

var resizeData=null;

function startResize(e,w){
  if(w.dataset.max==='true')return;
  resizeData={win:w,startX:e.clientX||e.touches[0].clientX,startY:e.clientY||e.touches[0].clientY,startW:w.offsetWidth,startH:w.offsetHeight};
  e.preventDefault();
}

function doResize(e){
  if(!resizeData)return;
  var w=resizeData.win;
  var x=e.clientX||(e.touches&&e.touches[0].clientX)||0;
  var y=e.clientY||(e.touches&&e.touches[0].clientY)||0;
  if(!x)return;
  var newW=Math.max(240,resizeData.startW+(x-resizeData.startX));
  var newH=Math.max(100,resizeData.startH+(y-resizeData.startY));
  w.style.width=newW+'px';
  w.style.height=newH+'px';
}

function endResize(){resizeData=null}

document.addEventListener('mousemove',doResize);
document.addEventListener('mouseup',endResize);
document.addEventListener('touchmove',doResize,{passive:true});
document.addEventListener('touchend',endResize);

// ===== SHUT DOWN / RESTART =====
function resetBootAnim(){
  var bar=document.getElementById('bootProgressBar');
  if(!bar)return;
  bar.style.animation='none';
  void bar.offsetHeight;
  bar.style.animation='';
}

function bootSequence(){
  resetBootAnim();
  // Reset desktop state
  document.querySelectorAll('.window').forEach(function(w){w.classList.remove('active')});
  document.getElementById('startMenu').classList.add('hidden');
  zIdx=10;
  updateTabs();
  ['bootScreen','shutdownScreen','biosScreen','loadScreen'].forEach(function(id){
    document.getElementById(id).classList.remove('active');
  });
  document.getElementById('loadText').innerHTML='';
  showOverlay('bootScreen');
  playStartupSound();
  setTimeout(function(){
    hideOverlay('bootScreen');
    setTimeout(function(){wrap.classList.add('hidden')},600);
  },3200);
}

var wrap=document.getElementById('overlayWrap');

function showOverlay(id){
  wrap.classList.remove('hidden');
  var el=document.getElementById(id);
  if(el)el.classList.add('active');
}

function hideOverlay(id){
  var el=document.getElementById(id);
  if(el)el.classList.remove('active');
}

function switchOverlay(from,to,cb){
  var fromEl=document.getElementById(from);
  var toEl=document.getElementById(to);
  if(fromEl)fromEl.classList.remove('active');
  if(toEl){
    toEl.classList.add('active');
    if(cb)cb();
  }
}

function showShutdownConfirm(){
  toggleStartMenu();
  document.getElementById('shutdownConfirm').classList.remove('hidden');
}
function closeShutdownConfirm(){
  document.getElementById('shutdownConfirm').classList.add('hidden');
  playCriticalSound();
}
function confirmShutdown(){
  document.getElementById('shutdownConfirm').classList.add('hidden');
  shutDown();
}

function showRestartConfirm(){
  toggleStartMenu();
  document.getElementById('restartConfirm').classList.remove('hidden');
}
function closeRestartConfirm(){
  document.getElementById('restartConfirm').classList.add('hidden');
  playCriticalSound();
}
function confirmRestart(){
  document.getElementById('restartConfirm').classList.add('hidden');
  restartSystem();
}

function restartSystem(){
  bootSequence();
}

function shutDown(){
  // Hide all screens
  ['bootScreen','biosScreen','loadScreen'].forEach(function(id){
    document.getElementById(id).classList.remove('active');
  });
  // Show wrapper (covers desktop) and shutdown screen
  showOverlay('shutdownScreen');
  // Play exit sound
  playExitSound();
  // After shutdown animation, show BIOS
  setTimeout(function(){
    hideOverlay('shutdownScreen');
    setTimeout(function(){
      showBiosScreen();
    },400);
  },3000);
}

function showBiosScreen(){
  var bs=document.getElementById('biosScreen');
  bs.classList.add('active');
  localStorage.setItem('state','bios');
  bs.onclick=function(){
    localStorage.removeItem('state');
    hideOverlay('biosScreen');
    setTimeout(function(){showLoadingText()},400);
  };
}

function showLoadingText(){
  var loadTexts=[
    'MikuSoft Win39 Loading...',
    '',
    'Loading system files...',
    'Opening disk...',
    'Setting environment...',
    'Loading drivers...',
    'Configuring desktop...',
    '',
    'Starting Win39...'
  ];
  var el=document.getElementById('loadText');
  el.innerHTML='';
  document.getElementById('loadScreen').classList.add('active');
  loadTexts.forEach(function(t,i){
    setTimeout(function(){
      el.innerHTML+='<div class="bios-line'+(i===loadTexts.length-1?' bios-cursor':'')+'">'+t+'</div>';
    },i*400);
  });
  setTimeout(function(){
    // Reset desktop state
    document.querySelectorAll('.window').forEach(function(w){w.classList.remove('active')});
    document.getElementById('startMenu').classList.add('hidden');
    zIdx=10;
    updateTabs();
    // Hide all overlay screens
    ['bootScreen','shutdownScreen','biosScreen','loadScreen'].forEach(function(id){
      document.getElementById(id).classList.remove('active');
    });
    // Clean load text
    el.innerHTML='';
    // Reset and show boot animation
    resetBootAnim();
    showOverlay('bootScreen');
    playStartupSound();
    setTimeout(function(){
      hideOverlay('bootScreen');
      setTimeout(function(){wrap.classList.add('hidden')},600);
    },3200);
  },loadTexts.length*400+600);
}

// Sound toggle init
(function(){
  var el=document.querySelector('.config-toggle[onclick*="toggleSound"]');
  if(el)el.textContent=soundEnabled?'On':'Off';
})();

// ===== BOOT SCREEN / STATE =====
var savedState=localStorage.getItem('state');
if(savedState==='bios'){
  showBiosScreen();
}else if(!sessionStorage.getItem('booted')){
  sessionStorage.setItem('booted','1');
  resetBootAnim();
  showOverlay('bootScreen');
  playStartupSound();
  setTimeout(function(){
    hideOverlay('bootScreen');
    setTimeout(function(){wrap.classList.add('hidden')},600);
  },3200);
}else{
  wrap.classList.add('hidden');
}


