import classNames from "classnames";
import React, { HTMLAttributes } from "react";

interface props extends HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  mode?: "error" | "green-transparent" | "dark" | "light" | "transparent";
  disabled?: boolean;
}

const Button = ({ children, mode, ...rest }: props) => {
  const base = "button";

  return (
    <button
      {...rest}
      className={classNames(base, {
        [`${mode}`]: mode,
        [`${rest.className}`]: rest.className,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
