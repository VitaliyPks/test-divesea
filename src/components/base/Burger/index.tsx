import React from "react";
import classNames from "classnames";

interface props {
  activeBurger: boolean;
  setActiveBurger: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: "black";
  showMode?: "full-tablet";
}

const Burger = ({ activeBurger, setActiveBurger, mode, showMode }: props) => {
  const base = "burger";

  return (
    <div
      className={classNames(base, {
        activeBurger,
        [`${mode}`]: mode,
        [`${showMode}`]: showMode,
      })}
      onClick={() => setActiveBurger((prev) => !prev)}
    >
      <span></span>
    </div>
  );
};
export default Burger;
