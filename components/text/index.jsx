import styles from './text.module.css';
import classNames from 'classnames';

export function Title({ lvl = 1, className, ...restProps }) {
  const Title = `h${lvl}`;
  return (
    <Title className={classNames(styles.title, className)} {...restProps} />
  );
}

export function SubHeading({ lvl = 2, className, ...restProps }) {
  const SubHeading = `h${lvl}`;
  return (
    <SubHeading
      className={classNames(styles.subheading, className)}
      {...restProps}
    />
  );
}

export function Prose({ className, ...restProps }) {
  return <div className={classNames(styles.prose, className)} {...restProps} />;
}

export default {
  Title,
  SubHeading,
  Prose,
};
