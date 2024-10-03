window.addEventListener('load', () => {
    console.log('Window fully loaded for What I Do page');

    // Handle fade-in effect for sections when the page loads
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');
    console.log('Sections to observe:', sections);

    // Function to apply fade-in effect on scroll using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Intersecting section:', entry.target);
                entry.target.classList.add('slide-fade-in');
                entry.target.classList.remove('slide-fade-out');
            } else {
                console.log('Not intersecting section:', entry.target);
                entry.target.classList.remove('slide-fade-in');
                entry.target.classList.add('slide-fade-out');
            }
        });
    }, { threshold: 0.1 }); // Adjust the threshold as needed

    // Observe all relevant sections for fade-in and fade-out
    sections.forEach(section => {
        if (section) {
            observer.observe(section);
            console.log('Observing section:', section);
        }
    });

    // Add event listener for navigation away from the page
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation initially
            console.log('Navigation link clicked:', link);
            applyFadeOutEffect(link);
        });
    });

    // Set up flags for touch and scroll events
    let isTouching = false;
    let startY = 0; // To track the initial Y position

    // Handle touchstart event
    window.addEventListener('touchstart', (event) => {
        isTouching = true;
        startY = event.touches[0].clientY; // Store initial Y position
    });

    // Handle touchend event
    window.addEventListener('touchend', (event) => {
        isTouching = false;
    });

    // Handle touchmove event for touch screens
    window.addEventListener('touchmove', (event) => {
        if (!isTouching) return; // Only run if touch is ongoing

        const currentY = event.touches[0].clientY; // Get current Y position
        const swipeDistance = currentY - startY; // Calculate distance swiped
        console.log('Touch moving:', currentY, 'Swipe Distance:', swipeDistance); // Log current Y and swipe distance

    // Also handle scroll event for normal scrolling behavior
    window.addEventListener('scroll', () => {
        handleScrollTransitions();
    });
});

// Function to handle swipe down
const handleSwipeDown = () => {
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');
    sections.forEach(section => {
        section.classList.remove('slide-fade-in');
        section.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to', section);
    });
};

// Function to handle swipe up
const handleSwipeUp = () => {
    console.log('Handling swipe up...');
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');
    sections.forEach(section => {
        section.classList.remove('slide-fade-out');
        section.classList.add('slide-fade-in');
        console.log('slide-fade-in class added to', section);
    });
};

// Function to handle fade-out effect when navigating away
const applyFadeOutEffect = (link) => {
    console.log('Applying fade-out effect for navigation to:', link.href);
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');

    // Remove fade-in and apply fade-out to all sections
    sections.forEach(section => {
        section.classList.remove('slide-fade-in');
        section.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to', section);
    });

    // Wait for the animation to finish before navigating
    setTimeout(() => {
        console.log('Navigating to:', link.href); // Log the navigation
        window.location.href = link.href; // Navigate after fade-out is done
    }, 2000); // Adjust this duration to match your animation length
};

// Handle scroll transitions for touch and scroll events
const handleScrollTransitions = () => {
    console.log('Handling scroll transitions...'); // Log to confirm the function is called
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');

    sections.forEach(section => {
        if (isElementInViewport(section)) {
            console.log(`Section in view: ${section.classList}`); // Log which section is in view
            section.classList.add('slide-fade-in');
            section.classList.remove('slide-fade-out');
        } else {
            console.log(`Section out of view: ${section.classList}`); // Log which section is out of view
            section.classList.remove('slide-fade-in');
            section.classList.add('slide-fade-out');
        }
    });
};

// Utility function to check if element is in viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    const inViewport = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
    console.log(`Element ${el.classList} in viewport: ${inViewport}`); // Log the check result
    return inViewport;
}
});
