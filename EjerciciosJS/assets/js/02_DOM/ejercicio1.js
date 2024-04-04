// Variable para mostrar el resultado de todas las operaciones
let resultado;

// Funcion que muestra el resultado en el HTML
function mostrarResultado() {
    let resultadoInput = document.getElementById('resultado');
    resultadoInput.removeAttribute('disabled');
    resultadoInput.value = resultado;
    resultadoInput.setAttribute('disabled', 'disabled');
}

// Funcion para sumar 2 numeros
function sumar() {
    let n1 = parseFloat(document.getElementById('primer_numero').value);
    let n2 = parseFloat(document.getElementById('segundo_numero').value);

    resultado = n1 + n2;

    mostrarResultado();
}

// Funcion para restar 2 numeros
function restar() {
    let n1 = parseFloat(document.getElementById('primer_numero').value);
    let n2 = parseFloat(document.getElementById('segundo_numero').value);

    resultado = n1 - n2;

    mostrarResultado();
}

// Funcion para multiplicar 2 numeros
function multiplicar() {
    let n1 = parseFloat(document.getElementById('primer_numero').value);
    let n2 = parseFloat(document.getElementById('segundo_numero').value);

    resultado = n1 * n2;

    mostrarResultado();
}

// Funcion para dividir 2 numeros
function dividir() {
    let n1 = parseFloat(document.getElementById('primer_numero').value);
    let n2 = parseFloat(document.getElementById('segundo_numero').value);

    // Verificar si el segundo número es 0
    if (n2 === 0) {
        resultado = 'No se puede dividir por 0';
        mostrarResultado();
        return;
    }
    resultado = n1 / n2;

    mostrarResultado();
}