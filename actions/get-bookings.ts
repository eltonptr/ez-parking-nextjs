"use server"

import { db } from "@/lib/db";

export async function GetMyBookings(email: string) {
  if (email) {
    const user = await db.user.findMany({
      where: {
        emailaddress: email,
      },
      take: 1,
    });
    if (user) {
      const bookings = await db.booking.findMany({
        where: {
          UserId: user[0].id,
        },
        include: {
            User: true,
            ParkingLot: true
        }   
      });
      console.log(bookings[0].User.emailaddress);
      console.log(bookings[0].ParkingLot.name);
      return bookings;
    }
  }
}
