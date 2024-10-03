document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed for What I Do page');

    // Handle fade-in effect for what-i-do-section when the page loads
    const whatIDoSection = document.querySelector('.what-i-do-section');
    const trainingInfo = document.querySelector('.training-info');
    const pricingContainer = document.querySelector('.pricing-container');
    const testimonialSection = document.querySelector('.testimonial-section');
    const formHeader = document.querySelector('.form-header');
    const formContainer = document.querySelector('.form-container');
    const contactDetailsHeader = document.querySelector('.contact-details-header');
    const contactDetails = document.querySelector('.contact-details');
    if (whatIDoSection) {
        whatIDoSection.classList.add('slide-fade-in');
        console.log('slide-fade-in class added to .what-i-do-section');
    } else if (trainingInfo && pricingContainer) {
        trainingInfo.classList.add('slide-fade-in');
        pricingContainer.classList.add('slide-fade-in');
        console.log('slide-fade-in class added to trainingInfo and pricingContainer');
    } else if (testimonialSection) {
        testimonialSection.classList.add('slide-fade-in');
            console.log('slide-fade-in class added to testimonial section');
        }
    else if (formHeader && formContainer && contactDetailsHeader && contactDetails) {
        formHeader.classList.add('slide-fade-in');
        formContainer.classList.add('slide-fade-in');
        contactDetailsHeader.classList.add('slide-fade-in');
        contactDetails.classList.add('slide-fade-in');
        console.log('slide-fade-in class added to formHeader, formContainer, contactDetailsHeader and contactDetails');
    }

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
    if (whatIDoSection) {
        whatIDoSection.classList.remove('slide-fade-in');
        whatIDoSection.classList.add('slide-fade-out');
        console.log('slide-fade-out class added to .what-i-do-section');
    } else if (trainingInfo && pricingContainer ) {
        trainingInfo.classList.remove('slide-fade-in');
        trainingInfo.classList.add('slide-fade-out');
        pricingContainer.classList.remove('slide-fade-in');
        pricingContainer.classList.add('slide-fade-out');
    }  else if (testimonialSection) {
testimonialSection.classList.remove('slide-fade-in');
testimonialSection.classList.add('slide-fade-out');
    }
    else if (formHeader && formContainer && contactDetailsHeader && contactDetails) {
        formHeader.classList.remove('slide-fade-in');
       formHeader.classList.add('slide-fade-out');
        formContainer.classList.remove('slide-fade-in');
       formContainer.classList.add('slide-fade-out');
        contactDetailsHeader.classList.remove('slide-fade-in');
       contactDetailsHeader.classList.add('slide-fade-out');
        contactDetails.classList.remove('slide-fade-in');
      contactDetails.classList.add('slide-fade-out');
    }
        // Wait for the animation to finish before navigating
        setTimeout(() => {
            window.location.href = link.href; // Navigate after fade-out is done
        }, 2000); // Adjust this duration to match your animation length
    }
;
