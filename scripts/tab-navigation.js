const links = document.querySelectorAll('.nav__link');
const light = document.querySelector('.nav__light');
let isTransitioning = false; // Flag to prevent double transitions
let isPageReload = true; // Flag to check if it’s a page reload

// Function to move the light to the selected link
function moveLight(linkElement) {
    const { offsetLeft, offsetWidth } = linkElement;
    const newLeft = offsetLeft + (offsetWidth / 2) - (light.offsetWidth / 2);
    console.log(`Moving light to: ${newLeft}px`); // Log the new position
    light.style.left = `${newLeft}px`; // Move the light
}

// Function to set the active link
function setActiveLink(linkActive) {
    console.log(`Setting active link: ${linkActive.textContent}`); // Log the active link
    links.forEach(link => {
        link.classList.remove('active');
    });
    linkActive.classList.add('active');
}

// Function to set the initial active link from local storage
function setInitialActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const lastActiveLink = localStorage.getItem('activeLink') || currentPage;
    console.log(`Current page: ${currentPage}`); // Log the current page
    console.log(`Last active link: ${lastActiveLink}`); // Log the last active link

    links.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');

        if (linkHref === lastActiveLink) {
            setActiveLink(link);
            moveLight(link); // Move the light to the last active link on page load
            console.log(`Light positioned at: ${linkHref}`); // Log positioning on page load
        }
    });
}

// Set the initial active link on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded. Setting initial active link.'); // Log document load
    setInitialActiveLink(); // Set the initial position of the light based on the last active link

    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Prevent immediate navigation
            const targetLink = event.currentTarget;

            // Check if already transitioning
            if (isTransitioning) {
                console.log('Transition already in progress.'); // Log if already transitioning
                return; // Prevent additional transitions
            }

            // Store the active link in local storage
            localStorage.setItem('activeLink', targetLink.querySelector('a').getAttribute('href'));
            console.log(`Active link stored: ${targetLink.querySelector('a').getAttribute('href')}`); // Log stored active link

            // Set transitioning flag
            isTransitioning = true; 

            // Move the light and set active link
            setActiveLink(targetLink); // Activate the clicked link
            moveLight(targetLink); // Move the light to the clicked link

            // Use a timeout to navigate after a slight delay to allow the transition to complete
            setTimeout(() => {
                window.location.href = targetLink.querySelector('a').getAttribute('href');
                console.log(`Navigating to: ${targetLink.querySelector('a').getAttribute('href')}`); // Log navigation
                isTransitioning = false; // Reset the flag after navigation
            }, 300); // Adjust this delay to match your desired transition timing
        });
    });
});

// Directly set the light position on page load without transition
window.addEventListener('load', () => {
    console.log('Page loaded. Checking current active link.'); // Log page load
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const linkHref = link.querySelector('a').getAttribute('href');
        if (linkHref === currentPage) {
            moveLight(link); // Move the light to the currently loaded page link
            isPageReload = false; // Set the page reload flag to false
        }
    });
});

// Use a MutationObserver to detect transitions
const observer = new MutationObserver(() => {
    if (isPageReload) {
        // If it's a page reload, skip transitions
        light.style.transition = 'none'; // Disable transition temporarily
        setTimeout(() => {
            light.style.transition = ''; // Re-enable transition
        }, 0);
    } else {
        light.style.transition = ''; // Ensure transition is enabled
    }
});

// Observe the light for changes
observer.observe(light, {
    attributes: true
});

function moveLight(linkElement) {
  const { offsetLeft, offsetWidth } = linkElement;

  // Check for smaller screens (max-width: 719px)
  if (window.innerWidth <= 719) {
      // Adjust the left positioning for smaller screens
      light.style.left = `${offsetLeft + (offsetWidth / 2) - (light.offsetWidth / 2) + 0}px`; // Adjust this value as necessary
  } else {
      // Default positioning for larger screens
      light.style.left = `${offsetLeft + (offsetWidth / 2) - (light.offsetWidth / 2)}px`;
  }
}