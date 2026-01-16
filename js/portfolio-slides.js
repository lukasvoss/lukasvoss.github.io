document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.portfolio-slider').forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let index = 0;

        slider.querySelector('.next').onclick = () => {
            slides[index].classList.remove('active');
            index = (index + 1) % slides.length;
            slides[index].classList.add('active');
        };

        slider.querySelector('.prev').onclick = () => {
            slides[index].classList.remove('active');
            index = (index - 1 + slides.length) % slides.length;
            slides[index].classList.add('active');
        };
    });
});