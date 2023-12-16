import { fazerLogin, publicarPost } from "./api";

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

export function validarCadastro(formulario) {
  return (
    emailRegex.test(formulario.email) &&
    formulario.nome &&
    formulario.nickname &&
    formulario.senha.length > 6
  );
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
    token: ''
  };

  if (Object.keys(post).length !== Object.keys(postTemplate).length) {
    return console.error("Campos não correspondem!");
  }

  for (const campo of Object.keys(post)) {
    if (!Object.keys(postTemplate).includes(campo) && campo) {
      return console.error("Campos inválidos!");
    }
  }

  return publicarPost({
    token: post.token,
    postagem: {
      titulo: post.titulo,
      subtitulo: post.subtitulo,
      miniurl: post.miniatura,
      conteudo: post.conteudo
    }
  });
}
