import React from "react";
import { Card, CardBody, Skeleton, Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";

interface LoadingStateProps {
  type?: "spinner" | "skeleton" | "card";
  count?: number;
  message?: string;
  className?: string;
}

export default function LoadingState({
  type = "spinner",
  count = 1,
  message = "Chargement...",
  className = "",
}: LoadingStateProps) {
  if (type === "spinner") {
    return (
      <div
        className={`flex flex-col items-center justify-center min-h-[200px] ${className}`}
      >
        <Spinner size="lg" color="primary" />
        {message && <p className="text-default-600 mt-4">{message}</p>}
      </div>
    );
  }

  if (type === "skeleton") {
    return (
      <div className={`space-y-4 ${className}`}>
        {Array.from({ length: count }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-3">
              <Skeleton className="rounded-lg">
                <div className="h-6 rounded-lg bg-default-300"></div>
              </Skeleton>
              <div className="space-y-2">
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-4 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-4 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "card") {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      >
        {Array.from({ length: count }, (_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardBody className="space-y-3">
                <Skeleton className="rounded-lg">
                  <div className="h-32 rounded-lg bg-default-300"></div>
                </Skeleton>
                <div className="space-y-2">
                  <Skeleton className="rounded-lg">
                    <div className="h-6 rounded-lg bg-default-300"></div>
                  </Skeleton>
                  <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-4 rounded-lg bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-4 rounded-lg bg-default-200"></div>
                  </Skeleton>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
}
