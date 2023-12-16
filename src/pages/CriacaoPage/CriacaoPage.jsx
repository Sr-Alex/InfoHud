import usuarioContext from "../../context/usuarioCont";
import { useContext, useEffect, useRef, useState } from "react";

import "./CriacaoPage.css";
import imagePlaceholder from "../../images/imagePlaceholder.png";
import { validarPost } from "../../services/validadores";

function valoresIniciais() {
  return {
    titulo: "",
    subtitulo: "",
    miniatura: "",
    conteudo: "",
  };
}

function CriacaoPage() {
  const { usuario } = useContext(usuarioContext);
  const [postagem, setPostagem] = useState(valoresIniciais());
  const textAreaRef = useRef("");

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "0px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const atualizarPostagem = (evento) => {
    const [campo, valor] = [evento.target.name, evento.target.value];
    setPostagem({
      ...postagem,
      [campo]: valor,
    });
  };

  const miniaturaPadrao = (evento) => {
    evento.target.src = imagePlaceholder;
    setPostagem({
      ...postagem,
      miniatura: imagePlaceholder,
    });
  };

  const postar = (evento) => {
    evento.preventDefault();
    if (Object.keys(usuario).includes("access")) {
      setPostagem({
        ...postagem,
        token: usuario.access
      });
      return validarPost(postagem)
    }
    return console.error("Você precisa estar logado!");
  };

  useEffect(resizeTextArea, [postagem.conteudo]);

  return (
    <form onSubmit={(evento) => postar(evento)} id="criacaoPage">
      <section id="cabecalho">
        <h4>Criar postagem</h4>

        <label htmlFor="tituloInput">Titulo:</label>
        <input
          type="text"
          name="titulo"
          id="tituloInput"
          onChange={(evento) => atualizarPostagem(evento)}
          placeholder="Digite o título da postagem..."
        />

        <label htmlFor="subtituloInput">Subtítulo:</label>
        <input
          type="text"
          name="subtitulo"
          id="subtituloInput"
          onChange={(evento) => atualizarPostagem(evento)}
          placeholder="Digite o subtítulo da postagem..."
        />

        <label htmlFor="miniaturaInput">Miniatura:</label>
        <div id="miniatura">
          <div>
            <label htmlFor="miniaturaInput">URL:</label>
            <input
              onChange={(evento) => atualizarPostagem(evento)}
              type="url"
              name="miniatura"
              id="miniaturaInput"
            />
          </div>

          <figure>
            <img
              src={postagem.miniatura}
              alt="preview da miniatura"
              onError={(evento) => miniaturaPadrao(evento)}
            />
          </figure>
        </div>
      </section>

      <section id="conteudo">
        <h4 id="previewTitulo">{postagem.titulo}</h4>
        <h5 id="previewSubtitulo">{postagem.subtitulo}</h5>

        <figure id="previewMiniatura">
          <img src={postagem.miniatura} alt="Miniatura da postagem" />
        </figure>

        <textarea
          ref={textAreaRef}
          onChange={(evento) => atualizarPostagem(evento)}
          name="conteudo"
          id="conteudoInput"
          placeholder="Conteúdo da postagem..."
          cols="30"
          rows="10"
        ></textarea>

        <button type="submit" id="botaoPostar">
          Postar
        </button>
      </section>
      <span id="squareBG"></span>
    </form>
  );
}

export default CriacaoPage;
