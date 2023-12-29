import { apiURL } from "./config.js";

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
    .then((data) => (data[0] ? data[0] : data));
}
