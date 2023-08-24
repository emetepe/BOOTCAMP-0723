import { useState } from "react";
import "./App.css";
import Listado from "./components/Listado/Listado";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Aside from "./components/Aside/Aside";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="layout">
      <Header />
      <Nav />
      <section id="content" className="content">
      <Listado />
      </section>
      <Aside/>
      <Footer/>
    </div>
  );
}

export default App;
