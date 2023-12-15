import { useState } from "react";

import "../styles/formulario.css";

function infosIniciais() {
  return { email: "", senha: "" };
}

function FormularioLogin() {
  const [loginInfos, setLoginInfos] = useState(infosIniciais);

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
  };

  return (
    <form onSubmit={loginHandler} className="formulario">
      <label htmlFor="loginEmail">E-mail:</label>
      <input
        type="email"
        name="email"
        id="loginEmail"
        autoComplete="true"
        onChange={atualizarForm}
        placeholder="Digite seu E-mail..."
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
