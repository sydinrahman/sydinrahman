// SYDIN RAHMAN — Interactive Entrepreneur's Desk & Portfolio Logic

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

    // 2. Interactive Desk & Floating Cards Parallax
    const deskCanvas = document.getElementById('desk-canvas');
    const deskCards = document.querySelectorAll('.desk-card');
    const heroSection = document.getElementById('hero');

    if (heroSection && deskCards.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Tilt desk canvas slightly
            if (deskCanvas) {
                const tiltX = (mouseY / rect.height) * -8;
                const tiltY = (mouseX / rect.width) * 8;
                deskCanvas.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            // Move individual floating cards based on their data-speed
            deskCards.forEach(card => {
                const speed = parseFloat(card.getAttribute('data-speed')) || 0.04;
                const moveX = mouseX * speed;
                const moveY = mouseY * speed;

                // Keep scale hover effect intact if hovered
                if (!card.matches(':hover')) {
                    card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0px)`;
                }
            });
        });

        // Reset positions when mouse leaves hero
        heroSection.addEventListener('mouseleave', () => {
            if (deskCanvas) {
                deskCanvas.style.transform = `rotateX(0deg) rotateY(0deg)`;
            }
            deskCards.forEach(card => {
                card.style.transform = `translate3d(0px, 0px, 0px)`;
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

    // 4. Background Interactive Canvas Dots Reacting to Cursor
    const canvas = document.getElementById('bg-dots-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.parentElement.offsetWidth;
        let height = canvas.height = canvas.parentElement.offsetHeight;

        window.addEventListener('resize', () => {
            if (canvas.parentElement) {
                width = canvas.width = canvas.parentElement.offsetWidth;
                height = canvas.height = canvas.parentElement.offsetHeight;
                initDots();
            }
        });

        const dots = [];
        const spacing = 36;
        let mouse = { x: -1000, y: -1000 };

        function initDots() {
            dots.length = 0;
            for (let x = 18; x < width; x += spacing) {
                for (let y = 18; y < height; y += spacing) {
                    dots.push({
                        baseX: x,
                        baseY: y,
                        x: x,
                        y: y,
                        size: 1.5
                    });
                }
            }
        }

        initDots();

        heroSection.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        heroSection.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);

            dots.forEach(dot => {
                const dx = mouse.x - dot.baseX;
                const dy = mouse.y - dot.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 120;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const angle = Math.atan2(dy, dx);
                    dot.x = dot.baseX - Math.cos(angle) * force * 12;
                    dot.y = dot.baseY - Math.sin(angle) * force * 12;
                    ctx.fillStyle = '#2563EB';
                } else {
                    dot.x += (dot.baseX - dot.x) * 0.1;
                    dot.y += (dot.baseY - dot.y) * 0.1;
                    ctx.fillStyle = '#D1D1CD';
                }

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animateCanvas);
        }

        animateCanvas();
    }

    // 5. Scroll Reveal Effect
    const revealElements = document.querySelectorAll('section > div, .venture-card, #currently .group');
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check
});

// Venture Modal Data & Functions
const ventureDetails = {
    myagenow: {
        title: "MyAgeNow",
        badge: "LIVE",
        badgeBg: "bg-emerald-100 text-emerald-800",
        category: "Micro-App / AI Utility",
        description: "MyAgeNow is an interactive milestone discovery tool and high-precision age calculator designed for engagement and personalized analytics.",
        highlights: ["High-traffic micro application", "Sleek date calculation algorithms", "Personalized life milestones timeline"],
        link: "https://myagenow.com"
    },
    tangail: {
        title: "Tangail Saree Market",
        badge: "BUILDING",
        badgeBg: "bg-blue-100 text-accentBlue",
        category: "D2C Ecommerce Platform",
        description: "A specialized e-commerce brand and direct-to-consumer marketplace connecting traditional weavers in Tangail with diaspora customers worldwide.",
        highlights: ["Direct artisan revenue sourcing", "Optimized Shopify/Web funnel", "Cultural narrative storytelling"],
        link: "#"
    },
    memoryfix: {
        title: "MemoryFix",
        badge: "EXPLORING",
        badgeBg: "bg-purple-100 text-purple-800",
        category: "Productivity / AI Media",
        description: "An automated media curation and photo restoration platform that utilizes AI models to fix, restore, and organize old digital photo collections.",
        highlights: ["Automated photo enhancement", "Intelligent duplicate detection", "Private family archives"],
        link: "#"
    },
    quoteflow: {
        title: "QuoteFlow",
        badge: "CONCEPT",
        badgeBg: "bg-blue-100 text-accentBlue",
        category: "SaaS Proposal Builder",
        description: "A lightweight estimation tool built for agencies and tech freelancers to generate interactive quotes and convert leads into signed deals faster.",
        highlights: ["Real-time pricing sliders", "Dynamic proposal output", "Stripe & invoice integration"],
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
            <span class="text-xs font-space font-semibold uppercase px-3 py-1 rounded-full ${data.badgeBg}">${data.badge}</span>
            <span class="text-xs font-space text-subtleText">${data.category}</span>
        </div>
        <h3 class="font-space font-bold text-2xl text-textMain mb-3">${data.title}</h3>
        <p class="text-subtleText text-sm leading-relaxed mb-6">${data.description}</p>
        <div class="mb-6">
            <h4 class="font-space font-bold text-xs uppercase tracking-wider text-textMain mb-2">Key Highlights</h4>
            <ul class="space-y-1.5 text-sm text-subtleText">
                ${data.highlights.map(h => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-accentBlue text-xs"></i> ${h}</li>`).join('')}
            </ul>
        </div>
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-borderMuted">
            <button onclick="closeVentureModal()" class="px-5 py-2.5 rounded-full border border-borderMuted text-xs font-space font-medium text-textMain hover:bg-slate-50 transition-colors">Close</button>
            ${data.link !== '#' ? `<a href="${data.link}" target="_blank" class="px-5 py-2.5 rounded-full bg-accentBlue text-white text-xs font-space font-medium hover:bg-blue-700 transition-colors">Visit Site ↗</a>` : ''}
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
