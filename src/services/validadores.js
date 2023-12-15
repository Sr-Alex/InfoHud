import { publicarPost } from "./api";

const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

export function validarCadastro(formulario) {
  const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
  return (
    emailRegex.test(formulario.email) &&
    formulario.nome &&
    formulario.nickname &&
    formulario.senha.length > 6
  );
}

export function validarPost(post) {
  const postTemplate = {
    titulo: "",
    subtitulo: "",
    miniatura: "",
    conteudo: "",
  };

  if (Object.keys(post).length !== Object.keys(postTemplate).length) {
    return console.error("Campos não correspondem!");
  }

  for (const campo of Object.keys(post)) {
    if (!Object.keys(postTemplate).includes(campo) && campo) {
      return console.error("Campos inválidos!");
    }
  }

  return publicarPost(post);
}
