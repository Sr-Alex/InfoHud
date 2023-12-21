import { useNavigate } from "react-router-dom";
import { useContext, useRef } from "react";
import usuarioContext from "../context/usuarioCont";

import "../styles/menuLateral.css";

function MenuLateral({ state, setState, resetPosts }) {
  const { usuario } = useContext(usuarioContext);
  const inputPesquisar = useRef();
  const direcionar = useNavigate();

  const handleBotaoCriacao = () => {
    if (usuario.token && usuario.username){
      return direcionar('/postagens/criar');
    }
  };

  const handleBotaoBuscar = () => {
    const filtroValor = inputPesquisar.current.value;
    console.log(state);
    if (filtroValor.trim()) {
      setState(
        state.filter(item => item.titulo.toLowerCase().includes(filtroValor)
        || item.subtitulo.toLowerCase().includes(filtroValor)
        || item.conteudo.toLowerCase().includes(filtroValor)
        || item.user_nickname.includes(filtroValor))
      );
    }else {
      inputPesquisar.current.value = '';
      resetPosts();
    }
  }

  return (
    <nav id="menuLateral">
      <h3>Filtrar postagens</h3>
      <h4>Categorias</h4>
      <section id="categoriasLateral">
        <div>
          <input type="checkbox" name="redes" id="redes" />
          <label htmlFor="redes">Redes</label>
        </div>
        <div>
          <input type="checkbox" name="web" id="web" />
          <label htmlFor="web">Web</label>
        </div>
        <div>
          <input type="checkbox" name="mobile" id="mobile" />
          <label htmlFor="mobile">Mobile</label>
        </div>
        <div>
          <input type="checkbox" name="machineL" id="machineL" />
          <label htmlFor="machineL">Machine Learning</label>
        </div>
      </section>
      <h4>Procurar por</h4>
      <section id="pesquisarLateral">
        <input
          ref={inputPesquisar}
          type="search"
          name="searchPost"
          id="searchPost"
          placeholder="Procurar por..."
        />
        <button type="button" onClick={handleBotaoBuscar}>Pesquisar</button>
      </section>
      <h4>Crie uma postagem !</h4>
      <section id="criarPost">
        <button type="button" onClick={handleBotaoCriacao}>
          Criar
        </button>
      </section>
    </nav>
  );
}

export default MenuLateral;
