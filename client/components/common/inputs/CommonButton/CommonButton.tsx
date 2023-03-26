/* eslint-disable react/button-has-type */
import React, { ComponentProps } from 'react';
import cx from 'classnames';
import styles from './CommonButton.module.scss';

interface ICommonButtonProps extends ComponentProps<'button'> {
  text?: string;
  height?: string;
  width?: string;
  color?: 'white' | 'black';
  borderRadius?: string;
  children?: React.ReactNode;
}

export function CommonButton({
  text,
  height,
  width,
  borderRadius = '12px',
  color = 'white',
  type = 'button',
  children,
  className,
  ...props
}: ICommonButtonProps) {
  return (
    <button
      className={cx(styles.button, `${styles[color]}`, className)}
      type={type}
      style={{ borderRadius: `${borderRadius}`, height, width }}
      {...props}
    >
      {text || children}
    </button>
  );
}
