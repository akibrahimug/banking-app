"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LoadingLink from "@/components/LoadingLink";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import TextLogo from "@/components/TextLogo";
const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <section className="w-fulll max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={30}
            height={30}
            alt="menu"
            className="cursor-pointer invert brightness-200 drop-shadow"
          />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="border-border bg-background text-foreground"
        >
          <button
            type="button"
            onClick={() => window.history.back()}
            className="cursor-pointer flex items-center gap-1 px-4"
            aria-label="Go back"
          >
            <TextLogo size="md" />
          </button>
          <div className="mobilenav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-foreground">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);

                  return (
                    <SheetClose asChild key={item.route}>
                      <LoadingLink
                        href={item.route}
                        iconSize={20}
                        className={cn("mobilenav-sheet_close w-full", {
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
                        <p
                          className={cn(
                            "text-16 font-semibold text-foreground",
                            {
                              "text-primary-foreground": isActive,
                            }
                          )}
                        >
                          {item.label}
                        </p>
                      </LoadingLink>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <Footer user={user} type="mobile" />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
