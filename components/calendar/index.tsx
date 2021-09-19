import React, { useEffect } from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { getDayName } from '../../lib/calendar';
import { isWithinRange, passProps } from '../../lib/utils';
import styles from './calendar.module.css';
import colorUtils from '../../styles/utils/colors.module.css';

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

export const Body = React.forwardRef<HTMLDivElement, BodyProps>(
  ({ children, className, hours, style, ...restProps }: BodyProps, ref) => {
    const totalBookableHours = hours[hours.length - 1] - hours[0];
    const customProps = {
      '--hoursTotal': totalBookableHours,
      '--hoursStart': hours[0],
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
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
        <div className={styles.weekdays}>
          {passProps(children, (props: object) => ({
            ...props,
            totalBookableHours,
            hours,
          }))}
        </div>
      </div>
    );
  }
);
Calendar.Body = Body;

interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
  date?: Date;
  className?: string;
  totalBookableHours?: number;
  hours?: number[];
  children?: React.ReactNode;
}

export function Day({
  children,
  className,
  style,
  date,
  totalBookableHours = 0,
  hours = [8, 16],
  ...restProps
}: DayProps) {
  return (
    <div className={styles.day}>
      {date && (
        <h2 className={styles.date}>
          <small className={styles.dayName}>{getDayName(date)}</small>
          {dayjs(date).date()}
        </h2>
      )}
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
  isOwn?: boolean;
  isDragged?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function Event({
  children,
  className,
  start,
  end,
  isOwn,
  isDragged,
  style,
  ...restProps
}: EventProps) {
  const customProps = {
    '--start': start,
    '--end': end,
    '--duration': end - start,
  } as React.CSSProperties;

  return (
    <div
      className={classNames(
        styles.event,
        {
          [styles.booking]: isOwn,
          [styles.eventDragged]: isDragged,
        },
        className
      )}
      style={{ ...style, ...customProps }}
      {...restProps}
    >
      <div className={styles.eventBody}>
        {isOwn ? (
          <>
            <p>
              <strong>Your booking</strong>
            </p>
            <p>
              {start}:00 to {end}:00
            </p>
          </>
        ) : (
          <p className={colorUtils.textOnDark}>Request access</p>
        )}
        {children}
      </div>
    </div>
  );
}
Calendar.Event = Event;
