async function cargarDatos() {
    try {
        const response = await fetch("https://am2xxr9k5i.execute-api.us-west-2.amazonaws.com/prod/public");
        const data = await response.json();

        if (data && data.body) {
            const noticias = data.body.split('*****');

            if (noticias.length >= 2) {
                mostrarNoticias(noticias[0], 'cdn-news');
                mostrarNoticias(noticias[1], 'elpais-news');
            }
        }
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

function mostrarNoticias(noticiasText, containerId) {
    const container = document.getElementById(containerId);
    const noticias = noticiasText.trim().split('\n');

    container.innerHTML = noticias
        .filter(noticia => noticia.trim() !== '')
        .map(noticia => `<div class="news-item">${noticia.trim()}</div>`)
        .join('');
}

// Cargar datos al iniciar la página
document.addEventListener('DOMContentLoaded', cargarDatos);