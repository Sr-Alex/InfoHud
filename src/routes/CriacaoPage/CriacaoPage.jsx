import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import usuarioContext from "../../context/usuarioCont";

import "./CriacaoPage.css";
import imagePlaceholder from "../../assets/imagePlaceholder.png";
import { validarPost } from "../../services/validadores";

function valoresIniciais() {
  return {
    titulo: "",
    subtitulo: "",
    miniatura: "",
    conteudo: "",
    criador: "",
  };
}

function CriacaoPage() {
  const { usuario } = useContext(usuarioContext);
  const [postagem, setPostagem] = useState(valoresIniciais());
  const direcionar = useNavigate();
  const textAreaRef = useRef("");

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "0px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const verificarUsuario = () => {
    if (usuario.token) {
      for (const campo in Object.values(usuario)) {
        if (!campo) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  };

  const atualizarPostagem = (evento) => {
    const [campo, valor] = [evento.target.name, evento.target.value];
    setPostagem({
      ...postagem,
      [campo]: valor,
    });
  };

  const handleMiniaturaError = (evento) => {
    evento.target.src = imagePlaceholder;
    setPostagem({
      ...postagem,
      miniatura: imagePlaceholder,
    });
  };

  const postar = (evento) => {
    evento.preventDefault();
    if (verificarUsuario()) {
      const upPost = validarPost({
        ...postagem,
        token: usuario.token,
        criador: usuario.username,
      });

      switch (upPost) {
        case "accessoNãoAutorizado":
          return console.error("Você não possui autorização para postar.");

        case "serverError":
          return console.error("Servidor inativo para esta ação.");

        default:
          console.log("Post criado com sucesso!");
          return direcionar("/postagens");
      }
    } else {
      return direcionar("/login");
    }
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
              onError={(evento) => handleMiniaturaError(evento)}
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
