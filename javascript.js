// Blinking effect for the main heading
document.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('h1');
    setInterval(() => {
        heading.style.visibility = heading.style.visibility === 'hidden' ? 'visible' : 'hidden';
    }, 500); // Blink every 500ms
});

// Function to flip the coin
function flipCoin() {
    const coin = document.getElementById('coin');
    coin.classList.add('coin-flip');
    setTimeout(() => {
        coin.classList.remove('coin-flip'); // Remove class after animation
    }, 1000); // Match animation duration
}
