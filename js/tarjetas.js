function calcularPromedio(notas) {
    let total = 0;
    let cantidad = 0;
    for (let materia in notas) {
        if (notas[materia] >= 1 && notas[materia] <= 10) {
            total += notas[materia];
            cantidad++;
        }
    }
    return total / cantidad;
}

function crearTarjeta(alumno) {
    const tarjetasContainer = document.getElementById('tarjetasContainer');
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');

    let notasString = '';

    for (const materia in alumno.notas) {
        notasString += `${materia}: ${alumno.notas[materia]}<br>`;
    }

    let promedio = calcularPromedio(alumno.notas); 
    promedio = Math.round(promedio);
    const promedioStyle = promedio >= 7 ? 'color: green;' : 'color: red;';
    
    tarjeta.innerHTML = `
        <h3 style="color: black;">${alumno.nombre} ${alumno.apellido}</h3>
        <img src="${alumno.pokemon.imagen}" alt="${alumno.pokemon.nombre}" />
        <p>${notasString}</p>
        <p style="${promedioStyle}"><strong>Promedio: ${promedio}</strong></p>
    `;

    tarjetasContainer.appendChild(tarjeta);
}

