const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
const BASEURI = "https://api.themoviedb.org/3/";
const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const WRAPPERSERIES = document.getElementById('wrapperseries');
const BOTONEMISION = document.getElementById('enEmision');
const BOTONRECIENTES = document.getElementById('recientes');
const BOTONPOPULARES = document.getElementById('populares');
const BOTONMEJORVALORADAS = document.getElementById('mejorValoradas');
let serieJSON;
let series;

/* https://api.themoviedb.org/3/discover/movie?api_key=ab5eea38d623f059c3196ac7fb88a4c1&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1 series Populares*/
/* https://api.themoviedb.org/3/movie/now_playing?api_key=ab5eea38d623f059c3196ac7fb88a4c1&language=es-ES&page=1 En cartelera*/
function obtenerSeries(url, callback) {
    var response;
    response = new XMLHttpRequest();
    response.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this)
        }
    };
    response.open("GET", url, true);
    response.send();
}

function renderizasSeries(respuesta) {
    serieJSON = JSON.parse(respuesta.responseText);
    series = serieJSON.results;
    crearseries(series);
}

function crearseries(coleccionSeries) {
    for (let unaSerie of coleccionSeries) {
        /* Creo nueva col */
        let nuevaColumna = document.createElement('div')
        nuevaColumna.classList.add('col');
        WRAPPERSERIES.appendChild(nuevaColumna);
        /* Creo card */
        let nuevaCard = document.createElement('div');
        nuevaCard.classList.add('card');
        nuevaCard.classList.add('h-100');
        nuevaCard.classList.add('shadow-sm');
        nuevaColumna.appendChild(nuevaCard);
        /* Agrego imagen de la noticia */
        let imagen = document.createElement('img');
        imagen.src = `${BASEURLIMG}${unaSerie.poster_path}`;
        imagen.classList.add('card-img-top');
        nuevaCard.appendChild(imagen);
        /* Agrego card-body */
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        nuevaCard.appendChild(cardBody);
        /* Agrego titulo noticia */
        let tituloserie = document.createElement('h3');
        tituloserie.classList.add('card-title');
        if (unaSerie.media_type == "tv")
            tituloserie.innerHTML = unaSerie.name;
        else
            tituloserie.innerHTML = unaSerie.title;
        cardBody.appendChild(tituloserie);
        /* Agrego descripcion noticia */
        let sinopsis = document.createElement('p');
        sinopsis.classList.add('card-text');
        sinopsis.innerHTML = unaSerie.overview;
        cardBody.appendChild(sinopsis);
    }
}

function cargarSeriesEnEmision() {
    obtenerSeries(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=es-ES&page=1`, renderizasSeries);
}
function cargarSeriesRecientes() {
    obtenerSeries(`https://api.themoviedb.org/3/tv/latest?api_key=${APIKEY}&language=es-ES&page=2`, renderizasSeries);
}
function cargarSeriesMejorValoradas() {
    obtenerSeries(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=es-ES&page=1`, renderizasSeries);
}
function cargarSeriesMasPopulares() {
    obtenerSeries(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=es-ES&page=1`, renderizasSeries);
}

let seleccionActual = 'null'
BOTONEMISION.onclick = function (){
    if (seleccionActual != 'enCartelera') {
        eliminarseriesExistentes();
        cargarSeriesEnCartelera();
    }
    seleccionActual = 'enCartelera';
};

BOTONPOPULARES.onclick = function (){
    if (seleccionActual != 'populares') {
        eliminarseriesExistentes();
        cargarSeriesMasPopulares();
    }
    seleccionActual = 'populares';
};

BOTONRECIENTES.onclick = function (){
    if (seleccionActual != 'recientes') {
        eliminarseriesExistentes();
        cargarSeriesRecientes();
    }
    seleccionActual = 'recientes';
};
BOTONMEJORVALORADAS.onclick = function (){
    if (seleccionActual != 'mejorValoradas') {
        eliminarseriesExistentes();
        cargarSeriesMejorValoradas();
    }
    seleccionActual = 'mejorValoradas';
};

function eliminarseriesExistentes(){
    WRAPPERserieS.innerHTML = "";
}