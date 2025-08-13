"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import GradientIcon from "@/components/GradientIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import PlaidLink from "@/components/PlaidLink";
import { Loader2 } from "lucide-react";
import TextLogo from "@/components/TextLogo";
const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="mb-12 cursor-pointer flex items-center gap-2"
        >
          <TextLogo className="max-xl:text-[22px]" size="md" />
        </button>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn("sidebar-link", {
                "bg-bank-gradient text-white": isActive,
              })}
            >
              <GradientIcon
                src={item.imgURL}
                size={20}
                active={isActive}
                gradientCss={item.gradient}
                activeGradientCss={item.activeGradient}
              />
              <p className={cn("sidebar-label", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}

        <PlaidLink user={user} />
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
