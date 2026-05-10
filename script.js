document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation : Gestion du lien actif avec défilement fluide
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Formulaire : Animation de chargement et confirmation stylée
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-valider');
            const originalText = btn.innerHTML;
            
            // Animation du bouton
            btn.innerHTML = "<span>⌛</span> Envoi en cours...";
            btn.style.opacity = "0.7";
            btn.style.transform = "scale(0.95)";
            btn.disabled = true;

            setTimeout(() => {
                // Remplacement de l'alert par une petite animation de succès
                btn.innerHTML = "✅ Envoyé !";
                btn.style.backgroundColor = "#27ae60"; 
                btn.style.opacity = "1";
                btn.style.transform = "scale(1)";

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = ""; // Reprend la couleur du CSS
                    btn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // 3. Pied de page : Mise à jour de l'année et signature
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        // Ta signature est maintenant gérée proprement ici
        footerText.innerHTML = `&copy; ${currentYear} Africa Food - Tous droits réservés | Développé avec passion par Prosper`;
    }

    // 4. Animation au défilement (Scroll Reveal)
    // On fait apparaître les éléments quand ils arrivent à l'écran
    const revealElements = document.querySelectorAll('.plat-item, .carte-temoignage, .titre-principal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    // Initialisation des styles pour l'animation
    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Lancer une fois au chargement
});
