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

// Добавляем обработчик события для нажатия на кнопку
login.addEventListener("click", function(event) {
   event.stopPropagation(); // Предотвращаем всплытие события клика до document
   toggleLoginBlock(); // Вызываем функцию переключения меню
});

// Добавляем обработчик события для клика на document
document.addEventListener("click", function() {
   hideLoginBlock(); // Вызываем функцию скрытия меню
});

// Добавляем обработчик события для клика на меню
loginBlock.addEventListener("click", function(event) {
   event.stopPropagation(); // Предотвращаем всплытие события клика до document
});

login.addEventListener('click', function () {
   if (loginBlock.style.display === "none") {
      loginBlock.style.display = "block";
   } else {
      loginBlock.style.display = "none"
   }
});

function hideLoginBlock() {
   loginBlock.style.display = "none";
}
