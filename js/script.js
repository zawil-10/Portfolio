// Animation au défilement
document.addEventListener('DOMContentLoaded', function() {
    // Activer les tooltips Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .stat-card, .testimonial');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };

    // Écouteur d'événement de défilement
    window.addEventListener('scroll', animateOnScroll);

    // Exécuter une fois au chargement
    animateOnScroll();

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            alert('Merci pour votre message! Je vous répondrai dès que possible.');
            contactForm.reset();
        });
    }
});

// Compteur animé pour les statistiques
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h4');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.innerText.replace('+', '');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target + '+';
        }
    });
}

// Démarrer les compteurs lorsque la section est visible
window.addEventListener('scroll', function() {
    const statsSection = document.querySelector('.stat-card');
    if (statsSection) {
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            animateCounters();
            // Retirer l'écouteur après activation pour éviter les répétitions
            window.removeEventListener('scroll', this);
        }
    }
});