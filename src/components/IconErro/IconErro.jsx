import './IconErro.css';
import icon from "../..//assets/iconErro.svg";

function IconErro({ mensagem }) {
  return (
    <span id="iconErro">
      <figure>
        <img src={icon} alt="Algo deu errado." />
      </figure>
      <h4>{mensagem}</h4>
    </span>
  );
}

export default IconErro;
