function detectMobile() {
        const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
        
        if (isMobile) {
            alert("Please open this website on PC/laptop for better interface.");
        }
    }

window.onload = detectMobile;

document.addEventListener('DOMContentLoaded', () => {
    const metrics = document.querySelectorAll('.metric-card');
    const cards = document.querySelectorAll('.client-card'); // Updated selector for client cards
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

    // Duplicate client cards for infinite scrolling
    const clientCardsContainer = document.querySelector('.client-cards');
    if (clientCardsContainer) {
        // Duplicate the client cards
        const cardElements = Array.from(clientCardsContainer.children);
        cardElements.forEach(card => {
            const clone = card.cloneNode(true);
            clientCardsContainer.appendChild(clone);
        });

        // Add horizontal scrolling functionality with blur effect
        let scrollInterval;
        const scrollSpeed = 8; // Adjust scrolling speed
        const scrollDelay = 8; // Adjust scrolling delay

        const startScrolling = () => {
            scrollInterval = setInterval(() => {
                if (clientCardsContainer.scrollLeft + clientCardsContainer.clientWidth >= clientCardsContainer.scrollWidth) {
                    clientCardsContainer.scrollLeft = 0;
                } else {
                    clientCardsContainer.scrollBy({ left: scrollSpeed, behavior: 'smooth' });
                }

                // Apply blur effect to the first and last visible cards
                const containerRect = clientCardsContainer.getBoundingClientRect();
                cards.forEach((card, index) => {
                    const cardRect = card.getBoundingClientRect();

                    // Check if the card is near the start of the container
                    if (cardRect.left < containerRect.left + 40) {
                        card.classList.add('blur-in');
                        card.classList.remove('blur-out');
                    }
                    // Check if the card is near the end of the container
                    else if (cardRect.right > containerRect.right - 40) {
                        card.classList.add('blur-out');
                        card.classList.remove('blur-in');
                    }
                    // Remove blur effect for cards in the middle
                    else {
                        card.classList.remove('blur-in', 'blur-out');
                    }
                });
            }, scrollDelay);
        };

        startScrolling();
    }

    const shortFormButton = document.querySelector('.short-form');
    const longFormButton = document.querySelector('.long-form');
    const shortFormContent = document.getElementById('short-form-content');
    const longFormContent = document.getElementById('long-form-content');
    if (shortFormButton.classList.contains('active')) {
        shortFormContent.classList.add('active');
    }
    // Function to set the active and inactive states
    const setActiveButton = (activeButton, inactiveButton) => {
        activeButton.classList.add('active');
        activeButton.classList.remove('inactive');
        inactiveButton.classList.add('inactive');
        inactiveButton.classList.remove('active');
    };
    // Function to toggle content sections
    const toggleContent = (activeContent, inactiveContent) => {
        activeContent.classList.add('active');
        inactiveContent.classList.remove('active');
    };
    // Initial state: short form content is active
    setActiveButton(shortFormButton, longFormButton);
    // Event listeners for button clicks
    shortFormButton.addEventListener('click', () => {
        setActiveButton(shortFormButton, longFormButton);
        toggleContent(shortFormContent, longFormContent);
    });
    longFormButton.addEventListener('click', () => {
        setActiveButton(longFormButton, shortFormButton);
        toggleContent(longFormContent, shortFormContent);
    });
});
// Adjust font size dynamically for responsiveness
window.addEventListener('resize', function () {
    const newSize = window.innerWidth / 100 + 'px';
    document.documentElement.style.fontSize = newSize;
});
// Toggle content sections based on button clicks
document.querySelector('.short-form').addEventListener('click', function () {
    document.querySelector('#short-form-content').style.display = 'block';
    document.querySelector('#long-form-content').style.display = 'none';
});
document.querySelector('.long-form').addEventListener('click', function () {
    document.querySelector('#short-form-content').style.display = 'none';
    document.querySelector('#long-form-content').style.display = 'block';
});
function updateURL() {
    const targetId = 'review';
    const targetElement = document.getElementById(targetId);
    // Temporarily remove the hash
    window.history.replaceState(null, null, ' ');
    // Force re-add the hash to trigger scroll
    window.location.hash = targetId;
    // Optionally, you can use a small timeout to ensure the hash update triggers scroll
    setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }, 0);
}
