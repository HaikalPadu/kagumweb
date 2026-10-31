const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#bookingForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = document.querySelector('.form-message');
  message.textContent = 'Thank you — your request is ready to be connected to the Kagum team.';
  event.currentTarget.reset();
});
