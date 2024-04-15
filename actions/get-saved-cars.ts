"use server"

import { db } from "@/lib/db";

export async function GetSavedCars(email: string) {
  if (email) {
    console.log(email)
    const user = await db.user.findMany({
      where: {
        emailaddress: email,
      },
      take: 1,
    });
    if (user) {
      const cars = await db.savedCar.findMany({
        where: {
          UserId: user[0].id,
        },
      });

      return cars;
    }
  }
}
