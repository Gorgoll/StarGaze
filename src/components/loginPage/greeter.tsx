import {motion} from "motion/react"

const line1 = "sometimes all you have to do is look up"

export default function Greeter() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "1rem",
            boxSizing: "border-box",
        }}>
            <motion.div
                style={{
                    color: "white",
                    fontSize: "clamp(3rem, 10vw, 6rem)",
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
            
            <div
               style={{
                   color: "whitesmoke",
                   fontSize: "clamp(1rem, 4vw, 2rem)",
                   display: "flex",
                   flexWrap: "wrap",
                   justifyContent: "center",
                   textAlign: "center",
                   gap: "2px",
                   paddingTop: "2em",
                   maxWidth: "700px",
                   overflowWrap: "break-word",
               }}
            >
                {line1.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: i * 0.05
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
        </div>
    )
}