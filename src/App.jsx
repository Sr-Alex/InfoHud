import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import usuarioContext from "./context/usuarioCont";
import { loginAutomatico } from "./services/storage";

import MenuSuperior from "./layout/MenuSuperior/MenuSuperior";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [usuario, setUsuario] = useState({
    username: "",
    token: "",
  });
  const [ montado, setMontado ] = useState(false);

  useEffect(() => {
    if(!montado) {
      setMontado(true);
    } else {
      loginAutomatico(setUsuario);
    }
  }, [montado])

  return (
    <usuarioContext.Provider value={{ usuario, setUsuario }}>
      <MenuSuperior />
      <Outlet />
      <ToastContainer position="bottom-right" draggable={true} draggableDirection="y"/>
    </usuarioContext.Provider>
  );
}

export default App;
