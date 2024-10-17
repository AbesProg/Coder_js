
let alumnos = [];

let form = document.querySelector("#userDatos");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombreAlumno = form.querySelector('input[type="text"]').value;

    const notas = {
        matematica: Number(form.querySelector('input[name="matematica"]').value),
        ingles: Number(form.querySelector('input[name="ingles"]').value),
        biologia: Number(form.querySelector('input[name="biologia"]').value),
        computacion: Number(form.querySelector('input[name="computacion"]').value),
        historia: Number(form.querySelector('input[name="historia"]').value)
    };

    let alumno = {
        nombre: nombreAlumno,
        notas: notas
    };

    alumnos.push(alumno);

    crearTarjeta(alumno);

    form.reset();
});

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
        <p><br>${notasString}</p>
    `;

    tarjetasContainer.appendChild(tarjeta);
}


