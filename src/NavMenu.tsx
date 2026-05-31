import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
} from "./components/ui/drawer"

import { NavLink } from 'react-router-dom'
import React from "react";


type NavMenuProps = {
    drawerTriggerElement: React.ReactNode;
};

function NavMenu ({
    drawerTriggerElement
}: NavMenuProps) {
    
    return <Drawer
          direction="left"
          
        >
          <DrawerTrigger asChild>
            {drawerTriggerElement}
          </DrawerTrigger>
          <DrawerContent  className="flex flex-col gap-16 bg-background text-2xl p-8">
                <div className="flex flex-col gap-4">
                    <DrawerClose asChild><NavLink
                    className="text-foreground"
                    to="/"
                >
                    Home
                </NavLink></DrawerClose>
                <DrawerClose asChild><NavLink
                    className="text-foreground"
                    to='/order'
                >
                    Order Jams
                </NavLink></DrawerClose>
                </div>
          </DrawerContent>
        </Drawer>
}

export default NavMenu;