// ============================================
// Temple Album — temples.js
// ============================================

// --- Footer: dynamic copyright year and last modified date ---
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// --- Hamburger menu toggle ---
const hamburgerBtn = document.getElementById('hamburger-btn');
const primaryNav = document.getElementById('primary-nav');

hamburgerBtn.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
    hamburgerBtn.innerHTML = isOpen ? '&times;' : '&#9776;';
});