import {create} from "zustand";

// TODO make an actual use of it besides slider override behaviour
interface StoreState {
	isOverriding: boolean;
	toggle: () => void;
	sliderValue: number;
	setSliderValue: (value: number) => void;
}

const useStore = create<StoreState>(set => ({
	isOverriding: false,
	toggle: () => set(state => ({isOverriding: !state.isOverriding})),
	sliderValue: 0,
	setSliderValue: (value: number) => {
		set({sliderValue: value})
	}
}));


export default useStore;