import { motion } from "framer-motion";

import { ReactComponent as Logo } from "assets/icons/Logo.svg";

import { HEADER_TABS } from "utils/constants";

import Button from "components/base/Button";

export const Header = () => {
  const base = "header";

  return (
    <div className={base}>
      <motion.div
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        className={`${base}__content`}
      >
        <Logo className={`${base}__logo`} />
        <div className={`${base}__tabs`}>
          {HEADER_TABS.map((tab) => (
            <Button mode="transparent" className={`${base}__tab`}>
              {tab.toUpperCase()}
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
