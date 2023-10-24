window.addEventListener('click', function(event){

   let counter;

    if (event.target.classList.contains('decrement') || event.target.classList.contains('increment')) {
      const counterWrapper = event.target.closest('.counter-container');
      counter = counterWrapper.querySelector('.count');
    }

    if (event.target.classList.contains('increment')) {
		counter.innerText = ++counter.innerText;
      console.log('test')
	}

   if (event.target.classList.contains('decrement')) {

		// Проверяем чтобы счетчик был больше 1
		if (parseInt(counter.innerText) > 1) {
			// Изменяем текст в счетчике уменьшая его на 1
			counter.innerText = --counter.innerText;
		} else if (event.target.closest('.counter-container') && parseInt(counter.innerText) === 1) {
			// Проверка на товар который находится в корзине
			console.log('IN CART!!!!');
			// Удаляем товар из корзины
			event.target.closest('.cart-item').remove();

			// Отображение статуса корзины Пустая / Полная
			// toggleCartStatus();

			// Пересчет общей стоимости товаров в корзине
			// calcCartPriceAndDelivery();
		}
	}

   // Проверяем клик на + или - внутри коризины
	if (event.target.classList.contains('counter-btn') && event.target.closest('.cart-wrapper')) {
		// Пересчет общей стоимости товаров в корзине
		calcCartPriceAndDelivery();
	}

})