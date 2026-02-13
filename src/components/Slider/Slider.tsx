import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { ReactComponent as RightArrow } from "assets/icons/arrow-right.svg";
import { ReactComponent as LeftArrow } from "assets/icons/arrow-left.svg";

import useAppSelector from "hooks/useAppSelector";
import useWindowSize from "hooks/useWindowSize";

import { NftCard } from "components/NftCard";
import Loading from "components/base/Loading/Loading";
import Button from "components/base/Button";

export const Slider = () => {
  const base = "slider";
  const [disabled, setDisabled] = useState(false);
  const [position, setPosition] = useState(0);
  const [ref, { width }] = useMeasure();
  const { desktop, windowSize } = useWindowSize();
  const gap = useMemo(() => (desktop ? 40 : 32), [desktop]);
  const { items, status } = useAppSelector((state) => state.nft);

  const SWIPE_THRESHOLD = windowSize.innerWidth <= 375 ? 5 : 50;

  const [trackRef, { width: widthTrack, height }] = useMeasure();

  const totalItems = items.length;

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

  const dragStartPosition = useRef(0);
  const isDragging = useRef(false);

  const handlePanStart = () => {
    dragStartPosition.current = position;
    isDragging.current = true;
  };

  const handlePanEnd = (_, info) => {
    isDragging.current = false;

    const dragDistance = info.offset.x;

    if (Math.abs(dragDistance) > SWIPE_THRESHOLD) {
      if (dragDistance < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  return (
    <div className={base}>
      <h1 className={`${base}__title`}>Weekly - Top NFT</h1>
      {status === "loading" || !items?.length ? (
        <Loading height={400} />
      ) : (
        <>
          <div
            className={`${base}__container`}
            style={{ height: `${height || 400}px` }}
          >
            <motion.div
              className={`${base}__track`}
              ref={trackRef}
              style={{
                x: position,
                transition: disabled ? "none" : "all 0.25s ease",
                cursor: isDragging.current ? "grabbing" : "grab",
                userSelect: isDragging.current ? "none" : "auto",
              }}
              onPanStart={handlePanStart}
              onPanEnd={handlePanEnd}
              dragConstraints={{ left: -widthTrack + width, right: 0 }}
              dragElastic={0.1}
            >
              {[...items, ...items].map((nft, idx) => (
                <NftCard
                  key={`${nft.endTime}-${idx}`}
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
        </>
      )}
    </div>
  );
};
