// Scripts spécifiques pour ZazooEditor Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // Force video autoplay on mobile devices
    function forceVideoAutoplay() {
        const videos = document.querySelectorAll('video[autoplay]');
        videos.forEach(video => {
            // Essayer de jouer la vidéo
            const playPromise = video.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Sur mobile, essayer de jouer après une interaction utilisateur
                    const playVideo = () => {
                        video.play().catch(e => console.log('Still cannot play:', e));
                        document.removeEventListener('touchstart', playVideo);
                        document.removeEventListener('click', playVideo);
                    };
                    
                    document.addEventListener('touchstart', playVideo, { once: true });
                    document.addEventListener('click', playVideo, { once: true });
                });
            }
        });
    }

    // Appeler la fonction immédiatement et après un délai
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
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animations GSAP avec ScrollTrigger
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animation des cartes de fonctionnalités
        gsap.fromTo('.feature-card', 
            { 
                opacity: 0, 
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.features-section',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animation des sections business
        gsap.fromTo('.business-feature', 
            { 
                opacity: 0, 
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.business-section',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animation des points "Pourquoi"
        gsap.fromTo('.why-point', 
            { 
                opacity: 0, 
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.why-section',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animation des témoignages
        gsap.fromTo('.testimonial', 
            { 
                opacity: 0, 
                y: 40,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.testimonial-section',
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Animation du hero
        gsap.fromTo('.hero-text', 
            { 
                opacity: 0, 
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                delay: 0.5
            }
        );

        gsap.fromTo('.hero-buttons', 
            { 
                opacity: 0, 
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                delay: 1
            }
        );

        // Animation des titres de section
        gsap.fromTo('h2', 
            { 
                opacity: 0, 
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: 'h2',
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    // Effet de parallaxe léger pour les vidéos
    function handleParallax() {
        const videos = document.querySelectorAll('.hero-background-video, .final-cta-background-video');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            videos.forEach(video => {
                video.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Démarrer l'effet de parallaxe
    handleParallax();

    // Gestion des interactions des cartes
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(card, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    });

    // Gestion des boutons CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Effet de clic
            if (typeof gsap !== 'undefined') {
                gsap.to(button, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out"
                });
            }

            // Si c'est un lien vers la beta, on peut ajouter un tracking
            if (button.textContent.includes('beta')) {
                console.log('Beta access requested');
                // Ici on pourrait ajouter un tracking analytics
            }
        });
    });

    // Intersection Observer pour les animations d'apparition
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observer tous les éléments à animer
    const animateElements = document.querySelectorAll('.feature-card, .business-feature, .why-point, .testimonial');
    animateElements.forEach(el => observer.observe(el));

    // Gestion du responsive
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        // Ajuster les animations sur mobile
        if (isMobile && typeof gsap !== 'undefined') {
            gsap.set('.feature-card, .business-feature, .why-point, .testimonial', {
                clearProps: "all"
            });
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Appel initial

    // Préchargement des vidéos pour de meilleures performances
    const videos = document.querySelectorAll('video source');
    videos.forEach(source => {
        const video = document.createElement('video');
        video.src = source.src;
        video.preload = 'metadata';
    });

    // Gestion de l'accessibilité
    document.addEventListener('keydown', (e) => {
        // Navigation au clavier pour les cartes
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('feature-card')) {
                focused.click();
            }
        }
    });

    // Lazy loading pour les images (si ajoutées plus tard)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('ZazooEditor landing page loaded successfully');
});
