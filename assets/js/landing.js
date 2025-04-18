// Effet de parallax pour le nuage de mots
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Parallax uniquement pour le nuage de mots
    document.querySelectorAll('.cloud-item').forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed'));
        const x = (window.innerWidth / 2 - mouseX) * speed * 0.1;
        const y = (window.innerHeight / 2 - mouseY) * speed * 0.1;
        const z = Math.abs(x + y) * 0.1;
        
        // Récupérer le décalage du scroll si existant
        const scrollOffset = item.getAttribute('data-scroll-offset') || 0;
        item.style.transform = `translate3d(${x}px, ${parseFloat(scrollOffset) + y}px, ${z}px)`;
    });
});

// Effet de parallax au scroll pour les mockups et le nuage de mots
window.addEventListener('scroll', () => {
    // Parallax pour les mockups
    const mockups = document.querySelectorAll('.mockup.parallax');
    mockups.forEach(mockup => {
        const rect = mockup.getBoundingClientRect();
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.05;
            const maxScrollOffset = 50;
            
            const scrollOffset = Math.max(Math.min(rate, maxScrollOffset), -maxScrollOffset);
            mockup.style.transform = `translateY(${scrollOffset}px)`;
        }
    });

    // Parallax pour le nuage de mots au scroll
    const cloudContainer = document.querySelector('.mental-cloud');
    if (cloudContainer) {
        const rect = cloudContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top < viewportHeight && rect.bottom > 0) {
            // Calculer la position relative dans la fenêtre
            const progress = 1 - (rect.top / viewportHeight);
            
            document.querySelectorAll('.cloud-item').forEach(item => {
                const speed = parseFloat(item.getAttribute('data-speed'));
                const scrollEffect = progress * 100 * speed;
                
                // Stocker le décalage du scroll pour l'utiliser dans l'effet mousemove
                item.setAttribute('data-scroll-offset', scrollEffect);
                
                // Récupérer la transformation existante du mousemove ou créer une nouvelle
                const currentTransform = item.style.transform;
                const match = currentTransform.match(/translate3d\(([-\d.]+)px,\s*([-\d.]+)px,\s*([-\d.]+)px\)/);
                
                if (match) {
                    const [, x, , z] = match;
                    item.style.transform = `translate3d(${x}px, ${scrollEffect}px, ${z}px)`;
                } else {
                    item.style.transform = `translate3d(0px, ${scrollEffect}px, 0px)`;
                }
            });
        }
    }
});

// Parallax effect for feature blocks
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 1024) {
        window.addEventListener('scroll', () => {
            const features = document.querySelectorAll('.feature-item');
            
            features.forEach(feature => {
                const mockup = feature.querySelector('.feature-mockup');
                const text = feature.querySelector('.feature-text');
                const rect = feature.getBoundingClientRect();
                const scrollPercentage = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                
                if (scrollPercentage > 0 && scrollPercentage < 1) {
                    const parallaxMockup = scrollPercentage * 50;
                    const parallaxText = scrollPercentage * -30;
                    
                    mockup.style.setProperty('--parallax-mockup', `${parallaxMockup}px`);
                    text.style.setProperty('--parallax-text', `${parallaxText}px`);
                }
            });
        });
    }
}); 