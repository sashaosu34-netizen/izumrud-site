const header = document.querySelector('.header');
const nav = document.getElementById('nav');
const menuButton = document.getElementById('menuButton');
const navLinks = document.querySelectorAll('.nav a');

function updateHeader(){ header.classList.toggle('scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, {passive:true});
updateHeader();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('active');
  menuButton.setAttribute('aria-expanded', String(open));
  header.classList.toggle('menu-open', open);
  document.body.classList.toggle('lock', open);
});
navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('active');
  menuButton.setAttribute('aria-expanded','false');
  header.classList.remove('menu-open');
  document.body.classList.remove('lock');
}));

document.querySelectorAll('[data-price-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.priceTab;
    document.querySelectorAll('[data-price-tab]').forEach(x => x.classList.toggle('active', x === tab));
    document.querySelectorAll('[data-price-panel]').forEach(panel => panel.classList.toggle('active', panel.dataset.pricePanel === key));
  });
});

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); reveal.unobserve(entry.target); }
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
