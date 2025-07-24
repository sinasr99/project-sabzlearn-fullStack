'use client'

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import {Autoplay, Navigation} from "swiper/modules";

import { GrNext, GrPrevious } from "react-icons/gr";

import styles from "./SwiperWithButtons.module.css"

export default function SwiperWithButtons({items}) {
    const prevButtonRef = useRef(null)
    const nextButtonRef = useRef(null)

    const result = items.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
    ))

    return (
        <div className={styles['swiper-wrapper']}>
            <button ref={prevButtonRef} className={`${styles['swiper-button']}`}>
                <GrNext className={styles['icon']}/>
            </button>
            <button ref={nextButtonRef} className={`${styles['swiper-button']}`}>
                <GrPrevious className={styles['icon']}/>
            </button>
            <Swiper
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    576: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    992: {
                        slidesPerView: 4,
                    }
                }}
                navigation={{
                    prevEl: prevButtonRef.current,
                    nextEl: nextButtonRef.current,
                }}
                onBeforeInit={(swiper) => {
                    // اتصال دکمه‌ها قبل از شروع
                    swiper.params.navigation.prevEl = prevButtonRef.current;
                    swiper.params.navigation.nextEl = nextButtonRef.current;
                }}
                className="mySwiper"
                modules={[Autoplay, Navigation]}
                autoplay={{
                    delay: 10000, // هر 10 ثانیه
                    disableOnInteraction: false, // با سوییپ دستی متوقف نشه
                }}
                loop={items.length > 2}
                spaceBetween={20}
                slidesPerView={items.length > 2 ? 4 : 1}
            >
                {result}
            </Swiper>
        </div>
    )
}
