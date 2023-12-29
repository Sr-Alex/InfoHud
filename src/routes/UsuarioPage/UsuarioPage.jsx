import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsuario } from "../../services/api/usuario";
import { buscarPosts } from "../../services/api/postagem";

import SpanPost from "../../components/SpanPost/SpanPost";

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

  const carregarUsuario = async () => {
    console.log("request");
    setUsuarioInfos({
      infos: await fetchUsuario(username),
      postagens: await buscarPosts(username),
    });
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
          {usuarioInfos.postagens.length &&
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
            ))}{" "}
        </ul>
      </section>
    </section>
  );
}

export default UsuarioPage;
