// Sydin Rahman — Playful & Personal Portfolio Script

document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 1. Cursor Spotlight Glow
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        if (cursorGlow) {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        }
    });

    // 2. Interactive Character Eye & Playful Floating Parallax
    const heroSection = document.getElementById('hero');
    const eyeLeft = document.getElementById('eye-left');
    const eyeRight = document.getElementById('eye-right');
    const playfulItems = document.querySelectorAll('.playful-item');
    const playfulCanvas = document.getElementById('playful-canvas');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Character Eyes Follow Cursor
            if (eyeLeft && eyeRight) {
                const eyeMoveX = Math.max(-4, Math.min(4, mouseX / 60));
                const eyeMoveY = Math.max(-4, Math.min(4, mouseY / 60));
                eyeLeft.style.transform = `translate(${eyeMoveX}px, ${eyeMoveY}px)`;
                eyeRight.style.transform = `translate(${eyeMoveX}px, ${eyeMoveY}px)`;
            }

            // Tilt canvas container
            if (playfulCanvas) {
                const tiltX = (mouseY / rect.height) * -6;
                const tiltY = (mouseX / rect.width) * 6;
                playfulCanvas.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            // Move individual floating playful cards
            playfulItems.forEach(item => {
                const speed = parseFloat(item.getAttribute('data-speed')) || 0.04;
                const moveX = mouseX * speed;
                const moveY = mouseY * speed;

                if (!item.matches(':hover')) {
                    item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
                }
            });
        });

        // Reset positions when mouse leaves hero
        heroSection.addEventListener('mouseleave', () => {
            if (eyeLeft && eyeRight) {
                eyeLeft.style.transform = `translate(0px, 0px)`;
                eyeRight.style.transform = `translate(0px, 0px)`;
            }
            if (playfulCanvas) {
                playfulCanvas.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
            playfulItems.forEach(item => {
                item.style.transform = `translate3d(0px, 0px, 0px)`;
            });
        });
    }

    // 3. Magnetic Button Hover Interaction
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // 4. Scroll Reveal Effect
    const revealElements = document.querySelectorAll('section > div, #upto .group, #ventures .group');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 60) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});

// Venture Modal Data & Functions
const ventureDetails = {
    myagenow: {
        icon: "🧮",
        title: "MyAgeNow",
        badge: "LIVE",
        badgeBg: "bg-emerald-100 text-emerald-800",
        category: "Micro-App",
        description: "A fun and precise age calculation tool and milestone tracker.",
        highlights: ["High precision calculation engine", "Milestones timeline", "Engaging web micro-app"],
        link: "https://myagenow.com"
    },
    tangail: {
        icon: "🥻",
        title: "Tangail Saree Market",
        badge: "BUILDING",
        badgeBg: "bg-blue-100 text-accentBlue",
        category: "E-Commerce",
        description: "Direct-to-consumer store bringing traditional Tangail sarees directly from local weavers to global shoppers.",
        highlights: ["Direct weaver support", "Curated heritage collections", "Modern e-commerce UX"],
        link: "#"
    },
    memoryfix: {
        icon: "🤖",
        title: "MemoryFix",
        badge: "EXPLORING",
        badgeBg: "bg-purple-100 text-purple-800",
        category: "AI Utility",
        description: "Smart photo restoration and memory curation assistant powered by lightweight AI models.",
        highlights: ["Instant photo restoration", "Smart tagging & organization", "Family archives"],
        link: "#"
    },
    quoteflow: {
        icon: "📋",
        title: "QuoteFlow",
        badge: "CONCEPT",
        badgeBg: "bg-amber-100 text-amber-800",
        category: "SaaS Tool",
        description: "Automated proposal and cost estimator built for freelancers and boutique agencies.",
        highlights: ["Interactive price sliders", "One-click proposal export", "Stripe payment integration"],
        link: "#"
    }
};

function openVentureModal(key) {
    const modal = document.getElementById('venture-modal');
    const modalBody = document.getElementById('modal-body');
    const modalBox = document.getElementById('modal-content-box');
    const data = ventureDetails[key];

    if (!data || !modal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <span class="text-3xl">${data.icon}</span>
            <span class="text-xs font-space font-bold uppercase px-3 py-1 rounded-full ${data.badgeBg}">${data.badge}</span>
        </div>
        <h3 class="font-space font-bold text-2xl text-textMain mb-2">${data.title}</h3>
        <p class="text-subtleText font-space text-sm mb-6">${data.description}</p>
        <div class="mb-6">
            <h4 class="font-space font-bold text-xs uppercase tracking-wider text-textMain mb-2">Highlights</h4>
            <ul class="space-y-1.5 text-sm font-space text-subtleText">
                ${data.highlights.map(h => `<li class="flex items-center gap-2"><span class="text-accentBlue font-bold">✓</span> ${h}</li>`).join('')}
            </ul>
        </div>
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-borderMuted">
            <button onclick="closeVentureModal()" class="px-5 py-2.5 rounded-full border border-borderMuted text-xs font-space font-medium text-textMain hover:bg-slate-50 transition-colors">Close</button>
            ${data.link !== '#' ? `<a href="${data.link}" target="_blank" class="px-5 py-2.5 rounded-full bg-accentBlue text-white text-xs font-space font-bold hover:bg-blue-700 transition-colors">Visit Site →</a>` : ''}
        </div>
    `;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
}

function closeVentureModal() {
    const modal = document.getElementById('venture-modal');
    const modalBox = document.getElementById('modal-content-box');
    if (!modal || !modalBox) return;

    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
    modal.classList.add('opacity-0', 'pointer-events-none');
}

function copyEmail() {
    const email = "contact@sydinrahman.com";
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('copy-email-btn');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-check text-emerald-600 mr-2"></i>Copied!`;
            setTimeout(() => {
                btn.innerHTML = `<i class="fa-regular fa-copy mr-2"></i>Copy Email`;
            }, 2500);
        }
    });
}
