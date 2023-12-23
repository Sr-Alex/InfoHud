import { useState, useContext, useEffect } from "react";
import usuarioContext from "../../context/usuarioCont";

import FormularioLogin from "../../components/Formularios/FormularioLogin/FormularioLogin";
import FormularioCadastro from "../../components/Formularios/FormularioCadastro/FormularioCadastro";

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
  },[direcionar, usuario.username, usuario.token]);

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
