import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import usuarioContext from "./context/usuarioCont";
import { loginAutomatico } from "./services/storage"

import MenuSuperior from "./layout/menuSuperior";
import LoginPage from "./pages/LoginPage/LoginPage";
import PostagensPage from "./pages/PostagensPage/PostagensPage";
import CriacaoPage from "./pages/CriacaoPage/CriacaoPage";
import InicioPage from "./pages/InicioPage/InicioPage";

function App() {
  const [usuario, setUsuario] = useState({
    username: '',
    token: '',
  });      

  useEffect(() => {
    loginAutomatico(setUsuario);
  },[])

  return (
    <usuarioContext.Provider value={{usuario, setUsuario}}>
      <BrowserRouter>
      <MenuSuperior/>
        <Routes>
          <Route exact path="/" element={<InicioPage/>} /> 
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/postagens" element={<PostagensPage/>} />
          <Route path="/postagens/criar" element={<CriacaoPage/>} />
        </Routes>
      </BrowserRouter>
    </usuarioContext.Provider>
  );
}

export default App;
