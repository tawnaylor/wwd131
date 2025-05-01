const themeSelector = document.querySelector('#theme');
const logo = document.querySelector('#logo');
const body = document.body;

function changeTheme() {
  if (themeSelector.value === 'dark') {
    body.classList.add('dark');
    logo.src = 'images/byui-logo_white.png'; // updated file path
  } else {
    body.classList.remove('dark');
    logo.src = 'images/byui-logo_blue.webp'; // updated file path
  }
}

themeSelector.addEventListener('change', changeTheme);

document.getElementById('theme').addEventListener('change', function () {
  if (this.value === 'dark') {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});
