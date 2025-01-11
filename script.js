// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Toggle Button Functionality for Mobile Navigation
    const toggleButton = document.querySelector('.toggle-button');
    const navMenu = document.querySelector('.nav-menu');

    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Carousel Functionality
    let slideIndex = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const prev = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const totalSlides = slides.length;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    // Show the initial slide
    showSlide(slideIndex);

    // Event listeners for carousel controls
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

    // Auto-slide functionality with smooth transitions
    let autoSlideInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }, 5000); // Change slide every 5 seconds

    // Pause auto-slide on hover and resume on mouse leave
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

    // Інтерактивна Карта
    document.addEventListener('DOMContentLoaded', () => {
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

    // Делегування подій для покращення продуктивності
    const svgMap = document.getElementById('us-map');

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

        // Коригування позиції, щоб підказка не виходила за межі екрану
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
        stateElement.setAttribute('tabindex', '0'); // Робимо фокусованим
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
});

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            // Change icon based on mode
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }
});
