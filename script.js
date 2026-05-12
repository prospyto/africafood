document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVIGATION : Gestion du lien actif & Scroll Espion ---
    const links = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section'); // Assure-toi que tes sections ont des IDs

    const changeActiveLink = () => {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Marge pour le header fixe
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                links.forEach(l => {
                    l.classList.remove('active');
                    if (l.getAttribute('href') === `#${sectionId}`) {
                        l.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', changeActiveLink);

    // --- 2. FORMULAIRE : Animation et Feedback ---
    // Utilisation de l'ID correct : 'orderForm' d'après ton HTML précédent
    const orderForm = document.getElementById('orderForm'); 
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-submit');
            if (!btn) return;

            const originalText = btn.innerHTML;
            
            // État de chargement
            btn.innerHTML = "<span>⌛</span> Envoi en cours...";
            btn.style.opacity = "0.7";
            btn.style.pointerEvents = "none"; // Empêche le double clic

            // Simulation d'envoi (AJAX)
            setTimeout(() => {
                btn.innerHTML = "✅ Demande envoyée !";
                btn.style.backgroundColor = "#27ae60"; 
                btn.style.opacity = "1";

                // Réinitialisation après succès
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = ""; 
                    btn.style.pointerEvents = "auto";
                    this.reset();
                    
                    // Optionnel : Afficher le message de succès personnalisé de ton HTML
                    const successMsg = document.getElementById('success-message');
                    if(successMsg) successMsg.style.display = 'block';
                }, 2500);
            }, 1500);
        });
    }

    // --- 3. FOOTER : Année Dynamique ---
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        // Utilisation de textContent pour la sécurité ou innerHTML si tu as des balises <strong>
        footerText.innerHTML = `&copy; ${currentYear} Africa Food - Tous droits réservés | Réalisé avec passion par <strong>Prospère</strong>`;
    }

    // --- 4. ANIMATION AU DÉFILEMENT (Intersection Observer - Plus fluide) ---
    const revealElements = document.querySelectorAll('.plat-item, .carte-temoignage, .titre-section');

    const revealOptions = {
        threshold: 0.15, // L'élément doit être visible à 15% pour apparaître
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target); // On arrête d'observer une fois animé
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        // Style initial (tu peux aussi le mettre dans ton CSS pour plus de propreté)
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});
