import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

interface ConfirmTooltipProps {
  children: React.ReactNode;
  content: string;
  onConfirm: () => void | Promise<void>;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

export const ConfirmTooltip: React.FC<ConfirmTooltipProps> = ({
  children,
  content,
  onConfirm,
  isOpen,
  onOpenChange,
  color = "primary",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      onOpenChange?.(false);
    } catch (error) {
      console.error("Confirmation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!isLoading) {
          onOpenChange?.(open);
        }
      }}
      placement="top"
      showArrow
      backdrop="opaque"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="px-4 py-3">
          <p className="text-small font-medium text-center">{content}</p>
          <div className="flex justify-center gap-2 mt-4">
            <Button
              size="sm"
              color={"primary"}
              isLoading={isLoading}
              onPress={handleConfirm}
            >
              确认
            </Button>
            <Button
              size="sm"
              variant="light"
              isDisabled={isLoading}
              onPress={() => onOpenChange?.(false)}
            >
              取消
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
