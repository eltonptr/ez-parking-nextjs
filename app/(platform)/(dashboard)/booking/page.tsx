"use client"
import { GetLocations } from "@/actions/get-location"
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
import { useFormState } from "react-dom"

export default function BookingPage() {
    const [state, formAction] = useFormState(GetLocations, null)
    // const { isLoaded, isSignedIn, user } = useUser();
    // if (isLoaded && isSignedIn) {
    //   SaveUser(user);
    // }
   

  return (
    <>
      <form action={formAction}>
        <div className="grid max-w-xs md:max-w-sm pb-5 items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Location ID</Label>
            <Input id="locationId" placeholder="ID #1234" name="locationId" type="text"  />
          </div>
          {/* <div className="flex flex-col space-y-1.5">
            <Label htmlFor="framework">Framework</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="next">Next.js</SelectItem>
                <SelectItem value="sveltekit">SvelteKit</SelectItem>
                <SelectItem value="astro">Astro</SelectItem>
                <SelectItem value="nuxt">Nuxt.js</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          <Button variant="outline" type="submit">Submit</Button>
        </div>
      </form>{ state?
        <Card className="max-w-xs md:max-w-sm">
        <CardHeader>
            <CardTitle>{state.name}</CardTitle>
            <CardDescription>Please enter the location ID(#1234)</CardDescription>
        </CardHeader>
        <CardContent>
            <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="ID #1234" />
                </div>
                <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                    <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                </Select>
                </div>
            </div>
            </form>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
        </CardFooter>
        </Card>
    : <div>Enter a Valid Location ID</div>}
    </>
  )
}
