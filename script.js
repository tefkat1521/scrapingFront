async function cargarDatos() {
    try {
        const response = await fetch("https://am2xxr9k5i.execute-api.us-west-2.amazonaws.com/prod/public");//consume la api
        const data = await response.json();

        if (data && data.body) {
            const noticias = data.body.split('*****');//Separador

                mostrarNoticias(noticias[0], 'cdn-news');
                mostrarNoticias(noticias[1], 'elpais-news');
        }
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

function limpiarTexto(texto) {
    return texto
        .replace(/[\[\]"]/g, '')
        .replace(/^,\s*/, '')
        .replace(/,\s*$/, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function mostrarNoticias(noticiasText, containerId) {
    const container = document.getElementById(containerId);
    const noticias = noticiasText.trim().split('\n');

    container.innerHTML = noticias
        .filter(noticia => noticia.trim() !== '')
        .map(noticia => {
            const noticiaLimpia = limpiarTexto(noticia);
            return noticiaLimpia ? `<div class="news-item">${noticiaLimpia}</div>` : '';
        })
        .filter(noticia => noticia !== '')
        .join('');
}


document.addEventListener('DOMContentLoaded', cargarDatos);