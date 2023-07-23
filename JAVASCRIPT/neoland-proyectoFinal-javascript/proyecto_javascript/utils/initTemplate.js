import { printTemplateHeader } from "../components"
import { printTemplateFooter } from "../components"

export const initTemplate = () =>  {
    const app = document.getElementById("app")

    //Creamos los elementos
    const header = document.createElement("header")
    const main = document.createElement("main")
    const footer = document.createElement("footer")

    // Inyectamos elementos en el contenedor de la app.
    console.log(app)
    
    app.append(header, main, footer)
    printTemplateHeader()
    printTemplateFooter()
}

