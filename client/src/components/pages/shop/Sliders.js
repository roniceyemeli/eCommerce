import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navigation, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import { GlobalState } from "../../../GlobalState";
import "./slider.scss";

const Sliders = () => {
  const state = useContext(GlobalState);
  const [products] = state.ProductsApi.products;

  const soldProducts = products.filter((el) => el.sold > 5);
  console.log(soldProducts);

  return (
    <>
      <h1 className="slide_title">best deals</h1>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{ clickable: true }}
        autoplay={{ delay: 3000}}
        autoplayresume='true'
      >
        {soldProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <div className='sold'><span>- {product.sold}%</span></div>
            <Link to={`/detail/${product._id}`}  className='link'><img src={product.images.url} alt="slider_pictures"/></Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Sliders;
