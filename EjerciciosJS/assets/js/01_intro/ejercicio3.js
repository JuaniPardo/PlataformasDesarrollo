// Array de empleados
const empleados = [
    {
        legajo: 1001,
        nombre: "Juan",
        apellido: "Gómez",
        salario: 2500.50,
        area: "Ventas",
        a_cargo: [1007, 1013, 1019]
    },
    {
        legajo: 1002,
        nombre: "María",
        apellido: "López",
        salario: 3000.75,
        area: "Recursos Humanos",
        a_cargo: [1001, 1003, 10016, 10011, 10012]
    },
    {
        legajo: 1003,
        nombre: "Pedro",
        apellido: "Martínez",
        salario: 2800.25,
        area: "Contabilidad",
        a_cargo: [1009, 1015]
    },
    {
        legajo: 1004,
        nombre: "Ana",
        apellido: "Rodríguez",
        salario: 3200.00,
        area: "Marketing",
        a_cargo: []
    },
    {
        legajo: 1005,
        nombre: "Carlos",
        apellido: "García",
        salario: 2700.80,
        area: "Producción",
        a_cargo: []
    },
    {
        legajo: 1006,
        nombre: "Laura",
        apellido: "Fernández",
        salario: 2900.35,
        area: "Producción",
        a_cargo: []
    },
    {
        legajo: 1007,
        nombre: "Diego",
        apellido: "Hernández",
        salario: 2600.45,
        area: "Ventas",
        a_cargo: []
    },
    {
        legajo: 1008,
        nombre: "Lucía",
        apellido: "Díaz",
        salario: 3100.60,
        area: "Marketing",
        a_cargo: []
    },
    {
        legajo: 1009,
        nombre: "Martín",
        apellido: "Gutiérrez",
        salario: 2800.75,
        area: "Contabilidad",
        a_cargo: []
    },
    {
        legajo: 10010,
        nombre: "Sofía",
        apellido: "Pérez",
        salario: 3300.25,
        area: "Marketing",
        a_cargo: [1008]
    },
    {
        legajo: 10011,
        nombre: "Javier",
        apellido: "Luna",
        salario: 2650.90,
        area: "Producción",
        a_cargo: [1005, 1017]
    },
    {
        legajo: 10012,
        nombre: "Elena",
        apellido: "Suárez",
        salario: 2950.40,
        area: "Desarrollo",
        a_cargo: [10018]
    },
    {
        legajo: 10013,
        nombre: "Luis",
        apellido: "Romero",
        salario: 2750.55,
        area: "Ventas",
        a_cargo: []
    },
    {
        legajo: 10014,
        nombre: "Carolina",
        apellido: "Morales",
        salario: 3050.70,
        area: "Recursos Humanos",
        a_cargo: [10020]
    },
    {
        legajo: 10015,
        nombre: "Andrés",
        apellido: "Navarro",
        salario: 2850.85,
        area: "Contabilidad",
        a_cargo: []
    },
    {
        legajo: 10016,
        nombre: "Valentina",
        apellido: "González",
        salario: 3350.20,
        area: "Marketing",
        a_cargo: [1004, 1010]
    },
    {
        legajo: 10017,
        nombre: "Gabriel",
        apellido: "Peralta",
        salario: 2700.30,
        area: "Producción",
        a_cargo: [1006]
    },
    {
        legajo: 10018,
        nombre: "Marcela",
        apellido: "Castañeda",
        salario: 3000.50,
        area: "Desarrollo",
        a_cargo: []
    },
    {
        legajo: 10019,
        nombre: "Jacinto",
        apellido: "Rojas",
        salario: 2800.65,
        area: "Ventas",
        a_cargo: []
    },
    {
        legajo: 10020,
        nombre: "Paula",
        apellido: "Silva",
        salario: 3100.80,
        area: "Recursos Humanos",
        a_cargo: []
    }
];


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
