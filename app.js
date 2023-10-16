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

   // Добавляем обработчик события для клика на document
   document.addEventListener("click", function () {
      hideLoginBlock(); // Вызываем функцию скрытия меню
   });

   // Добавляем обработчик события для клика на меню
   loginBlock.addEventListener("click", function (event) {
      event.stopPropagation(); // Предотвращаем всплытие события клика до document
   });

   login.addEventListener('click', function (event) {
      event.stopPropagation(); // Предотвращаем всплытие события клика до document

      if (loginBlock.style.display === "none") {
         loginBlock.style.display = "block";
      } else {
         loginBlock.style.display = "none"
      }
   });

   function hideLoginBlock() {
      loginBlock.style.display = "none";
   }


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


      render() {
         const element = document.createElement("div");

         if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
         } else {
            this.classes.forEach((className) => element.classList.add(className));
         }

         element.innerHTML = `
             <img src=${this.src} alt=${this.alt}>
             <h3 class="menu__item-subtitle">${this.title}</h3>
             <div class="menu__item-descr">описание ${this.descr1}</div>
             <button class="menu__item-btn" onclick="flipCard(this)">Описание</button>
             <div class="menu__item-divider"></div>
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



         // // ----------counter
         const productCards = document.querySelectorAll('.menu__item');

         productCards.forEach((card) => {
            const decrementButton = card.querySelector('.decrement');
            const incrementButton = card.querySelector('.increment');
            const countDisplay = card.querySelector('.count');

            let count = 0

            decrementButton.addEventListener('click', () => {
               if (count > 0) {
                  count--;
                  countDisplay.textContent = count;
               }
            });

            incrementButton.addEventListener('click', () => {
               count++;
               countDisplay.textContent = count;
            });
         })



         // ------------basket
         const addToCartButtons = document.querySelectorAll('.menu__item-basket');
         const headerBasketCountSpan = document.querySelector('.header-basket__count');
         const headerBasketPriceSpan = document.querySelector('.header-basket__price');

         let headerBasketCount = 0
         let headerBasketPrice = 0


         addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
               const card = button.closest('.menu__item');

               if (card) {

                  const countDisplay = card.querySelector('.count');
                  const productCount = parseInt(countDisplay.textContent);
                  const productPrice = parseInt(card.querySelector('.menu__item-total').textContent)

                  headerBasketCount += productCount;
                  headerBasketPrice += productCount * productPrice;

                  headerBasketCountSpan.textContent = headerBasketCount + " шт";
                  headerBasketPriceSpan.textContent = headerBasketPrice + " руб";

                  // document.querySelector('.count').innerText = 0
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

