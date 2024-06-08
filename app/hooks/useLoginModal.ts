import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (value: boolean) => void;
}

const useLoginModal = create<LoginModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value }),
}));

export default useLoginModal;
