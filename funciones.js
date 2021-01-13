//Constantes y variables necesarias.
const divMainApp = document.querySelector("#main_app");
const divSpinner = document.querySelector(".loader");

//convierte la temperatura de Kelvin a Celsius.
export function convertirTemperatura(temp) {
    const tempCentigrados = Number(Math.round(temp - 273.15));
    return tempCentigrados;
}

/*Retorna un valor correspondiente a la direccion del viento. La funcion convierte las
mediciones y valores dados en grados, (de 0 a 360°), a la correspondiente direccion mostrada en letras
acorde a la posicion del viento. La información proviene de una tabla de valores Oficial.*/
export function convertirViento(deg){
    if(deg >= 0 && deg <= 11.25 || deg >= 348.75){
        return "N";
    }else if(deg > 11.25 && deg < 33.75){
        return "NNE";
    }else if(deg > 33.75 && deg < 56.25){
        return "NE";
    }else if(deg > 56.25 && deg < 78.75){
        return "ENE";
    }else if(deg > 78.75 && deg < 101.25){
        return "E";
    }else if(deg > 101.25 && deg < 123.75){
        return "ESE";
    }else if(deg > 123.75 && deg < 146.25){
        return "SE";
    }else if(deg > 146.25 && deg < 168.75){
        return "SSE";
    }else if(deg > 168.75 && deg < 191.25){
        return "S";
    }else if(deg > 191.25 && deg < 213.75){
        return "SSW";
    }else if(deg > 213.75 && deg < 236.25){
        return "SW";
    }else if(deg > 236.25 && deg < 258.75){
        return "WSW";
    }else if(deg > 258.75 && deg < 281.25){
        return "W";
    }else if(deg > 281.25 && deg < 303.75){
        return "WNW";
    }else if(deg > 303.75 && deg < 326.25){
        return "NW";
    }else if(deg > 326.25 && deg < 348.75){
        return "NNW";
    }
}

//Limpia el HTML en caso de necesitarlo.
export function limpiarHtml() {
    divMainApp.innerHTML = "";
}

//Carga un spinner para dar retroalimentacion al usuario entre busqueda y busqueda.
export function spinner(){
    limpiarHtml();
    divSpinner.style.visibility = "visible";
    divMainApp.appendChild(divSpinner);
}