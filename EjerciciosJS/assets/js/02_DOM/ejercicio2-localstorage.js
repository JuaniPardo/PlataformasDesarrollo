import {helados} from "./sabores.js";

const arrayHelados = [...helados]; // Guardo una copia del array de helados

console.table(arrayHelados); // Muestro en consola
console.info('⬆️ Array de Datos importados ⬆️')

if (localStorage.length > 0) { // Verifico si hay info guardada en localstorage
    arrayHelados.forEach((helado) => { // Recorro el array de helados

        for (let i = 0; i < localStorage.length; i++) { // Recorro el localstorage

            const key = localStorage.key(i); // Guardo la key
            const value = JSON.parse(localStorage.getItem(key)); // Guardo el value

            if (key === helado.sabor) { // Si la key es igual al sabor del helado
                helado.seleccionado = value; // Seteo el valor de seleccionado a true
            }
        }
    });
}

console.table(arrayHelados); // Muestro en consola
console.info('⬆️ Array de Datos con LocalStorage (si existe) ⬆️')

const listado = document.querySelector('#sabores'); // Listado es el div donde muestro los sabores
let markup = ''; // Creo una variable para guardar el html

arrayHelados.forEach((helado) => { // Recorro el array de helados generando el html
    markup +=
        `
        <label>
            <input type="checkbox" value="${helado.sabor}" ${helado.seleccionado ? 'checked' : ''}>
            ${helado.sabor}
        </label>
        `
});
listado.innerHTML = markup; // Muestro el html generado en el div

const boton_submit = document.querySelector('#submit');
boton_submit.addEventListener('click', (e) => {
    e.preventDefault();
    combinar();
});

function combinar() {
    const seleccion = document.querySelectorAll('input[type = checkbox]:checked') // Guardo los sabores seleccionados

    seleccion.forEach((sabor) => console.log(sabor.value)); //Debugueo en consola la seleccion

    const mensaje = document.querySelector('#mensaje') // Obtengo el elemento mensaje
    // Seteo valores minimos y maximos
    const minimoSabores = 1;
    const maximoSabores = 4;

    // Establezco la logica de seleccion
    if (seleccion.length < minimoSabores) {
        mensaje.textContent = `Elija como mínimo ${minimoSabores} sabores`;
        mensaje.style.color = 'red';
    } else if (seleccion.length > maximoSabores) {
        mensaje.textContent = `Elija como máximo ${maximoSabores} sabores`;
        mensaje.style.color = 'red';
    } else {
        mensaje.textContent = 'Gracias';
        mensaje.style.color = 'green';
        localStorage.clear(); // Borro el localstorage
        seleccion.forEach((sabor) => {
            localStorage.setItem(sabor.value, JSON.stringify(true))
        });
        console.log(localStorage); // Muestro en consola
    }
}

// Recupero el boton de borrar
const boton_borrar = document.querySelector('#borrar');
boton_borrar.addEventListener('click',(e) => {
    e.preventDefault();
    borrar_seleccion();
})

// Funcion para borrar la seleccion
function borrar_seleccion() {
    if (confirm('¿Está seguro que desea borrar la selección?')) {
        localStorage.clear(); // Borro el localstorage
        arrayHelados.forEach((helado) => {
            helado.seleccionado = false;
        }); // Seteo todos los helados a no seleccionados
        const checkboxes = document.querySelectorAll('input[type = checkbox]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        }); // Desmarco todos los checkboxes
        const mensaje = document.querySelector('#mensaje');
        mensaje.textContent = 'Selección borrada';
        mensaje.style.color = 'red';
    }
}