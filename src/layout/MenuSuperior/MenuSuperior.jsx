import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from 'react-toastify';

import { FaSearch } from "react-icons/fa";
import Logo from "../../components/Logo/Logo";

import "./MenuSuperior.css";

function MenuSuperior() {
  const [ montado, setMontado ] = useState(false);

  const notificar = () => toast('Novas postagens o aguardam!', {
    autoClose: 10000,
    closeOnClick: false,
  });

  useEffect(() => {
    if(!montado){
      setMontado(true);
    } else {
      notificar()
    }
  }, [montado]);
  
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

export default MenuSuperior;