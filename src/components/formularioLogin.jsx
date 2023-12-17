import { useContext, useState } from "react";
import { validarLogin } from "../services/validadores";

import "../styles/formulario.css";
import usuarioContext from "../context/usuarioCont";

function infosIniciais() {
  return { apelido: "", senha: "" };
}

function FormularioLogin() {
  const [loginInfos, setLoginInfos] = useState(infosIniciais);
  const { setUsuario } = useContext(usuarioContext);

  const atualizarForm = (evento) => {
    const [campo, valor] = [evento.target.name, evento.target.value];
    setLoginInfos({
      ...loginInfos,
      [campo]: valor,
    });
    console.log(loginInfos);
  };

  const loginHandler = async (evento) => {
    evento.preventDefault();
    setUsuario( await validarLogin(loginInfos));
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

      <button type="submit">
        Entrar
      </button>
    </form>
  );
}

export default FormularioLogin;
