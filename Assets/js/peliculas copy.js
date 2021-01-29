$(document).ready(function() {

    const APIKEY = "ab5eea38d623f059c3196ac7fb88a4c1";
    const BASEURI = "https://api.themoviedb.org/3/";
    const BASEURLIMG = "https://www.themoviedb.org/t/p/w600_and_h900_bestv2";
    const WRAPPERPELICULAS = document.getElementById('wrapperPeliculas');
    /*const BOTONCARTELERA = document.getElementById('enCartelera');
    const BOTONAESTRENAR = document.getElementById('aEstrenar');
    const BOTONPOPULARES = document.getElementById('populares');
    const BOTONMEJORVALORADAS = document.getElementById('mejorValoradas');
    let peliculaJSON;
    let peliculas;*/

    /*function obtenerPeliculas(url, callback) {
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

    function renderizarPeliculas(respuesta) {
        peliculaJSON = JSON.parse(respuesta.responseText);
        peliculas = peliculaJSON.results;
        crearPeliculas(peliculas);
    }*/

    function obtenerPeliculas(url) {
        var respuesta;
        respuesta = $.ajax({
            url,
            method: "GET",
        });
        respuesta.done(function(response) {
            crearPeliculas(response.results);
        });

    }

    function crearPeliculas(coleccionPeliculas) {
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
            if (unaPelicula.poster_path === null)
                imagen.src = "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";
            else
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
            if (unaPelicula.media_type == "tv")
                tituloPelicula.innerHTML = unaPelicula.name;
            else
                tituloPelicula.innerHTML = unaPelicula.title;
            cardBody.appendChild(tituloPelicula);
            /* Agrego descripcion noticia */
            let sinopsis = document.createElement('p');
            sinopsis.classList.add('card-text');
            sinopsis.innerHTML = unaPelicula.overview;
            cardBody.appendChild(sinopsis);
        }
    }

    function cargarPeliculasEnCartelera() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=es-ES&page=1`);
    }

    function cargarPeliculasAEstrenar() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=es-ES&page=1&region=US`);
    }

    function cargarPeliculasMejorValoradas() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=es-ES&page=1`);
    }

    function cargarPeliculasMasPopulares() {
        obtenerPeliculas(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=es-ES&page=1`);
    }

    /*Carga por defecto las peliculas de la primer opción para que el sitio no esté vacío*/
    /*window.onload = function() {
        cargarPeliculasMejorValoradas();
    };
    let seleccionActual = 'mejorValoradas';*/

    $(document).ready(function() {
        cargarPeliculasMejorValoradas();
    });
    let seleccionActual = 'mejorValoradas';


    /*BOTONCARTELERA.onclick = function() {
        if (seleccionActual != 'enCartelera') {
            eliminarPeliculasExistentes();
            cargarPeliculasEnCartelera();
        }
        seleccionActual = 'enCartelera';
    };*/

    $("#enCartelera").click(function() {
        if (seleccionActual != 'enCartelera') {
            eliminarPeliculasExistentes();
            cargarPeliculasEnCartelera();
        }
        seleccionActual = 'enCartelera';
    });

    /*BOTONPOPULARES.onclick = function() {
        if (seleccionActual != 'populares') {
            eliminarPeliculasExistentes();
            cargarPeliculasMasPopulares();
        }
        seleccionActual = 'populares';
    };*/

    $("#populares").click(function() {
        if (seleccionActual != 'populares') {
            eliminarPeliculasExistentes();
            cargarPeliculasMasPopulares();
        }
        seleccionActual = 'populares';
    });

    /*BOTONAESTRENAR.onclick = function() {
        if (seleccionActual != 'aEstrenar') {
            eliminarPeliculasExistentes();
            cargarPeliculasAEstrenar();
        }
        seleccionActual = 'aEstrenar';
    };*/

    $("#aEstrenar").click(function() {
        if (seleccionActual != 'aEstrenar') {
            eliminarPeliculasExistentes();
            cargarPeliculasAEstrenar();
        }
        seleccionActual = 'aEstrenar';
    });

    /*BOTONMEJORVALORADAS.onclick = function() {
        if (seleccionActual != 'mejorValoradas') {
            eliminarPeliculasExistentes();
            cargarPeliculasMejorValoradas();
        }
        seleccionActual = 'mejorValoradas';
    };*/

    $("#mejorValoradas").click(function() {
        if (seleccionActual != 'mejorValoradas') {
            eliminarPeliculasExistentes();
            cargarPeliculasAEstrenar();
        }
        seleccionActual = 'mejorValoradas';
    });

    /*function eliminarPeliculasExistentes() {
        WRAPPERPELICULAS.innerHTML = "";
    }*/

    function eliminarPeliculasExistentes() {
        $("#wrapperPeliculas").html("");
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

});