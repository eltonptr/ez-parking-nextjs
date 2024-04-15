"use server"

import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns";

export async function SaveBooking(data: any, emailAddress:any ) {
    
    console.log(data.dateTime);
    console.log(emailAddress);
}