export const apiURL = "https://infohudapi.onrender.com";

export const cadastroConfig = (infos) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(infos)
  };
};

export const loginConfig = (infos) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(infos)
  };
};

export const postConfig = (token, data) => {
  return {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
};

export const patchConfig = (token, data) => {
  return {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
}