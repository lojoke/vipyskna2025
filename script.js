document.addEventListener('DOMContentLoaded', () => {
    // Toggle Button for Mobile Navigation
    const toggleButton = document.querySelector('.toggle-button');
    const navMenu = document.querySelector('.nav-menu');
    
    toggleButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

// Dark Mode Functionality
const themeToggleButton = document.getElementById('theme-toggle-button');
const waveOverlay = document.getElementById('wave-overlay');

if (themeToggleButton && waveOverlay) {
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleButton.innerHTML = '☀️';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.innerHTML = '🌙';
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        waveOverlay.classList.add('active');

        setTimeout(() => {
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
            waveOverlay.classList.remove('active');
        }, 600);
    });
} else {
    console.warn('Елементи для перемикання теми не знайдені.');
}

    // Carousel Functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const prev = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    showSlide(slideIndex);

    if (nextBtn && prev) {
        nextBtn.addEventListener('click', () => {
            slideIndex = (slideIndex + 1) % totalSlides;
            showSlide(slideIndex);
        });

        prev.addEventListener('click', () => {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
            showSlide(slideIndex);
        });
    }

    let autoSlideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }, 5000);

    const carousel = document.querySelector('.carousel');

    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                slideIndex = (slideIndex + 1) % totalSlides;
                showSlide(slideIndex);
            }, 5000);
        });
    }

    // Interactive Map Functionality
    const states = {
        'delaware': {
            name: 'Delaware',
            info: 'Delaware was the first state to ratify the Constitution on December 7, 1787.'
        },
        'pennsylvania': {
            name: 'Pennsylvania',
            info: 'Pennsylvania is home to Philadelphia, where the Declaration of Independence was signed.'
        },
        'new-jersey': {
            name: 'New Jersey',
            info: 'New Jersey played a crucial role in the American Revolution with key battles fought on its soil.'
        },
        'georgia': {
            name: 'Georgia',
            info: 'Georgia was the last of the original thirteen colonies established in 1733.'
        },
        'connecticut': {
            name: 'Connecticut',
            info: 'Connecticut is known as the "Constitution State" for its early adoption of a state constitution.'
        },
        'massachusetts': {
            name: 'Massachusetts',
            info: 'Massachusetts is the birthplace of the American Revolution and home to Harvard University.'
        },
        'maryland': {
            name: 'Maryland',
            info: 'Maryland was founded as a haven for English Catholics and played a significant role in early American history.'
        },
        'south-carolina': {
            name: 'South Carolina',
            info: 'South Carolina was the first state to secede from the Union, igniting the Civil War.'
        },
        'new-hampshire': {
            name: 'New Hampshire',
            info: 'New Hampshire is the first state to hold a primary in the U.S. presidential election cycle.'
        },
        'virginia': {
            name: 'Virginia',
            info: 'Virginia is known as the "Mother of Presidents," being the birthplace of eight U.S. presidents.'
        },
        'new-york': {
            name: 'New York',
            info: 'New York was a major center for immigration and commerce, home to the Statue of Liberty.'
        },
        'north-carolina': {
            name: 'North Carolina',
            info: 'North Carolina was a key battleground in the Civil War and is known for its diverse geography.'
        },
        'rhode-island': {
            name: 'Rhode Island',
            info: 'Rhode Island is the smallest U.S. state by area but rich in maritime history.'
        }
    };

    const tooltip = document.getElementById('tooltip');
    const svgMap = document.getElementById('us-map');

    if (tooltip && svgMap) {
        svgMap.addEventListener('mouseover', (e) => {
            const stateId = e.target.id;
            if (states[stateId]) {
                const state = states[stateId];
                tooltip.innerHTML = `<strong>${state.name}</strong><br>${state.info}`;
                tooltip.classList.add('visible');
            }
        });

        svgMap.addEventListener('mousemove', (e) => {
            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;
            let left = e.pageX + 15;
            let top = e.pageY + 15;

            if (left + tooltipWidth > window.innerWidth) {
                left = e.pageX - tooltipWidth - 15;
            }

            if (top + tooltipHeight > window.innerHeight) {
                top = e.pageY - tooltipHeight - 15;
            }

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
        });

        svgMap.addEventListener('mouseout', (e) => {
            const stateId = e.target.id;
            if (states[stateId]) {
                tooltip.classList.remove('visible');
            }
        });

        // Додаткові події для доступності (фокусування клавіатурою)
        const stateElements = svgMap.querySelectorAll('.state-path');
        stateElements.forEach(stateElement => {
            stateElement.setAttribute('tabindex', '0');
            stateElement.setAttribute('aria-label', states[stateElement.id].name);

            stateElement.addEventListener('focus', (e) => {
                const state = states[stateElement.id];
                tooltip.innerHTML = `<strong>${state.name}</strong><br>${state.info}`;
                tooltip.classList.add('visible');
            });

            stateElement.addEventListener('blur', (e) => {
                tooltip.classList.remove('visible');
            });
        });
    } else {
        console.warn('Елементи tooltip або us-map не знайдені.');
    }
});
