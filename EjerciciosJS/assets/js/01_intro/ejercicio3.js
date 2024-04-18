import {empleados} from "./empleados";

// Función para filtrar empleados por área
function filtrarEmpleadosPorArea() {
    const area = document.getElementById('area').value;
    const empleadosFiltrados = empleados.filter(empleado => empleado.area.toLowerCase() === area.toLowerCase());

    mostrarResultado(empleadosFiltrados);
}

// Función para buscar empleado por legajo
function buscarEmpleadoPorLegajo() {
    const legajo = parseInt(document.getElementById('legajo').value);
    const empleadoEncontrado = empleados.find(empleado => empleado.legajo === legajo);

    mostrarResultado(empleadoEncontrado ? [empleadoEncontrado] : []);
}

// Función para buscar jefe por legajo
function buscarJefePorLegajo() {
    const legajoJefe = parseInt(document.getElementById('legajoJefe').value);
    const empleadoJefe = empleados.find(empleado => empleado.a_cargo.includes(legajoJefe));

    mostrarResultado(empleadoJefe ? [empleadoJefe] : null);
}

// Función para calcular promedio de salarios
function calcularPromedioSalarios() {
    const totalSalarios = empleados.reduce((acc, empleado) => acc + empleado.salario, 0);
    const promedio = totalSalarios / empleados.length;

    document.getElementById('promedio').textContent = `Promedio de salarios: ${promedio.toFixed(2)}`;
}

// Función para mostrar el resultado en la página
function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = ''; // Limpiar contenido anterior

    if (resultado.length === 0) {
        resultadoDiv.textContent = 'No se encontraron empleados.';
        return;
    }

    resultado.forEach(empleado => {
        const empleadoDiv = document.createElement('div');
        empleadoDiv.innerHTML = `<p>Legajo: ${empleado.legajo}</p>
                                  <p>Nombre: ${empleado.nombre}</p>
                                  <p>Apellido: ${empleado.apellido}</p>
                                  <p>Salario: ${empleado.salario}</p>
                                  <p>Área: ${empleado.area}</p>
                                  <p>A cargo: ${empleado.a_cargo.length > 0 ? empleado.a_cargo.join(', ') : 'Ninguno'}</p>
                                  <hr>`;
        resultadoDiv.appendChild(empleadoDiv);
    });
}
