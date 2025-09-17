// Scripts spécifiques pour la landing Totem

document.addEventListener('DOMContentLoaded', () => {
    function forceVideoAutoplay() {
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(video => {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    const playVideo = () => {
                        video.play().catch(() => {});
                        document.removeEventListener('touchstart', playVideo);
                        document.removeEventListener('click', playVideo);
                    };
                    document.addEventListener('touchstart', playVideo, { once: true });
                    document.addEventListener('click', playVideo, { once: true });
                });
            }
        });
    }

    forceVideoAutoplay();
    setTimeout(forceVideoAutoplay, 1000);

    // Smooth scrolling pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Animations GSAP
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo('.feature-card', { opacity: 0, y: 50, scale: 0.95 }, {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: '.features-section', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });

        gsap.fromTo('.business-feature', { opacity: 0, x: -50 }, {
            opacity: 1, x: 0, duration: 0.8, stagger: 0.3, ease: 'power2.out',
            scrollTrigger: { trigger: '.business-section', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });

        gsap.fromTo('.why-point', { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out',
            scrollTrigger: { trigger: '.why-section', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });

        gsap.fromTo('.testimonial', { opacity: 0, y: 40, scale: 0.95 }, {
            opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.3, ease: 'power2.out',
            scrollTrigger: { trigger: '.testimonial-section', start: 'top 80%', end: 'bottom 20%', toggleActions: 'play none none reverse' }
        });

        gsap.fromTo('.hero-text', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out', delay: 0.5 });
        gsap.fromTo('.hero-buttons', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 1 });
    }

    // Parallaxe légère
    function handleParallax() {
        const videos = document.querySelectorAll('.hero-background-video, .final-cta-background-video');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            videos.forEach(video => { video.style.transform = `translateY(${rate}px)`; });
        });
    }
    handleParallax();

    console.log('Totem landing page loaded successfully');
});


