import React from "react";
import { Card, CardBody, Chip, Progress } from "@nextui-org/react";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease" | "neutral";
  changeLabel?: string;
  icon?: LucideIcon;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  progress?: number;
  progressLabel?: string;
  className?: string;
  onClick?: () => void;
}

export default function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  changeLabel,
  icon: Icon,
  color = "primary",
  progress,
  progressLabel,
  className = "",
  onClick,
}: StatsCardProps) {
  const getChangeIcon = () => {
    switch (changeType) {
      case "increase":
        return <TrendingUp className="w-3 h-3" />;
      case "decrease":
        return <TrendingDown className="w-3 h-3" />;
      default:
        return <Minus className="w-3 h-3" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case "increase":
        return "success";
      case "decrease":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      <Card
        className={`${
          onClick ? "cursor-pointer hover:shadow-lg transition-shadow" : ""
        } ${className}`}
        isPressable={!!onClick}
        onPress={onClick}
      >
        <CardBody>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-default-600 mb-1">{title}</p>
              <p className="text-2xl font-bold mb-2">{value}</p>

              {(change !== undefined || changeLabel) && (
                <div className="flex items-center gap-2">
                  {change !== undefined && (
                    <Chip
                      size="sm"
                      variant="flat"
                      color={getChangeColor()}
                      startContent={getChangeIcon()}
                    >
                      {change > 0 ? "+" : ""}
                      {change}%
                    </Chip>
                  )}
                  {changeLabel && (
                    <span className="text-xs text-default-500">
                      {changeLabel}
                    </span>
                  )}
                </div>
              )}

              {progress !== undefined && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    {progressLabel && (
                      <span className="text-xs text-default-600">
                        {progressLabel}
                      </span>
                    )}
                    <span className="text-xs font-medium">{progress}%</span>
                  </div>
                  <Progress value={progress} color={color} size="sm" />
                </div>
              )}
            </div>

            {Icon && (
              <div className={`p-3 rounded-lg bg-${color}/10 flex-shrink-0`}>
                <Icon className={`w-6 h-6 text-${color}`} />
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
}

// Variante compacte pour les tableaux de bord
interface CompactStatsCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export function CompactStatsCard({
  label,
  value,
  icon: Icon,
  trend = "neutral",
  color = "primary",
}: CompactStatsCardProps) {
  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-success" />,
    down: <TrendingDown className="w-4 h-4 text-danger" />,
    neutral: <Minus className="w-4 h-4 text-default-400" />,
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardBody className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-default-600">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
          <div className="flex items-center gap-2">
            {trendIcons[trend]}
            {Icon && <Icon className={`w-5 h-5 text-${color}`} />}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
