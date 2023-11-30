import PostItem from "./postItem";

import "../styles/vitrine.css"

function Vitrine () {
    const postsList = [
        {
            'id': 0,
            'titulo': 'Introdução á Redes',
            'subtitulo': 'Informações cruciis para o aprendizado em redes.',
            'subtexto': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam mollitia ipsa eveniet quia dolor esse fugiat porro quos dolorem nulla numquam fugit, quod accusamus dicta totam minus corporis iste voluptatibus.',
            'url': 'https://yata-apix-e013befb-de9c-4073-b80e-65d62c54a762.s3-object.locaweb.com.br/db9b30668823494182d59f6ee5e15a02.jpg'
        },
        {
            'id': 1,
            'titulo': 'Introdução ao ReactJS',
            'subtitulo': 'Apresentação e primeiros passos para o ReactJS.',
            'subtexto': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit cumque alias, et incidunt blanditiis consequatur omnis numquam quasi animi officiis ratione! Porro minima, quo nesciunt ducimus laborum quos sint blanditiis!',
            'url': 'https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg'
        },
        {
            'id': 2,
            'titulo': 'Introdução ao PostgreSLQ',
            'subtitulo': 'Criando seu banco de dados com PostgreSQL.',
            'subtexto': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatum exercitationem necessitatibus et? Modi placeat praesentium ad libero rem suscipit impedit facilis dolorum, dicta minus minima atque laudantium magnam autem!',
            'url': 'https://download.logo.wine/logo/PostgreSQL/PostgreSQL-Logo.wine.png'            
        }
    ]
    return(
        <section id="vitrine">
            {postsList.map(post => (
                <PostItem key={post.id} titulo={post.titulo} subtitulo={post.subtitulo} subtexto={post.subtexto} urlImagem={post.url}/>
            ))}
        </section>
    );
}

export default Vitrine;