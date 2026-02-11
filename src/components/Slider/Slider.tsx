import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ReactComponent as RightArrow } from "assets/icons/arrow-right.svg";
import { ReactComponent as LeftArrow } from "assets/icons/arrow-left.svg";

import { NftCard } from "components/NftCard";
import Button from "components/base/Button";

import { INFTItem } from "types/index";

interface ISliderProps {
  nfts: INFTItem[];
}

const sliderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const slideVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const Slider = ({ nfts }: ISliderProps) => {
  const base = "slider";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = nfts.length;

  const slideWidth = 281;
  const gap = 40;
  const slideWidthWithGap = slideWidth + gap;

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  useEffect(() => {
    if (!isPaused && totalItems > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPaused, totalItems]);

  const offset = currentIndex * slideWidthWithGap;

  return (
    <div
      className={base}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${base}__container`}>
        <motion.div
          className={`${base}__track`}
          variants={sliderVariants}
          initial="hidden"
          animate="visible"
          style={{
            transform: `translateX(-${offset}px)`,
          }}
        >
          {nfts.map((nft) => (
            <motion.div
              key={nft.id}
              className={`${base}__card`}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
            >
              <NftCard
                name={nft.name}
                image={nft.image}
                endTime={nft.endTime}
                currentBid={nft.currentBid}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className={`${base}__controls`}>
        <Button
          mode="light"
          className={`${base}__nav ${base}__nav--prev`}
          onClick={goToPrev}
          disabled={totalItems <= 1}
        >
          <span className={`${base}__nav__icon`}>
            <LeftArrow />
          </span>
        </Button>
        <div className={`${base}__divider`} />
        <Button
          mode="light"
          className={`${base}__nav ${base}__nav--next`}
          onClick={goToNext}
          disabled={totalItems <= 1}
        >
          <span className={`${base}__nav__icon`}>
            <RightArrow />
          </span>
        </Button>
      </div>
    </div>
  );
};
