import React, { FC } from 'react';
import styles from './text.module.css';
import classNames from 'classnames';

interface HeadingProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Title: FC<HeadingProps> = ({
  as = 'h1',
  className,
  ...restProps
}) => {
  const Heading = as as keyof JSX.IntrinsicElements;
  return (
    <Heading className={classNames(styles.title, className)} {...restProps} />
  );
};

export const SubHeading: FC<HeadingProps> = ({
  as = 'h2',
  className,
  ...restProps
}) => {
  const Heading = as as keyof JSX.IntrinsicElements;
  return (
    <SubHeading
      className={classNames(styles.subheading, className)}
      {...restProps}
    />
  );
};

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Prose: FC<ProseProps> = ({ className, ...restProps }) => {
  return <div className={classNames(styles.prose, className)} {...restProps} />;
};

export default {
  Title,
  SubHeading,
  Prose,
};
