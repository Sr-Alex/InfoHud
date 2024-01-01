import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarPosts } from "../../services/api/postagem";
import { toast } from "react-toastify";

import imagePlaceholder from "../../assets/imagePlaceholder.png";

import "./ViewPostagem.css";

const conteudoInicial = {
  titulo: "",
  subtitulo: "",
  conteudo: [],
  miniatura: "",
  categoria: "",
  criador: "",
};

function ViewPostagem() {
  const [conteudo, setConteudo] = useState(conteudoInicial);
  const { id } = useParams();

  const direcionar = useNavigate();

  const buscarPostagem = async (id) => {
    const post = await buscarPosts({ id: id });
    switch (post) {
      case undefined:
        toast("Postagem não encontrada!", {
          type: "error",
          autoClose: 5000,
          closeOnClick: true,
          closeButton: true,
        });
        return direcionar("/postagens");

      case "serverError":
        toast("Servidor inativo para esta ação.", {
          type: "error",
          autoClose: 5000,
          closeOnClick: true,
          closeButton: true,
        });
        break;

      default:
        setConteudo({
          titulo: post.titulo,
          subtitulo: post.subtitulo,
          conteudo: post.conteudo.split("\n"),
          miniatura: post.miniurl,
          categoria: post.categoria,
          criador: user_nickname,
        });
        break;
    }
  };

  useEffect(() => {
    buscarPostagem(id);
  }, []);

  return (
    <section id="postagem">
      <h4>{conteudo.titulo}</h4>
      <h5>{conteudo.subtitulo}</h5>
      <figure id="postImagem">
        <img
          src={conteudo.miniatura}
          onError={(evento) => (evento.target.src = imagePlaceholder)}
          alt="Imagem da postagem."
        />
      </figure>
      <section id="postConteudo">
        {conteudo.length &&
          conteudo.conteudo.map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
          ))}
      </section>
    </section>
  );
}

export default ViewPostagem;
