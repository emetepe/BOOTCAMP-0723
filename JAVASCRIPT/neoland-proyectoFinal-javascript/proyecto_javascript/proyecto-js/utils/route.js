import { getUser } from "../global/state/globalState";
import { Login, PrintPokemonPage, printTemplateDashboard } from "../pages"; 


// CONTROLADOR DE RENDERIZACIÓN EN CADA MOMENTO

export const initController = (pagesRender) => {
    console.log("soy el user", getUser().name);
    switch (pagesRender) {
        case undefined:
            localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
            break;
        
        case "Pokemon":
            PrintPokemonPage();
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
        
        case "Tetris":
            "Tetris()"
            break;

        case "Mastermind":
            "Mastermind()"
            break;


    }

}