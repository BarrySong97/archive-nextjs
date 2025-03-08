import { useSetAtom } from "jotai";
import { confirmModalAtom } from "@/atoms/confirmModal";
import { ConfirmModalProps } from "./ConfirmModal";

type ConfirmOptions = Omit<
  ConfirmModalProps,
  "isOpen" | "onOpenChange" | "onConfirm"
>;

export const useConfirmModal = () => {
  const setConfirmModal = useSetAtom(confirmModalAtom);

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmModal({
        isOpen: true,
        config: options,
        resolve,
      });
    });
  };

  return confirm;
};
