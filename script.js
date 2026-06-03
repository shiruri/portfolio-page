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
  if(id==='win-projdetail'){
    ['tab-projdetail','tab-projdetail-web','tab-projdetail-java','tab-projdetail-game'].forEach(function(t){
      document.getElementById(t).style.display='none';
    });
  }
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
  if(e.target.closest('.titlebar-btns')||e.target.closest('.menubar'))return;
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
    btn.textContent='PLAY';
    document.getElementById('musicGifPlay').style.opacity='0';
    return;
  }
  if(!audio){
    audio=new Audio('Documents/track.mp3');
    audio.volume=document.getElementById('musicVolume').value/100;
    audio.addEventListener('timeupdate',updateMusicProgress);
    audio.addEventListener('ended',function(){
      document.getElementById('playBtn').textContent='PLAY';
      document.getElementById('musicGifPlay').style.opacity='0';
    });
  }
  audio.play();
  btn.textContent='PAUSE';
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
if(window.innerWidth<=700){
  wrap.classList.add('hidden');
}else if(savedState==='bios'){
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

// ===== GBA MOBILE SYSTEM =====
(function(){
  if(window.innerWidth>700&&!window.matchMedia('(max-width:700px)').matches)return;

  var scr=document.getElementById('gbaScreen');
  if(!scr)return;

  scr.textContent='';

  var state='boot',cursor=0,subCur=0,linkSub=0,history=[],currApp='',inDetail=false;
  var soundOn=localStorage.getItem('sound')!=='off';
  var audioCtx,audioEl,isPlaying=false;

  function playClick(){
    if(!soundOn)return;
    try{
      if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();
      var o=audioCtx.createOscillator(),g=audioCtx.createGain();
      o.connect(g);g.connect(audioCtx.destination);
      o.type='square';o.frequency.value=800;g.gain.value=.05;
      o.start();o.stop(audioCtx.currentTime+.05);
    }catch(e){}
  }

  var apps=[
    {id:'about',name:'ABOUT.GBA'},
    {id:'web',name:'WEB.GBA'},
    {id:'java',name:'JAVA.GBA'},
    {id:'game',name:'GAME.GBA'},
    {id:'contact',name:'CONTACT.GBA'},
    {id:'tamagotchi',name:'TAMAGOTCHI'},
    {id:'settings',name:'SETTINGS'},
    {id:'music',name:'MUSIC'},
  ];

  var aboutLinks=[
    {label:'GitHub',url:'https://github.com/shiruri'},
    {label:'itch.io',url:'https://shiroi26.itch.io/'},
    {label:'Facebook',url:'https://www.facebook.com/shirobako2'},
    {label:'Email',url:'mailto:jemmeralmoneda58@gmail.com'},
  ];

  var contactItems=[
    {label:'Email',url:'mailto:jemmeralmoneda58@gmail.com'},
    {label:'GitHub',url:'https://github.com/shiruri'},
    {label:'itch.io',url:'https://shiroi26.itch.io/'},
    {label:'Facebook',url:'https://www.facebook.com/shirobako2'},
  ];

  var projData={
    web:[
      {name:'Portfolio Site',img:'Documents/portfolio.png',tags:'HTML,CSS,JavaScript',desc:'A fully interactive Windows 98-themed portfolio that simulates a retro desktop environment. Features draggable windows with title bars and resize handles, a functional taskbar with Start menu, desktop icons, boot/shutdown animations with BIOS screen, a file-explorer style project browser, and a built-in music player. Every element mimics the Win98 UX — from beveled borders and pixel icons to the classic teal wallpaper. Built from scratch with vanilla HTML, CSS, and JavaScript without any frameworks.'},
    ],
    java:[
      {name:'MPOS System',img:'Documents/mpos.png',tags:'Java,Swing,MySQL,OOP',desc:'A full-featured Point of Sale system built with Java Swing and MySQL. Handles transaction processing with receipt generation, real-time inventory tracking with low-stock alerts, admin dashboard with sales analytics, employee management with role-based access control, and customer loyalty program. Features a clean Swing GUI with responsive layouts and keyboard shortcuts for fast checkout.'},
      {name:'Elysium',img:'Documents/ELYSIUM.png',tags:'Java,Interpreter,AST',desc:'A custom programming language interpreter written entirely in Java. Features a BASIC-inspired syntax with a full tokenizer, recursive-descent parser generating an AST, and a tree-walking executor. Supports variables, conditionals, loops, functions, and basic I/O. Includes error reporting with line numbers and a REPL for interactive coding. Demonstrates compiler design principles from the ground up.'},
      {name:'Cosnima',img:'Documents/cosnima.jpeg',tags:'Java,Spring Boot,JWT',desc:'A full-stack social platform for cosplay and anime enthusiasts built with Spring Boot and vanilla JavaScript. Features user profiles with cosplay galleries, JWT-authenticated API, post feeds with likes and comments, event organization for conventions, and a marketplace for cosplay commissions. MySQL database with optimized queries for social feed performance.'},
      {name:'Elysiae HMS',img:'Documents/Elysiae_HMS.PNG',tags:'Java,Spring Boot,MySQL,RBAC',desc:'A comprehensive Hospital Management System built with Spring Boot, JWT security, and MySQL. Supports 8 distinct roles (Admin, Doctor, Nurse, Pharmacist, Lab Tech, Receptionist, Patient, Insurance) with fine-grained RBAC. Features full patient lifecycle management from admission to discharge, appointment scheduling, electronic medical records, pharmacy inventory, lab test tracking, billing, and insurance claims.'},
    ],
    game:[
      {name:'Digital Love',img:'Documents/digital.png',tags:"Ren'Py,Visual Novel",desc:"A heartfelt Ren'Py visual novel that blends a romantic coming-of-age story with interactive programming education. Follow the journey of a student who discovers love while learning to code. Features branching dialogue that affects relationships, integrated coding mini-challenges that teach HTML/CSS/JS fundamentals, original character art, multiple endings, and a chiptune soundtrack. Designed to make programming approachable through narrative."},
      {name:'Paperweight',img:'Documents/paperweight.png',tags:"Ren'Py,Mental Health",desc:"A poignant Ren'Py visual novel exploring student life, mental health, and the weight of expectations. Features branching narrative with meaningful choices that impact the protagonist's mental state, multiple endings reflecting different life paths, original soundtrack, and hand-drawn art. Tackles themes of anxiety, depression, friendship, and self-discovery with sensitivity and authenticity."},
    ],
  };

  function boot(){
    state='boot';
    var bt=[];
    scr.innerHTML=
      '<div class="gba-boot">'+
      '<img src="Documents/boot.webp" class="gba-boot-img">'+
      '<div class="gba-boot-sub">MIKU ADVANCE</div>'+
      '<div class="gba-boot-anim"><span></span></div>'+
      '</div>';
  bt.push(setTimeout(showMenu,2800));
    bt.push(setTimeout(function(){
      var tt=document.getElementById('gbaTooltip');
      if(!tt)return;
      var kc2=document.getElementById('gbaKeychain');
      if(!kc2)return;
      var idleMsgs=['grab me!','pull me!','hey!','over here!','psst!','look!','wave!'];
      var idleTimer=null;
      function pTT(){
        var kr=kc2.getBoundingClientRect();
        var pr=kc2.parentElement.getBoundingClientRect();
        tt.style.left=(kr.left-pr.left-tt.offsetWidth-6)+'px';
        tt.style.top=(kr.top-pr.top+6)+'px';
      }
      function sTT(t){
        if(!t)t=idleMsgs[Math.floor(Math.random()*idleMsgs.length)];
        tt.textContent=t;tt.classList.add('show');pTT();
      }
      function hTT(){tt.classList.remove('show');if(idleTimer){clearInterval(idleTimer);idleTimer=null;}}
      sTT('grab me!');
      idleTimer=setInterval(function(){sTT();},5000);
      bt.push(idleTimer);
      bt.push(setTimeout(function(){hTT();},12000));
      if(!kc2._ttSet){
        kc2._ttSet=true;
        kc2.addEventListener('mousedown',function(){hTT();});
        kc2.addEventListener('touchstart',function(){hTT();});
      }
    },2900));
    bootTimers=bt;
  }

  function renderMenu(){
    var h='<div class="gba-menu"><div class="gba-menu-title">MIKU WinBoy v1.0</div>';
    h+='<div class="gba-menu-div">~ ~ ~ ~ ~ ~ ~ ~ ~ ~</div><div class="gba-menu-list">';
    apps.forEach(function(a,i){
      h+='<div class="gba-menu-item'+(i===cursor?' active':'')+'">'+
        (i===cursor?'\u25b8 ':'  ')+a.name+'</div>';
    });
    h+='</div><div class="gba-menu-div">────────────────</div>';
    h+='<div class="gba-menu-help">A OK  B BACK</div></div>';
    scr.innerHTML=h;
  }

  var audioEl=null,isPlaying=false;
  var soundOn=localStorage.getItem('sound')!=='off';

  function renderApp(){
    if(currApp==='about')rAbout();
    else if(currApp==='web'||currApp==='java'||currApp==='game')rProjList(currApp);
    else if(currApp==='contact')rContact();
    else if(currApp==='settings')rSettings();
    else if(currApp==='music')rMusic();
    else if(currApp==='tamagotchi')rTamagotchi();
  }

  function openApp(i){
    history.push({type:'menu'});state='app';
    currApp=apps[i].id;subCur=0;inDetail=false;linkSub=0;
    renderApp();
  }

  function rAbout(){
    var ls=aboutLinks.map(function(l,i){
      return '<div class="gba-link-item'+(i===linkSub?' active':'')+'" data-idx="'+i+'">'+
        (i===linkSub?'\u25b8 ':'  ')+l.label+'</div>';
    }).join('');
    scr.innerHTML=
      '<div class="gba-app"><div class="gba-app-title">ABOUT ME</div>'+
      '<div class="gba-app-body gba-app-detail">'+
      '<div class="gba-about-head">'+
      '<img src="Documents/avatar.jpg" class="gba-avatar" onerror="this.style.display=\'none\'">'+
      '<div class="gba-about-info">'+
      '<b>Jemmer Almoneda</b>'+
      '<div class="gba-about-role">Java Developer / Game Dev / Web</div>'+
      '<div class="gba-about-status">OPEN TO WORK</div>'+
      '</div></div>'+
      '<div class="gba-section"><b>Education</b><br>ACLC College Manila</div>'+
      '<div class="gba-section"><b>Technologies</b><br>Java / OOP / Swing &bull; MySQL &amp; Oracle &bull; Spring Boot + JWT &bull; Ren\'Py &bull; HTML / CSS / JS</div>'+
      '<div class="gba-section"><b>About</b><br>Student at ACLC College Manila building web apps with Spring Boot + JWT, desktop tools with Java Swing, and visual novels with Ren\'Py. Creator of MPOS, Elysium (custom language interpreter), Cosnima, and Elysiae HMS.</div>'+
      '<div class="gba-section"><b>Links</b></div>'+
      ls+
      '</div>'+
      '<div class="gba-app-foot">\u25b2\u25bc NAV &bull; A OPEN &bull; B BACK</div></div>';
  }

  function rProjList(cat){
    if(inDetail){
      var p=projData[cat][subCur];
      var tags=p.tags.split(',').map(function(t){
        return '<span class="gba-tag">'+t.trim()+'</span>';
      }).join('');
      scr.innerHTML=
        '<div class="gba-app"><div class="gba-app-title">'+p.name+'</div>'+
        '<div class="gba-app-body gba-app-detail">'+
        '<img src="'+p.img+'" class="gba-detail-img" onerror="this.style.display=\'none\'">'+
        '<p>'+p.desc+'</p>'+
        '<div class="gba-tag-row">'+tags+'</div></div>'+
        '<div class="gba-app-foot">\u25b2\u25bc SCROLL &bull; B BACK</div></div>';
      return;
    }
    var labels={web:'WEB',java:'JAVA',game:'GAME'};
    var items=projData[cat];
    var h='<div class="gba-app"><div class="gba-app-title">'+labels[cat]+'</div><div class="gba-app-body">';
    items.forEach(function(p,i){
      h+='<div class="gba-app-item'+(i===subCur?' active':'')+'">'+
        (i===subCur?'\u25b8 ':'  ')+p.name+'</div>';
    });
    h+='</div><div class="gba-app-foot">\u25b2\u25bc NAV &bull; A OPEN &bull; B BACK</div></div>';
    scr.innerHTML=h;
  }

  function rContact(){
    var cs=contactItems.map(function(c,i){
      return '<div class="gba-link-item'+(i===linkSub?' active':'')+'">'+
        (i===linkSub?'\u25b8 ':'  ')+c.label+': '+c.url.replace('mailto:','')+'</div>';
    }).join('');
    scr.innerHTML=
      '<div class="gba-app"><div class="gba-app-title">CONTACT</div>'+
      '<div class="gba-app-body gba-app-detail">'+
      '<div class="gba-section" style="margin-bottom:6px">Select a contact method and press A to open:</div>'+
      cs+
      '</div><div class="gba-app-foot">\u25b2\u25bc NAV &bull; A OPEN &bull; B BACK</div></div>';
  }

  function rSettings(){
    scr.innerHTML=
      '<div class="gba-app"><div class="gba-app-title">SETTINGS</div>'+
      '<div class="gba-app-body">'+
      '<div class="gba-setting-row"><span>Sound</span><span id="gbaSnd">'+
      (soundOn?'ON':'OFF')+'</span></div>'+
      '</div><div class="gba-app-foot">\u25b2\u25bc NAV &bull; A TOGGLE &bull; B BACK</div></div>';
  }

  function rMusic(){
    scr.innerHTML=
      '<div class="gba-app"><div class="gba-app-title">MUSIC PLAYER</div>'+
      '<div class="gba-app-body gba-music-body">'+
      '<div class="gba-music-screen">'+
      '<div class="gba-music-track">Senbonzakura</div>'+
      '<div class="gba-music-artist">Hatsune Miku</div>'+
      '<div class="gba-music-bar"><div class="gba-music-bar-fill" id="gbaMusicFill"></div></div>'+
      '<div class="gba-music-time"><span>1:23</span><span>3:45</span></div>'+
      '</div>'+
      '<div class="gba-music-controls">'+
      '<button class="gba-music-btn" id="gbaPlay">'+(isPlaying?'PAUSE':'PLAY')+'</button>'+
      '</div>'+
      '<div class="gba-music-status" id="gbaMusicStatus">'+(isPlaying?'NOW PLAYING':'PAUSED')+'</div>'+
      '</div><div class="gba-app-foot">\u25b2\u25bc SCROLL &bull; A PLAY &bull; B BACK</div></div>';
    var fill=document.getElementById('gbaMusicFill');
    if(fill)fill.style.animationPlayState=isPlaying?'running':'paused';
    var pb=document.getElementById('gbaPlay');
    if(pb)pb.onclick=function(){toggleMusic();};
  }

  function toggleMusic(){
    if(!audioEl){
      audioEl=new Audio('Documents/track.mp3');
      audioEl.loop=true;
    }
    if(isPlaying){audioEl.pause();isPlaying=false;}
    else{audioEl.play().catch(function(){});isPlaying=true;}
    var btn=document.getElementById('gbaPlay');
    if(btn)btn.textContent=isPlaying?'\u23F8':'\u25B6';
    var st=document.getElementById('gbaMusicStatus');
    if(st)st.textContent=isPlaying?'NOW PLAYING':'PAUSED';
    var fill=document.getElementById('gbaMusicFill');
    if(fill)fill.style.animationPlayState=isPlaying?'running':'paused';
  }

  var tamaIdleMsgs=[
    '\u2665 hello, miku here! \u2665',
    'She hums a tune~ \u266a',
    'The leek wiggles!',
    'Miku stares at you...',
    'She draws a note in the air~',
    'Tick tock... play with me!',
    '\u3042~\u3042 bored...',
    'She fixes her hair~',
    '\u266a la la la~ \u266a',
    'The stage lights dim...',
    'Miku smiles at you!',
    'She adjusts her mic~',
    'A gentle breeze blows~',
    'Her eyes sparkle!',
    'She hugs her leek~',
  ];

  var tamaFeedMsgs=[
    'Miku nibbles her leek~ \u266a',
    'She loves pasta! \u2665',
    'Mmm, so tasty!',
    'She sips some\u8471\u8471 tea~',
    'A happy little hum~',
    'She shares a bite with you!',
    'Miku\'s tummy is happy!',
    '\u3042\u307e\u3044\u301c so sweet!',
  ];

  var tamaPlayMsgs=[
    'Miku dances! \u266a',
    'SENBONZAKURA~! \u266a',
    'She twirls and spins!',
    'The world is her stage~',
    'Miku sings a melody!',
    'She waves her leek around!',
    'A joyful concert begins!',
    'Miku\'s heart is full! \u2665',
    'She takes a bow~',
  ];

  function rTamagotchi(){
    if(tamaIdleTimer)clearInterval(tamaIdleTimer);
    var actions=['FEED','PLAY'];
    var btns=actions.map(function(a,i){
      return '<div class="gba-tama-action'+(i===subCur?' active':'')+'">'+
        (i===subCur?'\u25b8 ':'  ')+a+'</div>';
    }).join('');
    scr.innerHTML=
      '<div class="gba-app"><div class="gba-app-title">TAMAGOTCHI</div>'+
      '<div class="gba-app-body gba-tama-body">'+
      '<div class="gba-tama-device">'+
      '<div class="gba-tama-screen">'+
      '<img src="Documents/tamagotchi.gif" class="gba-tama-pet" id="gbaTamaPet" onerror="this.parentElement.textContent=\'(no image)\'">'+
      '</div>'+
      '<div class="gba-tama-label">TAMAGOTCHI</div>'+
      '</div>'+
      '<div class="gba-tama-actions">'+btns+'</div>'+
      '<div class="gba-tama-msg" id="gbaTamaMsg">\u2665 hello, miku here! \u2665</div>'+
      '</div><div class="gba-app-foot">\u25b2\u25bc NAV &bull; A INTERACT &bull; B BACK</div></div>';
    tamaIdleTimer=setInterval(function(){
      var el=document.getElementById('gbaTamaMsg');
      if(el)el.textContent=tamaIdleMsgs[Math.floor(Math.random()*tamaIdleMsgs.length)];
    },4000);
  }

  function tamaInteract(){
    if(tamaIdleTimer){clearInterval(tamaIdleTimer);tamaIdleTimer=null;}
    var g=document.getElementById('gbaTamaPet');
    if(!g)return;
    if(subCur===0){
      g.style.transform='translateY(6px)';
      setTimeout(function(){if(g)g.style.transform='translateY(0)'},250);
    }else{
      g.style.transform='scale(1.15)';
      setTimeout(function(){if(g)g.style.transform='scale(1)'},200);
    }
    var msgs=subCur===0?tamaFeedMsgs:tamaPlayMsgs;
    var msg=msgs[Math.floor(Math.random()*msgs.length)];
    var el=document.getElementById('gbaTamaMsg');
    if(el)el.textContent=msg;
    tamaIdleTimer=setInterval(function(){
      var el2=document.getElementById('gbaTamaMsg');
      if(el2)el2.textContent=tamaIdleMsgs[Math.floor(Math.random()*tamaIdleMsgs.length)];
    },4000);
  }

  var tamaIdleTimer=null;

  function showMenu(){
    if(tamaIdleTimer){clearInterval(tamaIdleTimer);tamaIdleTimer=null;}
    state='menu';
    history=[];
    renderMenu();
  }

  function goBack(){
    if(history.length===0){showMenu();return;}
    if(currApp==='tamagotchi'&&tamaIdleTimer){clearInterval(tamaIdleTimer);tamaIdleTimer=null;}
    var prev=history.pop();
    if(prev.type==='menu'){state='menu';renderMenu();}
    else if(prev.type==='app'){
      state='app';currApp=prev.app;subCur=prev.sub||0;
      inDetail=false;renderApp();
    }
  }

  function input(key){
    playClick();
    if(state==='menu'){
      if(key==='up'){cursor=(cursor-1+apps.length)%apps.length;renderMenu();}
      else if(key==='down'){cursor=(cursor+1)%apps.length;renderMenu();}
      else if(key==='a')openApp(cursor);
      else if(key==='start')showMenu();
    }else if(state==='app'){
      if(key==='b'||key==='select'){
        if(inDetail){inDetail=false;history.pop();renderApp();}
        else goBack();
      }else if(key==='start'){showMenu();}
      else if(!inDetail&&currApp in projData){
        var items=projData[currApp];
        if(key==='up'){subCur=(subCur-1+items.length)%items.length;renderApp();}
        else if(key==='down'){subCur=(subCur+1)%items.length;renderApp();}
        else if(key==='a'){
          history.push({type:'app',app:currApp,sub:subCur});
          inDetail=true;renderApp();
        }
      }else if(currApp==='settings'&&key==='a'){
        soundOn=!soundOn;
        localStorage.setItem('sound',soundOn?'on':'off');
        renderApp();
      }else if(currApp==='music'&&key==='a'){
        toggleMusic();
      }else if(currApp==='about'){
        if(key==='up'){linkSub=(linkSub-1+aboutLinks.length)%aboutLinks.length;renderApp();}
        else if(key==='down'){linkSub=(linkSub+1)%aboutLinks.length;renderApp();}
        else if(key==='a')window.open(aboutLinks[linkSub].url,'_blank');
      }else if(currApp==='contact'){
        if(key==='up'){linkSub=(linkSub-1+contactItems.length)%contactItems.length;renderApp();}
        else if(key==='down'){linkSub=(linkSub+1)%contactItems.length;renderApp();}
        else if(key==='a')window.open(contactItems[linkSub].url,'_blank');
      }else if(currApp==='tamagotchi'){
        if(key==='up'){subCur=0;renderApp();}
        else if(key==='down'){subCur=1;renderApp();}
        else if(key==='a'){playClick();tamaInteract();}
      }else if(key==='up'||key==='down'){
        var el=document.querySelector('.gba-app-body');
        if(el)el.scrollTop+=key==='up'?-60:60;
      }
    }
  }

  document.querySelectorAll('.dpad-arm,.gba-btn,.gba-ss').forEach(function(el){
    el.addEventListener('click',function(){
      input(this.dataset.key);
    });
  });

  document.addEventListener('keydown',function(e){
    var map={
      ArrowUp:'up',ArrowDown:'down',
      ArrowLeft:'left',ArrowRight:'right',
      z:'b',x:'a',Z:'b',X:'a',d:'b',D:'b',Enter:'start'
    };
    var k=map[e.key]||map[e.code];
    if(k){e.preventDefault();input(k);}
  });

  (function(){
    var kc=document.getElementById('gbaKeychain');
    if(!kc)return;
    var parent=kc.parentElement;
    var tt=document.getElementById('gbaTooltip');
    var rad=55,hs=28;
    var raf=null;
    var aX=0,aY=0,dragging=false;
    var idleMsgs=['grab me!','pull me!','hey!','over here!','psst!','look!','wave!'];
    var moveMsgs=['whee!','whee!','hehe','wee!','more!','again!','yeah!'];
    var idler=null,mover=null;
    function pTT(){
      if(!tt)return;
      var kr=kc.getBoundingClientRect();
      var pr=parent.getBoundingClientRect();
      tt.style.left=(kr.left-pr.left-tt.offsetWidth-6)+'px';
      tt.style.top=(kr.top-pr.top+4)+'px';
    }
    function sTT(t){
      if(!tt)return;
      tt.textContent=t||idleMsgs[Math.floor(Math.random()*idleMsgs.length)];
      tt.classList.add('show');pTT();
    }
    function hTT(){
      if(!tt)return;
      tt.classList.remove('show');
      if(idler){clearInterval(idler);idler=null;}
      if(mover){clearTimeout(mover);mover=null;}
    }
    setTimeout(function(){
      sTT('grab me!');
      idler=setInterval(function(){if(!dragging)sTT();},5000);
      setTimeout(hTT,12000);
    },2900);
    function snap(){
      var sL=kc.style.left, sT=kc.style.top;
      var cl=sL&&sL!=='auto'?parseFloat(sL):aX;
      var ct=sT&&sT!=='auto'?parseFloat(sT):aY;
      var st=Date.now(),dur=280;
      dragging=false;
      function f(){
        var p=Math.min((Date.now()-st)/dur,1);
        var e=1-Math.pow(1-p,3);
        kc.style.left=(cl+(aX-cl)*e)+'px';
        kc.style.top=(ct+(aY-ct)*e)+'px';
        pTT();
        if(p<1)raf=requestAnimationFrame(f);
        else{raf=null;kc.style.left='';kc.style.top='';kc.style.right='8px';pTT();}
      }
      f();
    }
    function sd(e){
      e.preventDefault();
      hTT();
      dragging=true;
      if(raf){cancelAnimationFrame(raf);raf=null;}
      var cx=e.clientX||(e.touches?e.touches[0].clientX:0);
      var cy=e.clientY||(e.touches?e.touches[0].clientY:0);
      var pr=parent.getBoundingClientRect();
      var rc=kc.getBoundingClientRect();
      aX=rc.left-pr.left; aY=rc.top-pr.top;
      var ox=cx-rc.left-hs, oy=cy-rc.top-hs;
      kc.style.right='auto';kc.style.left=aX+'px';kc.style.top=aY+'px';
      function om(e2){
        var mx=e2.clientX||(e2.touches?e2.touches[0].clientX:0);
        var my=e2.clientY||(e2.touches?e2.touches[0].clientY:0);
        var nx=aX+(mx-cx-ox), ny=aY+(my-cy-oy);
        var dx=nx-aX, dy=ny-aY;
        var d=Math.sqrt(dx*dx+dy*dy);
        if(d>rad){dx=dx/d*rad;dy=dy/d*rad;}
        kc.style.left=(aX+dx)+'px';
        kc.style.top=(aY+dy)+'px';
        if(!mover){sTT(moveMsgs[Math.floor(Math.random()*moveMsgs.length)]);mover=setTimeout(function(){mover=null;},600);}
        else pTT();
      }
      function ou(){
        document.removeEventListener('mousemove',om);
        document.removeEventListener('mouseup',ou);
        document.removeEventListener('touchmove',om);
        document.removeEventListener('touchend',ou);
        snap();
      }
      document.addEventListener('mousemove',om);
      document.addEventListener('mouseup',ou);
      document.addEventListener('touchmove',om,{passive:true});
      document.addEventListener('touchend',ou);
    }
    kc.addEventListener('mousedown',sd);
    kc.addEventListener('touchstart',sd,{passive:true});
  })();

  boot();

  var wasMobile=window.innerWidth<=700;
  window.addEventListener('resize',function(){
    var nowMobile=window.innerWidth<=700;
    if(nowMobile!==wasMobile){
      wasMobile=nowMobile;
      if(nowMobile){
        if(typeof bootTimers!=='undefined'){
          bootTimers.forEach(function(t){clearTimeout(t);});
        }
        scr.innerHTML='';
        state='boot';
        cursor=0;subCur=0;history=[];currApp='';inDetail=false;
        boot();
      }
    }
  });
})();


