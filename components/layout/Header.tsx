"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Headphones,
  Shield,
  Cloud,
  Code,
  Network,
  Mail,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    {
      name: "HelpDesk",
      href: "/",
      icon: <Headphones className="w-4 h-4" />,
      primary: true,
    },
    {
      name: "Migration Cloud (AWS)",
      href: "/services#cloud-migration",
      icon: <Cloud className="w-4 h-4" />,
    },
    {
      name: "Gestion Infrastructure",
      href: "/services#infrastructure",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      name: "Conception Réseau",
      href: "/services#network",
      icon: <Network className="w-4 h-4" />,
    },
    {
      name: "Sécurité",
      href: "/services#security",
      icon: <Shield className="w-4 h-4" />,
    },
    {
      name: "Développement",
      href: "/services#development",
      icon: <Code className="w-4 h-4" />,
    },
  ];

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="border-b"
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-inherit flex items-center gap-2"
          >
            <Headphones className="w-6 h-6 text-primary" />
            <span className="text-xl">HelpDesk Pro</span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link color={pathname === "/" ? "primary" : "foreground"} href="/">
            Accueil
          </Link>
        </NavbarItem>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown className="w-4 h-4" />}
                radius="sm"
                variant="light"
              >
                Services
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Services"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            {services.map((service) => (
              <DropdownItem
                key={service.name}
                description={
                  service.primary
                    ? "Service principal - Accès direct"
                    : "Service sur demande"
                }
                startContent={service.icon}
                href={service.href}
                className={
                  service.primary ? "data-[hover=true]:bg-primary/10" : ""
                }
              >
                {service.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <NavbarItem isActive={pathname === "/contact"}>
          <Link
            color={pathname === "/contact" ? "primary" : "foreground"}
            href="/contact"
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Se connecter</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Créer un compte
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={pathname === item.href ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link className="w-full" href="/login" size="lg">
            Se connecter
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full text-primary" href="/register" size="lg">
            Créer un compte
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
