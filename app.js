window.addEventListener('DOMContentLoaded', function () {

   //-------Бургер меню---------
   document.querySelector('.burger').addEventListener('click', function () {
      this.classList.toggle('active');
      document.querySelector('.header-menu__nav').classList.toggle('open');
   })

   //------Глаз на пароле, смена символов
   const inputPass = document.getElementById('form-pass');
   const iconPass = document.getElementById('pass-icon');

   iconPass.addEventListener("click", () => {
      if (inputPass.getAttribute('type') === "password") {
         inputPass.setAttribute('type', 'text');
      } else {
         inputPass.setAttribute('type', 'password')
      }
   })

   //----------- Логин кнопка в меню
   const login = document.querySelector('.login');
   const loginBlock = document.querySelector('.login-block');

   // Добавляем обработчик события для клика на меню
   loginBlock.addEventListener("click", function (event) {
      event.stopPropagation(); // Предотвращаем всплытие события клика до document
   });

   login.addEventListener('click', function (event) {
      event.stopPropagation(); // Предотвращаем всплытие события клика до document

      const currentDisplay = window.getComputedStyle(loginBlock, null).getPropertyValue('display');

      if (currentDisplay === "none") {
         loginBlock.style.display = "block";
      } else {
         loginBlock.style.display = "none"
      }
   });

   function hideLoginBlock() {
      loginBlock.style.display = "none";
   }

   // Добавляем обработчик события для клика на document
   document.addEventListener("click", function () {
      hideLoginBlock(); // Вызываем функцию скрытия меню
   });


   // -------Cards-------------


   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.isFlipped = false;
      }

      // Переворачиваю карточку
      toggleCard(card) {
         const cardInner = card.querySelector('.menu__item-inner');
         const cardInnerFront = card.querySelector('.menu__item-front');
         const cardInnerBack = card.querySelector('.menu__item-descr');

         cardInner.classList.toggle('menu__item-back');

         if (cardInner.classList.contains('menu__item-back')) {
            cardInnerFront.style.display = "none"
            cardInnerBack.style.display = "block"
         } else {
            cardInnerFront.style.display = "block"
            cardInnerBack.style.display = "none"
         }
      }


      render() {
         const element = document.createElement("div");

         const cardClasses = ["menu__item"];
         if (this.classes.length > 0) {
            cardClasses.push(...this.classes);
         }

         element.classList.add(...cardClasses);

         element.innerHTML = `
               <div class="menu__item-inner">
                  <div class="menu__item-front">
                     <img src=${this.src} alt=${this.alt}>
                     <h3 class="menu__item-subtitle">${this.title}</h3>
                     <div class="menu__item-divider"></div>    
                  </div>
                  <div class="menu__item-back">
                     <div class="menu__item-descr hidden">${this.descr}</div>
                  </div> 
               </div>
               <button class="menu__item-btn">Описание</button>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> руб</div>
               </div>
               <div class="counter-container">
                  <button class="counter-btn decrement" id="decrement">-</button>
                  <span class="count" id="count">0</span>
                  <button class="counter-btn increment" id="increment">+</button>
               </div>
               <button class="menu__item-basket">Добавить в корзину</button>
         `;
         this.parent.append(element);

         const button = element.querySelector('.menu__item-btn');
         button.addEventListener('click', () => {
            this.toggleCard(element);
         });


         // ------------basket
         const addToCartButtons = document.querySelectorAll('.menu__item-basket');
         const cartList = document.querySelector('.main-basket__list');
         const headerBasketCountSpans = document.querySelectorAll('.header-basket__count');
         const headerBasketPriceSpans = document.querySelectorAll('.header-basket__price');


         let headerBasketCount = 0;
         let headerBasketPrice = 0;

         addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
               const card = button.closest('.menu__item');

               if (card) {
                  const productName = card.querySelector('.menu__item-subtitle').textContent;
                  const existingCartItem = cartList.querySelector(`[data-id="${productName}"]`);
                  const countDisplay = card.querySelector('.count');
                  const productCount = parseInt(countDisplay.textContent);
                  const productPrice = parseInt(card.querySelector('.menu__item-total').textContent);

                  headerBasketCount += productCount;
                  headerBasketPrice += productCount * productPrice;

                  headerBasketCountSpans.forEach(span => {
                     span.textContent = headerBasketCount + " шт";
                  });
                  headerBasketPriceSpans.forEach(span => {
                     span.textContent = headerBasketPrice + " руб";
                  });

                  if (existingCartItem) {
                     const counterElement = existingCartItem.querySelector('.count')
                     counterElement.innerText = parseInt(counterElement.innerText) + productCount

                  } else {
                     const cartItemHTML = `<div class="cart-item" data-id="${productName}">
                           <div class="cart-item__top">
                              <div class="cart-item__img">
                              <img src=${this.src} alt=${this.alt}>
                              </div>
                              <div class="cart-item__desc">
                                 <div class="cart-item__title">${productName}</div>

                                 <!-- cart-item__details -->
                                 <div class="cart-item__details">

                                    <div class="counter-container">
                                       <button class="counter-btn decrement" id="decrement">-</button>
                                       <span class="count" id="count">${productCount}</span>
                                       <button class="counter-btn increment" id="increment">+</button>
                                    </div>

                                    <div class="price">
                                       <div class="price__currency">цена: ${productPrice} руб</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>`;

                     // Отображение товара в корзине
                     cartList.insertAdjacentHTML('beforeend', cartItemHTML);
                  }
               }
            });
         });
      }
   }


   async function getResource(url) {
      try {
         const response = await fetch(url);
         if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.status}`);
         }
         const data = await response.json();
         return data;
      } catch (error) {
         console.error(error);
      }
   }

   getResource("http://localhost:3000/menu").then((data) => {
      data.forEach(({ img, altimg, title, descr, price }) => {
         new MenuCard(
            img,
            altimg,
            title,
            descr,
            price,
            ".product"
         ).render();
      });
   });
})

