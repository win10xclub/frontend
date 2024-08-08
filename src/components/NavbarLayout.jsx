import React from "react";
import { Wallet } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";

const NavbarLayout = ({ children }) => {
  const pathName = usePathname();
  const isAuthPage = pathName === "/signin" || "/signup";

  return (
    <div className="flex flex-col px-[1rem] py-[0.25rem] mx-auto w-full text-textColor items-center">
      <nav className={`w-[100%] flex ${!isAuthPage ? "justify-between" : "justify-center"} items-center px-[2rem] mt-[1rem]`}>
        <h1 className="text-[1.2rem]  font-bold italic">win10x.club</h1>
        {!isAuthPage && (
          <div className="bg-secnColor rounded-[12px] px-[0.75rem] py-[0.5rem] flex gap-4 items-center ">
            <Wallet size={28} />
            <span className="font-semibold">₹ 390.00</span>
          </div>
        )}
      </nav>
      {children}
    </div>
  );
};

export default NavbarLayout;
