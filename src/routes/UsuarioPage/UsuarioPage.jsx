import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUsuario } from "../../services/api/usuario";
import { buscarPosts } from "../../services/api/postagem";
import { toast } from "react-toastify";

import SpanPost from "../../components/SpanPost/SpanPost";
import IconErro from "../../components/IconErro/IconErro";

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
  const [usuarioInfos, setUsuarioInfos] = useState(infosIniciais);
  const { username } = useParams();
  const [perfilEditavel, setPerfilEditavel] = useState(false);
  const [montado, setMontado] = useState(false);

  const direcionar = useNavigate();

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

  useEffect(() => {
    carregarUsuario();
  }, []);

  return (
    <section id="usuarioPerfil">
      <section id="perfilInfos">
        <h4>{usuarioInfos.infos.username}</h4>
        <p>{usuarioInfos.infos.first_name}</p>
        <p>postagens: {usuarioInfos.postagens.length}</p>
        <p>Biografia:</p>
        <div id="perfilBiografia">
          <p>{usuarioInfos.infos.last_name}</p>
        </div>
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
