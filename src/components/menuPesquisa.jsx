import Botao from './botao';

import '../styles/index.css'
import '../styles/menuPesquisa.css'

function MenuPesquisa () {
    return (
        <nav id="menuPesquisa">
            <h5>
                Categorias
            </h5>
            <form id='postFilter-checkbox-container'>
                <div>
                    <input type="checkbox" name="redes-checkbox" id="redes-checkbox" />
                    <label htmlFor="redes-checkbox">Redes</label>                  
                </div>
                <div>
                    <input type="checkbox" name="web-checkbox" id="web-checkbox" />
                    <label htmlFor="redes-checkbox">Web</label>  
                </div>
                <div>
                    <input type="checkbox" name="mobile-checkbox" id="mobile-checkbox" />
                    <label htmlFor="mobile-checkbox">Mobile</label>
                </div>
                <div>
                    <input type="checkbox" name="ml-checkbox" id="ml-checkbox" />
                    <label htmlFor="ml-checkbox">Machine Learning</label>
                </div>
            </form>
            <h5>
                Pesquisar
            </h5>
            <form id='postFilter-search-container'>
                <input type="search" name="filterPost-search" id="postFilter-search" placeholder='Procurar por...' />
                <Botao text='Pesquisar'/>
            </form>
        </nav>
    );
}

export default MenuPesquisa;