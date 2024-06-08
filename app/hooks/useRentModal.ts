import { create } from "zustand";

interface RentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (value: boolean) => void;
}

const useRentModal = create<RentModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value }),
}));

export default useRentModal;
