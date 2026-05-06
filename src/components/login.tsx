import {useEffect, useState} from 'react';
import Greeter from "./greeter.tsx";
import GreeterBackground from "../hooks/greeterBackground.tsx";

export const GreeterScreen= () => {
    const [showGreeter, setShowGreeter] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowGreeter(false);
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <>
        <GreeterBackground />
        {showGreeter ? <Greeter /> : <Login />}
        </>
    )
};

const Login = () => {

    return(
        <>
        </>
    );
}
export default Login;