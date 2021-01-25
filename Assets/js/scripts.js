const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
const BASEURI = "https://api.themoviedb.org/3/";
const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const WRAPPERPELICULAS = document.getElementById('wrapperPeliculas');
let peliculaJSON;
let peliculas;

/* https://api.themoviedb.org/3/trending/all/week?api_key=ab5eea38d623f059c3196ac7fb88a4c1 Obtener Tendencias */
/* https://api.themoviedb.org/3/discover/movie?api_key=ab5eea38d623f059c3196ac7fb88a4c1&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 Peliculas Populares*/
function obtenerPeliculas(url,callback) {
    var response;
    response = new XMLHttpRequest();
    response.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this)
        }
    };
    response.open("GET", url, true);
    response.send();
}


function renderizarPeliculas(respuesta) {
    peliculaJSON = JSON.parse(respuesta.responseText);
    peliculas = peliculaJSON.results;
    crearPeliculaHTML(peliculas);
}
function renderizarTendencias(respuesta) {
    peliculaJSON = JSON.parse(respuesta.responseText);
    peliculas = peliculaJSON.results;
    crearTendencias(peliculas);
}

function crearPeliculaHTML(coleccionPeliculas) {
    for (let unaPelicula of coleccionPeliculas) {
        /* Creo nueva col */
        let nuevaColumna = document.createElement('div')
        nuevaColumna.classList.add('col');
        WRAPPERPELICULAS.appendChild(nuevaColumna);
        /* Creo card */
        let nuevaCard = document.createElement('div');
        nuevaCard.classList.add('card');
        nuevaCard.classList.add('h-100');
        nuevaCard.classList.add('shadow-sm');
        nuevaColumna.appendChild(nuevaCard);
        /* Agrego imagen de la noticia */
        let imagen = document.createElement('img');
        imagen.src = `${BASEURLIMG}${unaPelicula.poster_path}`;
        imagen.classList.add('card-img-top');
        nuevaCard.appendChild(imagen);
        /* Agrego card-body */
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        nuevaCard.appendChild(cardBody);
        /* Agrego titulo noticia */
        let tituloPelicula = document.createElement('h3');
        tituloPelicula.classList.add('card-title');
        tituloPelicula.innerHTML = unaPelicula.title;
        cardBody.appendChild(tituloPelicula);
        /* Agrego descripcion noticia */
        let sinopsis = document.createElement('p');
        sinopsis.classList.add('card-text');
        sinopsis.innerHTML = unaPelicula.overview;
        cardBody.appendChild(sinopsis);
    }
}

function crearTendencias(coleccionPeliculas) {
    for (let unaPelicula of coleccionPeliculas) {
        /* Creo nueva col */
        let nuevaColumna = document.createElement('div')
        nuevaColumna.classList.add('col');
        WRAPPERPELICULAS.appendChild(nuevaColumna);
        /* Creo card */
        let nuevaCard = document.createElement('div');
        nuevaCard.classList.add('flip-card');
        nuevaColumna.appendChild(nuevaCard);
        let cardInner = document.createElement('div');
        cardInner.classList.add('flip-card-inner');
        nuevaCard.appendChild(cardInner);
        let cardFront = document.createElement('div');
        cardFront.classList.add('flip-card-front');
        cardInner.appendChild(cardFront);
        /* Agrego imagen de la noticia */
        let imagen = document.createElement('img');
        imagen.src = `${BASEURLIMG}${unaPelicula.poster_path}`;
        imagen.style="width:300px;height:300px;"
        cardFront.appendChild(imagen);
        let cardBack = document.createElement('div');
        cardBack.classList.add('flip-card-back');
        cardInner.appendChild(cardBack);
        let tituloPelicula = document.createElement('h3');
        if(unaPelicula.media_type == "tv")
            tituloPelicula.innerHTML = unaPelicula.name;
        else
            tituloPelicula.innerHTML = unaPelicula.title;
        cardBack.appendChild(tituloPelicula);
        /* Agrego descripcion noticia */
        let sinopsis = document.createElement('p');
        sinopsis.classList.add('card-text');
        if(unaPelicula.overview.length>355)
            sinopsis.innerHTML = `${unaPelicula.overview.substring(0,355)}...`;
        else
            sinopsis.innerHTML = unaPelicula.overview;
        cardBack.appendChild(sinopsis);
    }
}

function cargarTendencias(){
    obtenerPeliculas(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`,renderizarTendencias);
}
