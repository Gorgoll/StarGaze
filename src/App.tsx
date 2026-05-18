import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoginMenu from "./components/loginPage/login.tsx";
import Greeter from "./components/loginPage/greeter.tsx";
import MainPage from "./components/mainPage.tsx";
import GreeterBackground from "./hooks/backgrounds/greeterBackground.tsx";
import type { User } from "./api.ts";
import {useGlobalInputSound, useGreeterBackgroundMusic, useMainBackgroundMusic} from "./hooks/music.tsx";

type Page = "greeter" | "login" | "main";

const pageVariants = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

const transitions: Record<Page, object> = {
	greeter: { duration: 4, ease: "easeInOut" },
	login: { duration: 2, ease: "easeOut" },
	main: { duration: 8, ease: "easeInOut" },
};

export default function App() {
	const [page, setPage] = useState<Page>("greeter");
	const [user, setUser] = useState<User | null>(null);
	useMainBackgroundMusic(page === `main`);
	useGreeterBackgroundMusic(page === 'greeter' || page === 'login');
	
	useEffect(() => {
		if (page !== "greeter") return;
		const timer = setTimeout(() => setPage("login"), 5000);
		return () => clearTimeout(timer);
	}, [page]);
	
	function handleUser(u: User) {
		setUser(u);
		setPage("main");
	}
	
	// global button click sound
	useGlobalInputSound()
	return (
		 <AnimatePresence mode="wait">
			 <motion.div
					key={page}
					variants={pageVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={transitions[page]}
					style={{ width: "100%", height: "100%", overflow: "hidden" }}
			 >
				 {/* Could have used React Router but this works for me */}
				 {page === "greeter" && (
						<>
							<GreeterBackground />
							<Greeter />
						</>
				 )}
				 {page === "login" && (
						<>
							<GreeterBackground />
							<LoginMenu onLogin={handleUser} onRegister={handleUser} />
						</>
				 )}
				 {page === "main" && (
						<>
							<MainPage currentUser={user} />
						</>
				 )}
			 </motion.div>
		 </AnimatePresence>
	);
}