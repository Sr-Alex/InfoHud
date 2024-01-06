import { useContext, useState } from "react";
import { validarLogin } from "../../../services/validadores";
import usuarioContext from "../../../context/usuarioCont";
import { toast } from "react-toastify";

import "../Formulario.css";
import { useNavigate } from "react-router-dom";
import { salvarUsuario } from "../../../services/storage";

const infosIniciais = { username: "", senha: "" };

function FormularioLogin() {
  const [loginInfos, setLoginInfos] = useState(infosIniciais);
  const { setUsuario } = useContext(usuarioContext);
  const direcionar = useNavigate();

  const atualizarForm = (evento) => {
    const [campo, valor] = [evento.target.name, evento.target.value];
    setLoginInfos({
      ...loginInfos,
      [campo]: valor,
    });
  };

  const loginHandler = async (evento) => {
    evento.preventDefault();
    const idNotificar = toast.loading("Fazendo login...");
    
    const response = await validarLogin(loginInfos);

    switch (response) {
      case undefined:
        toast.update(idNotificar, {
          type: "warning",
          render: "Usuário inexistente!",
          isLoading: false,
          autoClose: 5000,
        });
        console.error("Usuário inexistente!");
        break;

      case "serverError":
        toast.update(idNotificar, {
          type: "error",
          render: "Servidor inativo para esta ação!",
          isLoading: false,
          autoClose: 5000,
        });
        console.error("Servidor inativo para a ação de login.");
        break;

      case "accessoNãoAutorizado":
        toast.update(idNotificar, {
          type: "warning",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          closeOnClick: true,
          render: "Senha incorreta!",
        });
        console.error("Senha incorreta!");
        break;

      default:
        toast.update(idNotificar, {
          type: "success",
          render: "Você está logado. Aproveite!",
          isLoading: false,
          closeOnClick: true,
          autoClose: 3000,
        });
        setUsuario(response);
        salvarUsuario(response);
        direcionar("/postagens");
    }
  };

  return (
    <form onSubmit={loginHandler} className="formulario">
      <label htmlFor="loginApelido">username:</label>
      <input
        type="text"
        name="username"
        id="loginApelido"
        autoComplete="true"
        onChange={atualizarForm}
        placeholder="Digite seu nickname..."
      />

      <label htmlFor="loginSenha">Senha:</label>
      <input
        type="password"
        name="senha"
        id="loginSenha"
        autoComplete="false"
        onChange={atualizarForm}
        placeholder="Digite sua senha..."
      />

      <button type="submit">Entrar</button>
    </form>
  );
}

export default FormularioLogin;
