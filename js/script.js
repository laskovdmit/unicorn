'use strict';

// Открытие и закрытие меню
const menuBtn = document.querySelector('.header__burger'),
      menu = document.querySelector('.menu'),
      header = document.querySelector('.header'),
      fisrtScreen = document.querySelector('.promo');

menuBtn.addEventListener('click', () => {
  if (header.classList.contains('header--closed')) {
    header.classList.remove('header--closed');
    header.classList.add('header--opened');
  } else {
    header.classList.remove('header--opened');
    header.classList.add('header--closed');
  }
});

window.addEventListener('scroll', () => {
  if (window.innerWidth > 960) {
    header.classList.remove('header--closed');
    header.classList.remove('header--opened');
  }
});


//Появление меню на десктопе
window.addEventListener('scroll', () => {
  if (window.innerWidth > 960 && window.pageYOffset > 800) {
    menu.classList.remove('header__menu--none');
    menu.classList.add('header__menu--block');
  } else if (window.innerWidth > 940 && window.pageYOffset < 800) {
    menu.classList.remove('header__menu--block');
    menu.classList.add('header__menu--none');
  } else {
    menu.classList.remove('header__menu--block');
    menu.classList.remove('header__menu--none');
  }
});


//Показ часто задаваемых вопросов
const question = document.querySelectorAll('.questions__item'),
      questionHeader = document.querySelectorAll('.questions__header');

question.forEach((item, i) => {
  item.addEventListener('click', () => {
    if (item.classList.contains('questions__item--show')) {
      item.classList.remove('questions__item--show');
    } else {
      item.classList.add('questions__item--show');
    }
  });
});

//Политика конфеденциальности
const privacyBtns = document.querySelectorAll('.privacy-policy'),
      modalPrivacy = document.querySelector('.modal--privacy'),
      closePrivacyBtns = document.querySelectorAll('.privacy__close');

privacyBtns.forEach(item => {
  item.addEventListener('click', () => {
    modalPrivacy.classList.remove('visually-hidden');
  });
});

modalPrivacy.addEventListener('click', (e) => {
  if (e.target === modalPrivacy) {
    modalPrivacy.classList.add('visually-hidden');
  }
});

closePrivacyBtns.forEach(item => {
  item.addEventListener('click', () => {
    modalPrivacy.classList.add('visually-hidden');
  });
});

//Форма обратного звонка
const orderCallBtns = document.querySelectorAll('.order__call'),
      modalCall = document.querySelector('.modal--callback'),
      closeCallBtn = document.querySelector('.callback__close');

orderCallBtns.forEach(item => {
  item.addEventListener('click', () => {
    modalCall.classList.remove('visually-hidden');
  });
});

modalCall.addEventListener('click', (e) => {
  if (e.target === modalCall) {
    modalCall.classList.add('visually-hidden');
  }
});

closeCallBtn.addEventListener('click', () => {
  modalCall.classList.add('visually-hidden');
});


//Анимация слайдера
// const sliderList = document.querySelector('.slider__list'),
//       sliderItem = document.querySelectorAll('.slider__unit'),
//       prevSlide = document.querySelector('.slider__arrow-prev'),
//       nextSlide = document.querySelector('.slider__arrow-next'),
//       toggles = document.querySelector('.slider__toggles');

// let currentSlide = 0,
//     sliderWidth = 0;

// sliderItem.forEach(item => {
//   toggles.innerHTML += `<li class="slider__toggle"></li>`;
//   sliderWidth += 265;
// });

// const toggle = document.querySelectorAll('.slider__toggle');

// function showCurrentSlide (i) {
//   if (i < sliderItem.length - 3) {
//     sliderList.style.marginLeft = -265 * i + 'px';
//     toggle.forEach(item => {
//       item.classList.remove('slider__toggle--active');
//     });
//     toggle[i].classList.add('slider__toggle--active');
//   } else {
//     toggle.forEach(item => {
//       item.classList.remove('slider__toggle--active');
//     });
//     toggle[i].classList.add('slider__toggle--active');
//   }
// }

// showCurrentSlide(currentSlide);

// toggle.forEach((item, i) => {
//   item.addEventListener('click', () => {
//     showCurrentSlide(i);
//   });
// });
