import { Swiper, SwiperProps } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type TP = {
  dynamicBullets?: boolean;
};

SwiperCore.use([Pagination, Navigation]);

export const SwiperSlider: React.FC<SwiperProps & TP> = ({
  spaceBetween,
  slidesPerView,
  children,
  dynamicBullets,
  navigation,
}) => {
  return (
    <Swiper
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={navigation}
      pagination={{
        dynamicBullets: dynamicBullets,
      }}
    >
      {children}
    </Swiper>
  );
};
