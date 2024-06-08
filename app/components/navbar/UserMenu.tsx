"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          StayNest your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="rounded-lg absolute right-0 top-14 shadow-md bg-white text-sm w-[40vw] md:w-3/4 overflow-hidden">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <Button
                  className="rounded-none flex justify-start"
                  variant={"ghost"}
                  onClick={() => router.push("/trips")}
                >
                  My trips
                </Button>
                <Button
                  className="rounded-none flex justify-start"
                  variant={"ghost"}
                  onClick={() => router.push("/favorites")}
                >
                  My favorites
                </Button>
                <Button
                  className="rounded-none flex justify-start"
                  variant={"ghost"}
                  onClick={() => router.push("/reservations")}
                >
                  My reservations
                </Button>
                <Button
                  className="rounded-none flex justify-start"
                  variant={"ghost"}
                  onClick={() => router.push("/properties")}
                >
                  My properties
                </Button>
                <Button
                  onClick={() => rentModal.onOpen()}
                  className="rounded-none flex justify-start"
                  variant={"ghost"}
                >
                  StayNest my home
                </Button>
                <Button
                  className="rounded-none flex justify-start"
                  variant={"ghost"}
                  onClick={() => signOut()}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <LoginModal />
                <RegisterModal />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
