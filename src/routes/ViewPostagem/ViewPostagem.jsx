import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { buscarPosts, excluirPost } from "../../services/api/postagem";
import { toast } from "react-toastify";
import usuarioContext from "../../context/usuarioCont";

import imagePlaceholder from "../../assets/imagePlaceholder.png";
import iconExcluir from "../../assets/iconExcluir.svg";

import "./ViewPostagem.css";

const conteudoInicial = {
  id: undefined,
  titulo: "",
  subtitulo: "",
  conteudo: [],
  miniatura: "",
  categoria: "",
  criador: "",
};

function ViewPostagem() {
  const { usuario } = useContext(usuarioContext);
  const [conteudo, setConteudo] = useState(conteudoInicial);
  const [postagemEditavel, setPostagemEdital] = useState(false);
  const { id } = useParams();

  const direcionar = useNavigate();

  const verificarPostagemEditavel = (criador) => {
    setPostagemEdital(usuario.username === criador);
  };

  const buscarPostagem = async (id) => {
    const response = await buscarPosts({ id: id });

    switch (response) {
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
          id: response[0].id,
          titulo: response[0].titulo,
          subtitulo: response[0].subtitulo,
          conteudo: response[0].conteudo.split("\n"),
          miniatura: response[0].miniurl,
          categoria: response[0].categoria,
          criador: response[0].user_nickname,
        });

        verificarPostagemEditavel(response[0].user_nickname);
        break;
    }
  };

  const handleExclusao = async () => {
    const response = await excluirPost(conteudo.id);

    const idNotificar = toast.loading("Realizando exclusão de postagem...");

    switch (response) {
      case "accessoNãoAutorizado":
        toast.update(idNotificar, {
          type: "warning",
          isLoading: false,
          autoClose: 3000,
          closeOnClick: true,
          closeButton: true,
          render: "Você não tem autorização para esta ação.",
        });
        direcionar("/login");
        break;

      case undefined:
        toast.update(idNotificar, {
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
          render: "Postagem inexistente.",
        });
        direcionar("/postagens");
        break;

      case "serverError":
        toast.update(idNotificar, {
          type: "error",
          isLoading: false,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
          render: "Servidor inativo para esta ação.",
        });
        break;

      default:
        toast.update(idNotificar, {
          type: "success",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          closeOnClick: true,
          render: "Postagem excluída com sucesso!",
        });
        direcionar("/postagens");
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
        {postagemEditavel && (
          <button id="botaoExcluir" onClick={handleExclusao}>
            <img src={iconExcluir} alt="Excluir postagem" />
          </button>
        )}
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
