import { useLayoutEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";

import { SwiperSlider } from "components/SwiperSlider";
import { CertificatesItem } from "./CertificatesItem";
import { windowResize, isMobile } from "helpers/utils";
import "./Certificates.scss";

type ComponentTypes = {
  className?: string;
  data?: any;
  carousel?: boolean;
};

export const Certificates: React.FC<ComponentTypes> = ({
  className,
  data,
  carousel,
}) => {
  const [mobile, setMobile] = useState<boolean | undefined>(isMobile);
  useLayoutEffect(() => {
    windowResize(setMobile, 768);
  }, []);
  
  return (
    <div className={`certificates ${className}`}>
      {!carousel || !mobile ? (
        <div className="certificates__wrap">
          {data.map((shop: any) => (
            <CertificatesItem
              key={shop.id}
              id={shop.id}
              name={shop.name}
              url_image={shop.url_image}
              min_price={
                !!shop.min_price
                  ? shop?.min_price
                  : shop.certificates[0]?.min_price
              }
              max_price={
                !!shop.max_price
                  ? shop?.max_price
                  : shop?.certificates[0]?.max_price
              }
              is_active={true}
              is_fast_delivery={shop.is_fast_delivery}
            />
          ))}
        </div>
      ) : (
        <SwiperSlider
          slidesPerView={1}
          spaceBetween={10}
          dynamicBullets={true}
          navigation={true}
        >
          {data.map((shop: any) => (
            <SwiperSlide>
              <CertificatesItem
                key={shop.id}
                id={shop.id}
                name={shop.name}
                url_image={shop.url_image}
                min_price={
                  !!shop.min_price
                    ? shop?.min_price
                    : shop?.certificates[0]?.min_price
                }
                max_price={
                  !!shop.max_price
                    ? shop?.max_price
                    : shop?.certificates[0]?.max_price
                }
                is_active={true}
                is_fast_delivery={shop.is_fast_delivery}
              />
            </SwiperSlide>
          ))}
        </SwiperSlider>
      )}
    </div>
  );
};
