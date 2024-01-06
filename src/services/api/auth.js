import { apiURL, loginConfig, cadastroConfig } from './config.js';

export async function fazerLogin(infos) {
    return await fetch(`${apiURL}/login/`, loginConfig(infos))
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
            throw new Error("Algo deu errado na requisição: código ", res.status);
        }
      })
      .then((data) => data)
      .catch((error) => console.error("Ocorreu um erro: ", error));
  }
  
  export async function efetuarCadastro(infos) {
    return await fetch(`${apiURL}/Usuarios/`, cadastroConfig(infos))
      .then((res) => {
        switch (res.status) {
          case 201:
            return res.json();
  
          case 500:
            return "serverError";
  
          default:
            throw new Error(
              `Algo deu errado na requisição: código: ${res.status}`
            );
        }
      })
      .then((data) => data)
      .catch((error) => console.error("Ocorreu um erro no cadastro:", error));
  }
  