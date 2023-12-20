import { useEffect, useState } from "react";
import { buscarPosts } from "../../services/api";

import MenuLateral from "../../components/menuLateral";
import Post from "../../components/post";

import "./postagensPage.css";
import imagePlaceholder from "../../images/imagePlaceholder.png";

function PostagensPage() {
  const [postagensList, setPostagensList] = useState([]);

  const carregarPosts = async () => {
    setPostagensList(await buscarPosts())
  }

  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <section id="postagemPage">
      <MenuLateral />
      <ul id="showPostagens">
        {postagensList.map((post) => (
          <Post
            key={post.id}
            titulo={post.titulo}
            subtitulo={post.subtitulo}
            subtexto={post.conteudo}
            miniatura={post.miniurl ? post.miniurl : imagePlaceholder}
          />
        ))}
      </ul>
    </section>
  );
}

export default PostagensPage;
