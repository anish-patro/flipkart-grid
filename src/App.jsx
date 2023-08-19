import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Header";
import Footer from "./components/Navbar/Footer";
import Quiz from "../src/components/Quiz/quiz.jsx";
import Modal from "./components/Products/product";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Address from "./components/Adress/Address";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
        <Route path="/product" element={<Modal />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/add-address" element={<Address />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
