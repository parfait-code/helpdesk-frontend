import React from "react";
import { Chip } from "@nextui-org/react";
import {
  Clock,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Shield,
} from "lucide-react";

// Status Badge Component
interface StatusBadgeProps {
  status:
    | "open"
    | "in-progress"
    | "waiting-for-customer"
    | "resolved"
    | "closed";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function StatusBadge({
  status,
  size = "sm",
  showIcon = false,
}: StatusBadgeProps) {
  const config = {
    open: {
      label: "Ouvert",
      color: "warning" as const,
      icon: AlertCircle,
    },
    "in-progress": {
      label: "En cours",
      color: "primary" as const,
      icon: Loader2,
    },
    "waiting-for-customer": {
      label: "En attente",
      color: "secondary" as const,
      icon: Clock,
    },
    resolved: {
      label: "Résolu",
      color: "success" as const,
      icon: CheckCircle,
    },
    closed: {
      label: "Fermé",
      color: "default" as const,
      icon: XCircle,
    },
  };

  const { label, color, icon: Icon } = config[status];

  return (
    <Chip
      size={size}
      variant="flat"
      color={color}
      startContent={
        showIcon && (
          <Icon
            className={`w-3 h-3 ${
              status === "in-progress" ? "animate-spin" : ""
            }`}
          />
        )
      }
    >
      {label}
    </Chip>
  );
}

// Priority Badge Component
interface PriorityBadgeProps {
  priority: "low" | "medium" | "high" | "critical";
  size?: "sm" | "md" | "lg";
  variant?: "flat" | "dot" | "bordered";
}

export function PriorityBadge({
  priority,
  size = "sm",
  variant = "dot",
}: PriorityBadgeProps) {
  const config = {
    low: {
      label: "Basse",
      color: "success" as const,
      icon: Shield,
    },
    medium: {
      label: "Moyenne",
      color: "warning" as const,
      icon: Clock,
    },
    high: {
      label: "Haute",
      color: "danger" as const,
      icon: AlertCircle,
    },
    critical: {
      label: "Critique",
      color: "danger" as const,
      icon: Zap,
    },
  };

  const { label, color, icon: Icon } = config[priority];

  return (
    <Chip
      size={size}
      variant={variant}
      color={color}
      startContent={variant === "flat" && <Icon className="w-3 h-3" />}
    >
      {label}
    </Chip>
  );
}

// Category Badge Component
interface CategoryBadgeProps {
  category:
    | "helpdesk"
    | "cloud"
    | "infrastructure"
    | "network"
    | "security"
    | "development"
    | "other";
  size?: "sm" | "md" | "lg";
}

export function CategoryBadge({ category, size = "sm" }: CategoryBadgeProps) {
  const labels = {
    helpdesk: "HelpDesk",
    cloud: "Cloud",
    infrastructure: "Infrastructure",
    network: "Réseau",
    security: "Sécurité",
    development: "Développement",
    other: "Autre",
  };

  return (
    <Chip size={size} variant="flat">
      {labels[category]}
    </Chip>
  );
}

// SLA Badge Component
interface SLABadgeProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
}

export function SLABadge({ percentage, size = "sm" }: SLABadgeProps) {
  let color: "success" | "warning" | "danger";

  if (percentage >= 90) color = "success";
  else if (percentage >= 70) color = "warning";
  else color = "danger";

  return (
    <Chip size={size} variant="flat" color={color}>
      SLA {percentage}%
    </Chip>
  );
}

// User Role Badge Component
interface UserRoleBadgeProps {
  role: "client" | "admin" | "support" | "manager";
  size?: "sm" | "md" | "lg";
}

export function UserRoleBadge({ role, size = "sm" }: UserRoleBadgeProps) {
  const config = {
    client: {
      label: "Client",
      color: "default" as const,
    },
    admin: {
      label: "Admin",
      color: "danger" as const,
    },
    support: {
      label: "Support",
      color: "primary" as const,
    },
    manager: {
      label: "Manager",
      color: "secondary" as const,
    },
  };

  const { label, color } = config[role];

  return (
    <Chip size={size} variant="flat" color={color}>
      {label}
    </Chip>
  );
}
