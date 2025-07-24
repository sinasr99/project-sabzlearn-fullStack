import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

export default ({items, numberItems}) => {
    const slidesPerView = Math.min(numberItems, items.length);

    return (
        <Swiper slidesPerView={Math.min(numberItems, items.length)}
                 loop={items.length > slidesPerView}
                 spaceBetween={5}
               className="mySwiper">
            {
                items.map((item, i) => (
                    <SwiperSlide key={i}>{item}</SwiperSlide>
                ))
            }
        </Swiper>
    )
}