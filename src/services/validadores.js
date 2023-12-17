import { efetuarCadastro, fazerLogin, publicarPost } from "./api";

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

export function validarCadastro(infos) {
  const cadastroTemplate = {
    nome: "",
    nickname: "",
    email: "",
    senha: "",
  };

  if (Object.keys(infos).length !== Object.keys(cadastroTemplate).length) {
    return console.error("Quantidade de campos não corresponde!");
  } else if (!emailRegex.test(infos.email)) {
    return console.error("Email inválido!");
  }

  for (const campo of Object.keys(infos)) {
    if (!Object.keys(cadastroTemplate).includes(campo)) {
      return console.error("Campos não correspondem!");
    }
  }

  return efetuarCadastro({
    "username": infos.nickname,
    "first_name": infos.nome,
    "email": infos.email,
    "password": infos.senha
  });
}

export async function validarLogin(infos) {
  const loginTemplate = {
    apelido: "",
    senha: "",
  };

  if (Object.keys(infos).length !== Object.keys(loginTemplate).length) {
    return console.error("A quantidade de campos não corresponde!");
  }

  for (const campo of Object.keys(infos)) {
    if (!Object.keys(loginTemplate).includes(campo) && campo) {
      return console.error("Os campos não correspondem!");
    }
  }

  return fazerLogin({
    username: infos.apelido,
    password: infos.senha,
  });
}

export function validarPost(post) {
  const postTemplate = {
    titulo: "",
    subtitulo: "",
    miniatura: "",
    conteudo: "",
    token: "",
  };

  if (Object.keys(post).length !== Object.keys(postTemplate).length) {
    return console.error("Campos não correspondem!");
  }

  for (const campo of Object.keys(post)) {
    if (!Object.keys(postTemplate).includes(campo) && campo) {
      return console.error("Campos inválidos!");
    }
  }
  console.log(post);
  return publicarPost({
    token: post.token,
    postagem: {
      titulo: post.titulo,
      subtitulo: post.subtitulo,
      miniurl: post.miniatura,
      conteudo: post.conteudo,
    },
  });
}
