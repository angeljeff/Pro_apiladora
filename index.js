
var swiper = new Swiper(".card_slider", {
    spaceBetween: 25,
    loop:true,
    speed:1000,
    autoplay:{
      delay:2000,

    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation:{
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });


  let vermas_1= document.querySelector('.vermas_1');
  let info1= document.querySelector('.ver_info_1');

  let contenidoimagenes_1= document.querySelector('.ima_1');
  let crrar_1= document.querySelector('.close_1');


  vermas_1.addEventListener('click', function(){
    contenidoimagenes_1.classList.add('most_1')

  })

  crrar_1.addEventListener('click', function(){
    contenidoimagenes_1.classList.remove('most_1')
  })

  info1.addEventListener('click', function(){
    contenidoimagenes_1.classList.add('most_1')

  })


  // NUMERO 2

  let vermas_2= document.querySelector('.vermas_2');
  let info2= document.querySelector('.ver_info_2');

  let contenidoimagenes_2= document.querySelector('.ima_2');
  let crrar_2= document.querySelector('.close_2');


  vermas_2.addEventListener('click', function(){
    contenidoimagenes_2.classList.add('most_2')

  })

  crrar_2.addEventListener('click', function(){
    contenidoimagenes_2.classList.remove('most_2')
  })

  info2.addEventListener('click', function(){
    contenidoimagenes_2.classList.add('most_2')

  })

  // NUMERO 3


  let vermas_3= document.querySelector('.vermas_3');
  let info3= document.querySelector('.ver_info_3');

  let contenidoimagenes_3= document.querySelector('.ima_3');
  let crrar_3= document.querySelector('.close_3');


  vermas_3.addEventListener('click', function(){
    contenidoimagenes_3.classList.add('most_3')

  })

  crrar_3.addEventListener('click', function(){
    contenidoimagenes_3.classList.remove('most_3')
  })

  info3.addEventListener('click', function(){
    contenidoimagenes_3.classList.add('most_3')

  })



  // NUMERO 4
  let vermas_4= document.querySelector('.vermas_4');
  let info4= document.querySelector('.ver_info_4');

  let contenidoimagenes_4= document.querySelector('.ima_4');
  let crrar_4= document.querySelector('.close_4');


  vermas_4.addEventListener('click', function(){
    contenidoimagenes_4.classList.add('most_4')

  })

  crrar_4.addEventListener('click', function(){
    contenidoimagenes_4.classList.remove('most_4')
  })

  info4.addEventListener('click', function(){
    contenidoimagenes_4.classList.add('most_4')

  })
  
