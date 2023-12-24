import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarCadastro } from "../../../services/validadores";
import { toast } from "react-toastify";

import "../Formulario.css";
import usuarioContext from "../../../context/usuarioCont";
import { loginAutomatico, salvarUsuario } from "../../../services/storage";

const infosIniciais = {
  nome: "",
  nickname: "",
  email: "",
  senha: "",
};

function FormularioCadastro() {
  const [cadastroInfos, setCadastroInfos] = useState(infosIniciais);
  const { setUsuario } = useContext(usuarioContext);
  const direcionar = useNavigate();

  const atualizarInfos = (evento) => {
    const [campo, valor] = [evento.target.name, evento.target.value];
    setCadastroInfos({
      ...cadastroInfos,
      [campo]: valor,
    });
  };

  const cadastroHandler = async (evento) => {
    evento.preventDefault();

    const notificarId = toast.loading("Criando perfil de usuário... ");

    validarCadastro(cadastroInfos)
      .then((res) => {
        switch (res) {
          case "serverError":
            toast.update(notificarId, {
              type: "error",
              render: "Servidor inativo para esta ação!",
              isLoading: false,
              autoClose: 5000,
            });
            console.error("Servidor inativo para a ação de cadastro.");
            break;

          default:
            toast.update(notificarId, {
              type: "success",
              render: "Usuário criado e logado com sucesso. Aproveite!",
              isLoading: false,
              autoClose: 5000,
            });

            salvarUsuario(res);
            loginAutomatico(setUsuario);
            return direcionar("/postagens");
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
    <form className="formulario">
      <label htmlFor="cadastroNome">Nome:</label>
      <input
        type="text"
        name="nome"
        id="cadastroNome"
        autoComplete="true"
        onChange={(evento) => atualizarInfos(evento)}
        placeholder="Digite seu nome completo..."
      />
      <label htmlFor="cadastroNickname">Apelido:</label>
      <input
        type="text"
        name="nickname"
        id="cadastroNickname"
        autoComplete="false"
        onChange={(evento) => atualizarInfos(evento)}
        placeholder="Digite seu nickname..."
      />
      <label htmlFor="cadastroEmail">E-mail:</label>
      <input
        type="text"
        name="email"
        id="cadastroEmail"
        autoComplete="true"
        onChange={(evento) => atualizarInfos(evento)}
        placeholder="Digite seu e-mail..."
      />
      <label htmlFor="cadastroSenha">Senha:</label>
      <input
        type="password"
        name="senha"
        id="cadastroSenha"
        autoComplete="false"
        onChange={(evento) => atualizarInfos(evento)}
        placeholder="Digite sua senha..."
      />
      <button type="submit" onClick={(evento) => cadastroHandler(evento)}>
        Cadastrar
      </button>
    </form>
  );
}

export default FormularioCadastro;
