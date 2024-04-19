"use client";
import { GetLocations } from "@/actions/get-location";
import { SaveBooking } from "@/actions/save-booking";
import { TimePickerDemo } from "@/components/templates/date-time-picker/time-picker-demo";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronsUpDown } from "lucide-react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/components/ui/use-toast";
import { GetSavedCars } from "@/actions/get-saved-cars";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SavedCar } from "@prisma/client";
import { z } from "zod";

const formSchema = z.object({
  dateTime: z
    .instanceof(Date, { message: "Date field is required" })
    .refine((date) => {
      return (
        date.getTime() <= new Date(Date.now()).getTime(),
        "The booking date should be in future!"
      );
    }),
  endTime: z
    .instanceof(Date, { message: "Date field is required"})
    .refine((date) => {
      return (
        date.getTime() > new Date(Date.now()).getTime(),
        "The booking date should be in future!"
      );
    }),
  licensePlate: z.string({required_error: "Please Add license plate"})
});

export type FormSchemaType = z.infer<typeof formSchema>;

export default function BookingPage() {
  const today = new Date(Date.now());
  const maxDay = new Date(today);
  maxDay.setDate(today.getDate() + 5);

  const [state, formAction] = useFormState(GetLocations, null);
  const [car, setCar] = useState<SavedCar[]>();
  const { user } = useUser();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const { watch } = form;
  const { toast } = useToast();

  useEffect(() => {
      const invokeGetCar = async () => {
        if (user) {
          const savedCars = await GetSavedCars(
            user?.emailAddresses[0].emailAddress as string
          );
          if(savedCars) {
          console.log(savedCars);
          setCar(savedCars);
        }
      }
      };
      invokeGetCar();
      console.log(car);
    },  [user]);

  const onSubmit = async (data: FormSchemaType) => {
    console.log(user?.emailAddresses[0].emailAddress);
    await SaveBooking(data, user?.emailAddresses[0].emailAddress, state);
    toast({
      title: "Booking is saved for location: " + state?.name,
      description:
        "Time:  " +
        format(data.dateTime, "PPP HH:mm aa") +
        " till " +
        format(data.endTime, "PPP HH:mm aa") +
        " For " +
        user?.fullName + " " + data.licensePlate,
    });
  }

  return (
    <>
      <form action={formAction}>
        <div className="grid grid-row-4 max-w-xs md:max-w-sm pb-5 items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Location ID</Label>
            <Input
              id="locationId"
              placeholder="ID #1234"
              name="locationId"
              type="text"
            />
          </div>
          <Button variant="default" type="submit">
            Search
          </Button>
        </div>
      </form>
      {state ? (
        <Card className="max-w-xs md:max-w-sm">
          <CardHeader>
            <CardTitle>{state.name}</CardTitle>
            <CardDescription className="text-sm p-2">
              location ID(#{state.locationId})
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
                    className="flex flex-col items-stretch gap-4 justify-center"
                    onSubmit={form.handleSubmit(onSubmit)}
                  >
                    <FormField
                      control={form.control}
                      name="dateTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex-1 text-left">
                            Start
                          </FormLabel>
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
                                    <span>Click to open the Calendar</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                            </FormControl>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                fromDate={today}
                                toDate={maxDay}
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
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex-1 text-left">
                            End
                          </FormLabel>
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
                                    <span>Click to open the Calendar</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                            </FormControl>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                fromDate={watch("dateTime")}
                                toDate={maxDay}
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
                    <FormField
                      control={form.control}
                      name="licensePlate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel> Enter License Plate No. </FormLabel>
                          <Input {...field} />
                          <FormLabel> or pick from your saved car</FormLabel>
                          <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Saved Car's" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              car && car.map(c => {
                                return <SelectItem key={c.id} value={c.licensePlate}>{c.nickName}</SelectItem>
                              })
                            }
                          </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    {/* <Input placeholder="License Plate No." ></Input>
                    <Button> Add another car </Button> */}
                    <Button className="" type="submit">
                      Submit
                    </Button>
                  </form>
                </Form>
              </div>
              <div className="flex flex-col space-y-1.5"></div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div>Enter a Valid Location ID</div>
      )}
    </>
  );
}
