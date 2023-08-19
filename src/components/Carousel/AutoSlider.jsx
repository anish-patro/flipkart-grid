import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/bundle";
import Swiper from "swiper/bundle";
const SliderComponent = () => {
  useEffect(() => {
    const swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2400,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <section className="m-0 h-80 bg-gray-100 flex justify-center items-center">
      <div className="w-full h-full bg-white rounded-lg shadow-lg flex items-center">
        <div className="swiper mySwiper h-full">
          <div className="swiper-wrapper ">
            
          <div
              className="swiper-slide swiper-slide--style bg-cover"
              // style={{ backgroundImage: "../public/flipkart grid-01.png" }}
            >
              {/* <img
                
                className="absolute -z-10  h-[90%]"
              /> */}
               <img
                src="flipkart grid-01.png"
                className="absolute -z-10 p-0 bg-cover w-full"
              />
            </div>
            <div className="swiper-slide swiper-slide--style p-6 bg-no-repeat bg-cover">
              <img
                src="./img1.png"
                className="absolute -z-10 w-2/5 ml-[400px]"
              />
              
            </div>

            <div className="swiper-slide swiper-slide--style p-6 bg-no-repeat bg-cover">
              <img
                src="./img2.png"
                className="absolute -z-10 w-2/5 ml-[400px]"
              />
        
            </div>

          </div>
          <div className="swiper-button-next text-gray-600"></div>
          <div className="swiper-button-prev text-gray-600"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;
