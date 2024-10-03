window.addEventListener('load', () => {
    console.log('Window fully loaded for What I Do page');

    // Handle fade-in effect for sections when the page loads
    const sections = document.querySelectorAll('.what-i-do-section, .training-info, .pricing-container, .testimonial-section, .form-header, .form-container, .contact-details-header, .contact-details');

    // Function to apply fade-in effect on scroll using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-fade-in');
                console.log('slide-fade-in class added to', entry.target.classList);
            }
        });
    }, { threshold: 0.1 }); // Adjust the threshold as needed

    // Observe all relevant sections for fade-in
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
});

// Function to handle fade-out effect when navigating away
const applyFadeOutEffect = (link) => {
    const whatIDoSection = document.querySelector('.what-i-do-section');
    const trainingInfo = document.querySelector('.training-info');
    const pricingContainer = document.querySelector('.pricing-container');
    const testimonialSection = document.querySelector('.testimonial-section');
    const formHeader = document.querySelector('.form-header');
    const formContainer = document.querySelector('.form-container');
    const contactDetailsHeader = document.querySelector('.contact-details-header');
    const contactDetails = document.querySelector('.contact-details');

    // Remove fade-in and apply fade-out
    if (whatIDoSection) {
        whatIDoSection.classList.remove('slide-fade-in');
        whatIDoSection.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to .what-i-do-section');
    }
    if (trainingInfo && pricingContainer) {
        trainingInfo.classList.remove('slide-fade-in');
        trainingInfo.classList.add('slide-fade-out');
        pricingContainer.classList.remove('slide-fade-in');
        pricingContainer.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to trainingInfo and pricingContainer');
    }
    if (testimonialSection) {
        testimonialSection.classList.remove('slide-fade-in');
        testimonialSection.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to testimonial section');
    }
    if (formHeader && formContainer && contactDetailsHeader && contactDetails) {
        formHeader.classList.remove('slide-fade-in');
        formHeader.classList.add('slide-fade-out');
        formContainer.classList.remove('slide-fade-in');
        formContainer.classList.add('slide-fade-out');
        contactDetailsHeader.classList.remove('slide-fade-in');
        contactDetailsHeader.classList.add('slide-fade-out');
        contactDetails.classList.remove('slide-fade-in');
        contactDetails.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to formHeader, formContainer, contactDetailsHeader and contactDetails');
    }

    // Wait for the animation to finish before navigating
    setTimeout(() => {
        window.location.href = link.href; // Navigate after fade-out is done
    }, 2000); // Adjust this duration to match your animation length
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
