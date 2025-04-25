import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Join from "./Components/Join/join";
import Chat from "./Components/Chat/chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Join} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
