import { apiURL, patchConfig } from "./config.js";

export async function fetchUsuario(username) {
  return await fetch(`${apiURL}/Usuarios/?username=${username}`)
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();

        case 404:
          return undefined;

        case 500:
          return "serverError";

        default:
          throw new Error(
            `Algo deu errado na requisição: código ${res.status}`
          );
      }
    })
    .then((data) => (Array.isArray(data) ? data[0] : data));
}

export async function updateUsuario(username, token, camposAlterados) {
  return await fetch(
    `${apiURL}/Usuarios/?username=${username}`,
    patchConfig(token, camposAlterados)
  )
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();

        case 401:
          return "accessoNãoAutorizado";

        case 404:
          return undefined;

        case 500:
          return "serverError";

        default:
          throw new Error(
            `Algo deu errado na requisição: código ${res.status}`
          );
      }
    })
    .then((data) => data);
}
