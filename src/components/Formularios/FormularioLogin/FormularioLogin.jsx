import { useContext, useState } from "react";
import { validarLogin } from "../../../services/validadores";
import usuarioContext from "../../../context/usuarioCont";
import { toast } from "react-toastify";

import "../Formulario.css";
import { useNavigate } from "react-router-dom";
import { salvarUsuario } from "../../../services/storage";

const infosIniciais = { apelido: "", senha: "" };

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
    
    const notificarId = toast.loading("Fazendo login...");

    validarLogin(loginInfos)
      .then((res) => {
        switch (res) {
          case undefined:
            toast.update(notificarId, {
              type: "warning",
              render: "Usuário não inexistente!",
              isLoading: false,
              autoClose: 5000,
            });
            console.error("Usuário inexistente!");
            break;

          case "serverError":
            toast.update(notificarId, {
              type: "error",
              render: "Servidor inativo para esta ação!",
              isLoading: false,
              autoClose: 5000,
            });
            console.error("Servidor inativo para a ação de login.");
            break;

          case "accessoNãoAutorizado":
            console.error("Senha incorreta!");
            break;

          default:
            toast.update(notificarId, {
              type: "success",
              render: "Você está logado. Aproveite!",
              isLoading: false,
              closeOnClick: true,
              autoClose: 3000
            });
            setUsuario(res);
            salvarUsuario(res);
            direcionar("/postagens");
        }
      })
      .catch((erro) => {
        toast.update(notificarId, {
          type: "error",
          render: "Algo deu errado com a requisição.",
          isLoading: false,
          autoClose: 5000,
        });
        console.error(`Algo deu errado com a requisição: ${erro}`);
      });
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
