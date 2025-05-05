// Blinking effect for the main heading
document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('h1');
    setInterval(() => {
        heading.style.visibility = heading.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500); // Blink every 500ms
});
