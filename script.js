let isScrolling = false;

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

            // Get target page URL
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
        aboutContainer.classList.remove('slide-fade-in')
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

    const currentSection = document.querySelector('.section.active');
    if (currentSection) {
        console.log("Current section found:", currentSection);

        // Apply fade-out effect to current section before transitioning
        applyFadeOutEffect(() => {
            const targetSection = direction === 'next' ? currentSection.nextElementSibling : currentSection.previousElementSibling;
            if (targetSection && targetSection.classList.contains('section')) {

                // Delay scrolling to target section
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    // Update the active section class
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

            // Apply fade-out effect to current section before navigating
            applyFadeOutEffect(() => {
                // Delay navigation to target section
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });

                    // Update the active section class
                    const currentSection = document.querySelector('.section.active');
                    if (currentSection) {
                        currentSection.classList.remove('active');
                        console.log("Removed 'active' class from current section");
                    }
                    targetSection.classList.add('active');
                    console.log("Added 'active' class to target section");

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

// Event listener for scroll functionality
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

document.addEventListener('DOMContentLoaded', function () {
    // Get all sections
    const aboutSection = document.getElementById('about');
    const homeSection = document.getElementById('home');
    
    // Scroll listener to check when #about is active
    function handleSectionScroll() {
        if (aboutSection.classList.contains('active')) {
            document.body.style.overflowY = 'auto'; // Enable scrolling
        } else {
            document.body.style.overflowY = 'hidden'; // Disable scrolling
        }
    }

    // Run on page load and also when navigating between sections
    window.addEventListener('scroll', handleSectionScroll);
});

document.addEventListener('wheel', (e) => {
    e.preventDefault();
    window.scrollBy({
      top: e.deltaY,
      behavior: 'smooth'
    });
  }, { passive: false });
