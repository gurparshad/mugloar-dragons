import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";

type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  buttonType?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({title, onClick, className, disabled, buttonType}) => {
  return (
    <button
      type={buttonType || "button"}
      className={classNames(className, styles.button)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
