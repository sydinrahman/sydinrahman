// Sydin Rahman — Minimal Apple-Inspired ("Quiet Confidence") Script

document.addEventListener('DOMContentLoaded', () => {

    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // 1. Subtle Portrait Mouse Parallax (Moves strictly 5-10px)
    const heroSection = document.getElementById('hero');
    const portraitWrapper = document.getElementById('portrait-wrapper');

    if (heroSection && portraitWrapper) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
            const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

            // Subtle move between -8px and +8px
            const moveX = mouseX * 12;
            const moveY = mouseY * 12;

            portraitWrapper.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            portraitWrapper.style.transform = `translate3d(0px, 0px, 0px)`;
        });
    }

    // 2. Scroll Reveal Fade-Up Effect
    const fadeElements = document.querySelectorAll('.fade-up');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        fadeElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
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
        title: "MyAgeNow",
        badge: "LIVE",
        category: "Simple Web Utility",
        description: "A simple, precise age calculation tool and milestone tracker built with clean UX principles.",
        highlights: ["High precision calculation engine", "Milestones timeline", "Minimalist web app interface"],
        link: "https://myagenow.com"
    },
    tangail: {
        title: "Tangail Saree Market",
        badge: "BUILDING",
        category: "Ecommerce Platform",
        description: "Direct-to-consumer digital storefront connecting heritage Tangail weavers directly to global shoppers.",
        highlights: ["Direct weaver support", "Curated heritage collections", "Clean, frictionless e-commerce"],
        link: "#"
    },
    memoryfix: {
        title: "MemoryFix",
        badge: "EXPLORING",
        category: "AI Product",
        description: "Lightweight AI assistant for photo restoration, memory curation, and automatic family archives.",
        highlights: ["Instant photo restoration", "Smart tagging & curation", "Privacy-first architecture"],
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
            <span class="text-xs font-mono uppercase tracking-wider text-appleSecondary">${data.category}</span>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-appleText border border-appleBorder">${data.badge}</span>
        </div>
        <h3 class="font-display font-bold text-3xl text-appleText mb-3">${data.title}</h3>
        <p class="text-appleSecondary text-base mb-6 leading-relaxed">${data.description}</p>
        <div class="mb-8">
            <h4 class="font-display font-semibold text-xs uppercase tracking-wider text-appleText mb-3">Highlights</h4>
            <ul class="space-y-2 text-sm text-appleSecondary">
                ${data.highlights.map(h => `<li class="flex items-center gap-2.5"><span class="text-appleAccent font-bold">✓</span> ${h}</li>`).join('')}
            </ul>
        </div>
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-appleBorder">
            <button onclick="closeVentureModal()" class="px-5 py-2.5 rounded-full border border-appleBorder text-xs font-medium text-appleText hover:bg-slate-50 transition-colors">Close</button>
            ${data.link !== '#' ? `<a href="${data.link}" target="_blank" class="px-5 py-2.5 rounded-full bg-appleAccent text-white text-xs font-semibold hover:bg-blue-600 transition-colors">Visit Site →</a>` : ''}
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
