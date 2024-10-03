window.addEventListener('load', () => {
    console.log('Window fully loaded for What I Do page');

    // Handle fade-in effect for sections when the page loads
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');

    // Function to apply fade-in effect on scroll using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-fade-in');
                entry.target.classList.remove('slide-fade-out');
                console.log('slide-fade-in class added to', entry.target.classList);
            } else {
                entry.target.classList.remove('slide-fade-in');
                entry.target.classList.add('slide-fade-out');
                console.log('slide-fade-out class added to', entry.target.classList);
            }
        });
    }, { threshold: 0.1 }); // Adjust the threshold as needed

    // Observe all relevant sections for fade-in and fade-out
    sections.forEach(section => {
        if (section) {
            observer.observe(section);
        }
    });

    // Add event listener for navigation away from the page
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation initially
            applyFadeOutEffect(link);
        });
    });

    // Handle touch event for touch screens
    window.addEventListener('touchmove', () => {
        handleScrollTransitions();
    });

    // Also handle scroll event for normal scrolling behavior
    window.addEventListener('scroll', () => {
        handleScrollTransitions();
    });
});

// Function to handle fade-out effect when navigating away
const applyFadeOutEffect = (link) => {
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');
    
    // Remove fade-in and apply fade-out to all sections
    sections.forEach(section => {
        section.classList.remove('slide-fade-in');
        section.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to', section.classList);
    });

    // Wait for the animation to finish before navigating
    setTimeout(() => {
        window.location.href = link.href; // Navigate after fade-out is done
    }, 2000); // Adjust this duration to match your animation length
};

// Handle scroll transitions for touch and scroll events
const handleScrollTransitions = () => {
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');

    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('slide-fade-in');
            section.classList.remove('slide-fade-out');
            console.log('slide-fade-in class added to', section.classList);
        } else {
            section.classList.remove('slide-fade-in');
            section.classList.add('slide-fade-out');
            console.log('slide-fade-out class added to', section.classList);
        }
    });
};

// Utility function to check if element is in viewport
const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};
