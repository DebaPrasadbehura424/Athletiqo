import { Route, Routes } from "react-router-dom";
import Progress from "./Pages/Progress";
import GraphTrack from "./Pages/GraphTrack";
import StreakTracker from "./Pages/StreakTracker";
import Plans from "./Pages/Plans";
import Leadership from "./Pages/leaderBoard";
// import Todo from "./Pages/Todo";
import YogaExcercise from "./Pages/YogaExcercise";
import Register from "./Authentication/Register";
import DashBoard from "./Pages/DashBoard";
import Start from "./Pages/Start";
import HomeProtector from "./Protect/HomeProtector";
import Login from "./Authentication/Login";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeProtector>
            <Start />
          </HomeProtector>
        }
      />

      <Route path="/Progress" element={<Progress />} />
      <Route path="/graphtrack" element={<GraphTrack />} />
      <Route path="/streak" element={<StreakTracker />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/Leaderboard" element={<Leadership />} />
      <Route path="/yogaexcer/:slot" element={<YogaExcercise />} />
      <Route path="/dashboard" element={<DashBoard />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* <Route path="/todo" element={<Todo />} /> */}
    </Routes>
  );
}

export default App;
