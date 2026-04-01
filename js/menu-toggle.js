document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    if (!toggle || !navbar) return;

    toggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        toggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu';
    });

    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.querySelector('i').className = 'bx bx-menu';
        });
    });
});
