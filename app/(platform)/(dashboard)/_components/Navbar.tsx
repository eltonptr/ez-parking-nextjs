import { Logo } from "@/components/logo";
import { UserButton } from "@clerk/nextjs";


export const Navbar = () => {
  return (
    <nav
      className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm
        bg-white flex items-center"
    >
      <div className="md:max-w-screen-2xl mx-auto flex
            items-center w-full justify-between">
        <div className="hidden md:flex">
          <Logo />
          <div
            className="space-x-4 md:block md:w-auto flex items-center
            justify-between w-full p-1">
                <div></div>
                <div></div>
            
          </div>
        </div>
      </div>
      <UserButton 
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatarBox: {
                            height:30,
                            width:30
                        }
                    }
                }}/>
    </nav>
  );
};
