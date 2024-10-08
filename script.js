let isScrolling = false;
let touchStartY = 0; // Store starting Y position for swipe
let touchEndY = 0;   // Store ending Y position for swipe

document.addEventListener('DOMContentLoaded', () => {
    // Handle fade-in effect when page loads
    const aboutContainer = document.querySelector('.about-container');
    const landingSection = document.querySelector('.landing');

    if (aboutContainer) {
        aboutContainer.style.display = 'none'; // Hide initially
        aboutContainer.classList.add('slide-fade-out'); // Apply slide-fade-out initially
        console.log('Fade-out class added to about container:', aboutContainer);
    }

    if (landingSection) {
        landingSection.classList.add('slide-fade-in'); // Ensure landing starts with fade-in
        console.log('Fade-in class added to landing section:', landingSection);
    }

    // Handle fade-out effect when navigating away
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent default link behavior
            event.preventDefault();
            const targetUrl = link.getAttribute('href');
            console.log('Navigation link clicked, target URL:', targetUrl);

            // Apply fade-out effect
            applyFadeOutEffect(() => {
                console.log('Fade-out complete, navigating to:', targetUrl);
                window.location.href = targetUrl;
            });
        });
    });
});

// Apply fade-out effect to current section
const applyFadeOutEffect = (callback) => {
    const aboutContainer = document.querySelector('.about-container');
    const landingSection = document.querySelector('.landing');

    // Fade out the landing section if it's active
    if (landingSection && landingSection.classList.contains('active')) {
        landingSection.classList.remove('slide-fade-in');
        landingSection.classList.add('slide-fade-out');
        console.log('Landing section is fading out');
    }

    if (aboutContainer) {
        aboutContainer.classList.remove('slide-fade-in'); // Remove fade-in class
        aboutContainer.classList.add('slide-fade-out'); // Add fade-out class
    }

    // Log when fade-out animation is complete
    setTimeout(() => {
        console.log('Fade-out animation complete');
        if (aboutContainer) aboutContainer.style.display = 'none'; // Hide after fade-out
        if (landingSection) landingSection.classList.add('hidden'); // Hide landing after fade-out
        callback();
    }, 1000); // Match the duration of the fade-out animation
};

// Function to handle section transitions
const handleSectionTransition = (direction) => {
    console.log(`${direction} section function called`);
    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        console.log("Current section found:", currentSection);
        applyFadeOutEffect(() => {
            const targetSection = direction === 'next' ? currentSection.nextElementSibling : currentSection.previousElementSibling;
            if (targetSection && targetSection.classList.contains('section')) {
                console.log(`${direction.charAt(0).toUpperCase() + direction.slice(1)} section found:`, targetSection);
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    currentSection.classList.remove('active');
                    targetSection.classList.add('active');
                    console.log("Updated active section class");

                    // Fade-in effect for the target section
                    if (targetSection.id === 'about') { // Check if the target section is 'about'
                        const targetAboutContainer = document.querySelector('.about-container');
                        if (targetAboutContainer) {
                            targetAboutContainer.style.display = 'block'; // Show the about container
                            targetAboutContainer.classList.remove('slide-fade-out'); // Remove fade-out class
                            targetAboutContainer.classList.add('slide-fade-in'); // Add fade-in class
                            console.log('Fade-in class added to about container');
                        }
                    } else if (targetSection.id === 'home') {
                        const targetLanding = document.querySelector('.landing');
                        if (targetLanding) {
                            targetLanding.classList.remove('slide-fade-out');
                            targetLanding.classList.add('slide-fade-in');
                            console.log('Fade-in class added to landing section');
                        }
                    }
                }, 1000); // Adjust this delay if needed
            } else {
                console.log(`No ${direction} section found or ${direction} element is not a section`);
            }
        });
    } else {
        console.log("No current section with 'active' class");
    }
};

// Functions to scroll to the next or previous section
const scrollToNextSection = () => handleSectionTransition('next');
const scrollToPreviousSection = () => handleSectionTransition('previous');

// Function to handle page navigation click
const handleNavigationClick = (event) => {
    console.log("Navigation click function called");
    const link = event.currentTarget;
    if (link.hash) {
        event.preventDefault(); // Prevent default link behavior
        const targetId = link.getAttribute('href').substring(1); // Remove the '#' from the href
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            console.log("Target section found:", targetSection);
            applyFadeOutEffect(() => {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    const currentSection = document.querySelector('.section.active');
                    if (currentSection) {
                        currentSection.classList.remove('active');
                        console.log("Removed 'active' class from current section");
                    }
                    targetSection.classList.add('active');
                    console.log("Added 'active' class to target section");
                    if (targetSection.id === 'about') {
                        const aboutContainer = document.querySelector('.about-container');
                        if (aboutContainer) {
                            aboutContainer.style.display = 'block'; // Show the about container
                            aboutContainer.classList.remove('slide-fade-out');
                            aboutContainer.classList.add('slide-fade-in');
                        }
                    } else if (targetSection.id === 'home') {
                        const landingSection = document.querySelector('.landing');
                        if (landingSection) {
                            landingSection.classList.remove('slide-fade-out');
                            landingSection.classList.add('slide-fade-in');
                            console.log('Fade-in class added to landing section');
                        }
                    }
                }, 1000); // Adjust this delay if needed
            });
        } else {
            console.log("Target section not found");
        }
    }
};

// Function to add event listeners to navigation links
const initializeNavigation = () => {
    console.log("initializeNavigation function called");
    const navLinks = document.querySelectorAll('nav a'); // Adjust this selector for your navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigationClick);
    });
};

// Function to ensure the page starts at the correct section
const initializePage = () => {
    console.log("initializePage function called");
    const startSection = document.querySelector('#home');
    if (startSection) {
        console.log("Start section found:", startSection);
        startSection.scrollIntoView({ behavior: 'auto' }); // Auto scroll to start section
        console.log("Scrolled to start section, scrollTop:", window.scrollY);
    } else {
        console.log("Start section (#home) not found");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    initializePage(); // Initialize page when DOM is ready
    initializeNavigation(); // Initialize navigation click listeners
});

// Event listener for mouse scroll functionality
document.addEventListener('wheel', (event) => {
    if (!isScrolling) { // Throttle scrolling
        isScrolling = true;
        if (event.deltaY > 0) { // Scroll down
            console.log("Scrolling down");
            scrollToNextSection();
        } else if (event.deltaY < 0) { // Scroll up
            console.log("Scrolling up");
            scrollToPreviousSection();
        }
        setTimeout(() => {
            isScrolling = false; // Reset flag after delay
        }, 1000); // Adjust the delay as needed
    }
});

// Event listener for touch events to handle swipe down
document.addEventListener('touchstart', (event) => {
    touchStartY = event.changedTouches[0].screenY;
});

document.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].screenY;
    handleSwipe();
});

const handleSwipe = () => {
    if (touchEndY < touchStartY) { // Swipe down
        console.log("Swipe down detected");
        scrollToNextSection();
    } else if (touchEndY > touchStartY) { // Swipe up
        console.log("Swipe up detected");
        scrollToPreviousSection();
    }
};
