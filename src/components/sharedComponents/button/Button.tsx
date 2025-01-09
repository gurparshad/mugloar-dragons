import classNames from 'classnames';
import React from 'react';

import styles from './button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

type ButtonStyleType = 'success' | 'failure';

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  buttonType?: ButtonType;
  styleType?: ButtonStyleType;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className = '',
  disabled = false,
  buttonType = 'button',
  styleType = '',
}) => {
  return (
    <button
      type={buttonType}
      className={classNames(styles.button, className, {
        [styles.success]: styleType === 'success',
        [styles.failure]: styleType === 'failure',
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
