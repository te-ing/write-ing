/* eslint-disable react/button-has-type */
import React, { ComponentProps } from 'react';
import classNames from 'classnames';
import styles from './CommonButton.module.scss';

interface ICommonButtonProps extends ComponentProps<'button'> {
  text?: string;
  size?: number;
  color?: 'white' | 'black';
  borderRadius?: number;
  children?: React.ReactNode;
}

export function CommonButton({
  text,
  size,
  borderRadius = 12,
  color = 'white',
  type = 'button',
  children,
  ...props
}: ICommonButtonProps) {
  const height = size;
  const fontSize = size && size / 2;
  return (
    <button
      className={classNames(styles.button, `${styles[color]}`)}
      type={type}
      style={{ borderRadius: `${borderRadius}px`, height, fontSize }}
      {...props}
    >
      {text || children}
    </button>
  );
}
