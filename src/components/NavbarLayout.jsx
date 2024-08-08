import React from "react";

const NavbarLayout = ({ children }) => {
  return (
    <div className="flex flex-col px-[1rem] py-[0.25rem] mx-auto w-full">
      <nav className="flex ">
        <h1 className="text-[1.2rem] text-textColor font-bold italic">
          win10x.club
        </h1>

        <div className="bg-secnColor rounded-[12px] p-[0.5rem] flex gap-2 items-center">
          <Wallet size={32} />₹ 390.00
        </div>
      </nav>

      {children}
    </div>
  );
};

export default NavbarLayout;
