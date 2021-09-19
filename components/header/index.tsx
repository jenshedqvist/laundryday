import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import Routes from '../../data/routes';
import Container from '../container';
import Logo from '../logo';
import spaceUtil from '../../styles/utils/space.module.css';
import styles from './header.module.css';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export default function Header({ children, ...restProps }: HeaderProps) {
  return (
    <header className={classNames(styles.header)} {...restProps}>
      <Container>
        <Link href={`/${Routes.Home}`}>
          <Logo />
        </Link>
        {children}
      </Container>
    </header>
  );
}
