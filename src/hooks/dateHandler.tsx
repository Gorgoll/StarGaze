import useStore from "../store.ts";

export function useDateHandler() {
	const isOverriding = useStore(state => state.sliderIsOverriding);
	
	const localTime = getTimeOfDay()
	const sliderTime = useSliderValueToFullDay()
	
	return isOverriding ? sliderTime : localTime;
}

export default function useDecimalHour(){
    const rawTime = useDateHandler();
    const [hStr, mStr] = rawTime.split(":");
    return parseInt(hStr, 10) + parseInt(mStr, 10) / 60;
}

export const getTimeOfDay = () => {
	const hour = new Date().getHours();
	const minute = new Date().getMinutes();
	return `${hour}:${minute.toString().padStart(2, "0")}`;
};

const useSliderValueToFullDay = () => {
	const sliderValue = useStore(state => state.sliderValue);
	return `${Math.floor(sliderValue / 60)}:${(sliderValue % 60).toString().padStart(2, "0")}`;
}