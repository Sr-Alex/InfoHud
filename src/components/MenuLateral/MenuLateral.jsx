import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import usuarioContext from "../../context/usuarioCont";
import { toast } from "react-toastify";

import "./MenuLateral.css";

const filtroInicial = {
  criador: "",
  categoria: "",
};

function MenuLateral({ carregarPosts }) {
  const [filtro, setFiltro] = useState(filtroInicial);
  const { usuario } = useContext(usuarioContext);
  const inputPesquisar = useRef();
  const direcionar = useNavigate();

  const handleBotaoCriacao = () => {
    if (usuario.token && usuario.username) {
      return direcionar("/postagens/criar");
    }
    toast("Você precisa estar logado para criar uma postagem!", {
      type: "warning",
      autoClose: 3000,
      closeOnClick: true,
    });
  };

  const atualizarFiltro = (evento) => {
    setFiltro({
      ...filtro,
      criador: inputPesquisar.current.value,
      categoria: evento.target.value,
    });
  };

  const handleBotaoBuscar = () => {
    setFiltro({
      ...filtro,
      criador: inputPesquisar.current.value
    });
    carregarPosts({craidor: filtro.criador, categoria: filtro.categoria})
  };

  return (
    <nav id="menuLateral">
      <h3>Filtrar postagens</h3>
      <h4>Categorias:</h4>
      <section id="categoriasLateral">
        <div>
          <input
            type="radio"
            name="categoria"
            value=""
            id="todos"
            onChange={(evento) => atualizarFiltro(evento)}
          />
          <label htmlFor="redes">Todos</label>
        </div>
        <div>
          <input
            type="radio"
            name="categoria"
            value="Redes"
            id="redes"
            onChange={(evento) => atualizarFiltro(evento)}
          />
          <label htmlFor="redes">Redes</label>
        </div>
        <div>
          <input
            type="radio"
            name="categoria"
            value="Web"
            id="web"
            onChange={(evento) => atualizarFiltro(evento)}
          />
          <label htmlFor="web">Web</label>
        </div>
        <div>
          <input
            type="radio"
            name="categoria"
            value="Mobile"
            id="mobile"
            onChange={(evento) => atualizarFiltro(evento)}
          />
          <label htmlFor="mobile">Mobile</label>
        </div>
        <div>
          <input
            type="radio"
            name="categoria"
            value="Machine Learning"
            id="machineL"
            onChange={(evento) => atualizarFiltro(evento)}
          />
          <label htmlFor="machineL">Machine Learning</label>
        </div>
      </section>
      <h4>Procurar posts por criador:</h4>
      <section id="pesquisarLateral">
        <input
          ref={inputPesquisar}
          type="search"
          name="criador"
          id="searchPost"
          placeholder="Procurar por..."
        />
        <button type="button" onClick={handleBotaoBuscar}>
          Pesquisar
        </button>
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
