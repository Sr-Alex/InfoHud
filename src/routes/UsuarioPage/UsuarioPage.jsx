import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsuario, updateUsuario } from "../../services/api/usuario";
import { buscarPosts } from "../../services/api/postagem";
import { toast } from "react-toastify";
import usuarioContext from "../../context/usuarioCont";

import SpanPost from "../../components/SpanPost/SpanPost";
import IconErro from "../../components/IconErro/IconErro";

import IconEditar from "../../assets/iconEditar.svg";
import IconFechar from "../../assets/iconFechar.svg";
import "./UsuarioPage.css";

const infosIniciais = {
  infos: {
    username: "",
    first_name: "",
    email: "",
    last_name: "",
  },
  postagens: [],
};

function UsuarioPage() {
  const { usuario } = useContext(usuarioContext);
  const { username } = useParams();

  const [usuarioInfos, setUsuarioInfos] = useState(infosIniciais);
  const [perfilEditavel, setPerfilEditavel] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [camposAlterados, setCamposAlterados] = useState({});

  const direcionar = useNavigate();

  const toogleModoEditar = () => {
    setModoEditar(!modoEditar);
  };

  const handleCamposAlterados = (evento) => {
    let [campo, valor] = [evento.target.name, evento.target.value];
    if (valor) {
      setCamposAlterados({
        ...camposAlterados,
        [campo]: valor,
      });
    }
  };

  const carregarUsuario = async () => {
    const usuario = await fetchUsuario(username);
    const postagens = await buscarPosts(username);

    switch (usuario) {
      case undefined:
        toast("Usuário Inexistente.", {
          type: "error",
          autoClose: 3000,
          closeOnClick: true,
          closeButton: true,
        });
        direcionar("/postagens");
        break;

      case "serverError":
        toast("Servidor inativo para esta ação.", {
          type: "error",
          autoClose: 5000,
          closeOnClick: true,
        });
        direcionar("/postagens");
        break;

      default:
        setUsuarioInfos({
          ...usuarioInfos,
          infos: usuario,
          postagens: Array.isArray(postagens) ? postagens : [],
        });
        break;
    }
  };
  const handlePatchUsuario = (evento) => {
    evento.preventDefault();
    const response = updateUsuario(
      usuario.username,
      usuario.token,
      camposAlterados
    );
    const idNotificar = toast.loading("Atualizando informações de usuário....");
    switch (response) {
      case "accessoNãoAutorizado":
        toast.update(idNotificar, {
          type: "warning",
          isLoading: false,
          autoClose: 3000,
          closeButton: true,
          closeOnClick: true,
          render:
            "Você não possui autorização para atualizar informações de usuário.",
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
          render: "Usuário inexistente.",
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
          render: "Informações usuário atualizada com sucesso!",
        });
        toogleModoEditar();
        direcionar('/usuario/' + usuarioInfos.infos.username);
        break;
    }
  };

  useEffect(() => {
    carregarUsuario();
    if (!perfilEditavel && usuario.username === usuarioInfos.infos.username) {
      setPerfilEditavel(true);
    }
  }, []);

  return (
    <section id="usuarioPerfil">
      <section id="perfilContainer">
        {perfilEditavel && (
          <button id="botaoEditar" onClick={toogleModoEditar}>
            <img
              src={modoEditar ? IconFechar : IconEditar}
              alt="Alternar modo ediçao."
            />
          </button>
        )}
        {perfilEditavel && modoEditar ? (
          <form id="updateUsuario">
            <h4>{usuarioInfos.infos.username}</h4>
            <div>
              <label htmlFor="formNome">Nome completo:</label>
              <input
                type="text"
                name="first_name"
                id="formNome"
                placeholder={
                  usuarioInfos.infos.first_name
                    ? usuarioInfos.infos.first_name
                    : "Informe seu nome..."
                }
                onChange={(evento) => handleCamposAlterados(evento)}
              />
            </div>
            <div>
              <label htmlFor="formBiografia">Biografia:</label>
              <textarea
                name="last_name"
                id="formBiografia"
                cols="30"
                rows="5"
                maxLength={150}
                placeholder={
                  usuarioInfos.infos.last_name
                    ? usuarioInfos.infos.last_name
                    : "Escreva uma curta biografia para seu perfil..."
                }
                onChange={(evento) => handleCamposAlterados(evento)}
              ></textarea>
            </div>
            <button
              type="submit"
              id="botaoAtualizarUsuario"
              onClick={(evento) => handlePatchUsuario(evento)}
            >
              Atualizar
            </button>
          </form>
        ) : (
          <section id="perfilInfos">
            <h4>{usuarioInfos.infos.username}</h4>
            <p>{usuarioInfos.infos.first_name}</p>
            <p>postagens: {usuarioInfos.postagens.length}</p>
            <p>Biografia:</p>
            <div id="perfilBiografia">
              <p>{usuarioInfos.infos.last_name}</p>
            </div>
          </section>
        )}
      </section>
      <section id="perfilPosts">
        <h4>Suas Postagens:</h4>
        <ul>
          {usuarioInfos.postagens.length ? (
            usuarioInfos.postagens.map((post) => (
              <SpanPost
                key={post.id}
                titulo={post.titulo}
                subtitulo={post.subtitulo}
                conteudo={post.conteudo}
                miniatura={post.miniurl}
                categoria={post.categoria}
                criador={post.user_nickname}
              />
            ))
          ) : (
            <IconErro mensagem="Este usuário ainda não criou nenhuma postagem." />
          )}
        </ul>
      </section>
    </section>
  );
}

export default UsuarioPage;
