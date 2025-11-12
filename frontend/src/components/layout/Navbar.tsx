'use client';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { Link } from "@heroui/react";
import { link as linkStyles } from "@heroui/react";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/siteConfig";
import Image from "next/image";
import {FaWhatsapp} from "react-icons/fa";



export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className={'shadow-md top-0 z-50 bg-background'}>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src={'/logo2.png'} alt="BM SHOP" width={40} height={40} className="rounded-full"/>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-bold",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-3">
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <Image
              width={35} height={35}
              src={'/facebook.png'} alt={'fb'}/>
          </Link>
          <Link aria-label={'Telegram'} href={siteConfig.links.telegram}>
            <Image src={'/telegram.png'} alt={'tg'} width={35} height={35}/>
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Button
            isExternal
            as={Link}
            href={siteConfig.links.whatsapp}
            variant="shadow"
            color={'success'}
          >
            <FaWhatsapp />  WhatsApp Now
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu className={'bg-gradient-to-b from-green-300 to-green-100'}>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <NavbarItem className={"mx-4 mt-4 flex gap-4"}>
          <Link isExternal aria-label="Facebook" href={siteConfig.links.facebook}>
            <Image
              width={35} height={35}
              src={'/facebook.png'} alt={'fb'}/>
          </Link>
          <Link aria-label={'Telegram'} href={siteConfig.links.telegram}>
            <Image src={'/telegram.png'} alt={'tg'} width={35} height={35}/>
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};