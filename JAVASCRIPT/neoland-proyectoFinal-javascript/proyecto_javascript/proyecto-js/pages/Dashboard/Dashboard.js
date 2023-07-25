import { initController } from "../../utils";
import "./Dashboard.css"

const templateDashboard = () => `
<div id="containerDashboard">
    <ul>
        <li>
            <figure id="navigatePokemon">
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690171115/pokemon-symbol-logo-png-31_dmcdps.png" alt="Go to Pokemon page" />
                <h2>P0KEMON</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690171239/3905506_wv6rrq.png" alt="Go to Wacka Topo game" />
                <h2>WACKA TOPO</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690170567/219-2197760_brain-training-version-memory-game-icon_iecl0m.png" alt="Go to Memory game" />
                <h2>MEMORY GAME</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690170837/806099_bsc1md.png" alt="Go to Tetris game" />
                <h2>TETRIS</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690047630/Mastermind_Icon_rj8ltp.png" alt="Go to Mastermind game" />
                <h2>MASTERMIND</h2>
            </figure>
        </li>
    </ul>

</div>
`;

const addEventListeners = () => {
    const navigatePokemon = document.getElementById("navigatePokemon");
    navigatePokemon.addEventListener("click", () => {
      initController("Pokemon");
    });
  };

export const printTemplateDashboard = () => {
    document.querySelector("main").innerHTML = templateDashboard();
    document.querySelector("nav").style.display = "flex";
    addEventListeners();
};