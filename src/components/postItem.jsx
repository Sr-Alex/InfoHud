import "../styles/index.css"
import "../styles/postItem.css"

function PostItem ({titulo, subtitulo, subtexto, urlImagem}) {
    return (
        <div className="postItem">
            <figure className="miniature">
                <img src={urlImagem} alt={"imagem do post " + titulo} />
            </figure>
            
            <section className="postContent">
                <h4>{titulo}</h4>
                <h5>{subtitulo}</h5>
                <p>{subtexto}</p>
            </section>
        </div>
    );
}

export default PostItem;