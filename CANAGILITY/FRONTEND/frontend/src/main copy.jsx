import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import Register from "./pages/Register/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import CheckCode from "./pages/CheckCode/CheckCode.jsx";
import Login from "./pages/Login/Login.jsx";
import { Protected } from "./components/Protected/Protected.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import { Horario } from "./components/Horario/Horario.jsx";
import NotasActual from "./components/NotasActual/NotasActual.jsx";
import NotasPorCurso from "./components/NotasPorCurso/NotasPorCurso.jsx";
import NotaPorAsignatura from "./components/NotaPorAsignatura/NotaPorAsignatura.jsx";
import AlumnosAsignatura from "./components/AlumnosAsignatura/AlumnosAsignatura.jsx";
import CrearNota from "./components/CrearNota/CrearNota.jsx";
import BorrarNota from "./components/BorrarNota/BorrarNota.jsx";
import CrearAsignatura from "./components/CrearAsignatura/CrearAsignatura.jsx";
import AñadirAlumnoProfesor from "./components/AñadirAlumnoProfesor/AñadirAlumnoProfesor.jsx";
import Profesorado from "./components/Profesorado/Profesorado.jsx";
import AsignaturaSelect from "./components/AsignaturaSelect/AsignaturaSelect.jsx";
import ProfileHome from "./components/ProfileHome/ProfileHome.jsx";
import FormProfile from "./components/FormProfile/FormProfile.jsx";
import ChangePassword from "./components/ChangePassword/ChangePassword.jsx";
import AddAlumnTeacher from "./pages/AddAlumnTeacher/AddAlumnTeacher.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyCode" element={<CheckCode />} />
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileHome />} />
              <Route path="/profile/formProfile" element={<FormProfile />} />
              <Route
                path="/profile/changePassword"
                element={<ChangePassword />}
              />
            </Route>
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Horario />} />
              <Route path="/dashboard/notasActual" element={<NotasActual />} />
              <Route
                path="/dashboard/notasporcurso"
                element={<NotasPorCurso />}
              />
              <Route
                path="/dashboard/notaporasignatura"
                element={<NotaPorAsignatura />}
              />
              <Route
                path="/dashboard/alumnosasignatura"
                element={<AlumnosAsignatura />}
              />
              <Route path="/dashboard/crearnota" element={<CrearNota />} />
              <Route path="/dashboard/borrarnota" element={<BorrarNota />} />
              <Route
                path="/dashboard/crearasignatura"
                element={<CrearAsignatura />}
              />
              <Route
                path="/dashboard/AddAlumnTeacher"
                element={<AddAlumnTeacher />}
              >
                <Route index element={<AñadirAlumnoProfesor />} />
                <Route
                  path="/dashboard/AddAlumnTeacher/:id"
                  element={<AsignaturaSelect />}
                />
              </Route>
              <Route path="/dashboard/profesorado" element={<Profesorado />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);