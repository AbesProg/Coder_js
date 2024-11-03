function crearTarjeta(alumno) {
    const tarjetasContainer = document.getElementById('tarjetasContainer');
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('tarjeta');

    let notasString = '';
    for (const materia in alumno.notas) {
        notasString += `${materia}: ${alumno.notas[materia]}<br>`;
    }

    tarjeta.innerHTML = `
        <h3>${alumno.nombre}</h3>
        <img src="${alumno.pokemon.imagen}" alt="${alumno.pokemon.nombre}" />
        <p><br>${notasString}</p>
    `;

    tarjetasContainer.appendChild(tarjeta);
}
