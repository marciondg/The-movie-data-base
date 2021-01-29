const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
const BASEURI = "https://api.themoviedb.org/3/";
const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
const WRAPPERSERIES = document.getElementById('wrapperSeries');
const BOTONEMISION = document.getElementById('enEmision');
const BOTONPOPULARES = document.getElementById('populares');
const BOTONMEJORVALORADAS = document.getElementById('mejorValoradas');
let serieJSON;
let series;

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
        tituloserie.innerHTML = unaSerie.name;
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

function cargarSeriesMejorValoradas() {
    obtenerSeries(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=es-ES&page=1`, renderizasSeries);
}

function cargarSeriesMasPopulares() {
    obtenerSeries(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=es-ES&page=1`, renderizasSeries);
}

/*Carga por defecto las series de la primer opción para que el sitio no esté vacío*/
window.onload = function() {
    cargarSeriesMejorValoradas();
};
let seleccionActual = 'mejorValoradas';

BOTONEMISION.onclick = function() {
    if (seleccionActual != 'enCartelera') {
        eliminarseriesExistentes();
        cargarSeriesEnEmision();
    }
    seleccionActual = 'enEmision';
};

BOTONPOPULARES.onclick = function() {
    if (seleccionActual != 'populares') {
        eliminarseriesExistentes();
        cargarSeriesMasPopulares();
    }
    seleccionActual = 'populares';
};

BOTONMEJORVALORADAS.onclick = function() {
    if (seleccionActual != 'mejorValoradas') {
        eliminarseriesExistentes();
        cargarSeriesMejorValoradas();
    }
    seleccionActual = 'mejorValoradas';
};

function eliminarseriesExistentes() {
    WRAPPERSERIES.innerHTML = "";
}

//Validaciones form 

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
});


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()
