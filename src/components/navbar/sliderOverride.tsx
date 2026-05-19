import useStore from "../../store.ts";
import type { InterpolatedUITheme } from "../../theme/theme.tsx";

export default function SliderOverride({ theme }: { theme: InterpolatedUITheme }) {
	const { sliderIsOverriding, toggleSlider, sliderValue, setSliderValue } = useStore();
	
	return (
		 <div style={{ display: "flex", alignItems: "center", gap: "0.6vw" }}>
			 <input
					type="range"
					min={0}
					max={1440}
					value={sliderValue}
					onChange={e => setSliderValue(Number(e.target.value))}
			    style={{accentColor: `${theme.sunColor}`, cursor: `pointer`}}
			 />
			 
			 <button
					onClick={toggleSlider}
					style={{
						fontSize: "1.4vh",
						padding: "0.3vh 0.8vw",
						borderRadius: "0.6vh",
						border: `0.5px solid ${theme.borderColor}`,
						background: sliderIsOverriding ? `${theme.sunColor}22` : "transparent",
						color: theme.textColor,
						cursor: "pointer",
					}}
			 >
				 {sliderIsOverriding ? "Overriding" : "NotOverriding"}
			 </button>
		 </div>
	);
}