import { Routes, Route } from "react-router-dom";
import LogInAndRegister from "./pages/loginAndRegister";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LogInAndRegister />} />
        <Route path="/sing" element={<LogInAndRegister />} />
      </Routes>
    </div>
  );
}

export default App;
