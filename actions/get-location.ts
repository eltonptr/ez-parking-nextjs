"use server"

import { db } from "@/lib/db";


export async function GetLocations(prevState: any, form:FormData) {

    console.log(form.get("locationId"));
    const parkingLots = await db.parkingLot.findFirst({
        where: {
            locationId: form.get("locationId") as string
        }
    })
    console.log(parkingLots);
    return parkingLots;
}