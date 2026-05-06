export default class LinearInterpolation {
    static lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }
    static lerpColor(c1: string, c2: string, t: number): string {
        const a = hexToRgb(c1);
        const b = hexToRgb(c2);
        return `rgb(${Math.round(this.lerp(a[0], b[0], t))},${Math.round(this.lerp(a[1], b[1], t))},${Math.round(this.lerp(a[2], b[2], t))})`;
    }

}
function hexToRgb(hex: string): [number, number, number] {
    return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
    ];
}

