document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation
    const header = document.querySelector('.site-header');
    const menuToggle = document.querySelector('.menu-toggle');
    if (header && menuToggle) {
        menuToggle.addEventListener('click', () => {
            const open = header.classList.toggle('menu-open');
            menuToggle.setAttribute('aria-expanded', String(open));
        });
    }

    // Email links are assembled client-side to keep the address away from scrapers
    const email = atob('bHVrYXNfdm9zc0BpY2xvdWQuY29t');
    document.querySelectorAll('[data-email]').forEach(link => {
        link.href = `mailto:${email}`;
    });
    document.querySelectorAll('[data-email-text]').forEach(el => {
        el.textContent = email;
    });

    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});
