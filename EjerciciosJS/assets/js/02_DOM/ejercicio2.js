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
const sabores = document.getElementById('sabores');
helados.forEach(sabor =>{
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = sabor;
    label.append(checkbox, sabor);
    sabores.append(document.createElement('br'), label)
})

// Funcion con las validaciones que combinan los sabores
function combinar() {
    const seleccion = document.querySelectorAll('input[type = "checkbox"]:checked');
    const mensaje = document.getElementById('mensaje');
    if ([1, 2, 3, 4].includes(seleccion.length)) {
        mensaje.textContent = 'Gracias';
        mensaje.style.color = 'darkgreen';
    } else if (seleccion.length > 4){
        mensaje.textContent = 'Elija hasta 4';
        mensaje.style.color = 'darkred';
    }
    else {
        mensaje.textContent = 'Elija al menos un sabor';
        mensaje.style.color = 'darkred';
    }
}