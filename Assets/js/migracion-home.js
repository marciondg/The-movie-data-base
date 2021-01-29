$(document).ready(function(){
    const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
    const BASEURI = "https://api.themoviedb.org/3/";
    const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";

    var request = $.ajax({
        url : `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}`,
        method: "GET"
      });
    request.done(function (response) {
        console.log(response.results);
        crearPeliculas(response.results);
    });

function crearPeliculas (coleccionPeliculas){
    for(unaPelicula of coleccionPeliculas){
        let nuevaColumna = $('<div>').addClass('col');
        let nuevaCard = $('<div>').addClass('card h-100 shadow-sm');
        let imagen = $('<img>').addClass('card-img-top').attr('src',`${BASEURLIMG}${unaPelicula.poster_path}`);
        let cardBody = $('<div>').addClass('card-body');
        let tituloPelicula = $('<h3>').addClass('card-title');
        if(unaPelicula.media_type == "tv")
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

});