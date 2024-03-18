import React, { type ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = ({ children, variant, ...rest }: IButton) => {
  const style =
    variant === "primary"
      ? "rounded-sm bg-primary p-2 text-sm font-bold hover:brightness-110 flex gap-2 items-center text-white w-fit"
      : variant === "secondary"
        ? "rounded-sm bg-secondary-dark p-2 text-sm font-bold hover:brightness-110 flex gap-2 items-center text-white w-fit"
        : "";

  return (
    <button className={style} {...rest}>
      {children}
    </button>
  );
};

export default Button;
