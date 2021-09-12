import type { NextApiRequest, NextApiResponse } from 'next';
import { Booking, WeeklyUtz } from '../../../data/commonTypes';
import bookings from '../../../data/bookings';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<WeeklyUtz[]>
) {
  res.status(200).json(
    groupBookingsByWeek(bookings, [36, 37, 38]).map((w) => ({
      ...w,
      utz: getDailyUtzOfWeek(w.bookings),
    }))
  );
}

function getDailyUtzOfWeek(bookings: Booking[]) {
  /* TODO: return utz when that logic is ready */
  return bookings.length;
}

function groupBookingsByWeek(
  bookings: Booking[],
  weeks: number[] = []
): WeeklyUtz[] {
  return weeks.reduce(
    (bookingsPerWeek: WeeklyUtz[], weekNum: number) => [
      ...bookingsPerWeek,
      { week: weekNum, bookings: bookings.filter((x) => x.week === weekNum) },
    ],
    []
  );
}
