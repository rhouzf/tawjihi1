// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('TawjihiBot website loaded and script running!');

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            // Ensure targetId is not just "#" to avoid errors with some browsers
            if (targetId.length > 1) {
                let targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Example: Alert when CTA button is clicked (can be expanded later)
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // If it's a link to an anchor, let smooth scroll handle it.
            // If it's intended for another action, that can be added here.
            // For now, just log, as smooth scroll is already active for #filieres.
            if (this.getAttribute('href') === '#filieres') {
                console.log('CTA button clicked, scrolling to filières.');
            } else {
                alert('Button clicked! More features coming soon.');
            }
        });
    }

    // Future enhancements could include:
    // - Dynamic content loading for filières/établissements
    // - Interactive quizzes or forms
    // - User account features

    // Gestion du formulaire de création de compte
    const form = document.getElementById('createAccountForm');
    if (!form) return;

    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const passwordStrength = document.getElementById('passwordStrength');
    const submitButton = form.querySelector('.submit-button');

    // Vérification de la force du mot de passe
    password.addEventListener('input', function() {
        const value = this.value;
        let strength = 0;
        
        if (value.length >= 8) strength += 1;
        if (value.match(/[a-z]/) && value.match(/[A-Z]/)) strength += 1;
        if (value.match(/\d/)) strength += 1;
        if (value.match(/[^a-zA-Z\d]/)) strength += 1;

        passwordStrength.style.width = (strength * 25) + '%';
        
        if (strength <= 1) {
            passwordStrength.style.backgroundColor = '#ef4444';
        } else if (strength <= 2) {
            passwordStrength.style.backgroundColor = '#f59e0b';
        } else if (strength <= 3) {
            passwordStrength.style.backgroundColor = '#10b981';
        } else {
            passwordStrength.style.backgroundColor = '#059669';
        }
    });

    // Vérification de la correspondance des mots de passe
    confirmPassword.addEventListener('input', function() {
        const formGroup = this.closest('.form-group');
        if (this.value !== password.value) {
            formGroup.classList.add('error');
            if (!formGroup.querySelector('.error-message')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Les mots de passe ne correspondent pas';
                formGroup.appendChild(errorMessage);
            }
        } else {
            formGroup.classList.remove('error');
            const errorMessage = formGroup.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    });

    // Animation du bouton de soumission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Vérification des champs
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            if (!input.value) {
                formGroup.classList.add('error');
                if (!formGroup.querySelector('.error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Ce champ est requis';
                    formGroup.appendChild(errorMessage);
                }
                isValid = false;
            } else {
                formGroup.classList.remove('error');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });

        if (!isValid) return;

        // Animation de chargement
        submitButton.classList.add('loading');
        
        // Simulation d'envoi (à remplacer par votre logique d'API)
        setTimeout(() => {
            submitButton.classList.remove('loading');
            // Redirection vers la page de connexion ou dashboard
            window.location.href = 'index.html';
        }, 2000);
    });

    // Animation des champs au focus
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
    });
});
