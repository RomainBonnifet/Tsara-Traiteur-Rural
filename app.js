const opacityObserver = new IntersectionObserver((entries)=>{
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log(entry);
            entry.target.animate([
                {opacity: 0},
                {opacity: 1},
            ], {
                duration: 1000
            })
            opacityObserver.unobserve(entry.target);
        }
    }
})
opacityObserver.observe(document.querySelector('.brunch'))
opacityObserver.observe(document.querySelector('.viennoiseries'))
opacityObserver.observe(document.querySelector('.seminaire'))
opacityObserver.observe(document.querySelector('.whoContainer'))
opacityObserver.observe(document.querySelector('.welcomeContainer'))
opacityObserver.observe(document.querySelector('.servicesTextContainer'))



const leftTranslateXObserver = new IntersectionObserver((entries)=>{
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log(entry);
            entry.target.animate([
                {transform: "translateX(-300px)"},
                {transform: "translateX(0px)"}
            ], 
                {duration: 1000}
        )
            leftTranslateXObserver.unobserve(entry.target);
        }
    }
})
leftTranslateXObserver.observe(document.querySelector('.BTC_Container'))
leftTranslateXObserver.observe(document.querySelector('.formule1'))


const rightTranslateXObserver = new IntersectionObserver((entries)=>{
    for (const entry of entries) {
        if (entry.isIntersecting) {
            console.log(entry);
            entry.target.animate([
                {transform: "translateX(300px)"},
                {transform: "translateX(0px)"}
            ], 
                {duration: 1000}
        )
            rightTranslateXObserver.unobserve(entry.target);
        }
    }
}
)
rightTranslateXObserver.observe(document.querySelector('.BTB_Container'))
rightTranslateXObserver.observe(document.querySelector('.formule2'))

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    
    let currentIndex = 0;
    let autoplayInterval;

    function updateCarousel() {
        const isDesktop = window.innerWidth >= 1000;
        const visibleSlides = isDesktop ? 3 : 1;
        const maxIndex = slides.length - visibleSlides;

        // Si l'index dépasse à cause d'un redimensionnement
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        // Calcul du pourcentage de déplacement
        // En desktop, chaque slide fait 33.333% de la largeur du conteneur
        const movePercentage = isDesktop ? (100 / 3) : 100;
        
        track.style.transform = `translateX(-${currentIndex * movePercentage}%)`;
    }

    function next() {
        const isDesktop = window.innerWidth >= 1000;
        const visibleSlides = isDesktop ? 3 : 1;
        const maxIndex = slides.length - visibleSlides;

        if (currentIndex >= maxIndex) {
            currentIndex = 0; // Retour au début
        } else {
            currentIndex++;
        }
        updateCarousel();
    }

    function prev() {
        const isDesktop = window.innerWidth >= 1000;
        const visibleSlides = isDesktop ? 3 : 1;
        const maxIndex = slides.length - visibleSlides;

        if (currentIndex <= 0) {
            currentIndex = maxIndex; // Va à la fin sans vide
        } else {
            currentIndex--;
        }
        updateCarousel();
    }

    // Contrôles
    nextButton.addEventListener('click', () => {
        next();
        restartAutoplay();
    });

    prevButton.addEventListener('click', () => {
        prev();
        restartAutoplay();
    });

    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(next, 3000);
    }

    function restartAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Gestion du redimensionnement
    window.addEventListener('resize', updateCarousel);

    // Lancement
    updateCarousel();
    startAutoplay();
});