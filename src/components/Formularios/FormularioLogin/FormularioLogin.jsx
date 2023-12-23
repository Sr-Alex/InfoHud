import { useContext, useState } from "react";
import { validarLogin } from "../../../services/validadores";
import usuarioContext from "../../../context/usuarioCont";

import "../Formulario.css";
import { useNavigate } from "react-router-dom";
import { salvarUsuario } from "../../../services/storage";

function infosIniciais() {
  return { apelido: "", senha: "" };
}

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
    try {
      const login = await validarLogin(loginInfos);
      switch (login) {
        case undefined:
          console.error("Usuário inexistente!");
          break;

        case "serverError":
          console.error("Servidor inativo para a ação de login.");
          break;

        case "accessoNãoAutorizado":
          console.error("Senha incorreta!");
          break;

        default:
          setUsuario(login);
          salvarUsuario(login);
          direcionar("/postagens");
      }
    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <form onSubmit={loginHandler} className="formulario">
      <label htmlFor="loginApelido">Apelido:</label>
      <input
        type="text"
        name="apelido"
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
