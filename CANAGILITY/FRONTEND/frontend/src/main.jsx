import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./pages/Register/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import CheckCode from "./pages/CheckCode/CheckCode.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import CurrentScores from "./components/CurrentScores/CurrentScores.jsx";
import ScoresByLevel from "./components/ScoresByLevel/ScoresByLevel.jsx";
import ScoreByPrueba from "./components/ScoreByPrueba/ScoreByPrueba.jsx";
import DogsPrueba from "./components/DogsPrueba/DogsPrueba.jsx";
import CrearScore from "./components/CrearScore/CrearScore.jsx";
import DeleteScore from "./components/DeleteScore/DeleteScore.jsx";
import CrearPrueba from "./components/CrearPrueba/CrearPrueba.jsx";
import AddDogMonitor from "./components/AddDogMonitor/AddDogMonitor.jsx";
import Monitores from "./components/Monitores/Monitores.jsx";
import PruebaSelect from "./components/PruebaSelect/PruebaSelect.jsx";
import ProfileHome from "./components/ProfileHome/ProfileHome.jsx";
import FormProfile from "./components/FormProfile/FormProfile.jsx";
import ChangePassword from "./components/ChangePassword/ChangePassword.jsx";
import AddDogCoach from "./pages/AddDogCoach/AddDogCoach.jsx";

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
              <Route path="/dashboard/CurrentScores" element={<CurrentScores />} />
              <Route
                path="/dashboard/ScoresByLevel"
                element={<ScoresByLevel />}
              />
              <Route
                path="/dashboard/ScoreByPrueba"
                element={<ScoreByPrueba />}
              />
              <Route
                path="/dashboard/DogsPrueba"
                element={<DogsPrueba />}
              />
              <Route path="/dashboard/CrearScore" element={<CrearScore />} />
              <Route path="/dashboard/DeleteScore" element={<DeleteScore />} />
              <Route
                path="/dashboard/CrearPrueba"
                element={<CrearPrueba />}
              />
              <Route
                path="/dashboard/AddDogCoach"
                element={<AddDogCoach />}
              >
                <Route index element={<AddDogMonitor />} />
                <Route
                  path="/dashboard/AddDogCoach/:id"
                  element={<PruebaSelect />}
                />
              </Route>
              <Route path="/dashboard/monitores" element={<Monitores />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);