import { Link, useNavigate } from "react-router-dom";

import imagePlaceholder from "../../assets/imagePlaceholder.png";

import "./SpanPost.css";

function SpanPost({
  id,
  titulo,
  subtitulo,
  conteudo,
  miniatura,
  categoria,
  criador,
}) {

  const direcionar = useNavigate();

  const handleMiniaturaError = (evento) => {
    evento.target.src = imagePlaceholder;
  };

  const handleAbrirPost = (evento) => {
    direcionar(`/postagens/${id}`);
  }

  return (
    <li className="spanPost" onClick={evento => handleAbrirPost(evento)}>
      <figure>
        <img
          src={miniatura}
          onError={(evento) => handleMiniaturaError(evento)}
          alt={titulo}
        />
      </figure>
      <section id="conteudoPost">
        <div>
          <h3>{titulo}</h3>
          <h4>{subtitulo}</h4>
          <p>{conteudo}</p>
        </div>
        <span id="metaInformacoes">
          <Link to={`/usuario/${criador}`}>
            {categoria} - {criador}
          </Link>
        </span>
      </section>
    </li>
  );
}

export default SpanPost;