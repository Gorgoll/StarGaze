import { motion } from "motion/react"
import GreeterBackground from "../hooks/greeterBackground.tsx";

const line1 = "sometimes all you have to do is look up"

const Greeter = () => {
    return (
        <>
        {<GreeterBackground/>}
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}>
            <motion.div
                style={{
                    color: "white",
                    fontSize: "6em",
                }}
                animate={{
                    textShadow: [
                        "0px 0px 30px whitesmoke",
                        "0px 0px 40px whitesmoke",
                        "0px 0px 30px whitesmoke"
                    ]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                Stargaze
            </motion.div>

            <div style={{
                color: "whitesmoke",
                fontSize: "2em",
                display: "flex",
                gap: "2px",
                whiteSpace: "pre",
                paddingTop: "1.5em",
            }}>
                {line1.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: i * 0.05
                        }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </div>
        </>
    )
}

export default Greeter