import { apiURL, postConfig } from "./config";

export async function publicarPost(dados) {
  return await fetch(
    `${apiURL}/postagem/`,
    postConfig(dados.token, dados.postagem)
  )
    .then((res) => {
      switch (res.status) {
        case 201 || 200:
          return res.json();

        case 400:
          return "badRequest";

        case 401:
          return "accessoNãoAutorizado";

        case 500:
          return "serverError";

        default:
          throw new Error(
            `Algo deu errado na requisição: código ${res.status}`
          );
      }
    })
    .then((data) => data)
    .catch((error) => console.error("Ocorreu um erro: ", error));
}

export async function buscarPosts(
  {usuario = undefined,
  categoria = undefined,
  id = undefined} = {}
) {
  return await fetch(
    `${apiURL}/postagem/?criador=${usuario ? usuario : ""}&categoria=${
      categoria ? categoria : ""
    }&id=${id ? id : ""}`
  )
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();

        case 404:
          return undefined;

        case 500:
          return "serverError";

        default:
          throw new Error("Algo deu errado na requisição: código", res.status);
      }
    })
    .then((data) => data)
    .catch((error) => console.error("Ocorreu um erro: ", error));
}
