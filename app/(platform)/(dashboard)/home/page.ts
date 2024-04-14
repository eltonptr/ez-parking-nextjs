"use server"

import { SaveUser } from "@/actions/save-user";
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation";


export default async function HomePage() {
    const user = await currentUser();
    if(user) {
        await SaveUser(user);
        console.log(user);
    }

    redirect('/booking');
} 