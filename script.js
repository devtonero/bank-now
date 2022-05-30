'use strict';

///////////////////////////////////////
// Modal window
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const opContente = document.querySelectorAll('.operations__content');

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

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

//     console.log(id);
//   });
// });

// using event delegation to add our smooth scrool for better optimzation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  //remove active classes
  tabs.forEach(bt => bt.classList.remove('operations__tab--active'));
  opContente.forEach(bt => bt.classList.remove('operations__content--active'));
  //add active classes
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//nav fade animation
const navFade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const navLink = e.target;
    const siblings = navLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = navLink.closest('.nav').querySelector('img');
    //console.log(navLink);
    siblings.forEach(el => {
      if (el !== navLink) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', navFade.bind(0.5));
nav.addEventListener('mouseout', navFade.bind(1));

//sticky nav
// const initialCord = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > initialCord.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//stick nav using intersection API
const navheight = nav.getBoundingClientRect().height;

const stickNav = entries => {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const stickyObs = {
  root: null,
  threshold: 0,
  rootMargin: `-${90}px`,
};

const headerObs = new IntersectionObserver(stickNav, stickyObs);
headerObs.observe(header);

//reveal section
const allSecction = document.querySelectorAll('.section');
const revSec = (ent, obs) => {
  const [entry] = ent;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  obs.unobserve(entry.target);
};
const sectObs = new IntersectionObserver(revSec, {
  root: null,
  threshold: 0.15,
});
allSecction.forEach(sect => {
  sectObs.observe(sect);
  sect.classList.add('section--hidden');
});

//lazy loading img
const ingStart = document.querySelectorAll('img[data-src]');

const loadImg = function (ent, obs) {
  const [entr] = ent;
  if (!entr.isIntersecting) return;
  //replace d source
  entr.target.src = entr.target.dataset.src;

  entr.target.addEventListener('load', function () {
    entr.target.classList.remove('lazy-img');
  });
  obs.unobserve(entr.target);
};

const imgObs = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '500px',
});
ingStart.forEach(alt => {
  imgObs.observe(alt);
});

//slider
const slider = () => {
  const mslide = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const tDots = document.querySelector('.dots');

  //
  let curSlide = 0;
  const maxslide = mslide.length - 1;

  //
  const cDots = function () {
    mslide.forEach((_, i) => {
      tDots.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}" ></button>`
      );
    });
  };

  const sliCont = slide => {
    mslide.forEach((sli, id) => {
      sli.style.transform = `translate(${100 * (id - slide)}%)`;
    });
  };

  const dotsAct = function (sli) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(doy => doy.classList.remove('dots__dot--active'));

    const eb = document
      .querySelector(`.dots__dot[data-slide="${sli}"]`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = () => {
    if (curSlide === maxslide) curSlide = 0;
    else curSlide++;
    sliCont(curSlide);
    dotsAct(curSlide);
  };
  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxslide;
    else curSlide--;
    sliCont(curSlide);
    dotsAct(curSlide);
  };

  const initFu = () => {
    sliCont(0);
    cDots();
    dotsAct(0);
  };
  initFu();
  //move to next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
  tDots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      sliCont(slide);
      dotsAct(slide);
    }
  });
};
slider();
/////////////////////////////////

window.addEventListener('beforeunload', function (e) {
  //e.preventDefault();
  console.log(e);
  e.returnValue = '';
});
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
