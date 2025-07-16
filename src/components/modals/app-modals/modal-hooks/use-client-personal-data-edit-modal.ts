import { create } from 'zustand';

type State = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    onOpenChange: (open: boolean) => void;
};

const useClientPersonalDataEditModal = create<State>((set, get) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onOpenChange: (open: boolean) => set({ isOpen: open }),
}));

export default useClientPersonalDataEditModal;
