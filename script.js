"use strict";

// v2.js - Portfolio Content & Interactions (JUICY EDITION)

const projects = [
    {
        title: "MPOS System",
        desc: "A Java Swing Point of Sale system backed by MySQL, with an admin dashboard, POS terminal, and encrypted PDF invoicing.",
        details: "Role-based access across Admin, Staff, and Employee tiers. The dashboard covers inventory, suppliers, staff, and registered POS machines, plus sales reports exportable as password-encrypted PDF invoices. The terminal itself handles order building, discounts/tax, payment processing, voids, and receipt printing.",
        category: "java",
        image: "Documents/mpos.png",
        tags: ["Java", "Swing", "MySQL", "iText"],
        links: { github: "https://github.com/shiruri/MPOS" }
    },
    {
        title: "Elysium",
        desc: "A small interpreted language built from scratch in Java, with a hand-written lexer and a parser that evaluates directly as it goes — no AST, no parser-generator frameworks.",
        details: "Custom .cy source files run through a lexer → parser/interpreter pipeline. Supports variables, arithmetic, string concatenation, user input, and if/then/endif conditionals, all with zero external dependencies.",
        category: "java",
        image: "Documents/elysium.png",
        tags: ["Java", "Interpreter", "Lexer", "Parser"],
        links: { github: "https://github.com/shiruri/Elysium/tree/main" }
    },
    {
        title: "Cosnima",
        desc: "A cosplay and anime community platform built with Spring Boot 4 and Java 21, with JWT auth.",
        details: "JWT-based authentication and Spring Security guard the REST API, with Cloudinary handling image uploads for cosplay photos and avatars. Backend runs on PostgreSQL, paired with an HTML/CSS/JS frontend.",
        category: "java",
        image: "Documents/cosnima.jpeg",
        tags: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
        links: { github: "https://github.com/shiruri/Cosnima", demo: "https://cosnima.vercel.app/listing/listings.html" }
    },
    {
        title: "Elysiae HMS",
        desc: "A role-based Hospital Management System REST API built with Spring Boot and PostgreSQL.",
        details: "Covers the patient lifecycle end to end: registration, appointments, ward/bed admissions, lab requests, pharmacy dispensing, electronic health records, and billing. JWT auth enforces a first-login password change, and 8 distinct roles (Admin, Doctor, Nurse, and more) are scoped down to fine-grained permissions, with full audit logging throughout.",
        category: "java",
        image: "Documents/elysiae-hms.png",
        tags: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
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
            <div class="aspect-[4/3] md:aspect-[16/10] bg-red-50/50 rounded-[2.5rem] overflow-hidden flex items-center justify-center relative group-hover:scale-95 transition-transform duration-700 shadow-inner">
                <img src="${proj.image}" alt="${proj.title}" loading="lazy" class="w-full h-full object-contain rounded-[2rem] shadow-lg">
                <div class="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div class="bg-white px-8 py-3 rounded-full font-black text-red-600 shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 scale-110">VIEW WORK</div>
                </div>
            </div>
            <div class="relative z-10 px-2">
                <div class="flex justify-between items-start mb-4">
                    <span class="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 bg-red-50 px-4 py-1.5 rounded-full border border-red-100 flex items-center gap-2 shadow-sm">
                        <img src="assets/apple-red.png" class="w-3 h-3">
                        ${proj.category}
                    </span>
                </div>
                <h3 class="text-3xl font-black mb-3 text-slate-800 tracking-tight">${proj.title}</h3>
                <p class="text-slate-500 text-base leading-relaxed font-semibold line-clamp-2 mb-3">${proj.desc}</p>
                <div class="flex flex-wrap gap-2">
                    ${proj.tags.map(tag => `<span class="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100">${tag}</span>`).join('')}
                </div>
            </div>
            
            <img src="assets/apple-red.png" class="absolute -bottom-6 -right-6 w-16 h-16 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500 pointer-events-none drop-shadow-2xl">
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

let lastFocusedElement = null;

function openModal(index) {
    const proj = projects[index];
    const modal = document.getElementById('projectModal');
    const content = modal.querySelector('.overflow-y-auto');

    lastFocusedElement = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');

    content.innerHTML = `
        <div class="p-10 md:p-16">
            <div class="relative aspect-[4/3] md:aspect-video bg-red-50/50 rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-4 border-white group">
                <img src="${proj.image}" class="w-full h-full object-contain rounded-[2.5rem]">
                <button onclick="openLightbox('${proj.image}')" class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-red-600 border-2 border-red-50 hover:bg-red-50 transition-all px-4 py-2 rounded-full font-black text-xs shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 md:opacity-100"><img src="assets/apple-red.png" class="w-3 h-3 md:w-4 md:h-4 object-contain"> Enlarge</button>
            </div>

            <div class="flex flex-wrap items-center gap-4 mb-10">
                <h2 class="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter">${proj.title}</h2>
                <span class="bg-red-600 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-red-200">${proj.category}</span>
                <button onclick="openLightbox('${proj.image}')" class="bg-red-50 text-red-600 border-2 border-red-100 hover:bg-red-100 hover:border-red-200 transition-all px-5 py-2.5 rounded-full font-black text-sm shadow-md flex items-center gap-2"><img src="assets/apple-red.png" class="w-4 h-4 md:w-5 md:h-5 object-contain"> Enlarge</button>
            </div>

            <div class="flex gap-6 border-b-4 border-red-50 mb-12 overflow-x-auto pb-4 scrollbar-hide">
                <button class="modal-tab-btn active text-red-600 font-black text-xl px-6 py-2 transition-all" onclick="switchModalTab(this, 'overview')">Overview</button>
                <button class="modal-tab-btn text-slate-300 font-black text-xl px-6 py-2 hover:text-red-400 transition-all" onclick="switchModalTab(this, 'details')">Deep Dive</button>
                <button class="modal-tab-btn text-slate-300 font-black text-xl px-6 py-2 hover:text-red-400 transition-all" onclick="switchModalTab(this, 'stack')">Tech Stack</button>
            </div>

            <div id="modalTabContent" class="min-h-[300px] relative">
                <div id="overview" class="modal-pane">
                    <p class="text-2xl text-slate-600 leading-relaxed font-bold mb-10">${proj.desc}</p>
                    <div class="flex flex-wrap gap-6">
                        ${proj.links.github ? `<a href="${proj.links.github}" target="_blank" class="bg-slate-900 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl shadow-slate-200 group"><img src="assets/apple-red.png" class="w-6 h-6 invert group-hover:rotate-12 transition-transform"> View GitHub</a>` : ''}
                        ${proj.links.demo ? `<a href="${proj.links.demo}" target="_blank" class="bg-teal-600 text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl shadow-teal-200 group"><img src="assets/apple-red.png" class="w-6 h-6 invert group-hover:rotate-12 transition-transform"> Live Demo</a>` : ''}
                        ${proj.links.itch ? `<a href="${proj.links.itch}" target="_blank" class="bg-[#ff4b5c] text-white px-10 py-5 rounded-3xl font-black text-lg hover:bg-red-600 transition-all flex items-center gap-3 shadow-xl shadow-red-200 group"><img src="assets/apple-green.png" class="w-6 h-6 group-hover:rotate-12 transition-transform"> Play on itch.io</a>` : ''}
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
                                    <img src="assets/apple-red.png" class="w-8 h-8">
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
    modal.focus();
}

function switchModalTab(btn, paneId) {
    const currentPane = document.querySelector('.modal-pane:not(.hidden)');
    const nextPane = document.getElementById(paneId);
    if (currentPane === nextPane) return;
    document.querySelectorAll('.modal-tab-btn').forEach(b => {
        b.classList.remove('active', 'text-red-600');
        b.classList.add('text-slate-300');
    });
    btn.classList.replace('text-slate-300', 'text-red-600');
    btn.classList.add('active');
    currentPane.classList.add('hidden');
    nextPane.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.querySelector('#modalContent').classList.remove('modal-enter-active');
    if (document.activeElement && modal.contains(document.activeElement)) {
        document.activeElement.blur();
    }
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        if (lastFocusedElement) lastFocusedElement.focus();
    }, 200);
}

// Lightbox
function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    if (!lb || !img) return;
    img.src = src;
    lb.classList.remove('hidden');
    lb.focus();
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.add('hidden');
}

function handleTabClick(e) {
    const tab = e.target.closest('[data-tab]');
    if (!tab) return;
    const filter = tab.dataset.tab;
    if (filter === currentTab) return;
    document.querySelectorAll('[data-tab]').forEach(t => {
        t.classList.replace('bg-red-600', 'bg-white');
        t.classList.replace('text-white', 'text-red-600');
        t.classList.remove('shadow-red-200');
    });
    tab.classList.replace('bg-white', 'bg-red-600');
    tab.classList.replace('text-red-600', 'text-white');
    tab.classList.add('shadow-red-200');
    currentTab = filter;
    renderProjects(filter);
}

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const isDark = document.documentElement.classList.contains('dark');
    if (themeIcon) {
        themeIcon.src = isDark ? 'assets/apple-red.png' : 'assets/apple-green.png';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const dark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', dark ? 'dark' : 'light');
            if (themeIcon) {
                themeIcon.src = dark ? 'assets/apple-red.png' : 'assets/apple-green.png';
                themeIcon.classList.remove('theme-toggle-spin');
                void themeIcon.offsetWidth;
                themeIcon.classList.add('theme-toggle-spin');
            }
        });
    }

    renderProjects();
    const tabContainer = document.getElementById('tabContainer');
    if (tabContainer) tabContainer.addEventListener('click', handleTabClick);

    // Custom Interactive Cursor Logic (with event delegation)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        document.body.addEventListener('mouseover', (e) => {
            const interactable = e.target.closest('a, button, .project-card, [onclick]');
            if (interactable) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.6)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.borderColor = '#ff3b3b';
            }
        });
        document.body.addEventListener('mouseout', (e) => {
            const interactable = e.target.closest('a, button, .project-card, [onclick]');
            if (interactable) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.backgroundColor = '#ff3b3b';
                cursor.style.borderColor = '#ffffff';
            }
        });
    }

    // Lightbox: delegation for close, frame stop, and Escape
    const lightbox = document.getElementById('lightbox');
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
    lightbox.addEventListener('click', function (e) {
        if (e.target.closest('[data-close-lightbox]') || e.target === this) {
            closeLightbox();
        }
    });
    lightbox.querySelector('[data-lightbox-frame]').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Modal keyboard: Escape to close + focus trap
    const modal = document.getElementById('projectModal');
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'Tab') {
            const focusable = modal.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // Nav active section highlighting
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id], header[id], footer[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('text-red-600');
                    link.style.opacity = '0.6';
                });
                const activeLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('text-red-600');
                    activeLink.style.opacity = '1';
                }
            }
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -50% 0px' });
    sections.forEach(s => navObserver.observe(s));

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
    }, { threshold: 0.05 });

    document.querySelectorAll('section, header, footer').forEach(el => {
        el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-12');
        observer.observe(el);
    });
});