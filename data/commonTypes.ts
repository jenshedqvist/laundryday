export type RoomId = number;
export type UtzOfDay = number;

export interface Booking {
  id: number;
  week: number;
  start: Date;
  end: Date;
  rooms: RoomId[];
  utz?: UtzOfDay;
}

export interface WeeklyUtz {
  week: number;
  bookings: Booking[];
  utz?: UtzOfDay;
}
