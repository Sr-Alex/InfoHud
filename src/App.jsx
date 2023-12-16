import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import usuarioContext from "./context/usuarioCont";

import MenuSuperior from "./layout/menuSuperior";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostagensPage from "./pages/PostagensPage/PostagensPage";
import CriacaoPage from "./pages/CriacaoPage/CriacaoPage";

function App() {
  const [usuario, setUsuario] = useState({
    logado: false
  });



  return (
    <usuarioContext.Provider value={{usuario, setUsuario}}>
      <BrowserRouter>
      <MenuSuperior/>
        <Routes>
          <Route exact path="/" element={<LoginPage/>} /> 
          <Route path="/postagens" element={<PostagensPage/>} />
          <Route path="/postagens/criar" element={<CriacaoPage/>} />
        </Routes>
      </BrowserRouter>
    </usuarioContext.Provider>
  );
}

export default App;
