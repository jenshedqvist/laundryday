import styles from './container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Container({ children, ...restProps }: ContainerProps) {
  return (
    <div className={styles.container} {...restProps}>
      {children}
    </div>
  );
}
