import '../styles/iconVazio.css';
import icon from "../assets/iconVazio.svg";

function IconVazio({ mensagem }) {
  return (
    <span id="iconVazio">
      <figure>
        <img src={icon} alt="Vazio" />
      </figure>
      <h4>{mensagem}</h4>
    </span>
  );
}

export default IconVazio;
