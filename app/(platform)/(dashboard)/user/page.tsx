"use client";

import { GetSavedCars } from "@/actions/get-saved-cars";
import { SaveCar } from "@/actions/save-car";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { SavedCar } from "@prisma/client";
import { useEffect, useRef, useState } from "react";


const UserPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const fChar = user?.firstName?.charAt(0)?.toUpperCase();
    const lChar = user?.lastName?.charAt(0)?.toUpperCase();
    const [car, setCar] = useState<SavedCar[]>();
    const [state, setState] = useState(false);
    const formRef =  useRef<HTMLFormElement>(null);

    const saveTheCar = async (form:FormData) => {
        const mycar = await SaveCar(form, user?.emailAddresses[0].emailAddress ?? "");
        setState(!state);
        formRef.current?.reset();
        toast({
            title: "Car saved: " + mycar?.nickName,
            description:
              "License Plate:  " +
              mycar?.licensePlate +
              " Province " +
              mycar?.province
          });
    }

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
      }, [user, state]);

    return (
        <div className="ml-1 mt-2">
            <Card className="w-7/12">
                <div className="flex flex-col md:flex-col ml-1 mt-2">
                    <Avatar className="w-5/12 h-5/12 " >
                        <AvatarImage src={user?.imageUrl}/>
                        <AvatarFallback>{fChar}{lChar}</AvatarFallback>
                    </Avatar>
                    <Label htmlFor="fname">{}</Label>
                </div>
                <CardHeader>
                    <CardTitle>Welcome, {user?.fullName?? "NA"}!</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="gap-4">
                    <CardTitle className="">Saved Cars</CardTitle>
                    <Table className="mt-5">
                        {/* <TableCaption>add a new car.</TableCaption> */}
                        <TableHeader>
                            <TableRow>
                            <TableHead className="">Nickname</TableHead>
                            <TableHead>License Plate No.</TableHead>
                            <TableHead className="text-right">Province</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                car && car.map(c => {
                                   return (<TableRow key={c.id}>
                                        <TableCell className="font-medium">{c.nickName}</TableCell>
                                        <TableCell>{c.licensePlate}</TableCell>
                                        <TableCell className="text-right">{c.province}</TableCell>
                                    </TableRow>)
                            } ) }
                        </TableBody>
                    </Table>
                    <form action={saveTheCar} ref={formRef}>
                    <div className="flex flex-row gap-4 mt-7">
                        <div className="flex flex-col gap-2">
                            <Label>Nickname</Label>
                            <Input name="nickname" placeholder="my-car.."></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Licence Plate</Label>
                            <Input name="licenseplate" placeholder="ABC DEF$.."></Input>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Province</Label>
                            <Input name="province" placeholder="ontario.."></Input>
                        </div>
                    </div>   
                    <div className="flex justify-start mt-5">
                    <Button type="submit">Save</Button>
                    </div>
                   </form>
                </CardContent>
            </Card>
        </div>            
    )
};


export default UserPage;