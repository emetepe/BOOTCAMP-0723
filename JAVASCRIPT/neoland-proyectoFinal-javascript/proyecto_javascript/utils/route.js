import { getUser } from "../global/state/globalState";
import { Login, printTemplateDashboard } from "../pages";



// CONTROLADOR DE RENDERIZACIÓN EN CADA MOMENTO

export const initController = (pagesRender) => {
    console.log("soy el user", getUser().name);
    switch (pagesRender) {
        case undefined:
            localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
            break;
        
        case "Pokemon":
            "Pokemon()"
            break;

        case "Dashboard":
            printTemplateDashboard();
            break;
        
        case "Topo":
            "Topo()"
            break;

        case "Login":
            Login();
            break;
        
        case "Memory":
            "Memory()"
            break;

    }

}