// script.js
// Small script to handle the dark / light theme toggle.
// Behavior:
//  - Read saved preference from `localStorage` (if any)
//  - Fall back to the OS preference via `prefers-color-scheme`
//  - Update `data-theme` on `<body>` and change the toggle label
//  - Persist the chosen theme in `localStorage`

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

// Apply the theme and update the button text
const setTheme = theme => {
  document.body.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'light' ? 'Dark mode' : 'Light mode';
};

// initialize theme
setTheme(savedTheme || preferredTheme);

// toggle when the user clicks the button
themeToggle.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  setTheme(next);
  localStorage.setItem('theme', next);
});

const updateHeroGradientPosition = () => {
  const scroll = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollRatio = maxScroll > 0 ? scroll / maxScroll : 0;
  const x = 50 + scrollRatio * 16;
  const y = 50 + scrollRatio * 12;
  document.documentElement.style.setProperty('--hero-image-overlay-position', `${x}% ${y}%`);
};

let isUpdatingHeroGradient = false;

window.addEventListener('scroll', () => {
  if (!isUpdatingHeroGradient) {
    isUpdatingHeroGradient = true;
    window.requestAnimationFrame(() => {
      updateHeroGradientPosition();
      isUpdatingHeroGradient = false;
    });
  }
});

updateHeroGradientPosition();
