"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export interface ActionItem {
  id: string;
  label?: string;
  icon?: string;
  onClick: () => void;
  variant?:
    | "light"
    | "flat"
    | "solid"
    | "bordered"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  isActive?: boolean;
  disabled?: boolean;
}

export interface ActionBarProps {
  actions: ActionItem[];
  className?: string;
  position?: "fixed" | "sticky";
  showLabels?: boolean;
}

export const ActionBar: React.FC<ActionBarProps> = ({
  actions,
  className = "",
  position = "fixed",
  showLabels = true,
}) => {
  const positionClass =
    position === "fixed" ? "fixed bottom-0 left-0 right-0" : "sticky bottom-0";

  return (
    <div
      className={`${positionClass} bg-white/80 backdrop-blur-md border-t border-gray-200 py-2 px-4 z-50 ${className}`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-around">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant || "light"}
            color={action.color || "default"}
            isIconOnly={!showLabels || !action.label}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`flex flex-col items-center justify-center gap-1 min-w-[64px] ${
              action.isActive ? "text-primary font-medium" : "text-gray-600"
            }`}
          >
            {action.icon && (
              <Icon
                icon={action.icon}
                className={`text-xl ${
                  showLabels && action.label ? "mb-1" : ""
                }`}
              />
            )}
            {showLabels && action.label && (
              <span className="text-xs">{action.label}</span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
