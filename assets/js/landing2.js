// Scripts spécifiques pour la landing page 2 

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
                    // Sur mobile, essayer de jouer après un interaction utilisateur
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

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach(otherItem => otherItem.classList.remove('open'));
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        });
    }

    // Sticky Scroll Animation for Features
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.matchMedia({
            // --- DESKTOP ANIMATION ---
            "(min-width: 769px)": function() {
                // Animation "popup" pour les sections scrolly
                const scrollyItems = gsap.utils.toArray(".scrolly-item");
                scrollyItems.forEach(item => {
                    const media = item.querySelector(".scrolly-media");
                    if (media) {
                        // On définit l'état initial (invisible et plus petit)
                        gsap.set(media, { autoAlpha: 0, scale: 0.8, transformOrigin: "center center" });

                        // On crée l'animation d'apparition
                        gsap.to(media, {
                            autoAlpha: 1,
                            scale: 1,
                            duration: 0.8,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 80%", // Se déclenche quand le haut de l'item est à 80% du haut de l'écran
                                toggleActions: "play none none none", // Joue l'animation une seule fois à l'apparition
                            }
                        });
                    }
                });
            },

            // --- MOBILE ANIMATION ---
            "(max-width: 768px)": function() {
                const scrollyItems = gsap.utils.toArray(".scrolly-item");
                scrollyItems.forEach(item => {
                    const subtitle = item.querySelector(".scrolly-text p");
                    if (subtitle) {
                        gsap.set(subtitle, { autoAlpha: 0 }); // Cache le sous-titre au départ

                        gsap.to(subtitle, {
                            autoAlpha: 1,
                            scrollTrigger: {
                                trigger: item,
                                start: "top 60%",
                                end: "bottom 90%",
                                scrub: true, // Lie l'animation au défilement
                                toggleActions: "play reverse play reverse"
                            }
                        });
                    }
                });
            }
        });
    }

    // Testimonial Slider
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.slide');
        const prevButton = slider.querySelector('.slider-arrow.prev');
        const nextButton = slider.querySelector('.slider-arrow.next');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Show the first slide initially
        showSlide(currentSlide);
    }

    // Flash Cards Mobile Interaction
    const flashCards = document.querySelectorAll('.flash-card');
    if (flashCards.length > 0) {
        flashCards.forEach(card => {
            const cardInner = card.querySelector('.flash-card-inner');
            let isFlipped = false;

            // Fonction pour retourner la carte
            function flipCard() {
                isFlipped = !isFlipped;
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(180deg)';
                } else {
                    cardInner.style.transform = 'rotateY(0deg)';
                }
            }

            // Fonction pour remettre toutes les autres cartes à l'état initial
            function resetOtherCards() {
                flashCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        const otherCardInner = otherCard.querySelector('.flash-card-inner');
                        otherCardInner.style.transform = 'rotateY(0deg)';
                        // Réinitialiser l'état interne des autres cartes
                        otherCard.isFlipped = false;
                    }
                });
            }

            // Gestion du tap/click sur mobile
            card.addEventListener('click', function(e) {
                // Vérifier si on est sur mobile (largeur < 768px)
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Si on retourne cette carte, remettre les autres à l'état initial
                    if (!isFlipped) {
                        resetOtherCards();
                    }
                    
                    flipCard();
                    card.isFlipped = isFlipped; // Stocker l'état pour les autres cartes
                }
            });

            // Gestion du hover pour desktop (garder l'existant)
            if (window.innerWidth > 768) {
                card.addEventListener('mouseenter', function() {
                    cardInner.style.transform = 'rotateY(180deg)';
                });
                
                card.addEventListener('mouseleave', function() {
                    cardInner.style.transform = 'rotateY(0deg)';
                });
            }
        });
    }
}); 