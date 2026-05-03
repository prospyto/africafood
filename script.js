// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            // Retire la classe active de tous les onglets
            links.forEach(l => l.classList.remove('active'));
            // Ajoute la classe au lien cliqué
            this.classList.add('active');
        });
    });

    // Gestionnaire pour le formulaire
    document.querySelector('.order-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Commande validée !');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const plats = document.querySelectorAll('.plat-item');

    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            observer.unobserve(entry.target);
        });
    }, options);

    plats.forEach(plat => {
        // État initial pour l'animation
        plat.style.opacity = '0';
        plat.style.transform = 'translateY(20px)';
        plat.style.transition = 'all 0.8s ease-out';
        
        observer.observe(plat);
    });
});