$(document).ready(function () {
    const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
    const BASEURI = "https://api.themoviedb.org/3/";
    const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";

    
    function obtenerPeliculas(url) {
        var request = $.ajax(url,{
            method: "GET"
        });
        request.done(function (response) {
            crearPeliculas(response.results);
        });
    }
    
    function crearPeliculas(coleccionPeliculas) {
        for (unaPelicula of coleccionPeliculas) {
            let nuevaColumna = $('<div>').addClass('col');
            let nuevaCard = $('<div>').addClass('card h-100 shadow-sm');
            let imagen = $('<img>').addClass('card-img-top').attr('src', `${BASEURLIMG}${unaPelicula.poster_path}`);
            let cardBody = $('<div>').addClass('card-body');
            let tituloPelicula = $('<h3>').addClass('card-title');
            if (unaPelicula.media_type == "tv")
            tituloPelicula.html(unaPelicula.name);
            else
            tituloPelicula.html(unaPelicula.title);
            let sinopsis = $('<p>').addClass('card-text');
            sinopsis.html(unaPelicula.overview);
            $("#wrapperPeliculas").append(nuevaColumna);
            $(nuevaColumna).append(nuevaCard);
            $(nuevaCard).append(imagen);
            $(nuevaCard).append(cardBody);
            $(cardBody).append(tituloPelicula);
            $(cardBody).append(sinopsis);
        }
    }
    
    obtenerPeliculas(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`);
    
    $("#botonBuscar").on('click',function (e) {
        e.preventDefault();
        let query = $("#inputBusqueda").val();
        if(query !="")
            buscar(query);        
    })

    function buscar (query){
        $("#wrapperPeliculas").html("");
        $("#tituloSeccion").html("Resultados");
        obtenerPeliculas(`https://api.themoviedb.org/3/search/multi?api_key=${APIKEY}&language=es-ES&query=${query}&page=1&include_adult=false`);
    }
});