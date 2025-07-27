import React from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="max-w-md mx-auto">
        <CardBody className="text-center py-12 px-6">
          <div className="w-20 h-20 bg-default-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-default-400" />
          </div>

          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-default-600 mb-6">{description}</p>

          {action && (
            <Button
              color="primary"
              onClick={action.onClick}
              startContent={action.icon && <action.icon className="w-4 h-4" />}
            >
              {action.label}
            </Button>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
