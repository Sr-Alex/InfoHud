import "../styles/menuLateral.css";

function MenuLateral() {
  return (
    <nav id="menuLateral">
      <h3>Filtrar postagens</h3>
      <h4>Categorias</h4>
      <section id="categoriasLateral">
        <div>
          <input type="checkbox" name="redes" id="redes" />
          <label htmlFor="redes">Redes</label>
        </div>
        <div>
          <input type="checkbox" name="web" id="web" />
          <label htmlFor="web">Web</label>
        </div>
        <div>
          <input type="checkbox" name="mobile" id="mobile" />
          <label htmlFor="mobile">Mobile</label>
        </div>
        <div>
          <input type="checkbox" name="machineL" id="machineL" />
          <label htmlFor="machineL">Machine Learning</label>
        </div>
      </section>
      <h4>Procurar por</h4>
      <section id="pesquisarLateral">
        <input
          type="search"
          name="searchPost"
          id="searchPost"
          placeholder="Procurar por..."
        />
        <button type="button">Pesquisar</button>
      </section>
    </nav>
  );
}

export default MenuLateral;
