import React from 'react';
import Container from '../container';
import Logo from '../logo';
import styles from './header.module.css';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Header({ children, ...restProps }: HeaderProps) {
  return (
    <header className={styles.header} {...restProps}>
      <Container>
        <Logo />
        {children}
      </Container>
    </header>
  );
}
