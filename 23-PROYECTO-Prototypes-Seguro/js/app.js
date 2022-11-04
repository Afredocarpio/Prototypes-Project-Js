// constructor

function Seguro (marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
// realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){
    
    let cantidad;
    const base = 2000;
    
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //leer el año
    const diferecia = new Date().getFullYear() - this.year;

    //cada año que la diferencia es mayor, el costo se reduce un 3%

    cantidad -= ((diferecia * 3) * cantidad) / 100 ;

    /**
     * si el seguro es basico se multiplica por 30% mas
     * si el seguro es completo se multiplica por 50% mas
     */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else {
        cantidad *= 1.50;
    }
    return parseInt(cantidad);
    
}


function UI () {}

//llena las opciones de los años - Prototype
UI.prototype.llenaYear = () => {
    const max = new Date().getFullYear();
    const min = max - 15;
    
    const selecYear = document.querySelector('#year');

    for(let i = max; i > min; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.textContent= i;
        selecYear.appendChild(option);
    }
}

//mustra alerta en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if (tipo === 'error'){
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insertaHTML
    const form = document.querySelector('#cotizar-seguro');
    form.insertBefore(div, document.querySelector('#resultado'))

    setTimeout(() => {
        div.remove();
    }, 2500);
}


UI.prototype.mostrarResultado = (total, seguro) => {
    const {marca, year, tipo} = seguro;

    let textoMArca;
    switch(marca){
        case '1':
            textoMArca = 'Americano';
            break;
        case '2':
            textoMArca = 'Asiatico';
            break;
        case '3':
            textoMArca = 'Europeo';
            break;    
        default:
            break;
    }



    //crear resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca:<span class="font-normal"> ${textoMArca}</span></p>
        <p class="font-bold">Año:<span class="font-normal"> ${year}</span></p>
        <p class="font-bold">Tipo de Seguro:<span class="font-normal capitalize"> ${tipo}</span></p>
        <p class="font-bold">Total:<span class="font-normal"> $${total}</span></p>
        
    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    //mostrar spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        //se oculta el spinner y se muestra el resultado
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
    }, 2500);
}


//instance
const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{
    ui.llenaYear();
})



eventLis();
function eventLis(){
    const form = document.querySelector('#cotizar-seguro');
    form.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;



    //leer el año seleccionado
    const year = document.querySelector('#year').value;


    //leer el tipo de covertura
    // forma de seleccionar los input de tipo radio
    const tipo = document.querySelector('input[name="tipo"]:checked').value;


    if(marca ==='' || year ==='' || tipo ===''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando...', 'correcto');
    
    //ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }




    // instance seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    // prototype cotizacion
    ui.mostrarResultado(total, seguro);
}

