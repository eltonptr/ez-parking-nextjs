import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

const locationPage = () => {
  
// async function getLocation(userData:FormData) {
//   "use server"
//   const id = userData.get("locationId") as string;
//   if (id!==undefined) {
//     const location = await db.ParkingLot.findUnique({
//       where: {
//         locationId: id
//       }
//     });
//     console.log(userData.get("locationId") as string);
//     console.log(location);
//   }
  
    
//   //NextResponse.json(location);
// }
  
  return (
    <div className="flex flex-col space-y-4">
      <form >
        <input
          type="text"
          name="locationId"
          id="LocationId"
          placeholder="Enter the location ID"
          className="border-black border p-1 mr-5"
        />
        <Button type="submit">Submit</Button>
      </form>
      <div className="space-y-2"></div>
    </div>
  );
};

export default locationPage;
