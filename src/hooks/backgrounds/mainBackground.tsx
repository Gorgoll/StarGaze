import LinearInterpolation from "../../helpers/linearInterpolation.tsx"
import {type InterpolatedTheme, THEMES} from "../../theme/theme.tsx";
import {CLOUDS, STARS} from "../props.tsx";
import useDecimalHour from "../dateHandler.tsx";

function getThemeAtHour(h: number): InterpolatedTheme {
    let lo = THEMES[0];
    let hi = THEMES[THEMES.length - 1];
    for (let i = 0; i < THEMES.length - 1; i++) {
        if (h >= THEMES[i].h && h <= THEMES[i + 1].h) {
            lo = THEMES[i]; hi = THEMES[i + 1]; break;
        }
    }
    const t = lo.h === hi.h ? 0 : (h - lo.h) / (hi.h - lo.h);
    return {
        skyTop:  LinearInterpolation.lerpColor(lo.skyTop, hi.skyTop, t),
        skyBot:  LinearInterpolation.lerpColor(lo.skyBot, hi.skyBot, t),
        text:    LinearInterpolation.lerpColor(lo.text,   hi.text,   t),
        stars:   LinearInterpolation.lerp(lo.stars, hi.stars, t),
        clouds:  LinearInterpolation.lerp(lo.clouds, hi.clouds, t),
    };
}

const MainBackground = () => {
    const decimalHour = useDecimalHour();
    const theme = getThemeAtHour(decimalHour);
    const visibleClouds = CLOUDS.slice(0, Math.round(theme.clouds));

    return (
        <>
            {/* Sky gradient */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: -10,
                transition: "background 3s ease",
                background: `linear-gradient(to bottom, ${theme.skyTop}, ${theme.skyBot})`,
            }} />

            {/* Stars */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: -9,
                pointerEvents: "none",
                opacity: theme.stars,
                transition: "opacity 3s ease",
            }}>
                {STARS.map((s) => (
                    <div key={s.id} style={{
                        position: "absolute",
                        left: s.left,
                        top: s.top,
                        width: s.size,
                        height: s.size,
                        borderRadius: "50%",
                        background: "white",
                        opacity: s.opacity,
                        animation: `twinkle ${s.duration} ${s.delay} ease-in-out infinite alternate`,
                    }} />
                ))}
            </div>
            {/* Clouds */}
          <div>
            {visibleClouds.map((c) => (
                <div key={c.id} style={{
                    position: "absolute",
                    top: c.top,
                    left: 0,
                    animation: `driftCloud ${c.speed} ${c.delay} linear infinite`,
                }}>
                    <div style={{
                        transform: `scale(${c.scale})`,
                        transformOrigin: "left center",
                        position: "relative",
                        width: "120px",
                        height: "50px",
                    }}>
                        {/* Body of a Cloud */}
                        <div style={{ position: "absolute", left: 20, top: 20, width: 60, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.9)" }} />
                        <div style={{ position: "absolute", left: 35, top: 8,  width: 45, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)" }} />
                        <div style={{ position: "absolute", left: 5,  top: 22, width: 40, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
                        <div style={{ position: "absolute", left: 65, top: 18, width: 35, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.85)" }} />
                    </div>
                </div>
            ))}
          </div>

            <style>{`
                @keyframes twinkle {
                    from { opacity: 0.3; }
                    to   { opacity: 1; }
                }
                @keyframes driftCloud {
                from { transform: translateX(-200px); }
                to   { transform: translateX(110vw);  }
                }
            `}</style>
        </>
    );
};

export default MainBackground;