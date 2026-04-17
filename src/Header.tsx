import NavMenu from "./NavMenu";
import logo from './assets/frootfairy.png';
import { Button } from "./components/ui/button";
import { MenuIcon } from "lucide-react";


function Header () {
    return <div className="flex items-center text-xl text-foreground w-full text-center ">
        <NavMenu
            drawerTriggerElement={
                <Button variant="ghost" size='icon' className="px-14">
                <MenuIcon className="size-12 mx-8"/>
            </Button>
            }
        
        />
        <div className="flex flex-col items-center leading-none">
            <img src={logo} className='w-40 -mb-4'/>
            Froot Fairy
        </div>
    </div>;
};

export default Header;
