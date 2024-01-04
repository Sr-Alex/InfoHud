import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import usuarioContext from "../../context/usuarioCont";

import "./CriarPostPage.css";
import imagePlaceholder from "../../assets/imagePlaceholder.png";
import { validarPost } from "../../services/validadores";
import { toast } from "react-toastify";

const valoresIniciais = {
  titulo: "",
  subtitulo: "",
  miniatura: "",
  categoria: "",
  conteudo: "",
  criador: "",
};

function CriarPostPage() {
  const { usuario } = useContext(usuarioContext);
  const [postagem, setPostagem] = useState(valoresIniciais);
  const direcionar = useNavigate();
  const textAreaRef = useRef("");

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "0px";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  const verificarUsuario = () => Object.values(usuario).every((campo) => campo);

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
      const notificarId = toast.loading("Criando postagem...");

      validarPost({
        ...postagem,
        token: usuario.token,
        criador: usuario.username,
      }).then((res) => {
        switch (res) {
          case "badRequest":
            toast.update(notificarId, {
              type: "warning",
              render: "Preencha tods os campos para postar.",
              isLoading: false,
              closeOnClick: true,
              autoClose: 3000,
            });
            return console.error("Preencha os campos todos os campos.");

          case "accessoNãoAutorizado":
            toast.update(notificarId, {
              type: "warning",
              render: "Você não possui autorização para postar.",
              isLoading: false,
              closeOnClick: true,
              autoClose: 5000,
            });
            console.error("Você não possui autorização para postar.");
            return direcionar("/login");

          case "serverError":
            toast.update(notificarId, {
              type: "error",
              render: "Servidor inativo para esta ação.",
              isLoading: false,
              autoClose: 5000,
            });
            return console.error("Servidor inativo para esta ação.");

          default:
            toast.update(notificarId, {
              type: "success",
              render: "Postagem criada com sucesso!",
              isLoading: false,
              closeOnClick: true,
              autoClose: 3000,
            });
            return direcionar("/postagens");
        }
      });
    } else {
      return direcionar("/login");
    }
  };

  useEffect(resizeTextArea, [postagem.conteudo]);

  return (
    <form onSubmit={(evento) => postar(evento)} id="criarPostPage">
      <section id="cabecalho">
        <h4>Criar postagem:</h4>

        <label htmlFor="selectCategoria">Categoria da postagem:</label>
        <div id="selectCategoria">
          <div>
            <input
              type="radio"
              name="categoria"
              className="radioCategoria"
              id="radioRedes"
              value="Redes"
              onChange={evento => atualizarPostagem(evento)}
            />
            <label htmlFor="radioRedes">Redes</label>
          </div>
          <div>
            <input
              type="radio"
              name="categoria"
              className="radioCategoria"
              id="radioWeb"
              value="Web"
              onChange={evento => atualizarPostagem(evento)}
            />
            <label htmlFor="radioWeb">Web</label>
          </div>
          <div>
            <input
              type="radio"
              name="categoria"
              className="radioCategoria"
              id="radioMobile"
              value="Mobile"
              onChange={evento => atualizarPostagem(evento)}
            />
            <label htmlFor="radioMobile">Mobile</label>
          </div>
          <div>
            <input
              type="radio"
              name="categoria"
              className="radioCategoria"
              id="radioML"
              value="Machine Learning"
              onChange={evento => atualizarPostagem(evento)}
            />
            <label htmlFor="radioML">Machine Learning</label>
          </div>
        </div>

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

export default CriarPostPage;
