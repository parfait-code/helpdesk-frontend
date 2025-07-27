"use client";

import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  onClose?: (id: string) => void;
}

const notificationConfig = {
  success: {
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
    borderColor: "border-success/20",
  },
  error: {
    icon: XCircle,
    color: "text-danger",
    bgColor: "bg-danger/10",
    borderColor: "border-danger/20",
  },
  warning: {
    icon: AlertCircle,
    color: "text-warning",
    bgColor: "bg-warning/10",
    borderColor: "border-warning/20",
  },
  info: {
    icon: Info,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
};

export function NotificationToast({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: NotificationProps) {
  const config = notificationConfig[type];
  const Icon = config.icon;

  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`min-w-[320px] ${config.bgColor} border ${config.borderColor}`}
      >
        <CardBody className="p-4">
          <div className="flex gap-3">
            <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`} />
            <div className="flex-1">
              <p className="font-medium">{title}</p>
              {message && (
                <p className="text-sm text-default-600 mt-1">{message}</p>
              )}
            </div>
            {onClose && (
              <Button
                isIconOnly
                size="sm"
                variant="light"
                onClick={() => onClose(id)}
                className="flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// Notification Container Component
interface NotificationContainerProps {
  notifications: NotificationProps[];
  onClose: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export function NotificationContainer({
  notifications,
  onClose,
  position = "top-right",
}: NotificationContainerProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 space-y-3`}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            {...notification}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook pour gérer les notifications
export function useNotifications() {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>(
    []
  );

  const addNotification = React.useCallback(
    (notification: Omit<NotificationProps, "id">) => {
      const id = Date.now().toString();
      setNotifications((prev) => [...prev, { ...notification, id }]);
    },
    []
  );

  const removeNotification = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = React.useCallback(
    {
      success: (title: string, message?: string) =>
        addNotification({ type: "success", title, message }),
      error: (title: string, message?: string) =>
        addNotification({ type: "error", title, message }),
      warning: (title: string, message?: string) =>
        addNotification({ type: "warning", title, message }),
      info: (title: string, message?: string) =>
        addNotification({ type: "info", title, message }),
    },
    [addNotification]
  );

  return {
    notifications,
    addNotification,
    removeNotification,
    notify,
  };
}
