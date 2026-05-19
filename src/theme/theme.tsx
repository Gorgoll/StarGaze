// Background
import LinearInterpolation from "../helpers/linearInterpolation.tsx";

interface ThemeKeyframe {
    h: number;
    skyTop: string;
    skyBot: string;
    text: string;
    stars: number;
    clouds: number;
}

export interface InterpolatedTheme {
    skyTop: string;
    skyBot: string;
    text: string;
    stars: number;
    clouds: number;
}

export const THEMES: ThemeKeyframe[] = [
    { h: 0,  skyTop: '#0a0a1a', skyBot: '#1a1a3a', text: '#c8d8ff', stars: 1   , clouds: 0},
    { h: 4,  skyTop: '#0d0d25', skyBot: '#1f1545', text: '#c8d8ff', stars: 0.9 , clouds: 2},
    { h: 5,  skyTop: '#1a0a2a', skyBot: '#5a2060', text: '#ffcfef', stars: 0.5 , clouds: 10},
    { h: 6,  skyTop: '#2a1040', skyBot: '#d05060', text: '#ffe8d0', stars: 0.1 , clouds: 15},
    { h: 7,  skyTop: '#5a3070', skyBot: '#ff9060', text: '#fff0e0', stars: 0   , clouds: 30},
    { h: 8,  skyTop: '#3070b0', skyBot: '#70b0e0', text: '#fff8f0', stars: 0  , clouds: 30},
    { h: 10, skyTop: '#1a5090', skyBot: '#5090d0', text: '#fff8f0', stars: 0  , clouds: 30},
    { h: 12, skyTop: '#0a4080', skyBot: '#4080c0', text: '#ffffff', stars: 0  , clouds: 30},
    { h: 15, skyTop: '#1550a0', skyBot: '#4590d0', text: '#f0f8ff', stars: 0  , clouds: 30},
    { h: 17, skyTop: '#2060a0', skyBot: '#8060a0', text: '#ffe8d0', stars: 0  , clouds: 30},
    { h: 18, skyTop: '#703050', skyBot: '#e07040', text: '#ffd0c0', stars: 0.1 , clouds: 22},
    { h: 19, skyTop: '#401030', skyBot: '#903060', text: '#ffc0d8', stars: 0.3 , clouds: 10},
    { h: 20, skyTop: '#200820', skyBot: '#502050', text: '#d0c0ff', stars: 0.6 , clouds: 4},
    { h: 21, skyTop: '#100815', skyBot: '#301840', text: '#c0c8ff', stars: 0.8 , clouds: 2},
    { h: 23, skyTop: '#0a0a1a', skyBot: '#1a1a3a', text: '#c8d8ff', stars: 1   , clouds: 0},
];

// Period of the day
type PeriodEntry = [number, number, string];
export const PERIOD_NAMES: PeriodEntry[] = [
    [0, 4, "Deep Night"],
    [4, 5, "Late Night"],
    [5, 6, "Pre-Dawn"],
    [6, 7, "Sunrise"],
    [7, 9, "Early Morning"],
    [9, 11, "Morning"],
    [11, 13, "Midday"],
    [13, 16, "Afternoon"],
    [16, 17, "Late Afternoon"],
    [17, 18, "Golden Hour"],
    [18, 19, "Sunset"],
    [19, 20, "Dusk"],
    [20, 22, "Evening"],
    [22, 24, "Night"],
];

export function getPeriodName(h: number): string {
    for (const [start, end, name] of PERIOD_NAMES) {
        if (h >= start && h < end) return name;
    }
    return "Night";
}

// Navbar
interface UITheme {
    h: number;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    sunColor: string;
}

export interface InterpolatedUITheme{
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    sunColor: string;
}

export function interpolatedUITheme(h: number): InterpolatedUITheme {
    const themes = UI_THEMES;
    if (h <= themes[0].h) return themes[0];
    if (h >= themes[themes.length - 1].h) return themes[themes.length - 1];
    const next = themes.findIndex(t => t.h > h);
    const prev = next - 1;
    const t = (h - themes[prev].h) / (themes[next].h - themes[prev].h);
    const a = themes[prev];
    const b = themes[next];
    return {
        backgroundColor: LinearInterpolation.lerpColor(a.backgroundColor, b.backgroundColor, t),
        borderColor:     LinearInterpolation.lerpColor(a.borderColor,     b.borderColor,     t),
        textColor:       LinearInterpolation.lerpColor(a.textColor,       b.textColor,       t),
        sunColor:        LinearInterpolation.lerpColor(a.sunColor,        b.sunColor,        t),
    };
}

export const UI_THEMES: UITheme[] = [
    { h: 0,  backgroundColor: '#0f0f2a', borderColor: '#2a2a4a', textColor: '#c8d8ff', sunColor: '#7878ff', },
    { h: 4,  backgroundColor: '#120d30', borderColor: '#2f2555', textColor: '#c8d8ff', sunColor: '#8060ff', },
    { h: 5,  backgroundColor: '#1e0d30', borderColor: '#502070', textColor: '#ffcfef', sunColor: '#e060e0', },
    { h: 6,  backgroundColor: '#2a1020', borderColor: '#702040', textColor: '#ffe8d0', sunColor: '#ff6070' },
    { h: 7,  backgroundColor: '#3a1a30', borderColor: '#8a4a60', textColor: '#fff0e0', sunColor: '#ff8050' },
    { h: 8,  backgroundColor: '#d0e8f8', borderColor: '#90c0e0', textColor: '#1a3a5a', sunColor: '#e8a000' },
    { h: 10, backgroundColor: '#c8e0f5', borderColor: '#80b0d0', textColor: '#0a2a4a', sunColor: '#e0a800' },
    { h: 12, backgroundColor: '#c0d8f0', borderColor: '#70a8c8', textColor: '#082040', sunColor: '#d4a000' },
    { h: 15, backgroundColor: '#c8e0f5', borderColor: '#80b0d0', textColor: '#0a2a4a', sunColor: '#e0a800' },
    { h: 17, backgroundColor: '#d8d0f0', borderColor: '#b090d0', textColor: '#2a1a4a', sunColor: '#d07010' },
    { h: 18, backgroundColor: '#2a1015', borderColor: '#803040', textColor: '#ffd0c0', sunColor: '#ff7040' },
    { h: 19, backgroundColor: '#200818', borderColor: '#602040', textColor: '#ffc0d8', sunColor: '#ff4080' },
    { h: 20, backgroundColor: '#150810', borderColor: '#401840', textColor: '#d0c0ff', sunColor: '#a050e0' },
    { h: 21, backgroundColor: '#0d0810', borderColor: '#2a1838', textColor: '#c0c8ff', sunColor: '#7060e0' },
    { h: 23, backgroundColor: '#0f0f2a', borderColor: '#2a2a4a', textColor: '#c8d8ff', sunColor: '#7878ff' },
];