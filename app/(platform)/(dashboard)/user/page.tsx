"use client";

import { GetSavedCars } from "@/actions/get-saved-cars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";
import { SavedCar } from "@prisma/client";
import { useEffect, useState } from "react";




const UserPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const fChar = user?.firstName?.charAt(0)?.toUpperCase();
    const lChar = user?.lastName?.charAt(0)?.toUpperCase();
    const [car, setCar] = useState<SavedCar[]>();

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
      }, [user]);

    return (
        <div>
            <Card className="w-6/12">
                <div className="flex flex-col md:flex-col p-5">
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
                        <TableCaption>A list of your cars.</TableCaption>
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
                    <form>
                    <div className="flex flex-row">
                        <Input></Input>
                        <Input></Input>
                        <Input></Input>
                    </div>   
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </div>
            
            

            
    )
};


export default UserPage;