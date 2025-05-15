// Create the "Menu" button and dropdown container
const menuButton = document.createElement('button');
menuButton.textContent = 'Menu';
menuButton.id = 'menuButton';

// Style the "Menu" button to look like plain text
menuButton.style.background = 'none';
menuButton.style.border = 'none';
menuButton.style.color = 'blue';
menuButton.style.cursor = 'pointer';
menuButton.style.padding = '0';
menuButton.style.fontSize = 'inherit';
menuButton.style.textDecoration = 'underline';

const header = document.querySelector('h1');
if (header) {
    header.insertAdjacentElement('afterend', menuButton);
}

const dropdownMenu = document.createElement('div');
dropdownMenu.id = 'dropdownMenu';
dropdownMenu.style.display = 'none';
dropdownMenu.style.position = 'absolute';
dropdownMenu.style.backgroundColor = '#fff';
dropdownMenu.style.border = '1px solid #ccc';
dropdownMenu.style.padding = '10px';
document.body.prepend(dropdownMenu);

// Move all header links into the dropdown menu
const headerLinks = document.querySelectorAll('header a');
headerLinks.forEach(link => {
    link.style.display = 'none'; // Hide menu items by default
    dropdownMenu.appendChild(link.cloneNode(true));
});

// Toggle dropdown menu visibility on button click
menuButton.addEventListener('click', () => {
    const isHidden = dropdownMenu.style.display === 'none';
    dropdownMenu.style.display = isHidden ? 'block' : 'none';

    // Show or hide menu items
    const dropdownLinks = dropdownMenu.querySelectorAll('a');
    dropdownLinks.forEach(link => {
        link.style.display = isHidden ? 'block' : 'none';
    });
});

// Close dropdown menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Function to handle window resize and toggle the "hide" class on the menu
function handleResize() {
    if (window.innerWidth > 1000) {
        dropdownMenu.classList.remove('hide');
    } else {
        dropdownMenu.classList.add('hide');
    }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);

// Call handleResize immediately on page load
handleResize();

// Create the overlay for the pop-out effect
const overlay = document.createElement('div');
overlay.id = 'imageOverlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.zIndex = '1000';
document.body.appendChild(overlay);

// Create the image container for the pop-out
const popOutImage = document.createElement('img');
popOutImage.style.maxWidth = '200%'; // Make the image much larger
popOutImage.style.maxHeight = '200%'; // Make the image much larger
overlay.appendChild(popOutImage);

// Add click event to all images to enable pop-out
const images = document.querySelectorAll('img');
images.forEach(image => {
    image.addEventListener('click', () => {
        popOutImage.src = image.src;
        overlay.style.display = 'flex';
    });
});

// Close the pop-out when clicking outside the image
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});