document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation : Gestion du lien actif
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(link => {
        link.addEventListener('click', function() {
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Formulaire : Gestion de la validation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.btn-valider');
            const originalText = btn.innerText;
            
            btn.innerText = "Envoi en cours...";
            btn.disabled = true;

            setTimeout(() => {
                alert("Votre commande Africa Food a été envoyée avec succès !");
                btn.innerText = originalText;
                btn.disabled = false;
                this.reset();
            }, 1000);
        });
    }

    // 3. Pied de page : Mise à jour automatique de l'année
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.innerHTML = `&copy; ${currentYear} Tous droits réservés | Développé avec passion par Prosper`;
    }
});
