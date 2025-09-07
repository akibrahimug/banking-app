"use client";
import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user.firstName[0]}</p>
      </div>
      <div className={type === "mobile" ? "email-mobile" : "footer_email"}>
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {user.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-muted-foreground">
          {user.email}
        </p>
      </div>
      <div className="footer_image cursor-pointer" onClick={handleLogOut}>
        <Image
          src="/icons/logout.svg"
          width={24}
          height={24}
          alt="logout"
          className="opacity-70 hover:opacity-100 transition-opacity"
        />
      </div>
    </footer>
  );
};

export default Footer;
