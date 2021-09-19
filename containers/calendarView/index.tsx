import React from 'react';
import dayjs from '../../lib/dayjs';

import type { Booking } from '../../data/commonTypes';
import { getAvailableHours, createWeekUID } from '../../lib/calendar';
import { createNumberRange, head, tail } from '../../lib/utils';

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
  className,
}: CalendarContainerProps) {
  const [updatedBookings, setUpdatedBookings] = React.useState<{
    [key: string]: Booking;
  }>({});
  const [bodyBounds, setBodyBounds] = React.useState<DOMRect>();
  const [focusedHour, setFocusedHour] = React.useState<number>(0);
  const [focusedDay, setFocusedDay] = React.useState<number>(0);
  const calendarBody = React.useRef<HTMLDivElement>(null);

  const defaultEditedBookingState = {
    booking: null,
    state: EditStates.IDLE,
  };
  const [editedBookingState, setEditedBookingState] = React.useState<{
    booking: Booking | null;
    state: EditStates;
  }>(defaultEditedBookingState);
  const clearEditedBookingState = () =>
    setEditedBookingState(defaultEditedBookingState);

  const bookableHours = createNumberRange(7, 22);
  const totalBookableHours = tail(bookableHours) - head(bookableHours);
  const customProperties = {
    '--js-focusedHour': focusedHour,
    '--js-focusedDay': focusedDay,
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

  // Mockup some state here just for feels...
  bookings = bookings.map((x: Booking) => {
    return updatedBookings[x.id] || x;
  });

  return (
    <>
      {weeklyCalendar.map((weeklyDates: WeeklyDates) => {
        return (
          <Card
            className={classNames(spaceUtil.mb3, className)}
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
                  <h3>Week {weeklyDates.week}</h3>
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
                  // Mockup some state here just for feels...
                  const justEditedBooking = editedBookingState.booking;
                  if (justEditedBooking) {
                    if (justEditedBooking.hourRange[0] !== focusedHour) {
                      const duration = getBookingDuration(justEditedBooking);
                      const updated = {
                        ...justEditedBooking,
                        hourRange: [focusedHour, focusedHour + duration],
                      } as Booking;
                      setUpdatedBookings({
                        ...updatedBookings,
                        [justEditedBooking.id]: updated,
                      });
                    }
                  }
                  clearEditedBookingState();
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
                          // If we are dragging an event we need to constrain to existing bookings
                          if (
                            editedBookingState.booking &&
                            editedBookingState.state === EditStates.DRAGGING
                          ) {
                            const duration = getBookingDuration(
                              editedBookingState.booking
                            );
                            if (availableHours.includes(hour - 1 + duration)) {
                              setFocusedHour(hour);
                            }
                          } else {
                            setFocusedHour(hour);
                          }

                          setFocusedDay(dayjs(date).isoWeekday());
                        }
                      }}
                    >
                      {bookingsThisDay.map((booking) => {
                        const [start, end] = booking.hourRange;
                        const isBeingDragged =
                          booking.isOwn &&
                          editedBookingState.booking?.id === booking.id &&
                          editedBookingState.state === EditStates.DRAGGING;

                        return (
                          <Calendar.Event
                            key={booking.id}
                            start={start}
                            end={end}
                            isDragged={isBeingDragged}
                            title={
                              booking.isOwn
                                ? `Booked between ${start}:00 and ${end}:00 hours`
                                : `Unavailable between ${start}:00 and ${end}:00 hours`
                            }
                            onMouseDown={() =>
                              setEditedBookingState({
                                booking,
                                state: EditStates.DRAGGING,
                              })
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

const getBookingDuration = (booking: Booking) =>
  tail(booking.hourRange) - head(booking.hourRange);
