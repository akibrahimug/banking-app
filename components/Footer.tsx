"use client";
import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import GradientIcon from "@/components/GradientIcon";
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
      <div className="footer_image" onClick={handleLogOut}>
        <GradientIcon
          src="/icons/logout.svg"
          size={24}
          alt="logout"
          gradientCss="bg-[linear-gradient(90deg,#F97316_0%,#EF4444_100%)]"
          activeGradientCss="bg-[linear-gradient(90deg,#FDBA74_0%,#FCA5A5_100%)]"
        />
      </div>
    </footer>
  );
};

export default Footer;
