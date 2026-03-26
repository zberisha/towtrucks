import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import UserLogout from "./components/UserLogout";
import Navbar from "./components/Navbar";
import LeafletHome from "./components/LeafletHome";
import "./App.css";
import AddTowTruck from "./components/AddTowTruck";
import NeedLogout from "./components/NeedLogout";
import NeedLogin from "./components/NeedLogin";
import NeedAdmin from "./components/NeedAdmin";
import UserTowTrucks from "./components/UserTowTrucks";
import AdminDashboard from "./components/AdminDashboard";


function App() {



  return (
    <Router>
      <ThemeProvider>
        <div className="flex flex-col h-screen">
          <Navbar />

          <div className="flex-1">
            <Routes>
              <Route path="/register" element={<NeedLogout> <RegisterForm /> </NeedLogout>} />
              <Route path="/login" element={<NeedLogout>
                <LoginForm />
              </NeedLogout>} />
              <Route path="/add" element={<NeedLogin><AddTowTruck /></NeedLogin>} />
              <Route path="/list/:id" element={<NeedLogin><UserTowTrucks /></NeedLogin>} />
              <Route path="/admin" element={<NeedAdmin><AdminDashboard /></NeedAdmin>} />
              <Route path="/logout" element={<UserLogout />} />
              <Route path="*" element={<LeafletHome />} />
            </Routes>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
