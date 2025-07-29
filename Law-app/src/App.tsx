
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Criminal from "./pages/LawCategories/Criminal";
import Home from "./pages/SideCategories/Home";
import LawDictionary from './pages/SideCategories/LawDictionary';
import Footer from "./components/Footer/Footer";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} />
      <Routes>
  <Route path="/" element={<Home />} />
  {/* <Route path="/AIAssistance" element={<AIAssistance />} /> */}
  
  <Route path="/LawDictionary" element={<LawDictionary />} />  {/* ✅ Fixed */}
  {/* <Route path="/Contact" element={<Contact />} />
  <Route path="/LegalDocs" element={<LegalDocs />} /> */}
  {/* <Route path="/Help" element={<Help />} /> */}
</Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
