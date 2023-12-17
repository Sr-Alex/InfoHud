import "../styles/post.css";

function Post({ titulo, subtitulo, subtexto, miniatura }) {
  return (
    <li className="post">
      <figure>
        <img src={miniatura} alt={titulo} />
      </figure>
      <section id="conteudoPost">
        <h3>{titulo}</h3>
        <h4>{subtitulo}</h4>
        <p>{subtexto}</p>
      </section>
    </li>
  );
}

export default Post;
