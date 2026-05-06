import {
    getPeriodName,
    type InterpolatedNavBarTheme, NAVBAR_THEMES,
} from "../theme/theme.tsx";
import LinearInterpolation from "../helpers/linearInterpolation.tsx";
import useDecimalHour, {useDateHandler} from "../hooks/dateHandler.tsx";

function getNavBarThemeAtHour(h: number): InterpolatedNavBarTheme {
    let lo = NAVBAR_THEMES[0];
    let hi = NAVBAR_THEMES[NAVBAR_THEMES.length - 1];
    for (let i = 0; i < NAVBAR_THEMES.length - 1; i++) {
        if (h >= NAVBAR_THEMES[i].h && h <= NAVBAR_THEMES[i + 1].h) {
            lo = NAVBAR_THEMES[i]; hi = NAVBAR_THEMES[i + 1]; break;
        }
    }
    const t = lo.h === hi.h ? 0 : (h - lo.h) / (hi.h - lo.h);
    return {
        backgroundColor: LinearInterpolation.lerpColor(lo.backgroundColor, hi.backgroundColor, t),
        borderColor:     LinearInterpolation.lerpColor(lo.borderColor,     hi.borderColor,     t),
        textColor:       LinearInterpolation.lerpColor(lo.textColor,       hi.textColor,       t),
        sunColor:        LinearInterpolation.lerpColor(lo.sunColor,        hi.sunColor,        t),
        sunGlow:         LinearInterpolation.lerpColor(lo.sunGlow,         hi.sunGlow,         t),
    };
}
const Navbar = () => {
    const decimalHour = useDecimalHour();
    const rawTime = useDateHandler();
    const theme = getNavBarThemeAtHour(decimalHour);
    const periodName = getPeriodName(Math.floor(decimalHour));
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
        }}>
            <div style={{
                width: "3.5vh",
                height: "3.5vh",
                borderRadius: "50%",
                backgroundColor: theme.sunColor,
                boxShadow: `0 0 1vh 0.5vh ${theme.sunGlow}, 0 0 2.5vh 1vh ${theme.sunGlow}55`,
                flexShrink: 0,
                transition: "background-color 3s ease, box-shadow 3s ease",
            }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.5vw", flex: 1 }}>
                <h3 style={{ margin: 0, color: theme.textColor, fontSize: "1.6vh" }}>{rawTime}</h3>
                <h1 style={{ margin: 0, color: theme.textColor, opacity: 0.5, fontSize: "1.6vh" }}>·</h1>
                <h2 style={{ margin: 0, color: theme.textColor, fontSize: "1.6vh", fontWeight: 400 }}>{periodName}</h2>
            </div>
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