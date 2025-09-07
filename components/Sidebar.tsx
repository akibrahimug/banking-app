"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import PlaidLink from "@/components/PlaidLink";
import TextLogo from "@/components/TextLogo";
import LoadingLink from "@/components/LoadingLink";
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
            <LoadingLink
              href={item.route}
              key={item.label}
              iconSize={20}
              className={cn("sidebar-link", {
                "bg-primary text-primary-foreground": isActive,
              })}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={cn("", {
                  "brightness-0 invert": isActive,
                })}
              />
              <p className={cn("sidebar-label", { "!text-primary-foreground": isActive })}>
                {item.label}
              </p>
            </LoadingLink>
          );
        })}

        <PlaidLink user={user} />
      </nav>

      <Footer user={user} />
    </section>
  );
};

export default Sidebar;
