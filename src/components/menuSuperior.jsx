import { FaSearch } from "react-icons/fa";

import "../styles/index.css"
import "../styles/menuSuperior.css"

function MenuSuperior () {
    return (
        <header id="menuSuperior">
            <div id="logo">
                <h1>Info<span>Hud</span></h1>
            </div>
                
            <nav>
                <div id="anchor">
                    <a href="#" style={{color: '#1E7387', textDecoration: 'underline'}}>Início</a>
                    <a href="#">Categorias</a>
                    <a href="#">Sobre</a>
                </div>
                <div id="pesquisar">
                    <input type="search" name="inputPesquisar" id="inputPesquisar" placeholder="procurar por..." />
                    <button>
                        <FaSearch/>
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default MenuSuperior;