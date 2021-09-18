import React from 'react';
import classNames from 'classnames';
import styles from './card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function Card({ children, className, ...restProps }: CardProps) {
  return (
    <div className={classNames(styles.card, className)} {...restProps}>
      {children}
    </div>
  );
}
