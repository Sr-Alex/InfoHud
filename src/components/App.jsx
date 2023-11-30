import MenuSuperior from './menuSuperior.jsx';
import MenuPesquisa from './menuPesquisa.jsx'
import Vitrine from './vitrine.jsx';

function App() {
  return (
    <>
      <MenuSuperior/>
      <main>
        <MenuPesquisa/>
        <Vitrine/>
      </main>
    </>
  );
}

export default App;
