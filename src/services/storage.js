export function loginAutomatico(setState) {
    const usuarioStorage = JSON.parse(localStorage.getItem('usuarioStorage'));
    if (usuarioStorage && Object.values(usuarioStorage).every(campo => campo)){
        console.log('Login automático efetuado.')
        return setState(usuarioStorage);
    }
}   

export function salvarUsuario(infos) {
    if (Object.values(infos).every(campo => campo)){
        console.log('Login atualizado.');
        localStorage.setItem('usuarioStorage', JSON.stringify(infos));
    }
}