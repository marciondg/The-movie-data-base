$(document).ready(function(){
    const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
    const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
    let seleccionActual;

    function obtenerSeries(url) {
        var request = $.ajax(url,{
            method: "GET"
        });
        request.done(function (response) {
            crearSeries(response.results);
        });
}
    function crearSeries (coleccionSeries){
        for(unaSerie of coleccionSeries){
            let nuevaColumna = $('<div>').addClass('col');
            let nuevaCard = $('<div>').addClass('card h-100 shadow-sm');
            let imagen = $('<img>').addClass('card-img-top');
            if(unaSerie.poster_path === null)
                imagen.attr('src','https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg');
            else
                imagen.attr('src',`${BASEURLIMG}${unaSerie.poster_path}`);
            let cardBody = $('<div>').addClass('card-body');
            let tituloSerie = $('<h3>').addClass('card-title');
            if(unaSerie.media_type == "tv")
                tituloSerie.html(unaSerie.name);
            else
                tituloSerie.html(unaSerie.title);
            let sinopsis = $('<p>').addClass('card-text');
            sinopsis.html(unaSerie.overview);
            $("#wrapperSeries").append(nuevaColumna);
            $(nuevaColumna).append(nuevaCard);
            $(nuevaCard).append(imagen);
            $(nuevaCard).append(cardBody);
            $(cardBody).append(tituloSerie);
            $(cardBody).append(sinopsis);
        }
    }
    
    function eliminarSeriesExistentes(){
        $("#wrapperSeries").html("");
    }

    function cargarSeriesEnEmision() {
        obtenerSeries(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=es-ES&page=1`);        
    }
    function cargarSeriesMejorValoradas() {
        obtenerSeries(`https://api.themoviedb.org/3/tv/top_rated?api_key=${APIKEY}&language=es-ES&page=1`);        
    }
    function cargarSeriesMasPopulares() {
        obtenerSeries(`https://api.themoviedb.org/3/tv/popular?api_key=${APIKEY}&language=es-ES&page=1`);
    }
    
    cargarSeriesMejorValoradas(); // Carga la pagina con las Series mejor valoradas-

    $("#enEmision").on('click',function () {
        if(seleccionActual != 'enEmision'){
            eliminarSeriesExistentes();
            cargarSeriesEnEmision();
        }
        seleccionActual = 'enEmision';
    })

    $("#populares").on('click',function () {
        if(seleccionActual != 'populares'){
            eliminarSeriesExistentes();
            cargarSeriesMasPopulares();
        }
        seleccionActual = 'populares';
    })

    $("#mejorValoradas").on('click',function () {
        if(seleccionActual != 'mejorValoradas'){
            eliminarSeriesExistentes();
            cargarSeriesMejorValoradas();
        }
        seleccionActual = 'mejorValoradas';
    })

});