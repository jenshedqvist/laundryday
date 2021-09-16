export type RoomId = number;
export type UtzOfDay = number;
export type HourOfDay = number;
export type HourRange = [number, number];

export type Booking = {
  id: string;
  week: number;
  date: Date;
  hourRange: [HourOfDay, HourOfDay];
  room: RoomId;
  isOwn: boolean;
};

export type WeeklyBookings = {
  week: number;
  bookings: Booking[];
};
