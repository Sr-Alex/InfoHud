import { useState } from "react";
import { validarCadastro } from "../services/validadores";

import "../styles/formulario.css";

function infosIniciais() {
  return {
    nome: "",
    nickname: "",
    email: "",
    senha: "",
  };
}

function FormularioCadastro() {
  const [cadastroInfos, setCadastroInfos] = useState(infosIniciais);

  const atualizarInfos = (evento) => {
    const [campo, valor] = [evento.target.name, evento.target.value];
    setCadastroInfos({
      ...cadastroInfos,
      [campo]: valor,
    });
  };

  const cadastroHandler = async (evento) => {
    evento.preventDefault();
    return validarCadastro(cadastroInfos);
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
