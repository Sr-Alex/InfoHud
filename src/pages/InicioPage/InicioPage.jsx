import { useContext } from 'react';
import Logo from '../../components/logo';
import usuarioContext from '../../context/usuarioCont';

import './InicioPage.css';
import logosInicio from '../../images/logosInicio.png'

function InicioPage() {

    const { usuario } = useContext(usuarioContext);

    return (
        <main id="inicioPage">
            <section id="bemVindo">
                <Logo/>
                <p>Sua comunidade apaixonada e focada em programação</p>
            </section>
            <figure id="imgBG">
                <img src={logosInicio} alt="Apresentamos-lhe o InfoHud!"  />
            </figure>
            <section id="aproveite">
                <h2>
                    {
                        usuario.apelido 
                        ? `Bem-vindo(a) de volta, ${usuario.apelido}!`
                        : 'Bem-vindo(a)!'
                    }
                </h2>
                <div id='campoNotificacao'></div>
                <p>
                Aproveite a plataforma compartilhando conhecimento sobre sua área favorita da programação!
                </p>
                <div id="square"></div>
            </section>
        </main>
    );
}

export default InicioPage;