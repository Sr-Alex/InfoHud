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

    const idNotificar = toast.loading("Criando perfil de usuário... ");
    
    const response = await validarCadastro(cadastroInfos);

    switch (response) {
      case "badRequest":
        toast.update(idNotificar, {
          type: "warning",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          closeOnClick: true,
          render: "Preencha todos os campos corretamente!",
        });
        break;

      case "serverError":
        toast.update(idNotificar, {
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
          render: "Servidor inativo para esta ação.",
        });
        break;

      default:
        toast.update(idNotificar, {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          closeOnClick: true,
          render: "Perfil de usuário criado com sucesso. Aproveite!",
        });
        salvarUsuario(response);
        loginAutomatico(setUsuario);
        direcionar("/postagens");
        break;
    }
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
      <label htmlFor="cadastroNickname">username:</label>
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
