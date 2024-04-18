const helados = [
    'Chocolate con almendras',
    'Dulce de leche granizado',
    'Dulce de leche',
    'Sambayón',
    'Limón',
    'Frutos',
    'Tramontana',
    'Chocolate amargo',
    'Mascarpone',
    'Frutilla a la crema'
];

//Crear elementos input checkbox con los sabores de helado
const sabores = document.getElementById('sabores'); // Este es el div dentro del formulario
const markup = helados.map((sabor) =>
    `<label>
        <input type="checkbox" value="${sabor}">
        ${sabor}
    </label>`).reduce((cadena, item) => cadena += item, '');

sabores.innerHTML = markup;

/*const label = document.createElement('label'); // Creo un label
const checkbox = document.createElement('input'); // Creo un checkbox
checkbox.type = 'checkbox';
checkbox.value = sabor; // Le paso el sabor al checkbox
label.append(checkbox, sabor); // Le meto el checkbox y el "Sabor" al label
sabores.append(document.createElement('br'), label) // Le meto un <br> y el label creado al form*/


// Funcion con las validaciones que combinan los sabores
function combinar() {
    const seleccion = document.querySelectorAll('input[type = "checkbox"]:checked');
    const mensaje = document.getElementById('mensaje');

    // Seteo valores minimos y maximos
    const minimoSabores = 1;
    const maximoSabores = 4;

    if (seleccion.length < minimoSabores) {
        mensaje.textContent = 'Elija al menos un sabor';
        mensaje.style.color = 'red';
    } else if (seleccion.length > maximoSabores) {
        mensaje.textContent = 'Elija hasta 4';
        mensaje.style.color = 'red';
    } else {
        mensaje.textContent = 'Gracias';
        mensaje.style.color = 'green';
    }
}