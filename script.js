// Juicebox landing page interactions.
// Vanilla JS — matches the stratus-web / lattice-site pattern: no framework,
// no build step, just one file.

document.addEventListener('DOMContentLoaded', () => {
    setYear();
    spawnBubbles();
    wireWaitlist();
    wireScrollReveal();
});

// Footer year.
function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------------------------
// Bubbles — the signature Frutiger Aero motif. Generated procedurally so the
// count and density can vary with viewport width without hardcoding a hundred
// divs. Each gets a random size, position, duration and horizontal drift.
// ---------------------------------------------------------------------------
function spawnBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;
    // Honour reduced-motion: no bubbles if the user has asked for stillness.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const count = window.innerWidth < 640 ? 10 : 20;
    for (let i = 0; i < count; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = 12 + Math.random() * 48;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${10 + Math.random() * 14}s`;
        bubble.style.animationDelay = `${Math.random() * 12}s`;
        bubble.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
        container.appendChild(bubble);
    }
}

// ---------------------------------------------------------------------------
// Waitlist form. There's no backend wired yet, so this validates the email,
// shows a loading state for a beat, then a thank-you. When a real endpoint
// exists, swap the timeout for a fetch.
// ---------------------------------------------------------------------------
function wireWaitlist() {
    const form = document.getElementById('waitlist-form');
    const email = document.getElementById('waitlist-email');
    const feedback = document.getElementById('form-feedback');
    const button = form?.querySelector('button');
    if (!form || !email || !feedback || !button) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const value = email.value.trim();
        if (!isValidEmail(value)) {
            showFeedback(feedback, 'Please enter a valid email address.', '#E8547E');
            return;
        }

        button.classList.add('loading');
        button.disabled = true;
        feedback.textContent = '';

        // TODO: replace with a real endpoint when the waitlist backend exists.
        await new Promise(resolve => setTimeout(resolve, 900));

        button.classList.remove('loading');
        button.disabled = false;
        form.reset();
        showFeedback(feedback, "You're on the list — we'll be in touch. 🥤", '#4F8C22');
    });
}

function isValidEmail(value) {
    // Deliberately simple: an @, a dot, something on each side. The real
    // validation happens server-side; this just catches obvious typos.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showFeedback(el, message, color) {
    el.textContent = message;
    el.style.color = color;
    el.style.opacity = '1';
}

// ---------------------------------------------------------------------------
// Scroll-reveal. Elements tagged `.reveal` fade up the first time they enter
// the viewport. Staggered by giving each card in a grid a tiny incremental
// delay so a row appears to cascade rather than pop in all at once.
// ---------------------------------------------------------------------------
function wireScrollReveal() {
    // Honour reduced motion: skip the observer so everything is visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target); // reveal once
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
