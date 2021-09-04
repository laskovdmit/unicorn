'use strict';

window.addEventListener('DOMContentLoaded', () => {


  // Переключение меню
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

  window.addEventListener('resize', () => {
    if (window.innerWidth > 959 && (header.classList.contains('header--closed') || header.classList.contains('header--opened'))) {
      header.classList.remove('header--closed');
      header.classList.remove('header--opened');
    } else if (window.innerWidth < 960 && !header.classList.contains('header--closed')) {
      header.classList.remove('header--opened');
      header.classList.add('header--closed');
    }
  });


  //Появление меню на десктопе
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 960 && window.pageYOffset < 800 && !menu.classList.contains('header__menu--none')) {
      menu.classList.remove('header__menu--block');
      menu.classList.add('header__menu--none');
    } else if (window.innerWidth >= 960 && window.pageYOffset > 800 && !menu.classList.contains('header__menu--block')) {
      menu.classList.remove('header__menu--none');
      menu.classList.add('header__menu--block');
    } else if (window.innerWidth < 960 && (menu.classList.contains('header__menu--block') || menu.classList.contains('header__menu--none'))) {
      menu.classList.remove('header__menu--block');
      menu.classList.remove('header__menu--none');
    }
  });

  window.addEventListener('scroll', () => {
    if (window.innerWidth >= 960 && window.pageYOffset >= 800 && !menu.classList.contains('header__menu--block')) {
      menu.classList.remove('header__menu--none');
      menu.classList.add('header__menu--block');
    } else if (window.innerWidth >= 960 && window.pageYOffset < 800 && !menu.classList.contains('header__menu--none')) {
      menu.classList.remove('header__menu--block');
      menu.classList.add('header__menu--none');
    }
  });

  if (window.innerWidth >= 960) {
    header.classList.remove('header--closed');
    header.classList.remove('header--opened');
    menu.classList.add('header__menu--none');
  }


  //Изменение активного пункта меню
  const navigationBtns = document.querySelectorAll('.navigation__button'),
        sections = document.querySelectorAll('[data-section]'),
        catalog = document.querySelector('.catalog'),
        offerBtn = document.querySelector('.offer__btn'),
        footerLogo = document.querySelector('.footer__logo');

  offerBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = catalog.offsetTop;
  });

  footerLogo.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
  });

  navigationBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      if (i === navigationBtns.length - 1) {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      } else {
        document.documentElement.scrollTop = sections[i].offsetTop - 50;
      }
    });
  });

  function changeActiveBtn(i) {
    navigationBtns.forEach(btn => {
      btn.classList.remove('navigation__button--active');
    });

    navigationBtns[i].classList.add('navigation__button--active');
  }

  window.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop;

    sections.forEach((item, i) => {
      if ((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) && !navigationBtns[navigationBtns.length - 1].classList.contains('navigation__button--active')) {
        changeActiveBtn(navigationBtns.length - 1);
      } else if (scrollTop > (item.offsetTop - 100) && scrollTop < (item.offsetTop + item.offsetHeight) && !navigationBtns[i].classList.contains('navigation__button--active')) {
        changeActiveBtn(i);
      }
    });
  });


  //Показ часто задаваемых вопросов
  const question = document.querySelectorAll('.questions__item'),
        questionBody = document.querySelectorAll('.questions__body');

  function showAnswer(elem, maxHeight) {

    let count = 0,
        heightInterval = maxHeight / 10;

    let show = setInterval(() => {
      if (count >= 9.75) {
        clearInterval(show);
      }

      count += 0.25;
      elem.style.marginTop = `${count}px`;
      elem.style.height = `${count * heightInterval}px`;
    }, 10);
  }

  function hideAnswer(elem, maxHeight) {
    let count = 10.25,
        heightInterval = maxHeight / 10;

    let hide = setInterval(() => {
        if (count <= 0) {
          clearInterval(hide);
          elem.style.display = 'none';
          elem.style.height = maxHeight;
        }

        count -= 0.25;
        elem.style.marginTop = `${count}px`;
        elem.style.height = `${count * heightInterval}px`;
      },10);
  }

  question.forEach((item, i) => {
    item.addEventListener('keydown', (e) => {
      if (e.code == 'Space') {
        e.preventDefault();

        if (item.classList.contains('questions__item--show')) {
          item.classList.remove('questions__item--show');
          hideAnswer(questionBody[i], questionBody[i].scrollHeight + 10);
        } else {
          item.classList.add('questions__item--show');
          questionBody[i].style.display = 'block';
          showAnswer(questionBody[i], questionBody[i].scrollHeight + 10);
        }
      }
    });

    item.addEventListener('click', () => {
      if (item.classList.contains('questions__item--show')) {
        item.classList.remove('questions__item--show');
        hideAnswer(questionBody[i], questionBody[i].scrollHeight + 10);
      } else {
        item.classList.add('questions__item--show');
        questionBody[i].style.display = 'block';
        showAnswer(questionBody[i], questionBody[i].scrollHeight + 10);
      }
    });
  });

  window.addEventListener('resize', () => {
    question.forEach((item, i) => {
      if (item.classList.contains('questions__item--show')) {
        item.classList.remove('questions__item--show');
        hideAnswer(questionBody[i], questionBody[i].scrollHeight + 10);
      }
    });
  });


  //Открытие и закрытие модальных окон
  function toggleWindow (openBtns, modalWindow, closeBtn) {

    function closeModal () {
      modalWindow.classList.add('modal--hide');
      modalWindow.classList.remove('modal--show');
      setTimeout(() => {modalWindow.classList.add('visually-hidden');}, 300);
      document.body.style.overflow = '';
    }

    function showModal () {
      modalWindow.classList.remove('modal--hide');
      modalWindow.classList.remove('visually-hidden');
      modalWindow.classList.add('modal--show');
      document.body.style.overflow = 'hidden';
    }

    openBtns.forEach(item => {
      item.addEventListener('click', () => showModal());

      item.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          showModal();
        }
      });
    });

    modalWindow.addEventListener('click', (e) => {
      if (e.target === modalWindow) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modalWindow.classList.contains('modal--show')) {
        closeModal();
      }
    });

    if (closeBtn.length) {
      closeBtn.forEach(item => {
        item.addEventListener('click', () => closeModal());

        item.addEventListener('keydown', (e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            closeModal();
          }
        });
      });
    } else {
      closeBtn.addEventListener('click', () => closeModal());
      closeBtn.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          closeModal();
        }
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


  // Принятие политики конфеденциальности
  const privacyAcceptBtn = document.querySelector('.privacy__btn'),
        privacyFields = document.querySelectorAll('.form__subtitle');

  privacyAcceptBtn.addEventListener('click', () => {
    const privacyCheckbox = document.querySelectorAll('.form__privacy-check'),
          privacyFields = document.querySelectorAll('.form__subtitle');

    privacyCheckbox.forEach(item => {
      item.checked = 'true';
    });

    privacyFields.forEach(item => {
      item.classList.add('form__subtitle--checked');
    });
  });


  //Кликабельные ссылки в лейбле
  privacyFields.forEach(field => {
    field.addEventListener('click', (e) => {
      privacyBtns.forEach(item => {
        if (e.target === item) {
          e.preventDefault();
        }
      });
    });
  });


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


  // Кастомизация Яндекс-карты
  ymaps.ready(init);

  function init(){
    const myMap = new ymaps.Map("map", {
      center: [54.735828290962836,55.952257908813955],
      zoom: 15,
      controls: ['zoomControl']
    }, {
      suppressMapOpenBlock: true,
    });

    myMap.behaviors.disable('scrollZoom');

    var myBalloon = new ymaps.Placemark([54.73475962, 55.95215241], {
      balloonContentHeader: 'ул. Ленина 74',
      balloonContentBody: 'Магазин сладких подарков Unicorn'
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/img/cursor.png',
      iconImageSize: [120, 120],
      iconImageOffset: [-60, -120]
    });

    myMap.geoObjects.add(myBalloon);
  }


  //Анимация слайдера
  const sliderList = document.querySelector('.slider__list'),
        sliderItem = document.querySelectorAll('.slider__unit'),
        prevSlide = document.querySelector('.slider__arrow-prev'),
        nextSlide = document.querySelector('.slider__arrow-next'),
        toggles = document.querySelector('.slider__toggles');

  let currentSlide = 0;

  function buildToggles() {
    let countToggle = 0;

    if (window.innerWidth < 564) {
      countToggle = sliderItem.length - 1;
    } else if (window.innerWidth < 826) {
      countToggle = sliderItem.length - 2;
    } else if (window.innerWidth < 1100) {
      countToggle = sliderItem.length - 3;
    } else if (window.innerWidth >= 1100) {
      countToggle = sliderItem.length - 4;
    }

    toggles.innerHTML = "";

    for (let i = 0; i < countToggle + 1; i++) {
      toggles.innerHTML += `<li class="slider__toggle" tabindex="0"></li>`;
    }

    const toggle = document.querySelectorAll('.slider__toggle');

    if (currentSlide === toggle.length) {
      currentSlide = toggle.length - 1;
      sliderList.style.transform = `translate(-${currentSlide * (sliderItem[currentSlide].offsetWidth + 7)}px)`;
    }

    toggle[currentSlide].classList.add('slider__toggle--active');

    toggle.forEach((item, i) => {
      item.addEventListener('click', () => {
        currentSlide = i;
        showCurrentSlide();
      });

      item.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          e.preventDefault();

          currentSlide = i;
          showCurrentSlide();
        }
      });
    });
  }

  function showCurrentSlide () {
    const toggle = document.querySelectorAll('.slider__toggle');

    if (currentSlide < 0) {
      currentSlide = toggle.length - 1;
    } else if (currentSlide === toggle.length) {
      currentSlide = 0;
    }

    sliderList.style.transform = `translate(-${currentSlide * (sliderItem[currentSlide].offsetWidth + 7)}px)`;
    buildToggles();
  }

  buildToggles();

  prevSlide.addEventListener('click', () => {
    currentSlide -= 1;
    showCurrentSlide();
  });

  prevSlide.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();

      currentSlide -= 1;
      showCurrentSlide();
    }
  });

  nextSlide.addEventListener('click', () => {
    currentSlide += 1;
    showCurrentSlide();
  });

  nextSlide.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();

      currentSlide += 1;
      showCurrentSlide();
    }
  });

  window.addEventListener(`resize`, () => {
    buildToggles();
  });


  //Слайдер на эране "Подробнее"
  const minSlides = document.querySelectorAll('.swiper__slide-min'),
        bigSlides = document.querySelectorAll('.swiper__slide-big'),
        bigSlidesWrapper = document.querySelector('.swiper__wrapper-big');

  minSlides.forEach((item, i) => {
    item.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();

        if (!item.classList.contains('swiper__slide-min--active')) {
          minSlides.forEach(mslide => {
            mslide.classList.remove('swiper__slide-min--active');
          });
          item.classList.add('swiper__slide-min--active');

          bigSlidesWrapper.style.transform = `translate(-${i * (bigSlides[i].offsetWidth + 5)}px)`;
        }
      }
    });

    item.addEventListener('click', () => {
      if (!item.classList.contains('swiper__slide-min--active')) {
        minSlides.forEach(mslide => {
          mslide.classList.remove('swiper__slide-min--active');
        });
        item.classList.add('swiper__slide-min--active');

        bigSlidesWrapper.style.transform = `translate(-${i * (bigSlides[i].offsetWidth + 5)}px)`;
      }
    });
  });


  //Отмена отправки формы при не заполенных данных
  const forms = document.querySelectorAll('.form');

  forms.forEach((item, i) => {
    const submitBtn = item.querySelector('.form__btn'),
          nameInput = item.querySelector('.form__name'),
          phoneInput = item.querySelector('.form__phone'),
          privacyCheckbox = item.querySelector('.form__privacy-check');

    item.addEventListener('submit', (e) => {
    })
  ;});



});



