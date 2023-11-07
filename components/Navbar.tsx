"use client";
import Link from "next/link";
import { useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

import { HiMenuAlt3 } from "react-icons/hi";

import SgnInButton from "./SignInButton";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import CreatePostForm from "./CreatePostForm";
import CategoriesList from "./CategoriesList";

export default function App() {
  
  const { status,data:session } = useSession();
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="bg-white/80 z-50 dark:bg-slate-900/80 backdrop-blur-xl py-5 w-full  ">
        {/* desktop navbar */}

        <nav className="container mx-auto lg:flex hidden lg:justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Link className="font-bold text-xl text-inherit" href="/">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500">
                Blogger
              </p>
            </Link>
          </div>
          Top Categories
          <div className="flex items-center gap-3 lg:gap-5">
         
            {status === "authenticated" ? (
              <div className="flex items-center gap-2">
            <CreatePostForm/>
                 <Dropdown>
      <DropdownTrigger>
        
          <Image className="w-10 h-10 rounded-full" src={session?.user?.image || ''} width={60} height={60} alt="image"/>
      
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
       
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem  onClick={() => signOut()} key="delete" className="text-danger" color="danger">
        
                  Log Out
               
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
                 
             
              </div>
            ) : (
              <SgnInButton />
            )}
          </div>
        </nav>
        {/* mobile navbar */}
        <nav className="container mx-auto flex flex-col lg:hidden px-4">
          <div className="flex items-center  justify-between">
            <Link href="/">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                Blogger
              </p>
            </Link>
<div>
<div className="flex items-center gap-4">
<CreatePostForm/>
<Button
              className="bg-primary-50 dark:bg-slate-800"
              onClick={handleChange}
            >
              <HiMenuAlt3 className="text-xl" />
            </Button>
                 <Dropdown>
      <DropdownTrigger>
        
          <Image className="w-10 h-10 rounded-full" src={session?.user?.image || ''} width={60} height={60} alt="image"/>
      
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">
            
        </DropdownItem>
     
        <DropdownItem  onClick={() => signOut()} key="delete" className="text-danger" color="danger">
        
                  Log Out
               
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
                 
 
              </div>
            
</div>
          
          </div>
          {open && (
            <div className="flex flex-col items-center gap-5">
           
            Top Categories
              {status === "authenticated" ? <div className="hidden">
            
              </div> : <SgnInButton />}
            </div>
          )}
        </nav>
      </div>
    
    </>
  );
}
