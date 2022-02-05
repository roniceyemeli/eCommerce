import React from "react";
import './slider.scss';

// var swiper = new Swiper(".home-slider", {
//     loop:true,
//     grabCursor:true,
//     navigation: {
//       nextEl: ".swiper-button-next",
//       prevEl: ".swiper-button-prev",
//     },
// });

// var swiper = new Swiper(".review-slider", {
//     loop:true,
//     grabCursor:true,
//     spaceBetween: 20,
//     breakpoints: {
//         450: {
//           slidesPerView: 1,
//         },
//         768: {
//           slidesPerView: 2,
//         },
//         1024: {
//           slidesPerView: 3,
//         },
//     },
// });


const Slider = () => {




  return (
    <div className="swiper home-slider">
      <div className="swiper-wrapper">
        <div className="swiper-slide slide">Slide 1</div>
        <div className="swiper-slide slide">Slide 2</div>
        <div className="swiper-slide slide">Slide 3</div>
      </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
    </div>
  );
};

export default Slider;
