'use client'
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure,} from "@nextui-org/react";
import {BsGoogle} from 'react-icons/bs'
import {ImGithub} from 'react-icons/im'
import { signIn } from "next-auth/react";

export default  function SgnInButton() {
        
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  
  return (
    <>
      <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onPress={onOpen} color="primary" variant="shadow">Sign In</Button>
      <Modal  backdrop="blur" 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
       
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-teal-500">
                Login To Your Account
                </p>
              </ModalHeader>
              <ModalBody className="py-10">
              
              <Button onClick={()=> signIn('google',{
      callbackUrl: `/dashboard`,
    })}  className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 shadow-xl"  variant="shadow" size="lg" >
                <BsGoogle/>
                  Sign in With Google
                </Button>
                <Button onClick={()=> signIn('github',{
      callbackUrl: `/dashboard`,
    })} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl" variant="shadow" size="lg" >
                <ImGithub/>
                  Sign in With Github
                </Button>
              </ModalBody>
           
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}