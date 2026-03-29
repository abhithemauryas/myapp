import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <BrowserRouter>
          <Toaster position="top-right" />

      <Routes>
        {/* <Route path="/" element={<User />} />   */}
        <Route path="/signup"  element={<Signup/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Home/>}/>
        <Route path="*" element={<Navigate to="/login"/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;

