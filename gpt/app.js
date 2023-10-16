const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartList = document.querySelector('#cart ul');
const totalCountSpan = document.getElementById('total-count');
const totalPriceSpan = document.getElementById('total-price');

let totalItemCount = 0;
let totalPrice = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.menu__item');
        
        if (card) {
            const productCount = parseInt(card.querySelector('.count').textContent);
            const productPrice = parseInt(card.querySelector('p').textContent.split('$')[1]);
            
            totalItemCount += productCount;
            totalPrice += productCount * productPrice;
            
            totalCountSpan.textContent = totalItemCount;
            totalPriceSpan.textContent = totalPrice;
        }
    });
});

// Добавьте обработчики событий для +/- счетчика (без изменений)
const incrementButtons = document.querySelectorAll('.increment');
const decrementButtons = document.querySelectorAll('.decrement');

incrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        const countSpan = button.previousElementSibling;
        countSpan.textContent = parseInt(countSpan.textContent) + 1;
    });
});

decrementButtons.forEach(button => {
    button.addEventListener('click', () => {
        const countSpan = button.nextElementSibling;
        const count = parseInt(countSpan.textContent);
        if (count > 0) {
            countSpan.textContent = count - 1;
        }
    });
});

