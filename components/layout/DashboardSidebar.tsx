"use client";

import React from "react";
import {
  Card,
  CardBody,
  Button,
  Link,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Chip,
  ScrollShadow,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Ticket,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Plus,
  ChevronDown,
  Bell,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Headphones,
} from "lucide-react";

const menuItems = [
  {
    label: "Tableau de bord",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Tickets",
    href: "/dashboard/tickets",
    icon: Ticket,
    badge: "3",
    subItems: [
      { label: "Tous les tickets", href: "/dashboard/tickets" },
      { label: "Nouveau ticket", href: "/dashboard/tickets/new" },
      { label: "En cours", href: "/dashboard/tickets?status=open" },
      { label: "Résolus", href: "/dashboard/tickets?status=resolved" },
    ],
  },
  {
    label: "Statistiques",
    href: "/dashboard/stats",
    icon: BarChart3,
  },
  {
    label: "Base de connaissances",
    href: "/dashboard/knowledge",
    icon: FileText,
  },
  {
    label: "Mon profil",
    href: "/dashboard/profile",
    icon: User,
  },
];

const ticketStats = {
  open: 3,
  inProgress: 2,
  resolved: 45,
  total: 50,
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    // Simulation de déconnexion
    router.push("/login");
  };

  const SidebarContent = () => (
    <>
      {/* User Info */}
      <div className="p-4 border-b border-divider">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <Card
              isPressable
              className="bg-content2 hover:bg-content3 transition-colors cursor-pointer"
            >
              <CardBody className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="md"
                    name="Jean Dupont"
                    src=""
                    className="flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      Jean Dupont
                    </p>
                    <p className="text-xs text-default-500 truncate">
                      jean.dupont@entreprise.com
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-default-400" />
                </div>
              </CardBody>
            </Card>
          </DropdownTrigger>
          <DropdownMenu aria-label="User actions">
            <DropdownSection title="Mon compte">
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
            </DropdownSection>
            <DropdownSection title="Support">
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
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <Button
          color="primary"
          className="w-full font-semibold"
          startContent={<Plus className="w-4 h-4" />}
          onClick={() => router.push("/dashboard/tickets/new")}
        >
          Nouveau ticket
        </Button>
      </div>

      {/* Navigation Menu */}
      <ScrollShadow className="flex-1 px-4">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <>
                  <Button
                    variant={isActive(item.href) ? "flat" : "light"}
                    color={isActive(item.href) ? "primary" : "default"}
                    className={`w-full justify-start ${
                      isActive(item.href) ? "bg-primary/10" : ""
                    }`}
                    startContent={<item.icon className="w-5 h-5" />}
                    endContent={
                      <div className="flex items-center gap-2 ml-auto">
                        {item.badge && (
                          <Chip size="sm" variant="flat" color="primary">
                            {item.badge}
                          </Chip>
                        )}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedItems.includes(item.label)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    }
                    onClick={() => toggleExpanded(item.label)}
                  >
                    {item.label}
                  </Button>
                  {expandedItems.includes(item.label) && (
                    <div className="ml-7 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Button
                          key={subItem.href}
                          as={Link}
                          href={subItem.href}
                          variant={isActive(subItem.href) ? "flat" : "light"}
                          color={isActive(subItem.href) ? "primary" : "default"}
                          size="sm"
                          className={`w-full justify-start ${
                            isActive(subItem.href) ? "bg-primary/10" : ""
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Button
                  as={Link}
                  href={item.href}
                  variant={isActive(item.href) ? "flat" : "light"}
                  color={isActive(item.href) ? "primary" : "default"}
                  className={`w-full justify-start ${
                    isActive(item.href) ? "bg-primary/10" : ""
                  }`}
                  startContent={<item.icon className="w-5 h-5" />}
                  endContent={
                    item.badge && (
                      <Chip
                        size="sm"
                        variant="flat"
                        color="primary"
                        className="ml-auto"
                      >
                        {item.badge}
                      </Chip>
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              )}
            </div>
          ))}
        </nav>
      </ScrollShadow>

      {/* Ticket Stats */}
      <div className="p-4 border-t border-divider">
        <Card className="bg-content2">
          <CardBody className="p-4">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-primary" />
              Résumé des tickets
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-warning" />
                  <span className="text-xs">En attente</span>
                </div>
                <span className="text-xs font-semibold">
                  {ticketStats.open}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-3 h-3 text-primary animate-spin" />
                  <span className="text-xs">En cours</span>
                </div>
                <span className="text-xs font-semibold">
                  {ticketStats.inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span className="text-xs">Résolus</span>
                </div>
                <span className="text-xs font-semibold">
                  {ticketStats.resolved}
                </span>
              </div>
              <Chip size="sm" variant="flat" className="w-full mt-2">
                Total: {ticketStats.total} tickets
              </Chip>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Help Section */}
      <div className="p-4">
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
          <CardBody className="p-4 text-center">
            <Headphones className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-semibold mb-1">Besoin d&apos;aide ?</p>
            <p className="text-xs text-default-600 mb-3">
              Notre équipe est disponible 24/7
            </p>
            <Button
              size="sm"
              color="primary"
              variant="flat"
              onClick={() => router.push("/dashboard/help")}
            >
              Contacter le support
            </Button>
          </CardBody>
        </Card>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        isIconOnly
        variant="light"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </Button>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-background border-r border-divider">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center gap-2 p-6 border-b border-divider">
            <Headphones className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold">HelpDesk Pro</span>
          </div>
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleMobileMenu}
          />
          <aside className="relative flex-1 flex flex-col max-w-xs w-full bg-background">
            <div className="flex items-center gap-2 p-6 border-b border-divider">
              <Headphones className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">HelpDesk Pro</span>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
