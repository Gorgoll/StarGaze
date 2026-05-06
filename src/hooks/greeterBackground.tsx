import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import MobileCheck from "../helpers/mobileCheck.tsx";

export default function GreeterBackground() {
    const [init, setInit] = useState(false);
    const isMobile = MobileCheck();
    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadSlim(engine);
        }).then(() => setInit(true));
    }, []);


    const particlesOptions: ISourceOptions = {
        fullScreen: { enable: true },
        background: { color: "black" },
        particles: {
            number: {
                value: isMobile ? 20 : 75,
                density: { enable: false},
            },
            color: { value: ["#FFFFFF", "#F5F5F5"] },
            shape: { type: "circle" },
            opacity: {
                value: { min: 0.2, max: 1 },
                animation: { enable: true, speed: 0.8, sync: false },
            },
            size: { value: { min: 1.5, max: 8 }, animation: { enable: true } },
            links: {
                enable: false
            },
            move: {
                enable: false, speed: 0.6, direction: "none",
                random: true, straight: false,
                outModes: { default: "bounce" },
                attract: { enable: false },
            },
            animation: {
                enable: true,
                speed: 10,
                minimumValue: 1,
                sync: false
            },
            shadow: {
                enable: true,
                blur: 5,
                color: "#FFFFFF",
                offset: {
                    x:0,
                    y:0
                }
            }
        },
    };

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }}>
            {init && (
                <Particles
                    id="tsparticles"
                    options={particlesOptions}
                    style={{ width: "100%", height: "100%" }}
                />
            )}
        </div>
    )
}