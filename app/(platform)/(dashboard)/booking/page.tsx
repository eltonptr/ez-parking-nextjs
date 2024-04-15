"use client"
import { GetLocations } from "@/actions/get-location"
import { SaveBooking } from "@/actions/save-booking"
import { SaveUser } from "@/actions/save-user"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { useFormState } from "react-dom"

export default function BookingPage() {
    const [state, formAction] = useFormState(GetLocations, null)
    const [date, bookAction] = useFormState(SaveBooking, null)

   

  return (
    <>
      <form action={formAction}>
        <div className="grid max-w-xs md:max-w-sm pb-5 items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Location ID</Label>
            <Input id="locationId" placeholder="ID #1234" name="locationId" type="text"  />
          </div>
          <Button variant="default" type="submit">Submit</Button>
        </div>
      </form>{ state?
        <Card className="max-w-xs md:max-w-sm">
        <CardHeader>
          <CardTitle>{state.name}</CardTitle>
          <CardDescription className="text-sm p-2">location ID(#{state.locationId})
          <br /> Start Time : {format(state.startTime, "HH:mm aa")}
          <br /> End Time : {format(state.endTime, "HH:mm aa")}
          </CardDescription>
      <CardTitle className=" text-base">Book Time Slot</CardTitle>
        </CardHeader>
        <CardContent>
            <form >
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                
                </div>
                <div className="flex flex-col space-y-1.5">
                
                </div>
            </div>
            </form>
        </CardContent>
        </Card>
    : <div>Enter a Valid Location ID</div>}
    </>
  )
}
