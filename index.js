document.addEventListener('DOMContentLoaded', () => {
    const metrics = document.querySelectorAll('.metric-card');
    const cards = document.querySelectorAll('.photo-cards .card');

    // Function to start the counter animation
    const startCounter = (metric) => {
        const valueElement = metric.querySelector('.metric-value');
        const target = +valueElement.getAttribute('data-target');

        metric.classList.add('show');

        let current = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                if (valueElement.querySelector('p')) {
                    valueElement.innerHTML = target + valueElement.querySelector('p').outerHTML;
                } else {
                    valueElement.textContent = target;
                }
                clearInterval(interval);
            } else {
                if (valueElement.querySelector('p')) {
                    valueElement.innerHTML = Math.ceil(current) + valueElement.querySelector('p').outerHTML;
                } else {
                    valueElement.textContent = Math.ceil(current);
                }
            }
        }, 20); // Adjust time for smoothness
    };

    // Function to handle photo card visibility
    const handlePhotoCardVisibility = (card, isVisible) => {
        if (isVisible) {
            card.classList.add('show');
        } else {
            card.classList.remove('show');
        }
    };

    // Create IntersectionObserver for metrics
    const metricsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                metricsObserver.unobserve(entry.target); // Stop observing once the animation has started
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    metrics.forEach(metric => {
        metricsObserver.observe(metric);
    });

    // Create IntersectionObserver for photo cards
    const photoCardsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            handlePhotoCardVisibility(entry.target, entry.isIntersecting);
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    cards.forEach(card => {
        photoCardsObserver.observe(card);
    });
});
