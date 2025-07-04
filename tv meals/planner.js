// Optional JS for toggling dropdowns on click (good for mobile)
document.querySelectorAll('.dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      const menu = link.nextElementSibling;
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }
  });
});
