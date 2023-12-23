import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioContext from '../../context/usuarioCont';

import './InicioPage.css';
import logosInicio from '../../assets/logosInicio.png'
import Logo from '../../components/Logo/Logo';

function InicioPage() {
    const { usuario } = useContext(usuarioContext);
    const direcionar = useNavigate();


    const handleBotaoLogin = () => {
        direcionar('/login');
    }

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
                <p>
                Aproveite a plataforma compartilhando conhecimento sobre sua área favorita da programação!
                </p>
                <div id='campoDeAcao'>
                    {
                        !usuario.username &&  (
                            <div>
                                <h4>Faça login login para fazer parte!</h4>
                                <button onClick={handleBotaoLogin}>Login</button>
                            </div>
                        )
                    }
                </div>
                <div id="square"></div>
            </section>
        </main>
    );
}

export default InicioPage;