const InfoHudAPI = "https://infohudapi.onrender.com";

const cadastroConfig = (infos) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  };
};

const loginConfig = (infos) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  };
};

const postConfig = (token, data) => {
  return {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export async function fazerLogin(infos) {
  return await fetch(`${InfoHudAPI}/login/`, loginConfig(infos))
    .then((res) => {
      console.log(res.status);
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
    .then((data) => {
      if (typeof data === Object)
        return {
          apelido: data.username,
          token: data.token,
        };
      return data;
    })
    .catch((error) => console.error("Ocorreu um erro: ", error));
}

export async function efetuarCadastro(infos) {
  return await fetch(`${InfoHudAPI}/Usuarios/`, cadastroConfig(infos))
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

export async function publicarPost(dados) {
  return await fetch(
    `${InfoHudAPI}/postagem/`,
    postConfig(dados.token, dados.postagem)
  )
    .then((res) => {
      switch (res.status) {
        case 201 || 200:
          return res.json();

        case 400:
          return 'badRequest';

        case 401:
          return 'accessoNãoAutorizado';

        case 500:
          return "serverError";

        default:
          throw new Error(`Algo deu errado na requisição: código ${res.status}`);
      }
    })
    .then((data) => data)
    .catch((error) => console.error("Ocorreu um erro: ", error));
}

export async function buscarPosts() {
  return await fetch(`${InfoHudAPI}/postagem/`)
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
