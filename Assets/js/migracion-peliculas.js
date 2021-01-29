$(document).ready(function(){
    const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
    const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
    let seleccionActual;

    function obtenerPeliculas(url) {
        var request = $.ajax(url,{
            method: "GET"
        });
        request.done(function (response) {
            crearPeliculas(response.results);
        });
}
    function crearPeliculas (coleccionPeliculas){
        for(unaPelicula of coleccionPeliculas){
            let nuevaColumna = $('<div>').addClass('col');
            let nuevaCard = $('<div>').addClass('card h-100 shadow-sm');
            let imagen = $('<img>').addClass('card-img-top');
            if(unaPelicula.poster_path === null)
                imagen.attr('src','https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg');
            else
                imagen.attr('src',`${BASEURLIMG}${unaPelicula.poster_path}`);
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
    
    function eliminarPeliculasExistentes(){
        $("#wrapperPeliculas").html("");
    }

    function cargarPeliculasEnCartelera() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES&page=1`);        
    }
    function cargarPeliculasMejorValoradas() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=es-ES&page=1`);        
    }
    function cargarPeliculasAEstrenar() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=es-ES&page=1&region=US`);      
    }
    function cargarPeliculasMasPopulares() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`);
    }
    
    cargarPeliculasMejorValoradas(); // Carga la pagina con las peliculas mejor valoradas-

    $("#enCartelera").on('click',function () {
        if(seleccionActual != 'enCartelera'){
            eliminarPeliculasExistentes();
            cargarPeliculasEnCartelera();
        }
        seleccionActual = 'enCartelera';
    })
    
    $("#aEstrenar").on('click',function () {
        if(seleccionActual != 'aEstrenar'){
            eliminarPeliculasExistentes();
            cargarPeliculasAEstrenar();
        }
        seleccionActual = 'aEstrenar';
    })

    $("#populares").on('click',function () {
        if(seleccionActual != 'populares'){
            eliminarPeliculasExistentes();
            cargarPeliculasMasPopulares();
        }
        seleccionActual = 'populares';
    })

    $("#mejorValoradas").on('click',function () {
        if(seleccionActual != 'mejorValoradas'){
            eliminarPeliculasExistentes();
            cargarPeliculasMejorValoradas();
        }
        seleccionActual = 'mejorValoradas';
    })

});