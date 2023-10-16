function flipCard(button) {
   const card = button.closest('.card');
   card.querySelector('.card-inner').style.transform =
     card.querySelector('.card-inner').style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
 }
 