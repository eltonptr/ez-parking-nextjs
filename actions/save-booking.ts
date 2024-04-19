"use server"

import { FormSchemaType } from "@/app/(platform)/(dashboard)/booking/page";
import { db } from "@/lib/db";
import { ParkingLot } from "@prisma/client";

export async function SaveBooking(formData: FormSchemaType, emailAddress:any, parkingLot: ParkingLot ) {
    const user = await db.user.findMany({
        where: { emailaddress: emailAddress },
        take: 1
    });
    
    const hrs = Math.abs(formData.dateTime.getTime() - formData.endTime.getTime()) / 36e5;

    if (user.length != 0) {
        await db.booking.create({
            data: {
                date: new Date(Date.now()),
                startTime: formData.dateTime,
                endTime: formData.endTime,
                ParkingLotId: parkingLot.id,
                UserId: user[0].id,
                licensePlate: formData.licensePlate,
                amount: hrs * 5,
                created: new Date(Date.now()),
                lastUpdate: new Date(Date.now()),
            }
        })
    }
    

    // model Booking {
    //     id Int @id @default(autoincrement())
    //     date DateTime 
    //     startTime DateTime 
    //     endTime DateTime
    //     ParkingLotId Int 
    //     ParkingLot ParkingLot @relation(fields: [ParkingLotId], references: [id])
    //     UserId Int
    //     User User @relation(fields: [UserId], references: [id])
    //     licensePlate String @db.VarChar(50)
    //     amount Int
    //     created DateTime
    //     lastUpdate DateTime
    //   }
      
    
}