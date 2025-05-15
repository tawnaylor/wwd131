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