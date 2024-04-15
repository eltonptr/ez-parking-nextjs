"use client"
import { GetLocations } from "@/actions/get-location"
import { SaveBooking } from "@/actions/save-booking"
import { SaveUser } from "@/actions/save-user"
import { TimePickerDemo } from "@/components/templates/date-time-picker/time-picker-demo"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  dateTime: z.date(),
});
 
export type FormSchemaType = z.infer<typeof formSchema>;
 

export default function BookingPage() {
    const [state, formAction] = useFormState(GetLocations, null)

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
    });

    function onSubmit(data: FormSchemaType) {
      SaveBooking(data);
    }
   

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
        <Card className="max-w-xs md:max-w-md">
        <CardHeader>
          <CardTitle>{state.name}</CardTitle>
          <CardDescription className="text-sm p-2">location ID(#{state.locationId})
          <br /> Start Time : {format(state.startTime, "HH:mm aa")}
          <br /> End Time : {format(state.endTime, "HH:mm aa")}
          </CardDescription>
      <CardTitle className=" text-base">Book Time Slot</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Form {...form}>
      <form 
        className="flex items-end gap-4 justify-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="dateTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">DateTime</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm aa")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
                </div>
                <div className="flex flex-col space-y-1.5">
                
                </div>
            </div>

        </CardContent>
        </Card>
    : <div>Enter a Valid Location ID</div>}
    </>
  )
}
