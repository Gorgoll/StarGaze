import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { login, register } from "../api.tsx";
import type { User } from "../api.tsx";

const inputStyle = {
	background: "rgba(10,18,32,0.7)",
	border: "0.5px solid rgba(150,180,220,0.25)",
	borderRadius: "3px",
	color: "rgba(210,225,245,0.9)",
	padding: "0 10px",
	height: "32px",
	fontSize: "13px",
	width: "100%",
	boxSizing: "border-box" as const,
	outline: "none",
};

const buttonStyle = {
	width: "100%",
	height: "32px",
	background: "rgba(30,45,70,0.9)",
	color: "rgba(200,218,245,0.85)",
	border: "0.5px solid rgba(150,180,220,0.3)",
	borderRadius: "3px",
	fontSize: "13px",
	fontWeight: 500,
	cursor: "pointer",
	letterSpacing: "0.04em",
	marginTop: "2px",
};

const textStyle = {
	fontSize: "13px",
	fontWeight: 500,
	color: "rgba(200,215,240,0.7)",
	margin: "0 0 0.5rem",
	letterSpacing: "0.04em",
	textAlign: "center" as const,
};

const cardStyle = {
	background: "rgba(15,25,40,0.55)",
	border: "0.5px solid rgba(180,200,255,0.15)",
	borderRadius: "6px",
	padding: "1.25rem 1.25rem 1rem",
	backdropFilter: "blur(6px)",
	display: "flex",
	flexDirection: "column" as const,
	gap: "0.45rem",
};

const errorStyle = {
	fontSize: "12px",
	color: "rgba(255,110,110,0.9)",
	textAlign: "center" as const,
	margin: 0,
};

const variants = {
	enter: { scale: 0.95, opacity: 0 },
	center: { scale: 1, opacity: 1 },
	exit: { scale: 0.95, opacity: 0 },
};

// Login

// These forms are hella ugly
const Login = ({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: (u: User) => void }) => {
	const emailRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);
	
	async function submit() {
		const email = emailRef.current?.value.trim() ?? "";
		const password = passRef.current?.value ?? "";
		if (!email || !password) { setError("Please fill in all fields."); return; }
		setBusy(true); setError("");
		try {
			const { user } = await login(email, password);
			onSuccess(user);
		} catch {
			setError("Invalid email or password.");
		} finally {
			setBusy(false);
		}
	}
	
	const onKey = (e: React.KeyboardEvent) => e.key === "Enter" && submit();
	
	return (
		 <div style={cardStyle}>
			 <label style={textStyle}>SIGN IN</label>
			 <input ref={emailRef} type="email" placeholder="Email" style={inputStyle} onKeyDown={onKey} />
			 <input ref={passRef} type="password" placeholder="Password" style={inputStyle} onKeyDown={onKey} />
			 {error && <p style={errorStyle}>{error}</p>}
			 <button style={{ ...buttonStyle, opacity: busy ? 0.6 : 1 }} onClick={submit} disabled={busy}>
				 {busy ? "Signing in…" : "Log in"}
			 </button>
			 <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
				 <label style={{ ...textStyle, margin: 0 }}>register here</label>
				 <button style={{ ...buttonStyle, width: "40%", marginTop: 0 }} onClick={onSwitch}>Register</button>
			 </div>
		 </div>
	);
};

// Register

const Register = ({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: (u: User) => void }) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passRef = useRef<HTMLInputElement>(null);
	const confirmRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState("");
	const [busy, setBusy] = useState(false);
	
	async function submit() {
		const username = nameRef.current?.value.trim() ?? "";
		const email = emailRef.current?.value.trim() ?? "";
		const password = passRef.current?.value ?? "";
		const confirm = confirmRef.current?.value ?? "";
		
		if (!username || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
		if (password !== confirm) { setError("Passwords don't match."); return; }
		
		setBusy(true); setError("");
		
		try {
			const { user_id } = await register(email, username, password);
			onSuccess({ id: user_id, email, username });
		} catch {
			setError("An account with that email already exists.");
		} finally {
			setBusy(false);
		}
	}
	
	const onKey = (e: React.KeyboardEvent) => e.key === "Enter" && submit();
	
	return (
		 <div style={cardStyle}>
			 <label style={textStyle}>CREATE ACCOUNT</label>
			 <input ref={nameRef} type="text" placeholder="Name" style={inputStyle} onKeyDown={onKey} />
			 <input ref={emailRef} type="email" placeholder="Email" style={inputStyle} onKeyDown={onKey} />
			 <input ref={passRef} type="password" placeholder="Password" style={inputStyle} onKeyDown={onKey} />
			 <input ref={confirmRef} type="password" placeholder="Confirm password" style={inputStyle} onKeyDown={onKey} />
			 {error && <p style={errorStyle}>{error}</p>}
			 <button style={{ ...buttonStyle, opacity: busy ? 0.6 : 1 }} onClick={submit} disabled={busy}>
				 {busy ? "Creating account…" : "Register"}
			 </button>
			 <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "0.5rem" }}>
				 <label style={{ ...textStyle, margin: 0 }}>back to login</label>
				 <button style={{ ...buttonStyle, width: "40%", marginTop: 0 }} onClick={onSwitch}>Login</button>
			 </div>
		 </div>
	);
};

// AuthMenu (LoginMenu)

interface LoginMenuProps {
	onLogin: (user: User) => void;
	onRegister: (user: User) => void;
}

export default function LoginMenu({ onLogin, onRegister }: LoginMenuProps) {
	const [mode, setMode] = useState<"login" | "register">("login");
	const [dir, setDir] = useState(1);
	const toggle = () => {
		setDir(mode === "login" ? 1 : -1);
		setMode(m => (m === "login" ? "register" : "login"));
	};
	
	return (
		 <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
			 <div style={{ width: "100%", maxWidth: "320px", padding: "0 1rem", position: "relative" }}>
				 <AnimatePresence mode="wait" custom={dir}>
					 <motion.div
							key={mode}
							custom={dir}
							variants={variants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{ duration: 0.22, ease: "easeInOut" }}
					 >
						 {mode === "login"
								? <Login onSwitch={toggle} onSuccess={onLogin} />
								: <Register onSwitch={toggle} onSuccess={onRegister} />
						 }
					 </motion.div>
				 </AnimatePresence>
			 </div>
		 </div>
	);
}