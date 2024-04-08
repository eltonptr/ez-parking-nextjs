import Link from "next/link";
import Image from "next/image";
import { Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";

const textFont = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center 
      gap-x-2 hidden md:flex p-1">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p className={cn
            ("text-lg text-neutral-700 pb-1", 
            textFont.className)}>
          Ez-Parking
        </p>
      </div>
    </Link>
  );
};
