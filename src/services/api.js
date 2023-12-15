const InfoHUdAPI = "https://projeto-infohud-production.up.railway.app";

const PostConfig = (data) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export async function publicarPost(post) {
  return await fetch(`${InfoHUdAPI}/postagens`, PostConfig(post))
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Ocorreu um erro: ", error));
}

export async function buscarPosts() {
  return await fetch(`${InfoHUdAPI}/postagens`)
  .then((res) => res.json())
  .catch((error) => console.error("Ocorreu um erro: ", error));
}
