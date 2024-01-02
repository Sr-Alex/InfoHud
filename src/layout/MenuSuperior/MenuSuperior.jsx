import { useContext } from "react";
import { Link } from "react-router-dom";
import usuarioContext from "../../context/usuarioCont";

import { FaSearch } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

import "./MenuSuperior.css";

function MenuSuperior() {
  const { usuario } = useContext(usuarioContext);

  return (
    <header id="menuSuperior">
      <Logo />
      <nav id="navigation">
        <Link to={"/"} className="">
          Início
        </Link>

        <Link to={"postagens"} className="">
          Postagens
        </Link>

        <Link to={usuario.username ? '/usuario/' + usuario.username : '/login'} className="">
          Perfil
        </Link>
      </nav>
      <div id="pesquisar">
        <input
          type="search"
          name="searcher"
          id="searcher"
          placeholder="Pesquisar por post..."
        />
        <button>
          <FaSearch />
        </button>
      </div>
    </header>
  );
}

export default MenuSuperior;