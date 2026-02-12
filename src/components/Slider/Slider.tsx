import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { ReactComponent as RightArrow } from "assets/icons/arrow-right.svg";
import { ReactComponent as LeftArrow } from "assets/icons/arrow-left.svg";

import useWindowSize from "hooks/useWindowSize";

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
  const [ref, { width }] = useMeasure();
  const { desktop } = useWindowSize();
  const gap = useMemo(() => (desktop ? 40 : 32), [desktop]);
  const [trackRef, { width: widthTrack, height }] = useMeasure();

  const totalItems = nfts.length;

  const goToNext = () => {
    const innerWidth = window.innerWidth;
    const nextPosition = position - (width + gap) - innerWidth;

    if (Math.abs(nextPosition) >= widthTrack) {
      setDisabled(true);

      setPosition(nextPosition / 2 + innerWidth + width - gap / 2);
      setTimeout(() => setDisabled(false));
    }

    setTimeout(() => setPosition((prev) => prev - (width + gap)));
  };

  const goToPrev = () => {
    if (position >= 0) {
      setDisabled(true);
      setPosition(-widthTrack / 2 - gap / 2);
      setTimeout(() => setDisabled(false));
    }

    setTimeout(() => setPosition((prev) => prev + (width + gap)));
  };

  return (
    <div className={base}>
      <h1 className={`${base}__title`}>Weekly - Top NFT</h1>
      <div className={`${base}__container`} style={{ height: `${height}px` }}>
        <motion.div
          className={`${base}__track`}
          ref={trackRef}
          style={{
            x: position,
            transition: disabled ? "node" : "all 0.25s ease",
          }}
        >
          {[...nfts, ...nfts].map((nft) => (
            <NftCard
              refCard={ref}
              name={nft.name}
              image={nft.image}
              endTime={nft.endTime}
              currentBid={nft.currentBid}
            />
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
          <LeftArrow className={`${base}__nav__icon`} />
        </Button>
        <div className={`${base}__divider`} />
        <Button
          mode="light"
          className={`${base}__nav ${base}__nav--next`}
          onClick={goToNext}
          disabled={totalItems <= 1 || disabled}
        >
          <RightArrow className={`${base}__nav__icon`} />
        </Button>
      </div>
    </div>
  );
};
