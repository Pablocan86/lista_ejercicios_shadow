const input = document.querySelector("#inputMusculo");
const inputEjercicio = document.querySelector("#inputEjercicio");
const divResultados = document.querySelector("#divResultados");
const divResultados2 = document.querySelector("#divResultados2");
const bntMusculo = document.querySelector("#musculo");
const btnEjercicio = document.querySelector("#ejercicio");
const divMusculo = document.querySelector("#divMusculo");
const divEjercicio = document.querySelector("#divEjercicio");
const informacion = document.querySelector("#informacion");
const main = document.querySelector("#main");
bntMusculo.addEventListener("click", () => {
  divMusculo.classList.replace("ocultar", "mostrarDiv");
  divEjercicio.classList.replace("mostrarDiv", "ocultar");
  bntMusculo.classList.replace("singulares", "botonOprimido");
  btnEjercicio.classList.replace("botonOprimido", "singulares");
});

btnEjercicio.addEventListener("click", () => {
  divEjercicio.classList.replace("ocultar", "mostrarDiv");
  divMusculo.classList.replace("mostrarDiv", "ocultar");
  btnEjercicio.classList.replace("singulares", "botonOprimido");
  bntMusculo.classList.replace("botonOprimido", "singulares");
});

class BaseDeDatos {
  constructor() {
    this.ejercicioBD = [];
    this.cargarEjercicios();
  }

  async cargarEjercicios() {
    const resultado = await fetch(`data/ejercicios.json`);
    this.ejercicioBD = await resultado.json();
  }
}

const bd = new BaseDeDatos();

//BUSCA COINCIDENCIA POR GRUPO MUSCULAR
input.addEventListener("input", () => {
  const ejercicioBuscado = input.value.trim().toUpperCase();
  divResultados.innerHTML = "";
  if (ejercicioBuscado === "") {
    return; // Si no hay texto, no se muestra la lista desplegable
  }

  const coincidenciasMusculo = bd.ejercicioBD.filter((ejercicio) =>
    ejercicio.musculo.toUpperCase().includes(ejercicioBuscado)
  );

  if (coincidenciasMusculo.length > 0) {
    const listaCoincidencias = document.createElement("ul");
    listaCoincidencias.classList.add("ulEjercicios");

    coincidenciasMusculo.forEach((ejercicio) => {
      const itemLista = document.createElement("li");
      itemLista.classList.add("liEjercicios");
      itemLista.innerHTML = `<div class="liDiv"><p>${ejercicio.nombre}</p><a href="${ejercicio.video}" target="_blank"><img src="https://www.svgrepo.com/show/520494/video-course.svg" alt="ver video"></a></div>`;
      itemLista.addEventListener("click", () => {
        // Cuando se hace clic en un elemento de la lista, se completa el valor en el input
        inputBuscar.value = ejercicio.nombre;
        // Limpio la lista de resultados
        divResultados.innerHTML = "";
      });
      listaCoincidencias.appendChild(itemLista);
    });

    divResultados.appendChild(listaCoincidencias);
  }
});

//BUSCA COINCIDENCIAS POR NOMBRE DE EJERCICIO
inputEjercicio.addEventListener("input", () => {
  const ejercicioBuscado = inputEjercicio.value.trim().toUpperCase();
  divResultados2.innerHTML = "";
  if (ejercicioBuscado === "") {
    return; // Si no hay texto, no se muestra la lista desplegable
  }

  const coincidencias = bd.ejercicioBD.filter((ejercicio) =>
    ejercicio.nombre.toUpperCase().includes(ejercicioBuscado)
  );

  if (coincidencias.length > 0) {
    const listaCoincidencias = document.createElement("ul");
    listaCoincidencias.classList.add("ulEjercicios");
    coincidencias.forEach((e) => {
      const itemLista = document.createElement("li");
      itemLista.classList.add("liEjercicios");
      itemLista.innerHTML = `<div class="liDiv"><p>${e.nombre}</p><a href="${e.video}" target="_blank"><img src="https://www.svgrepo.com/show/520494/video-course.svg" alt="ver video"></a></div>`;
      listaCoincidencias.appendChild(itemLista);
    });
    divResultados2.appendChild(listaCoincidencias);
  }
});

let divInfoAgregado = false;

informacion.addEventListener("click", () => {
  if (!divInfoAgregado) {
    const divInfo = document.createElement("div");
    divInfo.classList.add("divInfo");
    main.appendChild(divInfo);
    const explicacion = `<p class="pTitulo">BUSCA POR LOS SUGUIENTES MUSCULOS</p>
    <p>Pectorales / Pecho</p>
    <p>Dorsales / Espalda</p>
    <p>Deltoides / Hombros</p>
    <p>Biceps</p>
    <p>Triceps</p>
    <p>Trapecios</p>
    <p>Cuadriceps / Piernas</p>
    <p>Femorales / Isquiotibiales / Piernas</p>
    <p>Gluteos</p>
    <p>Gemelos / Pantorrillas</p>
    <p>Abdominales</p>
    <p>Lumbares</p><p>Elasticas (entrenamiento con bandas)</p>
    <p>Estiramiento</p>
    <div><button id="cerrarInfo"class="singulares">Cerrar</button></div>`;
    divInfo.innerHTML = explicacion;

    const cerrarInfo = document.querySelector("#cerrarInfo");

    cerrarInfo.addEventListener("click", () => {
      divInfo.remove();
      divInfoAgregado = false; // Restablece la bandera a false
    });

    divInfoAgregado = true; // Cambia la bandera a true
  }
});
