import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Register, Home, Admin } from "./page";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/register" element={<Register />} exact />
          <Route path="/admin" element={<Admin />} exact />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
