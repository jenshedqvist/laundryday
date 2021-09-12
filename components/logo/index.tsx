import classNames from 'classnames';
import styles from './logo.module.css';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
}

export default function Logo({ animate = false, ...restProps }: LogoProps) {
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
