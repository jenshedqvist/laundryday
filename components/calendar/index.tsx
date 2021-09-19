import React from 'react';
import classNames from 'classnames';
import { passProps } from '../../lib/utils';
import styles from './calendar.module.css';

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export default function Calendar({
  children,
  className,
  ...restProps
}: CalendarProps) {
  return (
    <div className={classNames(styles.calendar, className)} {...restProps}>
      {children}
    </div>
  );
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function Header({ children, className, ...restProps }: HeaderProps) {
  return (
    <div className={classNames(styles.header, className)} {...restProps}>
      {children}
    </div>
  );
}
Calendar.Header = Header;

interface BodyProps extends React.HTMLAttributes<HTMLDivElement> {
  hours: number[];
  className?: string;
  children?: React.ReactNode;
}

export function Body({
  children,
  className,
  hours,
  style,
  ...restProps
}: BodyProps) {
  const totalBookableHours = hours[hours.length - 1] - hours[0];
  const customProps = {
    '--hoursTotal': totalBookableHours,
    '--hoursStart': hours[0],
  };
  return (
    <div
      className={classNames(styles.body, className)}
      style={{ ...style, ...customProps }}
      {...restProps}
    >
      <div className={styles.axis}>
        <div className={styles.hourGrid}>
          {hours?.map((h) => (
            <div className={styles.axisHour} key={h}>
              <abbr className={styles.axisText} title={`${h}:00 hours`}>
                {h}
              </abbr>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.weekdays}>{children}</div>
    </div>
  );
}
Calendar.Body = Body;

interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Day({
  children,
  className,
  style,
  name,
  ...restProps
}: DayProps) {
  return (
    <div className={styles.day}>
      {name && <h2 className={styles.dayName}>{name}</h2>}
      <div className={classNames(styles.hourGrid, className)} {...restProps}>
        {children}
      </div>
    </div>
  );
}
Calendar.Day = Day;

interface EventProps extends React.HTMLAttributes<HTMLDivElement> {
  start: number;
  end: number;
  className?: string;
  children?: React.ReactNode;
}

export function Event({
  children,
  className,
  start,
  end,
  style,
  ...restProps
}: EventProps) {
  const customProps = {
    '--start': start,
    '--end': end,
  };
  return (
    <div
      className={classNames(styles.event, className)}
      style={{ ...style, ...customProps }}
      {...restProps}
    >
      {children}
    </div>
  );
}
Calendar.Event = Event;
