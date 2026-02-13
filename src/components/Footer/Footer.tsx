import { ReactComponent as WaveIcon } from "assets/icons/Wave.svg";

import { FOOTER_TABS } from "utils/constants";

import useWindowSize from "hooks/useWindowSize";

import Button from "components/base/Button";

export const Footer = () => {
  const base = "footer";
  const { windowSize } = useWindowSize();

  return (
    <div className={base}>
      <div className={`${base}__content`}>
        <div className={`${base}__body`}>
          <div className={`${base}__logo`}>
            <WaveIcon className={`${base}__icon`} />
            <h3 className={`${base}__title`}>DiveSea</h3>
          </div>
          <div className={`${base}__tabs`}>
            {FOOTER_TABS.map((tab) => (
              <Button key={tab} mode="transparent" className={`${base}__tab`}>
                {tab}
              </Button>
            ))}
          </div>
        </div>
        <div className={`${base}__divider`} />
        <div className={`${base}__bottom`}>
          <span
            className={`${base}__copyright`}
          >{`© 2023${windowSize.innerWidth <= 375 ? " DiveSea All Rights Reserved." : ""}`}</span>
        </div>
      </div>
    </div>
  );
};
