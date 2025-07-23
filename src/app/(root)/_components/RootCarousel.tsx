import ImageTextCard from "@/components/card/ImageTextCard";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";

const RootCarousel = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    dragFree: true,
    align: "start",
    skipSnaps: true,
    containScroll: "trimSnaps",
  });
  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">
          <ImageTextCard text="More Beautiful" image="/assets/images/beauty.jpg" />
        </div>
        <div className="embla__slide">
          <ImageTextCard text="More Beautiful" image="/assets/images/beauty2.jpg" />
        </div>
        <div className="embla__slide">
          <ImageTextCard text="More Beautiful" image="/assets/images/beauty.jpg" />
        </div>
      </div>
    </div>
  );
};

export default RootCarousel;
