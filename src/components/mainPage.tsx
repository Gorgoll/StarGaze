import MainBackground from "../hooks/mainBackground.tsx";
import Navbar from "./navbar.tsx";

const MainPage = () => {
    return (
        <div style={{ position: "relative", minHeight: "100vh", maxHeight: "100vh" }}>
            <MainBackground />
            <Navbar />
        </div>
    );
};

export default MainPage;