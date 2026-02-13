import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ReactComponent as Logo } from "assets/icons/Logo.svg";

import { HEADER_TABS } from "utils/constants";

import useWindowSize from "hooks/useWindowSize";

import Button from "components/base/Button";
import Burger from "components/base/Burger";

export const Header = () => {
  const base = "header";
  const { windowSize } = useWindowSize();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");

    if (html) {
      html.style.overflow = active ? "hidden" : "visible";
      html.style.touchAction = active ? "none" : "";
    }
  }, [active]);

  return (
    <div className={`${base}__wrapper`}>
      <div className={base}>
        <motion.div
          initial={{ y: -90 }}
          animate={{ y: 0 }}
          className={`${base}__content`}
        >
          <div className={`${base}__logo`}>
            <Logo className={`${base}__icon`} />
            <h3 className={`${base}__title`}>DiveSea</h3>
          </div>
          {windowSize?.innerWidth > 375 && (
            <div className={`${base}__tabs`}>
              {HEADER_TABS.map((tab) => (
                <Button key={tab} mode="transparent" className={`${base}__tab`}>
                  {tab.toUpperCase()}
                </Button>
              ))}
            </div>
          )}
          {windowSize?.innerWidth <= 375 && (
            <div className={`${base}__burger-wrapper`}>
              <Burger
                activeBurger={active}
                setActiveBurger={setActive}
                mode="black"
              />
            </div>
          )}
        </motion.div>
      </div>
      {windowSize?.innerWidth <= 375 && (
        <div className={classNames(`${base}__tabs`, { active })}>
          <div className={`${base}__divider`} />
          {HEADER_TABS.map((tab) => (
            <Button key={tab} mode="transparent" className={`${base}__tab`}>
              {tab.toUpperCase()}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
