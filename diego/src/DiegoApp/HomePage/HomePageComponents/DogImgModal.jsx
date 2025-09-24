import { useState } from "react";
import "../HomePageStyle/DogImgModalStyle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function DogImgModal({ isOpen, images, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="dog-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Dog images"
    >
      <div className="dog-modal__backdrop" onClick={() => setIsPop(false)} />
      <div className="dog-modal__panel">
        <Swiper
          className="dog-modal__swiper"
          modules={[EffectFade, Pagination, A11y]}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop
          pagination
        >
          {images?.map((src, i) => (
            <SwiperSlide key={i}>
              <img className="dog-modal__img" src={src} alt={`Dog ${i + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
