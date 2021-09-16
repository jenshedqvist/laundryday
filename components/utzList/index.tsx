import React from 'react';
import classNames from 'classnames';
import VisuallyHidden from '@reach/visually-hidden';
import type { UtzOfDay } from '../../data/commonTypes';
import styles from './utzList.module.css';

List.Item = ListItem;
export default List;

interface ListProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  isCollapsed?: boolean;
}

export function List({ children, isCollapsed, ...restProps }: ListProps) {
  return (
    <dl
      className={classNames(styles.list, {
        [styles.collapsed]: isCollapsed,
      })}
      {...restProps}
    >
      {children}
    </dl>
  );
}

interface ListItemProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  utz: UtzOfDay;
}

enum UtzStrings {
  Full = 'No available times',
  High = 'Few available times',
  Mid = 'Some available times',
  Low = 'Lots of available times',
  Empty = 'All times available',
}

export function ListItem({ children, utz, ...restProps }: ListItemProps) {
  const availabilityKey = getAvailabilityKey(utz);
  return (
    <div
      className={classNames(styles.listItem, styles[`utz${availabilityKey}`])}
      {...restProps}
    >
      <VisuallyHidden>
        <dt>{children}</dt>
        <dd>{UtzStrings[availabilityKey]}</dd>
      </VisuallyHidden>
    </div>
  );
}

function getAvailabilityKey(utz: UtzOfDay): keyof typeof UtzStrings {
  if (utz === 100) {
    return 'Full';
  } else if (utz > 75) {
    return 'High';
  } else if (utz > 25 && utz < 75) {
    return 'Mid';
  } else if (utz < 25) {
    return 'Low';
  } else {
    return 'Low';
  }
}
