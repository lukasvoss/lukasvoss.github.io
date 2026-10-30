document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        "am Lukas (路卡).",
        "build things.",
        "find patterns in data.",
        "turn ideas into code.",
        "have a passion for cooking.",
        "love quantum physics.",
    ];

    const typewriter = document.querySelector('.typewriter');
    if (!typewriter) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        typewriter.textContent = phrases[0];
        return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 80;
    const deletingSpeed = 50;
    const pauseAfterTyping = 2000;
    const pauseAfterDeleting = 500;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        charIndex += isDeleting ? -1 : 1;
        typewriter.textContent = currentPhrase.substring(0, charIndex);

        let delay = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = pauseAfterTyping;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = pauseAfterDeleting;
        }

        setTimeout(type, delay);
    }

    // Start after the hero entrance animation
    setTimeout(type, 700);
});
