import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import Logo from "../components/logo";

import "../styles/menuSuperior.css";

function menuSuperior() {
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

        <Link to={"contato"} className="">
          Contato
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

export default menuSuperior;
