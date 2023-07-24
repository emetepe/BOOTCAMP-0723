import "./Footer.css";

const templateFooter = () => `
<h4>Made by Emetepé Tech & Services</h4>
`;

export const printTemplateFooter = () => {
  document.querySelector("footer").innerHTML = templateFooter();
};
