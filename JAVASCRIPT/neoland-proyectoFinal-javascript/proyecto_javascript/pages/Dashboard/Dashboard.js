import "./Dashboard.css"

const templateDashboard = () => `
<div id="containerDashboard">
    <ul>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690041890/Pokemon-Logo-PNG-Photo_b5f6fc.png" alt="Go to Pokemon page">
                <h2>P0KEMON</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690042090/mascot_logo_ubvahm.png" alt="Go to Wacka Topo game">
                <h2>WACKA TOPO</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690044171/6168860_mmvonq.png" alt="Go to Memory game">
                <h2>MEMORY GAME</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690047367/Tetris-PNG-Image_ap8wzo.png" alt="Go to Tetris game">
                <h2>TETRIS</h2>
            </figure>
        </li>
        <li>
            <figure>
                <img src="https://res.cloudinary.com/dhninncj6/image/upload/v1690047630/Mastermind_Icon_rj8ltp.png" alt="Go to Mastermind game">
                <h2>MASTERMIND</h2>
            </figure>
        </li>
    </ul>

</div>
`;



export const printTemplateDashboard = () => {
    document.querySelector("main").innerHTML = templateDashboard();
    document.querySelector("nav").style.display = "flex";
}