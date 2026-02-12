import { useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { ReactComponent as RightArrow } from "assets/icons/arrow-right.svg";
import { ReactComponent as LeftArrow } from "assets/icons/arrow-left.svg";

import { NftCard } from "components/NftCard";
import Button from "components/base/Button";

import { INFTItem } from "types/index";

interface ISliderProps {
  nfts: INFTItem[];
}

export const Slider = ({ nfts }: ISliderProps) => {
  const base = "slider";
  const [disabled, setDisabled] = useState(false);
  const [position, setPosition] = useState(0);
  const [ref, { width, height }] = useMeasure();
  const [trackRef, { width: widthTrack }] = useMeasure();

  const totalItems = nfts.length;

  const goToNext = () => {
    const innerWidth = window.innerWidth;
    const nextPosition = position - (width + 40) - innerWidth;

    if (Math.abs(nextPosition) >= widthTrack) {
      setDisabled(true);

      setPosition(nextPosition / 2 + innerWidth + width - 20);
      setTimeout(() => setDisabled(false));
    }

    setTimeout(() => setPosition((prev) => prev - (width + 40)));
  };

  const goToPrev = () => {
    if (position >= 0) {
      setDisabled(true);
      setPosition(-widthTrack / 2 - 20);
      setTimeout(() => setDisabled(false));
    }

    setTimeout(() => setPosition((prev) => prev + (width + 40)));
  };

  return (
    <div className={base}>
      <div className={`${base}__container`} style={{ height: `${height}px` }}>
        <motion.div
          className={`${base}__track`}
          ref={trackRef}
          style={{
            x: position,
            transition: disabled ? "node" : "all 0.125s ease",
          }}
        >
          {[...nfts, ...nfts].map((nft, idx) => (
            <motion.div
              key={`${nft.id}-${idx}`}
              ref={ref}
              className={`${base}__card`}
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
          disabled={totalItems <= 1 || disabled}
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
          disabled={totalItems <= 1 || disabled}
        >
          <span className={`${base}__nav__icon`}>
            <RightArrow />
          </span>
        </Button>
      </div>
    </div>
  );
};
