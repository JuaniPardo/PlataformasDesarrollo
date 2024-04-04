const numeros = []; // Array para almacenar los números ingresados

function ingresarNumero() {
    let numero = parseInt(document.getElementById('numero').value);

    if (isNaN(numero)) {
        alert('Por favor, ingrese un número válido.');
        return;
    }

    if (numero === 0) {
        mostrarEstadisticas();
        return;
    }

    numeros.push(numero);

    let cantidad = numeros.length;
    let mayor = Math.max(...numeros);
    let suma = numeros.reduce((acc, curr) => acc + curr, 0);

    document.getElementById('numero').value = ''; // Limpiar el campo de entrada

    // Mostrar estadísticas en la página
    document.getElementById('cantidad').textContent = `Cantidad de números ingresados: ${cantidad}`;
    document.getElementById('mayor').textContent = `Número mayor ingresado: ${mayor}`;
    document.getElementById('suma').textContent = `Suma de todos los números ingresados: ${suma}`;
}