import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dayjs from '../lib/dayjs';
import { GetServerSideProps } from 'next';

import { UserContext } from '../contexts/User';
import type { Booking } from '../data/commonTypes';
import Routes from '../data/routes';
import {
  getAvailableHours,
  slotsPerDay,
  getDayName,
  getWeekDates,
  createWeekUID,
} from '../lib/calendar';
import { isWithinRange } from '../lib/utils';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '../components/container';
import Text from '../components/text';
import Card from '../components/card';
import UtzList from '../components/utzList';
import buttonStyles from '../components/button/button.module.css';
import spaceUtil from '../styles/utils/space.module.css';
import flexUtils from '../styles/utils/flex.module.css';

export default function Home({ bookings }: { bookings: Booking[] }) {
  const { isAuthenticated } = React.useContext(UserContext);

  const thisWeekNum = dayjs().isoWeek();
  const weekRange = [thisWeekNum, thisWeekNum + 2];
  const weeklyCalendar: WeeklyDates[] = getWeekDates(weekRange).map(
    (dates, index) => ({
      week: weekRange[0] + index,
      dates,
    })
  );

  return (
    <>
      <Head>
        <title>Laundry Day</title>
        <meta name="description" content="Get shit washed" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container>
        <Text.Prose className={spaceUtil.mt4}>
          {weeklyCalendar
            .filter(function filterThreeWeeks(weeklyDates: WeeklyDates) {
              return isWithinRange(weekRange, weeklyDates.week);
            })
            .map((weeklyDates: WeeklyDates) => {
              return (
                <div key={weeklyDates.week}>
                  <Card className={spaceUtil.mb3}>
                    <div
                      className={`${flexUtils.flex} ${flexUtils.justifyBetween} ${flexUtils.alignBaseline}`}
                    >
                      <h3>
                        <Link
                          href={
                            isAuthenticated
                              ? `/${Routes.Calendar}/${
                                  weeklyDates.week
                                }#${createWeekUID(weeklyDates.week)}`
                              : `${Routes.Login}?redirect=/${Routes.Calendar}/${
                                  weeklyDates.week
                                }#${createWeekUID(weeklyDates.week)}`
                          }
                        >
                          {`Week ${weeklyDates.week}`}
                        </Link>
                      </h3>
                      <small>
                        {dayjs(weeklyDates.dates[0]).format('D MMM')} -{' '}
                        {dayjs(
                          weeklyDates.dates[weeklyDates.dates.length - 1]
                        ).format('D MMM')}
                      </small>
                    </div>
                    <UtzList>
                      {weeklyDates.dates.map((date: Date) => {
                        const bookingsThisDay = bookings.filter(
                          (booking: Booking) =>
                            booking.week === weeklyDates.week &&
                            dayjs(date).isSame(dayjs(booking.date), 'day')
                        );
                        const dailyUtzRatio = getDailyUtz(bookingsThisDay);
                        const dailyUtzPercent = Math.round(
                          100 - dailyUtzRatio * 100
                        );
                        return (
                          <UtzList.Item
                            key={date.toString()}
                            utz={dailyUtzPercent}
                          >
                            {getDayName(date)} ({bookingsThisDay.length}) (
                            {dailyUtzRatio})
                          </UtzList.Item>
                        );
                      })}
                    </UtzList>
                  </Card>
                </div>
              );
            })}
        </Text.Prose>
        {!isAuthenticated && (
          <div style={{ textAlign: 'center' }} className={spaceUtil.mt5}>
            <Link href={`/${Routes.Login}`}>
              <a className={buttonStyles.button}>Login to manage bookings</a>
            </Link>
          </div>
        )}
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
