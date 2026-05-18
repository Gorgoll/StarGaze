import {getPeriodName, interpolatedUITheme} from "../../theme/theme.tsx";
import useDecimalHour, {useDateHandler} from "../../hooks/dateHandler.tsx";
import SliderOverride from "./sliderOverride.tsx";
import {useState} from "react";
import MobileCheck from "../../helpers/mobileCheck.tsx";

const Navbar = () => {
    // rewrite later
    {/* TODO optimize calls with zustand */}
    const decimalHour = useDecimalHour();
    const rawTime = useDateHandler();
    const theme = interpolatedUITheme(decimalHour);
    const periodName = getPeriodName(Math.floor(decimalHour));
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = MobileCheck()
  
  
    return (
       <>
        <div style={{
            position: "fixed",
            top: 0,
            height: "2.5em",
            width: "100%",
            backgroundColor: theme.backgroundColor,
            borderBottom: `1px solid ${theme.borderColor}`,
            backdropFilter: "blur(12px)",
            opacity: 0.8,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "0 1vw",
            gap: "0.75em",
            zIndex: 9999,
        }}>
          {/* Sun dot */}
          <div style={{
            width: "3.5vh",
            height: "3.5vh",
            borderRadius: "50%",
            backgroundColor: theme.sunColor,
            flexShrink: 0,
          }} />
          {/* Time + Period */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", flex: 1 }}>
              <h3 style={{ margin: 0, color: theme.textColor, fontSize: "1.6vh" }}>{rawTime}</h3>
              <h1 style={{ margin: 0, color: theme.textColor, opacity: 0.5, fontSize: "1.6vh" }}>|</h1>
              <h2 style={{ margin: 0, color: theme.textColor, fontSize: "1.6vh", fontWeight: 400 }}>{periodName}</h2>
            </div>
          {/* slider for theme override behaviour */}
          {!isMobile && (
             <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                 <label style={{ color: theme.textColor, fontSize: "13px", whiteSpace: "nowrap" }}>
                   Change theme
                 </label>
                 <SliderOverride theme={theme} />
               </div>
               {/* TODO search bar*/}
               <input
                  type="text"
                  placeholder="what would you like to find"
                  style={{
                    background: "transparent",
                    border: `1px solid ${theme.borderColor}`,
                    borderRadius: "1vh",
                    padding: "0.4vh 1vw",
                    color: theme.textColor,
                    fontSize: "1.4vh",
                    outline: "none",
                  }}
               />
             </div>
          )}
          
          {isMobile && (
             <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  background: "none",
                  border: `1px solid ${theme.borderColor}`,
                  borderRadius: "1vh",
                  cursor: "pointer",
                  color: theme.textColor,
                  fontSize: "18px",
                  lineHeight: 1,
                  padding: "0.5vh 1vw",
                  flexShrink: 0,
                }}
                aria-label="Menu"
             >
               {menuOpen ? "✕" : "☰"}
             </button>
          )}
        </div>
         
         {isMobile && menuOpen && (
            <div style={{
              position: "fixed",
              top: "2.5em",
              left: 0,
              right: 0,
              backgroundColor: theme.backgroundColor,
              borderBottom: `1px solid ${theme.borderColor}`,
              zIndex: 9999,
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              boxSizing: "border-box",
              alignItems: "center",
            }}>
              <input
                 type="text"
                 placeholder="what would you like to find"
                 style={{
                   background: "transparent",
                   border: `1px solid ${theme.borderColor}`,
                   borderRadius: "1vh",
                   padding: "0.4vh 1vw",
                   color: theme.textColor,
                   fontSize: "1.1rem",
                   width: "70%",
                   outline: "none",
                 }}
              />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <label style={{ color: theme.textColor, fontSize: "13px" }}>Change theme</label>
                <SliderOverride theme={theme} />
              </div>
            </div>
         )}
       </>
    );
};

export default Navbar;