'use strict';

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


// Открытие и закрытие меню
const menuBtn = document.querySelector('.header__burger'),
      menu = document.querySelector('.menu'),
      header = document.querySelector('.header');

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


//Показ часто задаваемых вопросов
const question = document.querySelectorAll('.questions__item'),
      questionHeader = document.querySelectorAll('.questions__header');

question.forEach(item => {
  item.addEventListener('click', () => {
    if (item.classList.contains('questions__item--show')) {
      item.classList.remove('questions__item--show');
    } else {
      item.classList.add('questions__item--show');
    }
  });
});

//Открытие и закрытие модальных окон
function toggleWindow (btns, window, closeBtn) {
  btns.forEach(item => {
    item.addEventListener('click', () => {
      window.classList.remove('visually-hidden');
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target === window) {
      window.classList.add('visually-hidden');
    }
  });

  if (closeBtn.length) {
    closeBtn.forEach(item => {
      item.addEventListener('click', () => {
        window.classList.add('visually-hidden');
      });
    });
  } else {
    closeBtn.addEventListener('click', () => {
      window.classList.add('visually-hidden');
    });
  }
}


//Политика конфеденциальности
const privacyBtns = document.querySelectorAll('.privacy-policy'),
      modalPrivacy = document.querySelector('.modal--privacy'),
      closePrivacyBtns = document.querySelectorAll('.privacy__close');

toggleWindow(privacyBtns, modalPrivacy, closePrivacyBtns);


//Форма обратного звонка
const orderCallBtns = document.querySelectorAll('.order__call'),
      modalCall = document.querySelector('.modal--callback'),
      closeCallBtn = document.querySelector('.callback__close');

toggleWindow(orderCallBtns, modalCall, closeCallBtn);


//Кнопка "Подробнее" на всех товарах
const detailsBtns = document.querySelectorAll('.product__about-btn'),
      detailsWindow = document.querySelector('.details'),
      detailsClose = document.querySelector('.details__close');

toggleWindow(detailsBtns, detailsWindow, detailsClose);


//Кнопка Заказать
const purchaseBtns = document.querySelectorAll('.product__addtocart'),
      purchaseWindow = document.querySelector('.purchase'),
      purchaseCloseBtn = document.querySelector('.purchase__close');

toggleWindow(purchaseBtns, purchaseWindow, purchaseCloseBtn);

// Переключение фильтров
const filterBtns = document.querySelectorAll('.showcase__btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('showcase__btn--active')) {
      filterBtns.forEach(item => {
        item.classList.remove('showcase__btn--active');
      });
      btn.classList.add('showcase__btn--active');
    }
  });
});


//Анимация слайдера
  const sliderList = document.querySelector('.slider__list'),
        sliderItem = document.querySelectorAll('.slider__unit'),
        prevSlide = document.querySelector('.slider__arrow-prev'),
        nextSlide = document.querySelector('.slider__arrow-next'),
        toggles = document.querySelector('.slider__toggles');

  let currentSlide = 0,
      sliderWidth = 0;

  sliderItem.forEach(item => {
    toggles.innerHTML += `<li class="slider__toggle"></li>`;
    sliderWidth += 265;
  });

const toggle = document.querySelectorAll('.slider__toggle');

toggle[currentSlide].classList.add('slider__toggle--active');

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
