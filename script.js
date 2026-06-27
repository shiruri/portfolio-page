// v2.js - Portfolio Content & Interactions (JUICY EDITION)

const projects = [
    {
        title: "Portfolio Site",
        desc: "A fully interactive Windows 98-themed portfolio that simulates a retro desktop environment. Features draggable windows, functional taskbar, and classic animations.",
        details: "Built from scratch with vanilla HTML, CSS, and JavaScript. Every element mimics the Win98 UX — from beveled borders and pixel icons to the classic teal wallpaper. Demonstrates mastery of state management and DOM manipulation without frameworks.",
        category: "web",
        image: "Documents/portfolio.png",
        tags: ["HTML", "CSS", "JavaScript", "Retro UI"],
        links: { github: "https://github.com/shiruri/portfolio-page" }
    },
    {
        title: "MPOS System",
        desc: "A full-featured Point of Sale system built with Java Swing and MySQL.",
        details: "Handles transaction processing with receipt generation, real-time inventory tracking with low-stock alerts, admin dashboard with sales analytics, and employee management with role-based access control.",
        category: "java",
        image: "Documents/mpos.png",
        tags: ["Java", "Swing", "MySQL", "OOP"],
        links: { github: "https://github.com/shiruri/MPOS" }
    },
    {
        title: "Elysium",
        desc: "A custom programming language interpreter written in Java.",
        details: "Features a BASIC-inspired syntax with a full tokenizer, recursive-descent parser generating an AST, and a tree-walking executor. Supports variables, conditionals, loops, functions, and basic I/O.",
        category: "java",
        image: "Documents/ELYSIUM.png",
        tags: ["Java", "Interpreter", "AST", "Compiler"],
        links: { github: "https://github.com/shiruri/Elysium/tree/main" }
    },
    {
        title: "Cosnima",
        desc: "A full-stack social platform for cosplay and anime enthusiasts built with Spring Boot and vanilla JS.",
        details: "Features user profiles with cosplay galleries, JWT-authenticated API, post feeds with likes and comments, event organization for conventions, and a marketplace for cosplay commissions. MySQL database with optimized queries for social feed performance.",
        category: "web",
        image: "Documents/cosnima.jpeg",
        tags: ["Java", "Spring Boot", "JWT", "MySQL"],
        links: { github: "https://github.com/shiruri/Cosnima", demo: "https://cosnima.vercel.app/listing/listings.html" }
    },
    {
        title: "Elysiae HMS",
        desc: "A comprehensive Hospital Management System built with Spring Boot, JWT security, and MySQL.",
        details: "Supports 8 distinct roles (Admin, Doctor, Nurse, etc.) with fine-grained RBAC. Features full patient lifecycle management, appointment scheduling, electronic medical records, and billing. Built with accessibility in mind following WCAG guidelines.",
        category: "java",
        image: "Documents/Elysiae_HMS.PNG",
        tags: ["Java", "Spring Boot", "MySQL", "RBAC"],
        links: { github: "https://github.com/shiruri/Elysiae", demo: "https://elysiae.vercel.app/index.html" }
    },
    {
        title: "Digital Love",
        desc: "A Ren'Py visual novel blending romance with interactive programming education.",
        details: "Follow the journey of a student who discovers love while learning to code. Features branching dialogue, integrated coding mini-challenges (HTML/CSS/JS), original character art, chiptune soundtrack, and multiple endings.",
        category: "game",
        image: "Documents/digital.png",
        tags: ["Ren'Py", "Visual Novel", "Educational"],
        links: { itch: "https://shiroi26.itch.io/digital-love" }
    },
    {
        title: "Paperweight",
        desc: "A poignant Ren'Py visual novel exploring student life and mental health.",
        details: "Branching narrative with meaningful choices that impact the protagonist's mental state. Tackles themes of anxiety, depression, and self-discovery with sensitivity. Features original soundtrack and hand-drawn art.",
        category: "game",
        image: "Documents/paperweight.png",
        tags: ["Ren'Py", "Mental Health", "Narrative"],
        links: { itch: "https://shiroi26.itch.io/paperweigth" }
    }
];

let currentTab = 'all';

function renderProjects(filter = 'all') {
    const projectGrid = document.getElementById('projectGrid');
    if (!projectGrid) return;

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    projectGrid.innerHTML = filtered.map((proj, i) => `
        <div class="project-card opacity-0 translate-y-8 relative bg-white p-8 rounded-[3.5rem] border-2 border-red-50 flex flex-col gap-6 overflow-hidden group shadow-xl transition-all cursor-pointer" 
             style="transition-delay: ${i * 60}ms"
             onclick="openModal(${projects.indexOf(proj)})">
            <div class="shine"></div>
            <div class="aspect-[16/10] bg-red-50/50 rounded-[2.5rem] overflow-hidden flex items-center justify-center relative group-hover:scale-95 transition-transform duration-700 shadow-inner p-2">
                <img src="${proj.image}" alt="${proj.title}" class="w-full h-full object-cover rounded-[2rem] shadow-lg">
                <div class="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div class="bg-white px-8 py-3 rounded-full font-black text-red-600 shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 scale-110">VIEW WORK</div>
                </div>
            </div>
            <div class="relative z-10 px-2">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-100 flex items-center gap-2 shadow-sm">
                        <img src="assets/red apple keychain png!!_no_bg_jw1x4ea9.png" class="w-3 h-3">
                        ${proj.category}
                    </span>
                </div>
                <h3 class="text-3xl font-black mb-3 text-slate-800 tracking-tight">${proj.title}</h3>
                <p class="text-slate-500 text-base leading-relaxed font-semibold line-clamp-2">${proj.desc}</p>
            </div>
            
            <img src="assets/red apple keychain png!!_no_bg_jw1x4ea9.png" class="absolute -bottom-6 -right-6 w-16 h-16 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 pointer-events-none drop-shadow-2xl">
        </div>
    `).join('');

    setTimeout(() => {
        const cards = projectGrid.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.classList.remove('opacity-0', 'translate-y-8');
            card.classList.add('opacity-100', 'translate-y-0');
        });
    }, 50);
}

function openModal(index) {
    const proj = projects[index];
    const modal = document.getElementById('projectModal');
    const content = modal.querySelector('.overflow-y-auto');
    
    content.innerHTML = `
        <div class="p-10 md:p-16">
            <div class="aspect-video bg-red-50/50 rounded-[3rem] overflow-hidden mb-12 shadow-2xl p-4 border-4 border-white">
                <img src="${proj.image}" class="w-full h-full object-cover rounded-[2.5rem]">
            </div>
            
            <div class="flex flex-wrap items-center gap-6 mb-10">
                <h2 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">${proj.title}</h2>
                <span class="bg-red-600 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-red-200">${proj.category}</span>
            </div>

            <div class="flex gap-6 border-b-4 border-red-50 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                <button class="modal-tab-btn active text-red-600 font-black text-xl px-6 py-2 relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-2 after:bg-red-600 after:rounded-full transition-all" onclick="switchModalTab(this, 'overview')">Overview</button>
                <button class="modal-tab-btn text-slate-300 font-black text-xl px-6 py-2 hover:text-red-400 transition-all" onclick="switchModalTab(this, 'details')">Deep Dive</button>
                <button class="modal-tab-btn text-slate-300 font-black text-xl px-6 py-2 hover:text-red-400 transition-all" onclick="switchModalTab(this, 'stack')">Tech Stack</button>
            </div>

            <div id="modalTabContent" class="min-h-[300px] relative">
                <div id="overview" class="modal-pane">
                    <p class="text-2xl text-slate-600 leading-relaxed font-bold mb-10">${proj.desc}</p>
                    <div class="flex flex-wrap gap-6">
                        ${proj.links.github ? `<a href="${proj.links.github}" target="_blank" class="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200 group"><img src="assets/red apple keychain png!!_no_bg_jw1x4ea9.png" class="w-6 h-6 invert group-hover:rotate-12 transition-transform"> View GitHub</a>` : ''}
                        ${proj.links.demo ? `<a href="${proj.links.demo}" target="_blank" class="bg-teal-600 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl shadow-teal-200 group"><img src="assets/red apple keychain png!!_no_bg_jw1x4ea9.png" class="w-6 h-6 invert group-hover:rotate-12 transition-transform"> Live Demo</a>` : ''}
                        ${proj.links.itch ? `<a href="${proj.links.itch}" target="_blank" class="bg-[#ff4b5c] text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl shadow-red-200 group"><img src="assets/green apple keychain!!_no_bg_6gugqvu4.png" class="w-6 h-6 group-hover:rotate-12 transition-transform"> Play on itch.io</a>` : ''}
                    </div>
                </div>
                <div id="details" class="modal-pane hidden">
                    <p class="text-xl text-slate-600 leading-relaxed font-semibold border-l-8 border-red-100 pl-8 py-4 bg-red-50/30 rounded-r-3xl">${proj.details}</p>
                </div>
                <div id="stack" class="modal-pane hidden">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        ${proj.tags.map(tag => `
                            <div class="bg-white border-2 border-red-50 p-6 rounded-3xl flex items-center gap-4 shadow-md hover:scale-105 transition-transform">
                                <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
                                    <img src="assets/red apple keychain png!!_no_bg_jw1x4ea9.png" class="w-8 h-8">
                                </div>
                                <span class="text-xl font-black text-slate-800 tracking-tight">${tag}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.querySelector('#modalContent').classList.add('modal-enter-active');
}

function switchModalTab(btn, paneId) {
    const currentPane = document.querySelector('.modal-pane:not(.hidden)');
    const nextPane = document.getElementById(paneId);

    if (currentPane === nextPane) return;

    document.querySelectorAll('.modal-tab-btn').forEach(b => {
        b.classList.remove('text-red-600', 'active', 'after:absolute', 'after:bottom-[-4px]', 'after:left-0', 'after:w-full', 'after:h-2', 'after:bg-red-600', 'after:rounded-full');
        b.classList.add('text-slate-300');
    });
    btn.classList.remove('text-slate-300');
    btn.classList.add('text-red-600', 'active', 'after:absolute', 'after:bottom-[-4px]', 'after:left-0', 'after:w-full', 'after:h-2', 'after:bg-red-600', 'after:rounded-full');

    currentPane.classList.add('hidden');
    nextPane.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.querySelector('#modalContent').classList.remove('modal-enter-active');
    setTimeout(() => modal.classList.add('hidden'), 200);
}

function handleTabClick(e) {
    const tab = e.target.closest('[data-tab]');
    if (!tab) return;
    const filter = tab.dataset.tab;
    if (filter === currentTab) return;
    document.querySelectorAll('[data-tab]').forEach(t => {
        t.classList.remove('bg-red-600', 'text-white', 'shadow-red-200');
        t.classList.add('bg-white', 'text-red-600');
    });
    tab.classList.remove('bg-white', 'text-red-600');
    tab.classList.add('bg-red-600', 'text-white', 'shadow-red-200');
    currentTab = filter;
    renderProjects(filter);
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    const tabContainer = document.getElementById('tabContainer');
    if (tabContainer) tabContainer.addEventListener('click', handleTabClick);

    // Custom Interactive Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Add magnetic reactive scaling on clickables
        const addCursorHoverListeners = () => {
            document.querySelectorAll('a, button, .project-card, [onclick]').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.borderColor = '#ff3b3b';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = '#ff3b3b';
                    cursor.style.borderColor = '#ffffff';
                });
            });
        };
        addCursorHoverListeners();
        
        // Re-observe whenever elements get re-rendered (like changing tabs)
        const observerTarget = document.getElementById('projectGrid');
        if (observerTarget) {
            const gridObserver = new MutationObserver(() => addCursorHoverListeners());
            gridObserver.observe(observerTarget, { childList: true });
        }
    }

    // Smooth Scroll for Nav
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                this.classList.add('scale-90');
                setTimeout(() => this.classList.remove('scale-90'), 200);

                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Background Blobs Parallax
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        const moveX = (x - window.innerWidth / 2) * 0.01;
        const moveY = (y - window.innerHeight / 2) * 0.01;

        document.querySelectorAll('.glow-blob').forEach((blob, i) => {
            const speed = (i + 1) * 0.15;
            blob.style.transform = `translate(${moveX * -speed}px, ${moveY * -speed}px)`;
        });
    });

    // Tweaked section scroll observer to trigger instantly
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
            }
        });
    }, { threshold: 0.05 }); // Lowered threshold means it loads immediately on reveal

    document.querySelectorAll('section, header, footer').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-12');
        observer.observe(el);
    });
});