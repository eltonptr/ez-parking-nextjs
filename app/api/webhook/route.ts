import { toast } from "@/components/ui/use-toast";
import { NextRequest, NextResponse } from "next/server"
import { describe } from "node:test";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req:NextRequest) {

    const payload = await req.text();
    const response = JSON.parse(payload);

    const sig = req.headers.get("Stripe-Signature");
    const dateTime = new Date(response.created * 1000).toLocaleDateString();
    const timeString = new Date(response.created * 1000).toLocaleDateString();

    try {
        let event = stripe.webhooks.constructEvent(
            payload,
            sig!,
            process.env.STRIPE_WEBHOOK_KEY!
        )

        console.log("event", event.type);
        // toast({
        //     title: response?.data?.object?.billing_details?.email,
        //     description: response?.data?.object?.amount
        // })
        // toast({
        //     title: "Amount recieved  " + response?.amount,
        //     description:
        //       "Name:  " +
        //       response?.Name +
        //       " Quantity " +
        //       response?.Quantity
        //   });

        return NextResponse.json({status: "success", event: event.type});
    } catch (error) {
        
    }
}