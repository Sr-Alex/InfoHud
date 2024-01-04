import { useEffect, useState } from "react";
import { buscarPosts } from "../../services/api/postagem.js";

import MenuLateral from "../../components/MenuLateral/MenuLateral";
import SpanPost from "../../components/SpanPost/SpanPost";
import IconErro from "../../components/IconErro/IconErro";

import "./PostagensPage.css";

function PostagensPage() {
  const [postagensList, setPostagensList] = useState([]);

  const carregarPosts = async ({
    criador = undefined,
    categoria = undefined,
  } = {}) => {
    const posts = await buscarPosts({usuario: criador, categoria: categoria});
    switch (posts) {
      case "serverError":
        console.error("Servidor inativo para esta ação.");
        break;

      case undefined:
        return setPostagensList([]);

      default:
        setPostagensList(posts);
        break;
    }
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  return (
    <section id="postagemPage">
      <MenuLateral carregarPosts={carregarPosts} />
      <ul id="showPostagens">
        {postagensList.length ? (
          postagensList.map((post) => (
            <SpanPost
              key={post.id}
              id={post.id}
              titulo={post.titulo}
              subtitulo={post.subtitulo}
              conteudo={post.conteudo}
              miniatura={post.miniurl}
              categoria={post.categoria}
              criador={post.user_nickname}
            />
          ))
        ) : (
          <IconErro mensagem="Nenhuma postagem encontrada." />
        )}
      </ul>
    </section>
  );
}

export default PostagensPage;
