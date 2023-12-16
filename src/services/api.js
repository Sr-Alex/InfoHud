const InfoHUdAPI = "https://projeto-infohud-production.up.railway.app";

const loginConfig = (infos) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(infos),
  };
};

const postConfig = (data, token) => {
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
  return await fetch(`${InfoHUdAPI}/api/token/`, loginConfig(infos))
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error("Ocorreu um erro: ", error));
}

export async function publicarPost(dados) {
  return await fetch(`${InfoHUdAPI}/postagem/`, postConfig(dados.postagem, dados.token))
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Ocorreu um erro: ", error));
}

export async function buscarPosts() {
  return await fetch(`${InfoHUdAPI}/postagem/`)
    .then((res) => res.json())
    .then(data => data)
    .catch((error) => console.error("Ocorreu um erro: ", error));
}
