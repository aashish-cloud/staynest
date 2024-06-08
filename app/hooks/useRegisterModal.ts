import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (value: boolean) => void;
}

const useRegisterModal = create<RegisterModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value }),
}));

export default useRegisterModal;
