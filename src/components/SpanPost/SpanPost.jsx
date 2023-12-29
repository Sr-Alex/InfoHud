import "./SpanPost.css";
import imagePlaceholder from "../../assets/imagePlaceholder.png";
import { Link } from "react-router-dom";

function SpanPost({
  titulo,
  subtitulo,
  conteudo,
  miniatura,
  categoria,
  criador,
}) {
  const handleMiniaturaError = (evento) => {
    evento.target.src = imagePlaceholder;
  };

  return (
    <li className="spanPost">
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
