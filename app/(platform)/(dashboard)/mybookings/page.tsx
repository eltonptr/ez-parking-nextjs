"use client";

import { GetMyBookings } from "@/actions/get-bookings";
import { GetSavedCars } from "@/actions/get-saved-cars";
import { SaveCar } from "@/actions/save-car";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { Booking, SavedCar } from "@prisma/client";
import { format } from "date-fns";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";

const MyBookingPage = () => {
  const { user } = useUser();
  const [bookingsState, setBooking] = useState<any>();

  useEffect(() => {
    const invokeGetBooking = async () => {
      if (user) {
        const bookings = await GetMyBookings(
          user?.emailAddresses[0].emailAddress as string
        );
        setBooking(bookings);
      }
    };

    invokeGetBooking();
  }, [user]);

  return (
    <div className="ml-1 mt-2">
      <Card className="sm:w-11/12 md:w-11/12">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="gap-4">
          <CardTitle className="">Saved Cars</CardTitle>
          <Table className="mt-5">
            {/* <TableCaption>add a new car.</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead className="">Place</TableHead>
                <TableHead className="">Start</TableHead>
                <TableHead className="">End</TableHead>
                <TableHead>License Plate No.</TableHead>
                <TableHead>Booked Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookingsState &&
                bookingsState.map(
                  (c: {
                    id: Key | null | undefined;
                    ParkingLot: {
                      name:
                        | string
                        | number
                        | boolean
                        | ReactElement<any, string | JSXElementConstructor<any>>
                        | Iterable<ReactNode>
                        | ReactPortal
                        | Promise<AwaitedReactNode>
                        | null
                        | undefined;
                    };
                    startTime: any;
                    endTime: any;
                    licensePlate:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                    created: any;
                    amount:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                  }) => {
                    return (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">
                          {c.ParkingLot.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {format(c.startTime, "PPP HH:mm aa")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {format(c.endTime, "PPP HH:mm aa")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {c.licensePlate}
                        </TableCell>
                        <TableCell className="font-medium">
                          {format(c.created, "PPP HH:mm aa")}
                        </TableCell>
                        <TableCell className="font-medium text-right">
                          ${c.amount}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyBookingPage;
