import { create } from "zustand";

interface StoreState {
	sliderIsOverriding: boolean;
	sliderValue: number;
	navbarCurrentSearch: string;
	
	toggleSlider: () => void;
	setSliderValue: (value: number) => void;
	setNavbarSearch: (search: string) => void;
}

const useStore = create<StoreState>(set => ({
	sliderIsOverriding: false,
	sliderValue: 0,
	navbarCurrentSearch: "",
	
	toggleSlider: () => set(state => ({ sliderIsOverriding: !state.sliderIsOverriding })),
	setSliderValue: (value : number) => set({ sliderValue: value }),
	setNavbarSearch: (search) => set({ navbarCurrentSearch: search }),
}));

export default useStore;