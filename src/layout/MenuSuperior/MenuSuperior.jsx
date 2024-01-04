import { useContext } from "react";
import { Link } from "react-router-dom";
import usuarioContext from "../../context/usuarioCont";

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
    </header>
  );
}

export default MenuSuperior;