import React from 'react';
import classNames from 'classnames';
import styles from './logo.module.css';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
}

// Note: Forward ref is due to Next js ineptitude: https://github.com/vercel/next.js/issues/7915
const Logo = React.forwardRef(
  ({ animate = false, ...restProps }: LogoProps, ref) => {
    return (
      <div
        className={classNames(styles.logo, {
          'is-animated': animate,
        })}
        role="img"
        aria-label="Laundry Day logo"
        {...restProps}
      >
        <div className={styles.laundryCover} />
        <div className={styles.laundry} />
      </div>
    );
  }
);

export default Logo;
