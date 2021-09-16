import type { NextApiRequest, NextApiResponse } from 'next';
import { Booking } from '../../../data/commonTypes';
import bookings from '../../../fixtures/bookings';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Booking[]>
) {
  res.status(200).json(bookings);
}
