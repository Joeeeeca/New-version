let isScrolling = false;
let touchStartY = 0; // Store starting Y position for swipe
let touchEndY = 0;   // Store ending Y position for swipe

document.addEventListener('DOMContentLoaded', () => {
    // Handle fade-in effect when page loads
    const aboutContainer = document.querySelector('.about-container');
    const landingSection = document.querySelector('.landing');

    if (aboutContainer) {
        aboutContainer.classList.add('slide-fade-out'); // Ensure slide-fade-out is applied initially
    }

    if (landingSection) {
        landingSection.classList.add('slide-fade-in'); // Ensure landing starts with fade-in
    }

    // Handle fade-out effect when navigating away
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent default link behavior
            event.preventDefault();
            const targetUrl = link.getAttribute('href');

            // Apply fade-out effect
            applyFadeOutEffect(() => {
                window.location.href = targetUrl;
            });
        });
    });
});

// Apply fade-out effect to current section
const applyFadeOutEffect = (callback) => {
    const aboutContainer = document.querySelector('.about-container');
    const landingSection = document.querySelector('.landing');

    // Apply fade-out for about container if it's currently faded in
    if (aboutContainer && aboutContainer.classList.contains('slide-fade-in')) {
        aboutContainer.classList.remove('slide-fade-in'); // Remove fade-in class
        aboutContainer.classList.add('slide-fade-out'); // Add fade-out class

        // Wait for the fade-out animation to complete
        aboutContainer.addEventListener('animationend', () => {
            callback(); // Proceed with the callback function
        }, { once: true });
    }

    // Apply fade-out for landing section if transitioning to about
    if (landingSection) {
        landingSection.classList.remove('slide-fade-in'); // Remove fade-in class
        landingSection.classList.add('slide-fade-out'); // Add fade-out class

        // Wait for the fade-out animation to complete
        landingSection.addEventListener('animationend', () => {
            callback(); // Proceed with the callback function
        }, { once: true });
    }
};

// Function to handle section transitions
const handleSectionTransition = (direction) => {
    const currentSection = document.querySelector('.section.active');
    const aboutContainer = document.querySelector('.about-container');
    const landingSection = document.querySelector('.landing');

    if (currentSection) {
        applyFadeOutEffect(() => {
            const targetSection = direction === 'next' ? currentSection.nextElementSibling : currentSection.previousElementSibling;
            if (targetSection && targetSection.classList.contains('section')) {
                setTimeout(() => {
                    currentSection.classList.remove('active'); // Remove active class from current section
                    targetSection.classList.add('active'); // Add active class to target section

                    // If we are transitioning to the 'about' section
                    if (targetSection.id === 'about') {
                        if (aboutContainer) {
                            aboutContainer.classList.remove('slide-fade-out'); // Ensure fade-out is removed
                            aboutContainer.classList.add('slide-fade-in'); // Apply fade-in to about container
                            aboutContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to about section
                        }
                    }
                    // If transitioning to 'home' section
                    else if (targetSection.id === 'home') {
                        if (landingSection) {
                            landingSection.classList.remove('slide-fade-out'); // Ensure fade-out is removed
                            landingSection.classList.add('slide-fade-in'); // Apply fade-in to landing section
                            landingSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to landing section
                        }
                        // Ensure about-container fades out and stays that way
                        if (aboutContainer) {
                            aboutContainer.classList.remove('slide-fade-in'); // Remove slide-fade-in
                            aboutContainer.classList.add('slide-fade-out'); // Add slide-fade-out
                        }
                    }
                }, 1000); // Wait for fade-out animation to complete before transitioning
            }
        });
    }
};

// Functions to scroll to the next or previous section
const scrollToNextSection = () => handleSectionTransition('next');
const scrollToPreviousSection = () => handleSectionTransition('previous');

// Event listener for mouse scroll functionality
document.addEventListener('wheel', (event) => {
    if (!isScrolling) { // Throttle scrolling
        isScrolling = true;
        if (event.deltaY > 0) { // Scroll down
            scrollToNextSection();
        } else if (event.deltaY < 0) { // Scroll up
            scrollToPreviousSection();
        }
        setTimeout(() => {
            isScrolling = false; // Reset flag after delay
        }, 1000); // Adjust the delay as needed
    }
});

// Event listener for touch events to handle swipe down
document.addEventListener('touchstart', (event) => {
    touchStartY = event.changedTouches[0].clientY; // Store starting Y position
});

document.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY; // Store ending Y position
    const swipeDistance = touchEndY - touchStartY;
    if (swipeDistance > 50 && !isScrolling) { // Swipe down (adjust threshold as needed)
        scrollToPreviousSection();
    } else if (swipeDistance < -50 && !isScrolling) { // Swipe up
        scrollToNextSection();
    }
});
