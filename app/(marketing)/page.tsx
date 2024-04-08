import { Car } from "lucide-react";
import { Source_Code_Pro, Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

const textFont = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const TitleFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div
          className="mb-4 flex items-center border shadow-sm p-4 
        bg-amber-100 text-amber-700 rounded-full uppercase">
          <Car
           className="h-6 w-6 mr-2"
           />
          No. 1 Parking App
        </div>
        <h1
          className={cn(
            "text-3xl md:text-6xl text-center text-neutral-800 mb-6",
            TitleFont.className
          )}
        >
          Ez-Parking booking made easy
        </h1>
        <div
          className="text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 
        to-pink-600 text-white px-4 p-2 rounded-md  pb-4 w-fit"
        >
          for your car
        </div>
      </div>
      <div
        className={cn(
          "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
          textFont.className
        )}
      >
        Advance booking, easy payment, plan your travel with ease.
      </div>
      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">Get Ez-Parking for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;





