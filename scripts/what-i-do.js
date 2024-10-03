window.addEventListener('load', () => {
    console.log('Window fully loaded for What I Do page');

    // Add event listener for touch events
    const touchArea = document.body; // Change this to a more specific element if necessary

    touchArea.addEventListener('touchstart', (event) => {
        console.log('Touch started at:', event.touches[0].clientY); // Log touch start with Y position
    });

    touchArea.addEventListener('touchmove', (event) => {
        const currentY = event.touches[0].clientY; // Get current Y position
        console.log('Touch moving:', currentY); // Log current Y
    });

    touchArea.addEventListener('touchend', (event) => {
        console.log('Touch ended'); // Log touch end
    });

    // Also handle scroll event for normal scrolling behavior
    window.addEventListener('scroll', () => {
        console.log('Scrolling...');
    });
});
