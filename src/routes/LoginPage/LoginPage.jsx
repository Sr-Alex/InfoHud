import { useState } from "react";

import FormularioLogin from "../../components/Formularios/FormularioLogin/FormularioLogin.jsx";
import FormularioCadastro from "../../components/Formularios/FormularioCadastro/FormularioCadastro.jsx";

import "./LoginPage.css";

function LoginPage() {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  const toogleLogin = () => {
    setMostrarLogin(!mostrarLogin);
  };

  return (
    <section className={`loginPage ${mostrarLogin ? "login" : "cadastro"}`}>
      <section id="recepcao">
        <div>
          <h3>Faça login na sua conta InfoHud!</h3>
          <p>Sua plataforma de ensino na área da programação.</p>
        </div>

        <span>
          {mostrarLogin
            ? "Ainda não faz parte?"
            : "Já faz parte da comunidade?"}
          <button onClick={toogleLogin}>
            {mostrarLogin ? "Cadastre-se!" : "Login!"}
          </button>
        </span>
      </section>
      <span id="square"></span>

      {mostrarLogin === true ? <FormularioLogin /> : <FormularioCadastro />}
    </section>
  );
}

export default LoginPage;
