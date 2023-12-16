import { useEffect, useState } from "react";
import { buscarPosts } from "../../services/api";

import MenuLateral from "../../components/menuLateral";
import Post from "../../components/post";

import "./postagensPage.css";

function PostagensPage() {
  const [postagensList, setPostagensList] = useState([]);

  const carregarPosts = async () => {
    setPostagensList(await buscarPosts())
  }

  useEffect(() => {
    carregarPosts()
  }, []);

  return (
    <section id="postagemPage">
      <MenuLateral />
      <ul id="showPostagens">
        {postagensList.map((post) => (
          <Post
            key={post.id}
            titulo={post.title}
            subtitulo="Lorem Ipsum qualquer"
            subtexto={post.content}
            miniatura="https://fastly.picsum.photos/id/267/512/512.jpg?hmac=Bv_MCBNQIn7_vUuUmKSEscj7AIPDMQiEGs60--keJwA"
          />
        ))}
      </ul>
    </section>
  );
}

export default PostagensPage;
