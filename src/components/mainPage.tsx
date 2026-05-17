import MainBackground from "../hooks/mainBackground.tsx";
import Navbar from "./navbar.tsx";
import QuestionFeed from "./questionFeed.tsx";
import type { User } from "../api.ts";

const MainPage = ({ currentUser }: { currentUser: User | null }) => {
  return (
     <div style={{ position: "relative", minHeight: "100vh", maxHeight: "100vh", transition: "transform 3s ease" }}>
       <MainBackground />
       <Navbar />
       <QuestionFeed currentUser={currentUser} />
     </div>
  );
};

export default MainPage;