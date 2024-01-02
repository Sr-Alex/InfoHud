import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
          titulo: post[0].titulo,
          subtitulo: post[0].subtitulo,
          conteudo: post[0].conteudo.split("\n"),
          miniatura: post[0].miniurl,
          categoria: post[0].categoria,
          criador: post[0].user_nickname,
        });
        break;  
    }
  };

  const handleMiniaturaError = (evento) => {
    evento.target.src = imagePlaceholder;
  };

  useEffect(() => {
    buscarPostagem(id);
  }, []);

  return (
    <section id="postagem">
      <section id="postInformacoes">
        <h4>{conteudo.titulo}</h4>
        <h5>{conteudo.subtitulo}</h5>
        <div id="criadorInfos">
        <span>{conteudo.categoria}</span>
        <span>-</span>
        <Link to={`/usuario/${conteudo.criador}`}>{conteudo.criador}</Link>
        </div>
        <figure id="postImagem">
          <img
            src={conteudo.miniatura}
            onError={(evento) => handleMiniaturaError(evento)}
            alt="Imagem da postagem."
          />
        </figure>
      </section>
      <section id="postConteudo">
        {conteudo.conteudo.length &&
          conteudo.conteudo.map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
          ))}
      </section>
    </section>
  );
}

export default ViewPostagem;
