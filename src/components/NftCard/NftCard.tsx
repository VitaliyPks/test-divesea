import { motion } from "framer-motion";

import { ReactComponent as EthereumIcon } from "assets/icons/mdi_ethereum.svg";

import { useTimer } from "hooks/useTimer";

import Button from "components/base/Button";

interface INFTCardProps {
  name: string;
  image: string;
  endTime: number;
  currentBid: string;
  onClick?: () => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0 },
};

export const NftCard = ({
  name,
  image,
  endTime,
  currentBid,
  onClick,
}: INFTCardProps) => {
  const base = "nft-card";
  const timeRemaining = useTimer(endTime);

  return (
    <motion.div
      className={base}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={`${base}__image-container`}>
        <img src={image} alt={name} className={`${base}__image`} />
        <span className={`${base}__timer`}>{timeRemaining}</span>
      </div>

      <div className={`${base}__content`}>
        <h3 className={`${base}__title`}>{name}</h3>

        <div className={`${base}__info`}>
          <div className={`${base}__info-item`}>
            <span className={`${base}__info-label`}>Current Bid</span>
            <span className={`${base}__info-value`}>
              <span className={`${base}__info-icon`}>
                <EthereumIcon />
              </span>
              {currentBid}
            </span>
          </div>

          <Button mode="dark" onClick={onClick} className={`${base}__btn`}>
            PLACE BID
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
