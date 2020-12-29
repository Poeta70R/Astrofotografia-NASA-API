
const URL = "https://api.nasa.gov/planetary/apod?api_key=gRsHj0g1gvSmdwdBUU7Bla9eHV74pmebXa26qeDG&count=9";

let fotografias = []; // contiene 9 fotografias astronomicas seleccionadas al azar
 
// Funcion encargada de traer los datos de las fotografias
const fetchFotografias = async (url = URL) => {
    try{
        const response = await fetch(url); 
        fotografias = await response.json()
        console.log(fotografias)
        return fotografias;
    } catch(err) {
        console.error(err); 
    }
};
 // Mostrar mensaje en un span
 const mostrarMensaje = () => {
    document.querySelector("#message").innerHTML = "No hay fotografias";
    document.querySelector("#input").disabled = true;
  };

  const borrarFotografia = (title) => {
    document.getElementById(title).remove();
    fotografias = fotografias.filter((fotografia) => fotografia.title.toLowerCase() !== title.toLowerCase());    
    fotografias.length === 0 ? mostrarMensaje() : null;
};
// Destructurando  el parametro de la función: extraemos propiedades de fotografia
const crearNodo = ({title,date,hdurl}) => {
    // Aqui se crea la columna ->  La informacion de cada fotografia
    const nodo = 
        `<div class="col-md-4 col-12" title=${title}>
            <div class="card mt-5 ml-3">
            <img src=${hdurl} width = "350px" height= "250px" />
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>    
                    <p class="card-text">Fecha : ${date}</p>                        
                    <button onClick="borrarFotografia(${title})" class= "btn btn-danger btn-block">Borrar</button>
                </div>
            </div>
        </div>`
        return nodo;
};

// Funcion encargada de buscar una fotografia por titulo (title)
const buscarFotografia = () => {
    const { value: title } = document.querySelector("#input"); //const id = document.querySelector("#input").value
    const fotografiaBuscada = fotografias.filter(
    (fotografia) => fotografia.title.toLowerCase() === title.toLowerCase());
    mostrar(fotografiaBuscada);   
};

const mostrar = (array) => {
    fotografias.map((e) => {
        if (document.getElementById(e.title))
            document.getElementById(e.title).remove(); //Elimina del DOM
        console.log("hola");
        });
    array.map(elemento => {
        const html = crearNodo(elemento);
        document.getElementById("api_NASA").insertAdjacentHTML("beforeend", html);
        console.log("perro");
    });
}

// ... carga el DOM
async function start() {
    fotografias = await fetchFotografias(); // fotografias es global
    document.querySelector("#find").addEventListener("click",buscarFotografia);
    mostrar(fotografias);
};
window.onload = start();