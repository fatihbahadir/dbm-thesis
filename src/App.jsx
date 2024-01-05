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
import ThesisDetail from "./pages/ThesisDetail";
import Profile from "./pages/Profile";
import Manager from "./pages/Manager";
import ManageTheses from "./pages/ManageTheses";
import ManageProfessions from "./pages/ManageProfessions";
import ManageInstitutes from "./pages/ManageInstitutes";
import ManageUniversities from "./pages/ManageUniversities";
import ManageSubjects from "./pages/ManageSubjects";
import ManageKeywords from "./pages/ManageKeywords";
import ManageTypes from "./pages/ManageTypes";
import ManageLanguages from "./pages/ManageLanguages";

function App() {
  return (
    <div className="font-nunito ">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" index element={<Login />} />
        <Route path="/register" index element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<MainLayout/>}>
            
          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER", "ADMIN"]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER", "ADMIN"]} />}>
            <Route path="/thesis" element={<Thesis/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER", "ADMIN"]}/>}>
            <Route path="/thesis-detail/:thesisId" element={<ThesisDetail/>} />
          </Route>
        
          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER", "ADMIN"]}/>}>
            <Route path="/add-thesis" element={<AddNewThesis/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["MANAGER", "USER", "ADMIN"]}/>}>
            <Route path="/profile/:userId" element={<Profile/>} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["MANAGER", "ADMIN"]}/>}>
            <Route path="/manager" element={<Manager/>}>
                <Route path="/manager/theses" element={<ManageTheses/>}/>
                <Route path="/manager/professions" element={<ManageProfessions/>}/>
                <Route path="/manager/institutes" element={<ManageInstitutes/>}/>
                <Route path="/manager/universities" element={<ManageUniversities/>}/>
                <Route path="/manager/subjects" element={<ManageSubjects/>}/>
                <Route path="/manager/related-keywords" element={<ManageKeywords/>}/>
                <Route path="/manager/thesis-types" element={<ManageTypes/>}/>
                <Route path="/manager/thesis-languages" element={<ManageLanguages/>}/>
              </Route>
          </Route>

          </Route>
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
