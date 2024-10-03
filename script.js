let isScrolling = false;
let touchStartY = 0; // Store starting Y position for swipe
let touchEndY = 0;   // Store ending Y position for swipe

document.addEventListener('DOMContentLoaded', () => {
    // Handle fade-in effect when page loads
    const content = document.querySelector('.landing');
    if (content) {
        content.classList.add('slide-fade-out', 'slide-fade-in');
        console.log('Fade-in class added to content:', content);
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
    const currentSection = document.querySelector('.landing');
    const aboutContainer = document.querySelector('.about-container');
    
    if (currentSection) {
        currentSection.classList.remove('slide-fade-in');
        currentSection.classList.add('slide-fade-out');
    }
    
    if (aboutContainer && currentSection.id !== 'about') {
        aboutContainer.classList.remove('slide-fade-in');
        aboutContainer.classList.add('slide-fade-out');
    }

    // Log when fade-out animation is complete
    setTimeout(() => {
        console.log('Fade-out animation complete');
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

                    // Apply fade-in effect to new section
                    if (targetSection.id === 'about') {
                        const aboutContainer = document.querySelector('.about-container');
                        if (aboutContainer) {
                            aboutContainer.classList.remove('slide-fade-out');
                            aboutContainer.classList.add('slide-fade-in');
                        }
                    } else {
                        const landingContent = document.querySelector('.landing');
                        if (landingContent) {
                            landingContent.classList.remove('slide-fade-out');
                            landingContent.classList.add('slide-fade-in');
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
}

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
                            aboutContainer.classList.remove('slide-fade-out');
                            aboutContainer.classList.add('slide-fade-in');
                        }
                    } else {
                        const landingContent = document.querySelector('.landing');
                        if (landingContent) {
                            landingContent.classList.remove('slide-fade-out');
                            landingContent.classList.add('slide-fade-in');
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

// Touch event listeners for swipe detection
document.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY; // Get the starting Y position
}, { passive: true });

document.addEventListener('touchend', (event) => {
    touchEndY = event.changedTouches[0].clientY; // Get the ending Y position
    handleSwipe(); // Handle the swipe direction
});

// Handle swipe direction
const handleSwipe = () => {
    const threshold = 50; // Minimum distance for a valid swipe
    const swipeDistance = touchEndY - touchStartY;

    if (swipeDistance > threshold) {
        console.log("Swipe down detected");
        scrollToPreviousSection(); // Scroll up on swipe down
    } else if (swipeDistance < -threshold) {
        console.log("Swipe up detected");
        scrollToNextSection(); // Scroll down on swipe up
    }
};
