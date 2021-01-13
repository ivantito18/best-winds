/*-----------Variables globales e imports-----------*/

import {convertirTemperatura, convertirViento, limpiarHtml, spinner} from "./funciones.js";

const inputCiudad = document.querySelector("#header_inputCiudad");
const formularioCiudad = document.querySelector("#header_formulario");
const header = document.querySelector("header");
const divMain = document.querySelector("#main");
const divMainApp = document.querySelector("#main_app");
const divSpinner = document.querySelector(".loader");
const divInicio = document.querySelector("#inicio");

/*----------------Event Listeners-------------------*/

document.addEventListener("DOMContentLoaded", () => {
    eventListeners();   //inicio de App
});

function eventListeners() {
    formularioCiudad.addEventListener("submit", validarCiudad); 
}

/*---------------------Clases-----------------------*/

class UI {
    mostrarAlerta(mensaje){
        limpiarHtml();
        mostrarInicio();
        divMain.style.display = "none";
        const div = document.createElement("DIV");
        const p = document.createElement("P");

        div.style.background = "transparent";
        div.style.position = "absolute";
        div.classList.add("opacidad", "headerAlerta");
        p.classList.add("red");
        p.textContent = mensaje;

        div.appendChild(p);
        header.appendChild(div);

        inputCiudad.classList.add("redBg");
        setTimeout(()=>{
            div.remove();
            inputCiudad.classList.remove("redBg");
        }, 1500);
    }
}
const ui = new UI();

/*>>>>>>>>>>>>>>>>>>>>>>> APP <<<<<<<<<<<<<<<<<<<<<<*/

//Toma la ciudad escrita en el input del header y la valida.
function validarCiudad(e) {
    e.preventDefault();
    const valorInput = inputCiudad.value;

    if (valorInput === "" || valorInput.length <= 1 || !isNaN(valorInput)) {
        ui.mostrarAlerta("Debe escribir una ciudad Válida");
        return;
    } else {
        //De pasar la primer validacion, enviamos la ciudad a la siguiente funcion.
        buscarCiudad(valorInput);
    }
    formularioCiudad.reset()
}

//Toma la ciudad validada e inicia la busqueda y la llamada a la API.
function buscarCiudad(ciudad) {
    const key = "67d2517366b8eccebed9147f76f96007";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}`;

    divMain.style.display = "flex";
    ocultarInicio();
    spinner();

    fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            const codigo = data.cod;
            //validamos si la ciudad realmente existe en la base de datos. De no existir, se muestra un error.
            if(codigo === "404"){
                ui.mostrarAlerta("La Ciudad No Existe en la Base de Datos");
                return;
            }else{
                mostrarClima(data);
            }
            
        })
}

/*Toma la ciudad validada por completo y se aplica destructuring. Luego mediante Scripting 
muestra por pantalla todos los datos relacionados al clima de la ciudad elegida. 
Algunas funciones utilizadas son importadas de "/funciones.js".*/
function mostrarClima(data) {
    const { name, clouds: { all }, main: { humidity, pressure, feels_like, temp,
            temp_max, temp_min }, visibility, wind: { deg, speed } } = data;

    limpiarHtml();  
    divSpinner.style.visibility = "hidden";
    divMainApp.style.visibility = "visible";
    const tempCentigrados = convertirTemperatura(temp);
    const tempMaxCentigrados = convertirTemperatura(temp_max);
    const tempMinCentigrados = convertirTemperatura(temp_min);
    const sensacionTermica = convertirTemperatura(feels_like);
    const direccionViento = convertirViento(deg);

    const p1 = document.createElement("P");
    const div1 = document.createElement("DIV");
    p1.style.color = "white";
    p1.innerHTML += `
    <div class="contenedor opacidad">
        <h1 class="contenedor">Clima en la ciudad de ${name}.</h1>
        <div class="tarjetaClimaPrincipal">
            <p><img class="icono" src="./assets/media/img/termometro.png"/>Temperatura Actual: ${tempCentigrados}°c</p>
        </div>
        <span class="tarjetaClimaSecundario">
            <p>Temperatura Mínima: <span class="skyblue">${tempMinCentigrados}°c</span></p>
        </span>
        <span class="tarjetaClimaSecundario">
            <p>Temperatura Máxima: <span class="red">${tempMaxCentigrados}°c</span></p>
        </span>
        <span class="tarjetaClimaTerciario">
            <p><img class="icono" src="./assets/media/img/termometro.png"/>Sensación Térmica: ${sensacionTermica}°</p>
        </span>
        <span class="tarjetaClimaTerciario">
            <p><img class="icono" src="./assets/media/img/nube.png"/>Nubosidad: ${all}%</p>
        </span>
        <span class="tarjetaClimaTerciario">
            <p><img class="icono" src="./assets/media/img/humedad.png"/>Humedad: ${humidity}%</p>
        </span>
        <span class="tarjetaClimaTerciario">
            <p><img class="icono" src="./assets/media/img/visibilidad.png"/>Visibilidad: ${visibility}</p>
        </span>
        <span class="tarjetaClimaTerciario">
            <p><img class="icono" src="./assets/media/img/barometro.png"/>Presion: ${pressure}hPa</p>
        </span>
        <span class="tarjetaClimaTerciario">
            <p><img class="icono" src="./assets/media/img/viento.png"/>Dirección del Viento: ${direccionViento}</p>
        </span>
        <span class="tarjetaClimaTerciario">                       
            <p><img class="icono" src="./assets/media/img/wind.png"/>Velocidad: ${speed}m/s</p>
        </span>
    </div>
    `;
    div1.appendChild(p1);
    divMainApp.appendChild(div1);
}

function ocultarInicio(){
    divInicio.style.display = "none";
    divInicio.style.visibility = "hidden";
}

function mostrarInicio(){
    divInicio.style.display = "flex";
    divInicio.style.visibility = "visible";
}   
//Fin de la Aplicacion.