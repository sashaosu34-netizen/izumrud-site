const header = document.querySelector('.header');
const nav = document.getElementById('nav');
const menuButton = document.getElementById('menuButton');
const navLinks = document.querySelectorAll('.nav a');

function updateHeader(){
  header.classList.toggle('scrolled', window.scrollY > 20);
}
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

// Прайсы для карточек услуг. Здесь удобно менять/добавлять позиции и цены.
const servicePrices = {
  hair: {
    eyebrow: 'HAIR · ПРАЙС',
    title: 'Волосы',
    description: 'Стрижки, укладки, восстановление и мужской зал.',
    groups: [
      {
        title: 'Женский зал',
        items: [
          ['Стрижка модельная, короткие', 'мытьё и сушка оплачиваются отдельно', '900–1 500 ₽'],
          ['Стрижка, средняя длина', 'с укладкой', '1 000–1 700 ₽'],
          ['Стрижка, длинные волосы', 'с укладкой', '1 100–1 800 ₽'],
          ['Стрижка чёлки', 'быстрая коррекция формы', '500 ₽'],
          ['Вечерняя укладка «Леди»', 'собранная вечерняя причёска', '1 500–4 500 ₽'],
          ['Протеиновое восстановление', 'уход для повреждённых волос', '2 000–3 000 ₽']
        ]
      },
      {
        title: 'Мужской зал',
        items: [
          ['Стрижка машинкой', 'под 2 насадки', '600 ₽'],
          ['Стрижка усов', 'оформление длины', '200 ₽'],
          ['Моделирование бороды', 'форма и аккуратная окантовка', '600 ₽'],
          ['Оформление бороды', 'форма + окантовка', '600 ₽'],
          ['Мужской комплекс', 'стрижка + борода + мытьё + уход', 'от 2 000 ₽']
        ]
      }
    ]
  },
  nails: {
    eyebrow: 'NAILS · ПРАЙС',
    title: 'Ногти',
    description: 'Маникюр, педикюр, покрытие и уход за руками и стопами.',
    groups: [
      {
        title: 'Ногтевой сервис',
        items: [
          ['Маникюр комбинированный', 'аппарат + кусачки', '1 200 ₽'],
          ['Педикюр комбинированный', 'полная обработка стоп и пальцев', '1 900 ₽'],
          ['Покрытие гель-лак', 'однотонное покрытие', '1 300 ₽'],
          ['Наращивание ногтей', 'моделирование средней длины', '2 900 ₽']
        ]
      }
    ]
  },
  brows: {
    eyebrow: 'BROWS · ПРАЙС',
    title: 'Брови и ресницы',
    description: 'Коррекция, окрашивание и ламинирование.',
    groups: [
      {
        title: 'Брови и ресницы',
        items: [
          ['Коррекция бровей по форме', 'оформление формы', '750 ₽'],
          ['Окрашивание бровей', 'подбор оттенка', '700 ₽'],
          ['Ламинирование бровей', 'укладка и фиксация формы', '1 800 ₽'],
          ['Ламинирование ресниц', 'изгиб и уход', '2 100 ₽']
        ]
      }
    ]
  },
  massage: {
    eyebrow: 'MASSAGE · ПРАЙС',
    title: 'Массаж',
    description: 'Оздоровительные и расслабляющие программы массажа.',
    groups: [
      {
        title: 'Массаж',
        items: [
          ['Оздоровительный массаж', '60 минут', '2 500 ₽'],
          ['Расслабляющий массаж', '60 минут', '2 300 ₽'],
          ['Лимфодренажный массаж', '60 минут', '2 700 ₽'],
          ['Антицеллюлитный массаж', '60 минут', '2 800 ₽']
        ]
      }
    ]
  },
  cosmetology: {
    eyebrow: 'CARE · ПРАЙС',
    title: 'Косметология',
    description: 'Уход за лицом, чистки, пилинги и другие процедуры.',
    groups: [
      {
        title: 'Косметология',
        items: [
          ['Уход за лицом', 'очищение, маска и завершающий уход', '2 400 ₽'],
          ['Чистка лица', 'комбинированная процедура', '3 200 ₽'],
          ['Пилинг', 'поверхностный уход', '2 600 ₽'],
          ['Комплексный уход', 'очищение, пилинг, маска и массаж', '4 200 ₽']
        ]
      }
    ]
  },
  tan: {
    eyebrow: 'TAN · ПРАЙС',
    title: 'Солярий',
    description: 'Вертикальный солярий. Продолжительность сеанса выбирается индивидуально.',
    groups: [
      {
        title: 'Солярий',
        items: [
          ['Вертикальный солярий', 'стоимость за 1 минуту', '25 ₽']
        ]
      }
    ]
  }
};

const priceDrawer = document.getElementById('servicePriceDrawer');
const priceDrawerTitle = document.getElementById('servicePriceTitle');
const priceDrawerEyebrow = document.getElementById('servicePriceEyebrow');
const priceDrawerDescription = document.getElementById('servicePriceDescription');
const priceDrawerContent = document.getElementById('servicePriceContent');
const priceDrawerWhatsapp = document.getElementById('servicePriceWhatsapp');
const priceDrawerClose = priceDrawer.querySelector('.price-drawer__close');
let lastPriceTrigger = null;

function createPriceRow([name, note, price]){
  const row = document.createElement('div');
  row.className = 'drawer-price-row';

  const info = document.createElement('div');
  const serviceName = document.createElement('strong');
  serviceName.textContent = name;
  const serviceNote = document.createElement('span');
  serviceNote.textContent = note;
  info.append(serviceName, serviceNote);

  const servicePrice = document.createElement('b');
  servicePrice.textContent = price;

  row.append(info, servicePrice);
  return row;
}

function renderDrawerContent(data){
  priceDrawerContent.replaceChildren();

  data.groups.forEach(groupData => {
    const group = document.createElement('section');
    group.className = 'price-drawer__group';

    const heading = document.createElement('h3');
    heading.className = 'price-drawer__group-title';
    heading.textContent = groupData.title;
    group.appendChild(heading);

    groupData.items.forEach(item => group.appendChild(createPriceRow(item)));
    priceDrawerContent.appendChild(group);
  });
}

function openPriceDrawer(key, trigger){
  const data = servicePrices[key];
  if(!data) return;

  lastPriceTrigger = trigger || null;
  priceDrawerEyebrow.textContent = data.eyebrow;
  priceDrawerTitle.textContent = data.title;
  priceDrawerDescription.textContent = data.description;
  renderDrawerContent(data);

  const message = `Здравствуйте! Хочу записаться на услугу «${data.title}».`;
  priceDrawerWhatsapp.href = `https://wa.me/79154901010?text=${encodeURIComponent(message)}`;

  priceDrawer.classList.add('is-open');
  priceDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lock');
  window.setTimeout(() => priceDrawerClose.focus(), 50);
}

function closePriceDrawer(){
  if(!priceDrawer.classList.contains('is-open')) return;
  priceDrawer.classList.remove('is-open');
  priceDrawer.setAttribute('aria-hidden', 'true');

  if(!nav.classList.contains('active')) document.body.classList.remove('lock');
  if(lastPriceTrigger) window.setTimeout(() => lastPriceTrigger.focus(), 50);
}

document.querySelectorAll('[data-service-price]').forEach(card => {
  card.addEventListener('click', () => openPriceDrawer(card.dataset.servicePrice, card));
  card.addEventListener('keydown', event => {
    if(event.key === 'Enter' || event.key === ' '){
      event.preventDefault();
      openPriceDrawer(card.dataset.servicePrice, card);
    }
  });
});

document.querySelectorAll('[data-price-drawer-close]').forEach(element => {
  element.addEventListener('click', closePriceDrawer);
});

document.addEventListener('keydown', event => {
  if(event.key === 'Escape' && priceDrawer.classList.contains('is-open')) closePriceDrawer();
});

const reveal = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  });
},{threshold:.08});

document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
