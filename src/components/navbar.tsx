import {getPeriodName, interpolatedUITheme} from "../theme/theme.tsx";
import useDecimalHour, {useDateHandler} from "../hooks/dateHandler.tsx";
import SliderOverride from "./sliderOverride.tsx";

const Navbar = () => {
    // rewrite later
    const decimalHour = useDecimalHour();
    const rawTime = useDateHandler();
    const theme = interpolatedUITheme(decimalHour);
    const periodName = getPeriodName(Math.floor(decimalHour));
  
    {/* TODO fix mobile ui issues */}
    return (
        <div style={{
            position: "fixed",
            top: 0,
            height: "5vh",
            width: "100%",
            backgroundColor: theme.backgroundColor,
            borderBottom: `1px solid ${theme.borderColor}`,
            backdropFilter: "blur(12px)",
            opacity: 0.8,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "0 1vw",
            gap: "1vw",
            zIndex: 9999,
        }}>
          <div style={{
            width: "3.5vh",
            height: "3.5vh",
            borderRadius: "50%",
            backgroundColor: theme.sunColor,
            flexShrink: 0,
          }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", flex: 1 }}>
              <h3 style={{ margin: 0, color: theme.textColor, fontSize: "1.6vh" }}>{rawTime}</h3>
              <h1 style={{ margin: 0, color: theme.textColor, opacity: 0.5, fontSize: "1.6vh" }}>|</h1>
              <h2 style={{ margin: 0, color: theme.textColor, fontSize: "1.6vh", fontWeight: 400 }}>{periodName}</h2>
            </div>
          <div style={{display: "flex", alignItems: "center", gap: "0.5vw", flex: 1}}>
            <label style={{margin: 0, color: theme.textColor, fontSize: "1.6vh", fontWeight: 400}}>Change
              theme</label>
            {<SliderOverride theme={theme} />}
          </div>
            {/* TODO search bar*/}
            <input
               type="text"
               placeholder="what would you like to find about"
               style={{
                 background: "transparent",
                 border: `1px solid ${theme.borderColor}`,
                 borderRadius: "1vh",
                 padding: "0.4vh 1vw",
                 color: theme.textColor,
                 fontSize: "1.4vh",
                 width: "20vw",
                 outline: "none",
               }}
            />
        </div>
    );
};

export default Navbar;