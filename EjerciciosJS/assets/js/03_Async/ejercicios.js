import {cajas} from "./cajas.js"
import {clientes} from "./clientes.js"


// Funcion que crea el HTML de las tarjetas
function generarHTMLCajas(caja) {
    return `
        <div class="card">
        <div class="card-header">
            <h3>Caja Nro ${caja.numero}</h3>
        </div>
        <div class="card-body">
            <!-- Atendida por... -->
            <p>Atendida por <span class="cajero">${caja.cajera_o}</span></p>
        </div>
        <div class="card-footer">
            <!-- Atendiendo a... -->
            <p>Atendiendo a <span class="cliente">${caja.cliente_atendiendo ? fullName(caja.cliente_atendiendo) : 'NO'}</span></p>
        </div>
    </div>
    `
}

// Obtengo el elemento que contiene las tarjetas que representan las cajas
const espacioParaCajas = document.querySelector('.tarjetas-banco')

function actualizarHTMLCajas() {
    // Creo el markup que voy a insertar y lo inserto
    espacioParaCajas.innerHTML = cajas.map((caja) => generarHTMLCajas(caja)).join('')
}

actualizarHTMLCajas()

// Genero el nombre en el formato "Apellido Nombre"
function fullName(cliente) {
    return `${cliente.apellido} ${cliente.nombre}`
}

// Funcion que crea el HTML de la cola
function generarHTMLCola(cliente) {
    return `
    <div class="card">
        <div class="card-footer">
            <p>Nro. Cliente / Nombre <span>${cliente.nro}: ${fullName(cliente)}</span></p>
        </div>
    </div>
    `
}

// Obtengo el elemento que contiene la cola
const espacioParaCola = document.querySelector('.tarjetas-clientes')

// Obtengo los clientes que estan esperando
const clientesEsperando = clientes.filter((cliente) => cliente.esperando)

function actualizarHTMLCola() {
    // Creo el markup que voy a insertar y lo inserto
    espacioParaCola.innerHTML = clientesEsperando.map((cliente) => generarHTMLCola(cliente)).join('')
}

actualizarHTMLCola()

// Recupero el boton "siguiente"
const botonSiguiente = document.querySelector('.siguiente')

// Agrego el event listener
botonSiguiente.addEventListener('click', (e) => {
    e.preventDefault()
    siguiente()
})

// Obtengo las cajas vacias
const cajasVacias = cajas.filter((caja) => caja.cliente_atendiendo === null)

// Creo una funcion para obtener numeros aleatorios
function numeroRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function siguiente() {
    if (cajasVacias.length === 0) {
        alert('En este momento no hay cajas disponible. Espere un momento y vuelva a intentar')
        return
    }

    if (clientesEsperando.length === 0) {
        alert('No hay clientes esperando para atenderse')
        return;
    }

    const caja = cajasVacias.shift() // Elijo la primer caja disponible
    cajas[cajas.indexOf(caja)].cliente_atendiendo = clientesEsperando.shift() // A esa caja le paso el cliente
    actualizarHTMLCajas()
    actualizarHTMLCola()
    liberarCaja(caja, 1000, 2000)
}

function liberarCaja(caja, min = 5000, max = 10000) {
    setTimeout(() => {
        caja.cliente_atendiendo = null;
        cajasVacias.push(caja);
        //alert(`Se liberó la caja ${caja.numero}`);
        actualizarHTMLCajas();
    }, numeroRandom(min, max));
}