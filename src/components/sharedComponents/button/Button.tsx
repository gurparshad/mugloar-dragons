import classNames from 'classnames';
import React from 'react';

import styles from './button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  buttonType?: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className = '',
  disabled = false,
  buttonType = 'button',
}) => {
  return (
    <button
      type={buttonType}
      className={classNames(className, styles.button)}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
