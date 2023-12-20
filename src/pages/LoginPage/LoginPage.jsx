import { useState, useContext, useEffect } from "react";
import usuarioContext from "../../context/usuarioCont";

import FormularioLogin from "../../components/formularioLogin";
import FormularioCadastro from "../../components/formularioCadastro";

import "./loginPage.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [mostrarLogin, setMostrarLogin] = useState(true);
  const { usuario } = useContext(usuarioContext);
  const direcionar = useNavigate();

  const toogleLogin = () => {
    setMostrarLogin(!mostrarLogin);
  };

  useEffect(() => {
    if (usuario.token && usuario.username) {
      console.log("redirecionando...");
      direcionar('/postagens');
    }
  },[]);

  return (
    <section className={`loginPage ${mostrarLogin ? "login" : "cadastro"}`}>
      <section id="recepcao">
        <div>
          <h3>Faça login na sua conta InfoHud</h3>
          <p>Sua plataforma de ensino na área de programação</p>
        </div>

        <span>
          {mostrarLogin
            ? "Ainda não faz parte?"
            : "Já faz parte da comunidade?"}
          <button onClick={toogleLogin}>
            {mostrarLogin ? "Cadastre-se" : "Entrar"}
          </button>
        </span>
      </section>
      <span id="square"></span>

      {mostrarLogin === true ? <FormularioLogin /> : <FormularioCadastro />}
    </section>
  );
}

export default LoginPage;
