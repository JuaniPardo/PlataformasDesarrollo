function calcularMayor() {
    // Obtener los valores ingresados por el usuario
    var numero1 = parseFloat(document.getElementById('numero1').value);
    var numero2 = parseFloat(document.getElementById('numero2').value);

    // Verificar si ambos valores son numéricos
    if (isNaN(numero1 + numero2)) {
        // Mostrar mensaje de error si alguno de los valores no es numérico
        document.getElementById('resultado').textContent = 'Por favor, ingrese valores numéricos válidos.';
    } else {
        // Comparar los números y mostrar el resultado
        if (numero1 > numero2) {
            document.getElementById('resultado').textContent = `El número (${numero1}) es mayor que el número (${numero2})`;
        } else if (numero2 > numero1) {
            document.getElementById('resultado').textContent = `El número (${numero2}) es mayor que el número (${numero1}).`;
        } else {
            document.getElementById('resultado').textContent = 'Ambos números son iguales.';
        }
    }
}
