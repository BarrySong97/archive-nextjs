"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { confirmModalAtom } from "@/atoms/confirmModal";

export interface ConfirmModalProps {
  title?: string;
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
  confirmText?: string;
  cancelText?: string;
}

export const GlobalConfirmModal = () => {
  const [modalState, setModalState] = useAtom(confirmModalAtom);
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, config, resolve } = modalState;

  const handleClose = (confirmed: boolean) => {
    resolve?.(confirmed);
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
      config: null,
      resolve: null,
    }));
  };

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      handleClose(true);
    } catch (error) {
      console.error("Confirmation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!config) return null;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) handleClose(false);
      }}
      backdrop="opaque"
      radius="sm"
      size="sm"
    >
      <ModalContent>
        <ModalHeader>{config.title || "确认"}</ModalHeader>
        <ModalBody>
          <p className="text-base">{config.content}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="light"
            onPress={() => handleClose(false)}
            isDisabled={isLoading}
          >
            {config.cancelText || "取消"}
          </Button>
          <Button color="primary" onPress={handleConfirm} isLoading={isLoading}>
            {config.confirmText || "确认"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
