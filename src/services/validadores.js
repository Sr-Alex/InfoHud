import { efetuarCadastro, fazerLogin } from "./api/auth.js";
import { publicarPost } from "./api/postagem.js";

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

export function validarCadastro(infos) {
  const cadastroTemplate = {
    nome: "",
    nickname: "",
    email: "",
    senha: "",
  };

  if (Object.keys(infos) === Object.keys(cadastroTemplate)) {
    console.error("Os campos das informações de cadastro não correspondem: " + infos);
    return "badRequest";
  } else if (!emailRegex.test(infos.email)) {
    console.error("Email inválido!");
    return "badRequest";
  }

  Object.values(infos).map(campo => {
    if (!campo) {
      console.error("Não deixe campos vazios.");
      return "badRequest";
    }
  })

  return efetuarCadastro({
    username: infos.nickname,
    first_name: infos.nome,
    email: infos.email,
    password: infos.senha,
    last_name: "",
  });
}

export async function validarLogin(infos) {
  const loginTemplate = {
    username: "",
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
    username: infos.username,
    password: infos.senha,
  });
}

export function validarPost(post) {
  const postTemplate = {
    titulo: "",
    subtitulo: "",
    miniatura: "",
    categoria: "",
    conteudo: "",
    token: "",
    criador: "",
  };

  if (Object.keys(post).length !== Object.keys(postTemplate).length) {
    console.error(
      "Ocorreu um erro com os valores no formulário de postagem: " + post
    );
    return "badRequest";
  }

  Object.values(post).map((campo) => {
    if (!campo) {
      console.error(
        "Ocorreu um erro com os valores no formulário de postagem: " + post
      );
      return "badRequest";
    }
  });

  return publicarPost({
    token: post.token,
    postagem: {
      titulo: post.titulo,
      subtitulo: post.subtitulo,
      categoria: post.categoria,
      miniurl: post.miniatura,
      conteudo: post.conteudo,
      user_nickname: post.criador,
    },
  });
}
