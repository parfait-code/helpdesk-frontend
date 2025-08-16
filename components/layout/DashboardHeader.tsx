"use client";

import React from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Avatar,
  Chip,
} from "@nextui-org/react";
import {
  Search,
  Bell,
  MessageSquare,
  Settings,
  Moon,
  Sun,
  User,
  LogOut,
  HelpCircle,
  Ticket,
  CheckCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/utils/hooks/use-auth";

const notifications = [
  {
    id: 1,
    type: "ticket",
    title: "Nouveau ticket assigné",
    message: "Le ticket #1234 vous a été assigné",
    time: "Il y a 5 minutes",
    read: false,
    icon: Ticket,
    color: "primary",
  },
  {
    id: 2,
    type: "update",
    title: "Ticket mis à jour",
    message: "Le client a répondu au ticket #1230",
    time: "Il y a 1 heure",
    read: false,
    icon: MessageSquare,
    color: "warning",
  },
  {
    id: 3,
    type: "resolved",
    title: "Ticket résolu",
    message: "Le ticket #1225 a été marqué comme résolu",
    time: "Il y a 2 heures",
    read: true,
    icon: CheckCircle,
    color: "success",
  },
];

export default function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [searchValue, setSearchValue] = React.useState("");
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const displayName = React.useMemo(() => {
    if (!currentUser) return "Utilisateur";
    // Prefer a full name if available, otherwise fall back to name or email
    const fullName = [currentUser.firstName, currentUser.lastName]
      .filter(Boolean)
      .join(" ")
      .trim();
    return fullName || currentUser.name || currentUser.email || "Utilisateur";
  }, [currentUser]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <Navbar
      maxWidth="full"
      className="border-b border-divider"
      classNames={{
        wrapper: "px-4 sm:px-6 lg:px-8",
      }}
    >
      <NavbarContent justify="start" className="flex-1">
        <form onSubmit={handleSearch} className="w-full max-w-md">
          <Input
            classNames={{
              base: "max-w-full h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Rechercher un ticket, client..."
            size="sm"
            startContent={<Search className="w-4 h-4" />}
            type="search"
            value={searchValue}
            onValueChange={setSearchValue}
            onClear={() => setSearchValue("")}
          />
        </form>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2">
        {/* Theme Toggle */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </NavbarItem>

        {/* Notifications */}
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly variant="light" aria-label="Notifications">
                <Badge
                  content={unreadNotifications}
                  color="danger"
                  size="sm"
                  isInvisible={unreadNotifications === 0}
                >
                  <Bell className="w-5 h-5" />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              className="w-80"
              itemClasses={{
                base: "gap-4 data-[hover=true]:bg-default-100",
              }}
            >
              <DropdownSection
                title="Notifications"
                classNames={{
                  heading: "text-default-600 text-sm font-semibold px-2",
                }}
              >
                {notifications.length > 0 ? (
                  notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <DropdownItem
                        key={notification.id}
                        className="py-3"
                        textValue={notification.title}
                      >
                        <div className="flex gap-3 items-start">
                          <div
                            className={`p-2 rounded-lg bg-${notification.color}/10`}
                          >
                            <Icon
                              className={`w-4 h-4 text-${notification.color}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <Chip size="sm" color="primary" variant="dot" />
                              )}
                            </div>
                            <p className="text-xs text-default-500 mt-0.5">
                              {notification.message}
                            </p>
                            <p className="text-xs text-default-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </DropdownItem>
                    );
                  })
                ) : (
                  <DropdownItem isReadOnly>
                    <p className="text-sm text-default-500 text-center py-4">
                      Aucune notification
                    </p>
                  </DropdownItem>
                )}
              </DropdownSection>
              <DropdownSection>
                <DropdownItem
                  className="text-center text-primary text-sm"
                  onClick={() => router.push("/dashboard/notifications")}
                >
                  Voir toutes les notifications
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>

        {/* Messages */}
        <NavbarItem>
          <Button
            isIconOnly
            variant="light"
            onClick={() => router.push("/dashboard/messages")}
            aria-label="Messages"
          >
            <Badge content="2" color="primary" size="sm">
              <MessageSquare className="w-5 h-5" />
            </Badge>
          </Button>
        </NavbarItem>

        {/* User Menu */}
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                size="sm"
                name={displayName}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User actions">
              <DropdownSection title={displayName}>
                <DropdownItem
                  key="profile"
                  startContent={<User className="w-4 h-4" />}
                  onClick={() => router.push("/dashboard/profile")}
                >
                  Mon profil
                </DropdownItem>
                <DropdownItem
                  key="settings"
                  startContent={<Settings className="w-4 h-4" />}
                  onClick={() => router.push("/dashboard/settings")}
                >
                  Paramètres
                </DropdownItem>
                <DropdownItem
                  key="help"
                  startContent={<HelpCircle className="w-4 h-4" />}
                  onClick={() => router.push("/dashboard/help")}
                >
                  Centre d&apos;aide
                </DropdownItem>
              </DropdownSection>
              <DropdownSection>
                <DropdownItem
                  key="logout"
                  className="text-danger"
                  startContent={<LogOut className="w-4 h-4" />}
                  onClick={handleLogout}
                >
                  Déconnexion
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
