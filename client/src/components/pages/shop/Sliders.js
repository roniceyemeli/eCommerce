import React, { useContext } from "react";
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { GlobalState } from "../../../GlobalState";
import './slider.scss';



const Sliders = () => {
  const state = useContext(GlobalState);
  const [products] = state.ProductsApi.products;
  
    const soldProducts = products.filter(el => el.sold > 5);
    console.log(soldProducts);


  
  return (

  
    <>
    <h1 className="slide_title">best deals</h1>
    <Swiper
    modules={[Navigation]}
    navigation={{ clickable: true }}
    // className="mySwiper"
  >
    {
      soldProducts.map( product => 
      <SwiperSlide key={product._id}>
        <img src={product.images.url} alt="slider_pictures" />
      </SwiperSlide>
    )}
    {/* <SwiperSlide><img src="/arrival-1.jpg" alt="slider_pictures" /></SwiperSlide>
    <SwiperSlide><img src="/arrival-2.jpg" alt="slider_pictures" /></SwiperSlide>
    <SwiperSlide><img src="/arrival-3.jpg" alt="slider_pictures" /></SwiperSlide> */}

    </Swiper>
    </>
  );
};

export default Sliders;
