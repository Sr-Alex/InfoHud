import { Link } from "react-router-dom";

import "../styles/menuSuperior.css";
import { FaSearch } from "react-icons/fa";

function menuSuperior() {
  return (
    <header id="menuSuperior">
      <h1 id="logo">
        Info<span>Hud</span>
      </h1>
      <nav id="navigation">
        <Link to="/" className="">
          Início
        </Link>

        <Link to="postagens" className="">
          Postagens
        </Link>

        <Link to="contato" className="">
          Contato
        </Link>
      </nav>
      <div id="pesquisar">
        <input type="search" name="searcher" id="searcher" />
        <button>
          <FaSearch />
        </button>
      </div>
    </header>
  );
}

export default menuSuperior;
