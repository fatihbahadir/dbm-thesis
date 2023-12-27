import axios from "axios";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./layouts/MainLayout";
import AddNewThesis from "./pages/AddNewThesis";
import Thesis from './pages/Thesis';

function App() {
  return (
    <div className="font-nunito">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" index element={<Login />} />
        <Route path="/register" index element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<MainLayout/>}>
          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER"]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER"]} />}>
            <Route path="/thesis" element={<Thesis/>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER"]}/>}>
            <Route path="/add-thesis" element={<AddNewThesis/>} />
          </Route>

          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
