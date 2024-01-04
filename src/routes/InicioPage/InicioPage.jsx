import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usuarioContext from '../../context/usuarioCont';
import { toast } from 'react-toastify';

import './InicioPage.css';
import logosInicio from '../../assets/logosInicio.png'
import Logo from '../../components/Logo/Logo';

function InicioPage() {
    const { usuario } = useContext(usuarioContext);
    const [ montado, setMontado ] = useState(false);
    const direcionar = useNavigate();

    const notifyLogado = () => toast('Novas postagens aguardam por você!', {
        type: 'info',
        autoClose: 5000,
    })

    const handleBotaoLogin = () => {
        direcionar('/login');
    }

    useEffect(() => {
        if(!montado) {
            setMontado(true);
        } else {
            if(usuario.username && usuario.token){
                notifyLogado();
            }
        }
    }, [montado, usuario.username, usuario.token]);

    return (
        <main id="inicioPage">
            <section id="bemVindo">
                <Logo/>
                <p>Sua comunidade apaixonada e focada em programação.</p>
            </section>
            <figure id="imgBG">
                <img src={logosInicio} alt="Apresentamos-lhe o InfoHud!"  />
            </figure>
            <section id="aproveite">
                <h2>
                    {
                        usuario.username 
                        ? `Bem-vindo(a) de volta, ${usuario.username}!`
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
                                <p>Faça login para fazer parte da comunidade InfoHud!</p>
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