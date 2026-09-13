// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.85)';
    }
});

// Animate numbers on scroll
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const duration = 2000;
        const startTime = Date.now();
        const isDecimal = target % 1 !== 0;

        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;

            if (isDecimal) {
                stat.textContent = current.toFixed(2);
            } else {
                stat.textContent = Math.floor(current);
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        updateNumber();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-card, .cert-card, .edu-card, .award-card, .timeline-item, .detail-item').forEach(el => {
    observer.observe(el);
});

// Hero stats animation on load
let statsAnimated = false;
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateNumbers();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                link.style.color = '#0ea5e9';
            } else {
                link.style.color = '';
            }
        }
    });
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const texts = [
        'B.Sc. from RUET | Operations Professional',
        'Lean Manufacturing Enthusiast',
        'Data-Driven Decision Maker',
        'Supply Chain Explorer'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => { isDeleting = true; typeText(); }, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(typeText, isDeleting ? 30 : 60);
    }

    setTimeout(typeText, 1500);
}
