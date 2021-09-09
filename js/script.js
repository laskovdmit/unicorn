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


  //Изменение активного пункта меню и перемещение по странице
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


  //Открытие и закрытие модальных окон
  function toggleWindow (openBtn, modalWindow, closeBtn) {

    function closeModal () {
      modalWindow.classList.add('modal--hide');
      modalWindow.classList.remove('modal--show');
      setTimeout(() => {modalWindow.classList.add('visually-hidden');}, 290);
      document.body.style.overflow = '';
    }

    function showModal () {
      modalWindow.classList.remove('modal--hide');
      modalWindow.classList.remove('visually-hidden');
      modalWindow.classList.add('modal--show');
      document.body.style.overflow = 'hidden';

      const modalWrapper = modalWindow.querySelector('.modal__wrapper');

      if (((window.innerHeight - modalWrapper.clientHeight) / 2) > 0) {
        modalWrapper.style.marginTop = (window.innerHeight - modalWrapper.clientHeight) / 2 + 'px';
      } else {
        modalWrapper.style.marginTop = '20px';
        modalWrapper.style.marginBottom = '20px';
      }
    }

    if (openBtn.length) {
      openBtn.forEach(item => {
        item.addEventListener('click', () => showModal());

        item.addEventListener('keydown', (e) => {
          if (e.code === 'Space') {
            e.preventDefault();
            showModal();
          }
        });
      });
    } else {
      openBtn.addEventListener('click', () => showModal());

      openBtn.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          showModal();
        }
      });
    }

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


  // Принятие политики конфеденциальности для всех чекбоксов
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
  function linkThroghLabel(field, btn) {
    field.addEventListener('click', (e) => {
      if (e.target === btn) {
        e.preventDefault();
      }
    });
  }

  privacyFields.forEach((field, i) => {
    const btns = document.querySelectorAll('.form__subtitle > .privacy-policy');

    linkThroghLabel(field, btns[i]);
  });


  //Анимация слайдера
  const sliderList = document.querySelector('.slider__list'),
        sliderItem = document.querySelectorAll('.slider__unit'),
        prevSlide = document.querySelector('.slider__arrow-prev'),
        nextSlide = document.querySelector('.slider__arrow-next'),
        toggles = document.querySelector('.slider__toggles');

  let currentSlide = 0;

  function showCurrentSlide() {
    const toggle = document.querySelectorAll('.slider__toggle');

    if (currentSlide < 0) {
      currentSlide = toggle.length - 1;
    } else if (currentSlide === toggle.length) {
      currentSlide = 0;
    }

    toggle.forEach((item, i) => {
      item.classList.remove('slider__toggle--active');

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

    toggle[currentSlide].classList.add('slider__toggle--active');
    sliderList.style.transform = `translate(-${currentSlide * (sliderItem[currentSlide].offsetWidth + 7)}px)`;
  }

  function buildToggle() {
    let countToggle = 0;
    const toggle = document.querySelectorAll('.slider__toggle');

    if (window.innerWidth < 564) {
      countToggle = sliderItem.length - 1;
    } else if (window.innerWidth < 826) {
      countToggle = sliderItem.length - 2;
    } else if (window.innerWidth < 1100) {
      countToggle = sliderItem.length - 3;
    } else if (window.innerWidth >= 1100) {
      countToggle = sliderItem.length - 4;
    }

    if (!(toggle.length && (toggle.length - 1 === countToggle))) {
      toggles.innerHTML = "";

      for (let i = 0; i < countToggle + 1; i++) {
        toggles.innerHTML += `<li class="slider__toggle" tabindex="0"></li>`;
      }

      const toggle = document.querySelectorAll('.slider__toggle');

      if (currentSlide === toggle.length) {
        currentSlide = toggle.length - 1;
        sliderList.style.transform = `translate(-${currentSlide * (sliderItem[currentSlide].offsetWidth + 7)}px)`;
      }
    }

    showCurrentSlide();
  }

  buildToggle();

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
    buildToggle();
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


  //Слайдер на эране "Подробнее"
  const minSlides = document.querySelectorAll('.swiper__slide-min'),
        bigSlides = document.querySelectorAll('.swiper__slide-big'),
        bigSlidesWrapper = document.querySelector('.swiper__wrapper-big');

  function changeDetailsSlide (minSlides, bigSlides, bigSlidesWrapper) {
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
  }

  changeDetailsSlide (minSlides, bigSlides, bigSlidesWrapper);


  //Создание класса товаров
  class Product {
    constructor (mainImg, mainAltimg, name, fullDescr, oldprice, price, allImgs) {
      this.mainImg = mainImg;
      this.mainAltimg = mainAltimg;
      this.name = name;
      this.descr = '';
      this.fullDescr = fullDescr;
      this.oldprice = oldprice;
      this.price = price;
      this.allImgs = allImgs;
    }

    closeModal(modalWindow, closeBtn) {
      function closeModalWindow () {
        modalWindow.classList.add('modal--hide');
        modalWindow.classList.remove('modal--show');
        setTimeout(() => {modalWindow.remove();}, 290);
        document.body.style.overflow = '';
      }

      modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow) {
          closeModalWindow();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains('modal')) {
          closeModalWindow();
        }
      });

      closeBtn.addEventListener('click', () => closeModalWindow());
      closeBtn.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
        closeModalWindow();
        }
      });
    }

    addAboutModal() {
      const pageBody = document.querySelector('.page'),
            detailsWindow = document.createElement('section');

      detailsWindow.classList.add('details', 'modal', 'modal--details', 'modal--show');

      detailsWindow.innerHTML = `
        <div class="details__wrapper modal__wrapper">
        <div class="decor decor__1"></div>
        <div class="decor decor__2"></div>
        <div class="details__content product">
          <h2 class="visually-hidden">Подробности о товаре</h2>
          <div class="details__photo swiper">
            <div class="swiper__window">
              <div class="swiper__wrapper swiper__wrapper-big">
                <div class="swiper__slide swiper__slide-big">
                  <img class="swiper__img" src="${this.mainImg}" alt="${this.mainAltimg}">
                </div>
                <div class="swiper__slide swiper__slide-big">
                  <img class="swiper__img" src="${this.allImgs[0].secondImg}" alt="${this.allImgs[0].secondAltimg}">
                </div>
                <div class="swiper__slide swiper__slide-big">
                <img class="swiper__img" src="${this.allImgs[1].secondImg}" alt="${this.allImgs[1].secondAltimg}">
                </div>
                <div class="swiper__slide swiper__slide-big">
                <img class="swiper__img" src="${this.allImgs[2].secondImg}" alt="${this.allImgs[2].secondAltimg}">
                </div>
              </div>
              </div>
            <div class="swiper__wrapper swiper__wrapper-min">
              <div class="swiper__slide swiper__slide-min swiper__slide-min--active" tabindex="0">
                <img class="swiper__img" src="${this.mainImg}" alt="${this.mainAltimg}">
              </div>
              <div class="swiper__slide swiper__slide-min" tabindex="0">
                <img class="swiper__img" src="${this.allImgs[0].secondImg}" alt="${this.allImgs[0].secondAltimg}">
              </div>
              <div class="swiper__slide swiper__slide-min" tabindex="0">
              <img class="swiper__img" src="${this.allImgs[1].secondImg}" alt="${this.allImgs[1].secondAltimg}">
              </div>
              <div class="swiper__slide swiper__slide-min" tabindex="0">
              <img class="swiper__img" src="${this.allImgs[2].secondImg}" alt="${this.allImgs[2].secondAltimg}">
              </div>
            </div>
          </div>
          <div class="details__info product__info">
            <p class="product__name product__name--form">${this.name}</p>
            <p class="product__descr product__descr--form">${this.fullDescr}</p>
            <div class="product__oldprice product__oldprice--form">${this.oldprice}</div>
            <div class="product__price product__price--form">${this.price} руб</div>
            <button class="product__addtocart product__addtocart--form btn" type="button">Заказать</button>
          </div>
        </div>
        <div class="modal__close" tabindex="0">&times;</div>
      </div>
      `;

      pageBody.append(detailsWindow);
      document.body.style.overflow = 'hidden';

      const modalWrapper = detailsWindow.querySelector('.modal__wrapper');

      if (((window.innerHeight - modalWrapper.clientHeight) / 2) > 0) {
        modalWrapper.style.marginTop = (window.innerHeight - modalWrapper.clientHeight) / 2 + 'px';
      } else {
        modalWrapper.style.marginTop = '20px';
        modalWrapper.style.marginBottom = '20px';
      }

      const modalClose = detailsWindow.querySelector('.modal__close'),
            minSlides = detailsWindow.querySelectorAll('.swiper__slide-min'),
            bigSlides = detailsWindow.querySelectorAll('.swiper__slide-big'),
            bigSlidesWrapper = detailsWindow.querySelector('.swiper__wrapper-big'),
            orderBtn = detailsWindow.querySelector('.product__addtocart');

      changeDetailsSlide (minSlides, bigSlides, bigSlidesWrapper);
      this.closeModal(detailsWindow, modalClose);

      orderBtn.addEventListener('click', () => {
        detailsWindow.remove();
        this.addPurchaseModal(true);
      });
    }

    addPurchaseModal(state) {
      const pageBody = document.querySelector('.page'),
            purchaseWindow = document.createElement('section');

      if (state === true) {
        purchaseWindow.classList.add('purchase', 'modal', 'modal--purchase');
      } else {
        purchaseWindow.classList.add('purchase', 'modal', 'modal--purchase', 'modal--show');
      }

      purchaseWindow.innerHTML = `
        <div class="purchase__wrapper modal__wrapper">
        <div class="decor decor__1"></div>
        <div class="decor decor__2"></div>
        <div class="purchase__content">
          <h2 class="visually-hidden">Оформление заказа</h2>
          <div class="purchase__photo">
            <img class="purchase__img" src="${this.mainImg}" alt="${this.mainAltimg}">
          </div>
          <div class="purchase__additional additional">
            <p class="additional__title">Добавить</p>
            <div class="additional__wrapper">
              <div class="additional__item">
                <input class="additional__input" id="additional__bear" type="checkbox">
                <label class="additional__desr additional__desr--bear" for="additional__bear" tabindex="0">
                  <p class="additional__subtitle">Плюшевая игрушка</p>
                  <p class="additional__price">от 500 руб.</p>
                </label>
              </div>
              <div class="additional__item">
                <input class="additional__input" id="purchase__sweet" type="checkbox">
                <label class="additional__desr additional__desr--sweet" for="purchase__sweet" tabindex="0">
                  <p class="additional__subtitle">Больше конфет</p>
                  <p class="additional__price">от 200 руб.</p>
                </label>
              </div>
              <div class="additional__item">
                <input class="additional__input" id="purchase__card" type="checkbox">
                <label class="additional__desr additional__desr--card" for="purchase__card" tabindex="0">
                  <p class="additional__subtitle">Открытка</p>
                  <p class="additional__price">+0 руб.</p>
                </label>
              </div>
            </div>
          </div>
          <div class="purchase__info product__info">
            <p class="product__name product__name--form">${this.name}</p>
            <div class="product__oldprice product__oldprice--form">${this.oldprice}</div>
            <div class="product__price product__price--form">${this.price} руб</div>
            <form class="purchase__form form" method="post" action="https://echo.htmlacademy.ru">
              <div class="form__cal purchase__cal">
                <input class="purchase__input form__input form__name" id="form__name--purchase" type="text" name="name" placeholder="Ваше имя" minlength="3" required>
                <label class="visually-hidden" for="form__name--purchase">Ваше имя</label>
                <input class="purchase__input form__input form__phone" id="form__phone--purchase" type="tel" name="phone" placeholder="Ваш номер телефона" pattern="^[ 0-9]+$" minlength="10" required>
                <label class="visually-hidden" for="form__phone--purchase">Ваш номер телефона</label>
                <button class="form__btn form__btn--form btn" type="submit">Заказать</button>
                <div class="purchase__privacy form__privacy">
                  <input class="form__privacy-check" id="form__privacy-check--purchase" type="checkbox" name="privacy" required>
                  <label class="form__subtitle" for="form__privacy-check--purchase">Я принимаю условия <a class="privacy-policy">передачи информации</a></label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="modal__close" tabindex="0">&times;</div>
      </div>
      `;

      pageBody.append(purchaseWindow);
      document.body.style.overflow = 'hidden';

      const modalWrapper = purchaseWindow.querySelector('.modal__wrapper');

      if (((window.innerHeight - modalWrapper.clientHeight) / 2) > 0) {
        modalWrapper.style.marginTop = (window.innerHeight - modalWrapper.clientHeight) / 2 + 'px';
      } else {
        modalWrapper.style.marginTop = '20px';
        modalWrapper.style.marginBottom = '20px';
      }

      const modalClose = purchaseWindow.querySelector('.modal__close'),
            currentPrivacyField = purchaseWindow.querySelector('.form__subtitle'),
            currentPrivacyBtn = purchaseWindow.querySelector('.privacy-policy'),
            form = purchaseWindow.querySelector('.form');

      linkThroghLabel(currentPrivacyField, currentPrivacyBtn);
      toggleWindow(currentPrivacyBtn, modalPrivacy, closePrivacyBtns);
      this.closeModal(purchaseWindow, modalClose);
      postData(form);
    }

    addProduct() {
      const catalog = document.querySelector('.showcase__catalog'),
            element = document.createElement('div');

      if (this.oldprice !== "") {
        this.oldprice = this.oldprice + ' руб';
      }

      this.descr = this.fullDescr.slice(0, 79) + '...';

      element.classList.add('showcase__product', 'product');
      element.innerHTML = `
        <img class="product__photo" src="${this.mainImg}" width="250" height="250" alt="${this.mainAltimg}">
        <div class="product__info">
          <p class="product__name">${this.name}</p>
          <p class="product__descr">${this.descr}</p>
          <div class="product__oldprice">${this.oldprice}</div>
          <div class="product__price">${this.price} руб</div>
          <div>
            <button class="product__addtocart btn" type="button">Заказать</button>
            <button class="product__about-btn btn" type="button">Подробнее</button>
          </div>
        </div>
      `;

      catalog.append(element);

      const aboutBtn = element.querySelector('.product__about-btn'),
            orderBtn = element.querySelector('.product__addtocart');

      aboutBtn.addEventListener('click', () => {
        this.addAboutModal();
      });

      orderBtn.addEventListener('click', () => {
        this.addPurchaseModal();
      });
    }
  }


  //Получение 4 товаров с сервера
  fetch('db.json')
  .then(data => data.json())
  .then(res => {
    for (let i = 0; i < 4; i++) {
      new Product(
        res.products[i].mainImg,
        res.products[i].mainAltimg,
        res.products[i].name,
        res.products[i].fullDescr,
        res.products[i].oldprice,
        res.products[i].price,
        res.products[i].allImgs
      ).addProduct();
    }
  });


  //Отображение всех товаров
  const allProductBtn = document.querySelector('.showcase__all-btn');

  allProductBtn.addEventListener('click', () => {
    const countProducts = document.querySelectorAll('.product');

    fetch('db.json')
    .then(data => data.json())
    .then(res => {
      for (let i = countProducts.length; i < res.products.length; i++) {
        new Product(
          res.products[i].mainImg,
          res.products[i].mainAltimg,
          res.products[i].name,
          res.products[i].fullDescr,
          res.products[i].oldprice,
          res.products[i].price,
          res.products[i].allImgs
        ).addProduct();
      }

      const countCurrentProducts = document.querySelectorAll('.product');

      if (countCurrentProducts.length === res.products.length) {
        allProductBtn.remove();
      }
    });

  });


  //Фильтрация товаров
  const filterBtns = document.querySelectorAll('.showcase__btn');

  filterBtns.forEach((btn, current) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(item => {
        item.classList.remove('showcase__btn--active');
      });
      btn.classList.add('showcase__btn--active');

      const catalog = document.querySelector('.showcase__catalog');

      catalog.innerHTML = "";
      allProductBtn.remove();

      const loadingImg = document.createElement('img');
      loadingImg.src = '/img/spinner.svg';
      loadingImg.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      catalog.insertAdjacentElement('beforebegin', loadingImg);

      fetch('db.json')
      .then(data => data.json())
      .then(res => {
        loadingImg.remove();

        for (let i = 0; i < res.products.length; i++) {
          res.products[i].category.forEach(item => {
            if (item === filterBtns[current].getAttribute('data-filter')) {
              new Product(
                res.products[i].mainImg,
                res.products[i].mainAltimg,
                res.products[i].name,
                res.products[i].fullDescr,
                res.products[i].oldprice,
                res.products[i].price,
                res.products[i].allImgs
              ).addProduct();
            }
          });
        }
      });
    });
  });


  //Отправка данных форм
  const forms = document.querySelectorAll('.form');

  const message = {
    loading: '/img/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form),
            obj = {};

      formData.forEach((value, key) => {
        obj[key] = value;
      });

      form.style.height = form.clientHeight + 'px';
      form.innerHTML = "";
      form.classList.add('form--sent');

      window.addEventListener('resize', () => {
        form.style.height = '';
      });

      const statusLoading = document.createElement('img'),
            statusMessage = document.createElement('div');

      statusMessage.style.maxWidth = "370px";

      statusLoading.src = message.loading;
      statusLoading.style.cssText = `
        width: 80px;
        height: 80px;
        display: "block";
        margin: 0 auto;
      `;
      form.append(statusLoading);

      fetch('server.php', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Could not fetch, status ${response.status}`);
        }

        response.text();
      })
      .then(data => {
        console.log(data);

        statusLoading.remove();
        statusMessage.innerHTML = `
          <div class="title title--center title--sent">${message.success}</div>
          <div class="subtitle subtitle--center subtitle--sent">Подписывайтесь на нас в соц. сетях:</div>
          <div class="socials">
            <a class="socials__item socials__vk-black" href="https://vk.com/unicorn_ufa" target="_blank"></a>
            <a class="socials__item socials__inst-black" href="https://www.instagram.com/unicorn_ufa/" target="_blank"></a>
            <a class="socials__item socials__whatsapp-black" href="https://wa.me/79871401648" target="_blank"></a>
          </div>
        `;
        form.append(statusMessage);
      })
      .catch(() => {
        statusLoading.remove();

        statusMessage.innerHTML = `<div class="title title--center title--sent">${message.failure}</div>`;
        form.append(statusMessage);
      });
    });
  }


});



