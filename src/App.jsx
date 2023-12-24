import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import usuarioContext from "./context/usuarioCont";
import { loginAutomatico } from "./services/storage";

import MenuSuperior from "./layout/MenuSuperior/MenuSuperior";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [usuario, setUsuario] = useState({
    username: "",
    token: "",
  });

  const [montado, setMontado] = useState(false);
  
  const autoLoginNotificacao = () =>
    toast("Login automático efetuado. Aproveite!", {
      type: "success",
      autoClose: 3000,
    });

  useEffect(() => {
    if (!montado) {
      setMontado(true);
    } else {
      const userStorage = localStorage.getItem("usuarioStorage");
      if (userStorage && Object.values(userStorage).every((campo) => campo)) {
        loginAutomatico(setUsuario);
        autoLoginNotificacao();
      }
    }
  }, [montado]);

  return (
    <usuarioContext.Provider value={{ usuario, setUsuario }}>
      <MenuSuperior />
      <Outlet />
      <ToastContainer position="bottom-right" />
    </usuarioContext.Provider>
  );
}

export default App;
