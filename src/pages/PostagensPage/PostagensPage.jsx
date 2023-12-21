import { useEffect, useState } from "react";
import { buscarPosts } from "../../services/api";

import MenuLateral from "../../components/menuLateral";
import SpanPost from "../../components/spanPost";
import IconVazio from "../../components/iconVazio";

import "./postagensPage.css";
import imagePlaceholder from "../../assets/imagePlaceholder.png";

function PostagensPage() {
  const [postagensList, setPostagensList] = useState([]);

  const carregarPosts = async () => {
    const posts = await buscarPosts();
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
      <MenuLateral
        state={postagensList}
        setState={setPostagensList}
        resetPosts={carregarPosts}
      />
      <ul id="showPostagens">
        {postagensList.length ? (
          postagensList.map((post) => (
            <SpanPost
              key={post.id}
              titulo={post.titulo}
              subtitulo={post.subtitulo}
              conteudo={post.conteudo}
              miniatura={post.miniurl ? post.miniurl : imagePlaceholder}
              categoria={post.categoria}
              criador={post.user_nickname}
            />
          ))
        ) : (
          <IconVazio mensagem="Nenhum post encontrado." />
        )}
      </ul>
    </section>
  );
}

export default PostagensPage;
