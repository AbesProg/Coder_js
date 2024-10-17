
let form = document.querySelector("#userDatos");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let nombreAlumno = form.querySelector('input[type="text"]').value;
    let notas = [];
    
    let notaInputs = form.querySelectorAll('input[type="number"]');
    notaInputs.forEach(input => {
        notas.push(Number(input.value));
    });

    let alumno = {
        nombre: nombreAlumno,
        materias: {
            matematica: notas[0],
            ingles: notas[1],
            biologia: notas[2],
            computacion: notas[3],
            historia: notas[4]
        }
    };

    alumnos.push(alumno);
    console.log(alumnos);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
    const alumnosGuardados = localStorage.getItem('alumnos');
    if (alumnosGuardados) {
        alumnos = JSON.parse(alumnosGuardados);
        console.log(alumnos);
    }
});

