import "./Footer.css";

const templateFooter = () => `
<h4>Made by <a href="https://emetepe.com" target="_blank"> Emetepé Tech & Services</a></h4>
`;

export const PrintTemplateFooter = () => {
  document.querySelector("footer").innerHTML = templateFooter();
};
