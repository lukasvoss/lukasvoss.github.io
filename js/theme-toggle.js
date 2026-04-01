(() => {
    const STORAGE_KEY = 'theme';

    function getPreferred() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function apply(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        document.querySelectorAll('.theme-toggle i').forEach(icon => {
            icon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
        });
    }

    // Apply immediately (before DOMContentLoaded) to prevent flash
    apply(getPreferred());

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.theme-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                apply(current === 'dark' ? 'light' : 'dark');
            });
        });
    });
})();
