// Animation au défilement et interactions globales
document.addEventListener('DOMContentLoaded', function() {
    // 1. Activer les tooltips Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (el) {
        return new bootstrap.Tooltip(el);
    });

    // 2. Défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))
                .scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 3. Animation des éléments au scroll
    const animateOnScroll = function() {
        document.querySelectorAll('.card, .stat-card, .testimonial').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // 4. Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message! Je vous répondrai dès que possible.');
            contactForm.reset();
        });
    }

    // 5. Toggle des preuves (images)
    document.querySelectorAll('.toggle-image').forEach(button => {
        button.addEventListener('click', function() {
            const card      = this.closest('.card');
            const container = card.querySelector('.card-img-container');
            const img       = container.querySelector('img');

            // Bascule l'affichage du container et de l'image
            container.classList.toggle('show');
            img.classList.toggle('active');

            // Mise à jour du texte du bouton
            this.textContent = container.classList.contains('show')
                ? 'Masquer preuve'
                : 'Afficher preuve';

            // Scroll fluide vers l'image si on vient d'ouvrir
            if (container.classList.contains('show')) {
                img.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    // 6. Toggle des descriptions
    document.querySelectorAll('.toggle-description').forEach(button => {
        button.addEventListener('click', function() {
            const desc = this.closest('.card-body').querySelector('.description-container');
            desc.classList.toggle('show');
            this.textContent = desc.classList.contains('show')
                ? 'Masquer description'
                : 'Voir description';
        });
    });
});

// Compteurs animés pour les statistiques
function animateCounters() {
    const counters = document.querySelectorAll('.stat-card h4');
    const speed = 200;
    counters.forEach(counter => {
        const target = +counter.innerText.replace('+','');
        let count = +counter.innerText.replace('+','');
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + '+';
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target + '+';
        }
    });
}

// Lancer les compteurs quand la section devient visible
function onCounterScroll() {
    const statsSection = document.querySelector('.stat-card');
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight / 1.3) {
        animateCounters();
        window.removeEventListener('scroll', onCounterScroll);
    }
}
window.addEventListener('scroll', onCounterScroll);
onCounterScroll();
