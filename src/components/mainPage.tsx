import MainBackground from "../hooks/backgrounds/mainBackground.tsx";
import Navbar from "./navbar/navbar.tsx";
import QuestionFeed from "./guestionFeed/questionFeed.tsx";
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