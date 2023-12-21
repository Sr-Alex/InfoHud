import "../styles/post.css";
import imagePlaceholder from "../assets/imagePlaceholder.png";

function SpanPost({
  titulo,
  subtitulo,
  conteudo,
  miniatura,
  categoria,
  criador,
}) {
  return (
    <li className="post">
      <figure>
        <img src={miniatura} onError={imagePlaceholder} alt={titulo} />
      </figure>
      <section id="conteudoPost">
        <div>
          <h3>{titulo}</h3>
          <h4>{subtitulo}</h4>
          <p>{conteudo}</p>
        </div>
        <span id="metaInformacoes">
          <p>
            {categoria} - {criador}
          </p>
        </span>
      </section>
    </li>
  );
}

export default SpanPost;
