'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
const cookiesMessage = document.createElement('div');
cookiesMessage.classList.add('cookie-message');
cookiesMessage.innerHTML =
  'We Use This To improve our Functionality and Analytics.. <button class= "btn btn--close-cookie"> Accept!!!</button>';
//header.prepend(cookiesMessage);
//header.append(cookiesMessage);
//header.before(cookiesMessage);
header.after(cookiesMessage);
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  //removing element
  cookiesMessage.remove();
});

//styling
cookiesMessage.style.backgroundColor = '#37383d';
//cookiesMessage.style.height = '80px';
console.log(getComputedStyle(cookiesMessage).height);
//
cookiesMessage.style.height =
  Number.parseFloat(getComputedStyle(cookiesMessage).height, 10) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'red');

//logo = document.querySelector('.nav__logo');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', () => {
  //const scordinates = section1.getBoundingClientRect();
  //old method
  // window.scrollTo(
  //   scordinates.left + window.pageYOffset,
  //   scordinates.top + window.pageYOffset
  // );
  // window.scrollTo({
  //   left: scordinates.left + window.pageXOffset,
  //   top: scordinates.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  //new method
  // section1.scrollIntoView({ behaviour: 'smooth' });
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Page Navigation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

    console.log(id);
  });
});
/////////////////////////////////

// const randomNum = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// console.log(randomNum(2, 7));

// const randomColor = () =>
//   `rgb(${randomNum(0, 255)},${randomNum(0, 255)},${randomNum(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function () {
//   this.style.backgroundColor = randomColor();
// });
