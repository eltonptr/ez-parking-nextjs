
"use server"

import { db } from "@/lib/db";

export async function SaveCar(form: FormData, email: string) {
    const nickName = form.get("nickname") as string;
    const province = form.get("province") as string;
    const licensePlate = form.get("licenseplate") as string;

    const user = await db.user.findMany({
        where: { emailaddress: email },
        take: 1
    });
    
    if (user.length != 0) { 
        return await db.savedCar.create({
            data: {
                nickName: nickName,
                province: province,
                licensePlate: licensePlate,
                UserId: user[0].id
            }
        });
    }
}