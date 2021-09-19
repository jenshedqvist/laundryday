import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import dayjs from '../../lib/dayjs';
import { UserContext } from '../../contexts/User';
import type { Booking } from '../../data/commonTypes';
import Routes from '../../data/routes';
import {
  getAvailableHours,
  slotsPerDay,
  getDayName,
  getWeekDates,
} from '../../lib/calendar';
import { createNumberRange } from '../../lib/utils';
import Header from '../../components/header';
import Footer from '../../components/footer';
import Container from '../../components/container';
import Text from '../../components/text';
import Card from '../../components/card';
import Calendar from '../../components/calendar';
import spaceUtil from '../../styles/utils/space.module.css';
import flexUtils from '../../styles/utils/flex.module.css';

export default function WeekView({ bookings }: { bookings: Booking[] }) {
  const router = useRouter();
  const routerWeek = Number(router.query.num);
  const { isAuthenticated } = React.useContext(UserContext);

  if (process.browser && !isAuthenticated) {
    // Quick fix for Next choking on router being called on server
    router.push(
      `/${Routes.Login}?redirect=${`/${Routes.Calendar}/${routerWeek}`}`
    );
  }

  const weekRange = [routerWeek, routerWeek + 2];
  const weeklyCalendar: WeeklyDates[] = getWeekDates(weekRange).map(
    (dates, index) => ({
      week: weekRange[0] + index,
      dates,
    })
  );
  return (
    <>
      <Head>
        <title>Week {routerWeek} | Laundry Day</title>
        <meta name="description" content={`Bookings for week ${routerWeek}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        {weeklyCalendar.map((weeklyDates: WeeklyDates) => {
          return (
            <Card className={spaceUtil.mb3} key={weeklyDates.week}>
              <Calendar>
                <Calendar.Header>
                  <Text.Prose
                    className={`${flexUtils.flex} ${flexUtils.justifyBetween} ${flexUtils.alignBaseline}`}
                  >
                    <h3>{`Week ${weeklyDates.week}`}</h3>
                    <small>
                      {dayjs(weeklyDates.dates[0]).format('D MMM')} -{' '}
                      {dayjs(
                        weeklyDates.dates[weeklyDates.dates.length - 1]
                      ).format('D MMM')}
                    </small>
                  </Text.Prose>
                </Calendar.Header>
                <Calendar.Body hours={createNumberRange(7, 22)}>
                  {weeklyDates.dates.map((date: Date) => {
                    const bookingsThisDay = bookings.filter(
                      (booking: Booking) =>
                        booking.week === weeklyDates.week &&
                        dayjs(date).isSame(dayjs(booking.date), 'day')
                    );
                    return (
                      <Calendar.Day name={getDayName(date)}>
                        {bookingsThisDay.map((booking) => {
                          const [start, end] = booking.hourRange;
                          return (
                            <Calendar.Event
                              start={start}
                              end={end}
                              title={`Unavailable between ${start}:00 and ${end}:00 hours`}
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
      </Container>
      <Footer />
    </>
  );
}

function getDailyUtz(bookings: Booking[]): number {
  const hoursLeft = getAvailableHours(
    bookings.map((b: Booking) => b.hourRange)
  );
  return (hoursLeft.length - 1) / slotsPerDay;
}

type WeeklyDates = {
  week: number;
  dates: Date[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/bookings/');
  const bookings: Booking[] = await res.json();

  return {
    props: {
      bookings,
    },
  };
};
