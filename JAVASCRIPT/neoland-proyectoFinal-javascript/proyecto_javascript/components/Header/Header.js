import { getUser } from "../../global/state/globalState";
import { printTemplateDashboard } from "../../pages";
import { changeColorRGB } from "../../utils";
import { initController } from "../../utils/route";
import "./Header.css"

// Template 
const template = () => `
<img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690020139/logo_uxpmno.svg" alt="Background" class="logo">
<nav>
    <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690021315/color-wheel_9686678_tbg7ev.png" alt="color_flipper" id="colorFlipper">
    <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690021808/dashboard-icon-30_ebvjmn.png
    " alt="Dashboard_area" id="dashboard">
    <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690021055/logout_5855712_rqpno0.png" alt="Logout button" id="logoutButton">
</nav>
` ;

// Listeners y eventos
const addListeners = () => {
    // colorFlipper
    const colorFlipper = document.getElementById("colorFlipper")
    colorFlipper.addEventListener("click",(e)=> {
        const color = changeColorRGB();
        document.body.style.background = color;
    });

    // Dashboard
    const dashboard = document.getElementById("dashboard")
    dashboard.addEventListener("click",(e)=>{
        initController("Dashboard");
    });

    // Logout
    const logoutButton = document.getElementById("logoutButton")
    logoutButton.addEventListener("click", (e)=>{
        const userState = getUser().name;
        const currentUser = localStorage.getItem(userState);
        const parseCurrentUser = JSON.parse(currentUser);
        const updateUser = { ...parseCurrentUser, token: false};
        const stringUpdateUser = JSON.stringify(updateUser);
        localStorage.removeItem(userState);
        sessionStorage.removeItem("currentUser");
        localStorage.setItem(userState, stringUpdateUser);
        initController("Login");
    });
};




// Pintamos
export const printTemplateHeader = () => {
    document.querySelector("header").innerHTML = template()
    addListeners()
}

