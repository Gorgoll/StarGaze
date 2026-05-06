// Stars
interface Star {
    id: number;
    left: string;
    top: string;
    delay: string;
    duration: string;
    size: number;
    opacity: number;
}
export const STARS: Star[] = Array.from({ length: 250 }, (_, i) => ({
    id: i,
    left:     `${Math.random() * 100}%`,
    top:      `${Math.random() * 100}%`,
    delay:    `${(Math.random() * 3).toFixed(2)}s`,
    duration: `${(1.5 + Math.random() * 2).toFixed(2)}s`,
    size:     Math.random() < 0.8 ? 1 : Math.random() < 0.5 ? 2 : 3,
    opacity:  0.4 + Math.random() * 0.6,
}));

// Clouds
interface Cloud {
    id: number;
    left: string;
    top: string;
    scale: number;
    speed: string;
    delay: string;
    opacity: number;
}

export const CLOUDS: Cloud[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left:    "0",
    top:     `${10 + Math.random() * 80}%`,
    scale:   0.5 + Math.random() * 1.5,
    speed:   `${60 + Math.random() * 120}s`,
    delay:   `-${(Math.random() * 120).toFixed(2)}s`,
    opacity: 0.4 + Math.random() * 0.5,
}));

// Falling Star