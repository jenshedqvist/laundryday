import React from 'react';
import dayjs from '../../lib/dayjs';
import type { Booking } from '../../data/commonTypes';
import {
  getAvailableHours,
  slotsPerDay,
  createWeekUID,
} from '../../lib/calendar';
import { createNumberRange, isWithinRange, head, tail } from '../../lib/utils';

import Text from '../../components/text';
import Card from '../../components/card';
import Calendar from '../../components/calendar';
import spaceUtil from '../../styles/utils/space.module.css';
import flexUtils from '../../styles/utils/flex.module.css';
import classNames from 'classnames';

interface CalendarContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  bookings: Booking[];
  weeklyCalendar: WeeklyDates[];
}

export type WeeklyDates = {
  week: number;
  dates: Date[];
};

enum EditStates {
  DRAGGING,
  RESIZING,
  IDLE,
}

export default function CalendarView({
  bookings,
  weeklyCalendar,
}: CalendarContainerProps) {
  const [bodyBounds, setBodyBounds] = React.useState<DOMRect>();
  const [focusedHour, setFocusedHour] = React.useState<number>(0);
  const [editState, setEditState] = React.useState<EditStates>(EditStates.IDLE);
  const calendarBody = React.useRef<HTMLDivElement>(null);
  const bookableHours = createNumberRange(7, 22);
  const totalBookableHours = tail(bookableHours) - head(bookableHours);
  const customProperties = {
    '--js-focusedHour': focusedHour,
  } as React.CSSProperties;

  React.useEffect(
    function updateBoundsOnNewRef() {
      if (calendarBody.current) {
        const bounds: DOMRect = calendarBody.current.getBoundingClientRect();
        setBodyBounds(bounds);
      }
    },
    [calendarBody.current]
  );

  return (
    <>
      {weeklyCalendar.map((weeklyDates: WeeklyDates) => {
        return (
          <Card
            className={spaceUtil.mb3}
            key={weeklyDates.week}
            id={createWeekUID(weeklyDates.week)}
          >
            <Calendar>
              <Calendar.Header>
                <Text.Prose
                  className={classNames(
                    flexUtils.flex,
                    flexUtils.justifyBetween,
                    flexUtils.alignBaseline
                  )}
                >
                  <h3>{`Week ${weeklyDates.week}`}</h3>
                  <small>
                    {dayjs(head(weeklyDates.dates)).format('D MMM')} -{' '}
                    {dayjs(tail(weeklyDates.dates)).format('D MMM')}
                  </small>
                </Text.Prose>
              </Calendar.Header>
              <Calendar.Body
                style={customProperties}
                ref={calendarBody}
                hours={bookableHours}
                onMouseUp={() => {
                  setEditState(EditStates.IDLE);
                }}
              >
                {weeklyDates.dates.map((date: Date) => {
                  const bookingsThisDay = bookings.filter(
                    (booking: Booking) =>
                      booking.week === weeklyDates.week &&
                      dayjs(date).isSame(dayjs(booking.date), 'day')
                  );
                  const availableHours = getAvailableHours(
                    bookingsThisDay
                      .filter((b) => !b.isOwn)
                      .map((b) => b.hourRange)
                  );

                  return (
                    <Calendar.Day
                      date={date}
                      onMouseMove={function updateFocusedHourOnMove(
                        event: React.MouseEvent<HTMLDivElement>
                      ) {
                        if (!bodyBounds) return;
                        const clientY: number = event.clientY;
                        const hour = Math.round(
                          clientY / (bodyBounds.height / totalBookableHours)
                        );
                        if (availableHours.includes(hour)) {
                          setFocusedHour(hour);
                        }
                      }}
                    >
                      {bookingsThisDay.map((booking) => {
                        const [start, end] = booking.hourRange;
                        return (
                          <Calendar.Event
                            start={start}
                            end={end}
                            isDragged={
                              booking.isOwn && editState === EditStates.DRAGGING
                            }
                            title={
                              booking.isOwn
                                ? `Booked between ${start}:00 and ${end}:00 hours`
                                : `Unavailable between ${start}:00 and ${end}:00 hours`
                            }
                            onMouseDown={() =>
                              setEditState(EditStates.DRAGGING)
                            }
                            isOwn={booking.isOwn}
                          />
                        );
                      })}
                    </Calendar.Day>
                  );
                })}
              </Calendar.Body>
            </Calendar>
          </Card>
        );
      })}
    </>
  );
}
