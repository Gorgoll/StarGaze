// Background
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
interface NavbarTheme {
    h: number;
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    sunColor: string;
    sunGlow: string;
}

export interface InterpolatedNavBarTheme{
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    sunColor: string;
    sunGlow: string;
}

export const NAVBAR_THEMES: NavbarTheme[] = [
    { h: 0,  backgroundColor: '#0f0f2a', borderColor: '#2a2a4a', textColor: '#c8d8ff', sunColor: '#4a4aaa', sunGlow: '#2a2a8a' },
    { h: 4,  backgroundColor: '#120d30', borderColor: '#2f2555', textColor: '#c8d8ff', sunColor: '#5040b0', sunGlow: '#30208a' },
    { h: 5,  backgroundColor: '#1e0d30', borderColor: '#502070', textColor: '#ffcfef', sunColor: '#a040a0', sunGlow: '#702060' },
    { h: 6,  backgroundColor: '#2a1020', borderColor: '#702040', textColor: '#ffe8d0', sunColor: '#d05060', sunGlow: '#a03040' },
    { h: 7,  backgroundColor: '#3a1a30', borderColor: '#8a4a60', textColor: '#fff0e0', sunColor: '#ff7040', sunGlow: '#d04020' },
    { h: 8,  backgroundColor: '#d0e8f8', borderColor: '#90c0e0', textColor: '#1a3a5a', sunColor: '#f0c040', sunGlow: '#e0a020' },
    { h: 10, backgroundColor: '#c8e0f5', borderColor: '#80b0d0', textColor: '#0a2a4a', sunColor: '#f5c830', sunGlow: '#e0a818' },
    { h: 12, backgroundColor: '#c0d8f0', borderColor: '#70a8c8', textColor: '#082040', sunColor: '#fad020', sunGlow: '#e8b010' },
    { h: 15, backgroundColor: '#c8e0f5', borderColor: '#80b0d0', textColor: '#0a2a4a', sunColor: '#f5c030', sunGlow: '#e0a010' },
    { h: 17, backgroundColor: '#d8d0f0', borderColor: '#b090d0', textColor: '#2a1a4a', sunColor: '#e09040', sunGlow: '#c06020' },
    { h: 18, backgroundColor: '#2a1015', borderColor: '#803040', textColor: '#ffd0c0', sunColor: '#e06030', sunGlow: '#c04010' },
    { h: 19, backgroundColor: '#200818', borderColor: '#602040', textColor: '#ffc0d8', sunColor: '#c03060', sunGlow: '#901840' },
    { h: 20, backgroundColor: '#150810', borderColor: '#401840', textColor: '#d0c0ff', sunColor: '#7030a0', sunGlow: '#501880' },
    { h: 21, backgroundColor: '#0d0810', borderColor: '#2a1838', textColor: '#c0c8ff', sunColor: '#5040a0', sunGlow: '#302080' },
    { h: 23, backgroundColor: '#0f0f2a', borderColor: '#2a2a4a', textColor: '#c8d8ff', sunColor: '#4a4aaa', sunGlow: '#2a2a8a' },
];