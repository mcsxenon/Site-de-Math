// Sélection de tous les liens du menu
const menuLinks = document.querySelectorAll('header nav ul li a');

// Ajout d'une animation au survol
menuLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)';
        link.style.transition = 'transform 0.2s ease';
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';
    });
});
