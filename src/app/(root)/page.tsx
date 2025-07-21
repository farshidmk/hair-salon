"use client";
import ImageTextCard from "@/components/card/ImageTextCard";
import useEmblaCarousel from "embla-carousel-react";

const RootPage = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true,
  });
  return (
    <div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide">
            <ImageTextCard text="More Beautiful" image="/assets/images/beauty.jpg" />
          </div>
          <div className="embla__slide">
            <ImageTextCard text="More Beautiful" image="/assets/images/beauty.jpg" />
          </div>
          <div className="embla__slide">
            <ImageTextCard text="More Beautiful" image="/assets/images/beauty.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootPage;
