import Greeter from "./components/greeter.tsx";
import {useEffect, useState} from "react";
import MainPage from "./components/mainPage.tsx";

export default function App() {
    const [showGreeter, setShowGreeter] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGreeter(false);
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return showGreeter ? <Greeter /> : <MainPage />
}