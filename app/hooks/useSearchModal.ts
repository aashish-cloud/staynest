import { create } from "zustand";

interface SearchModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setOpen: (value: boolean) => void;
}

const useSearchModal = create<SearchModalStore>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setOpen: (value) => set({ isOpen: value }),
}));

export default useSearchModal;
