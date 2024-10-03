
function ingresarNota(nombreMateria) {
    let nota = null;
    while (true) {
        nota = prompt(`Ingrese la nota de ${nombreMateria}`);
        if (nota === null) {
            salir();a
            return; 
        }
        nota = Number(nota);
        if (!isNaN(nota) && nota >= 1 && nota <= 10) {
            return nota;
        }
        alert("Ingrese una nota válida");
    }
}

function pasar_notas() {
    while (true) {
        let nombre_alumno = prompt('Ingrese el nombre del alumno');
        if (nombre_alumno === null) {
            return;
        }
        while (!nombre_alumno || !isNaN(nombre_alumno)) {
            nombre_alumno = prompt("Ingrese un nombre válido");
        }

        let alumno = {
            nombre: nombre_alumno,
            materias: {
                matematica: ingresarNota('Matemática'),
                ingles: ingresarNota('Inglés'),
                biologia: ingresarNota('Biología'),
                computacion: ingresarNota('Computación'),
                historia: ingresarNota('Historia')
            }
        };

        alumnos.push(alumno);

        if (!confirm("¿Desea ingresar otro alumno?")) {
            break; 
        }
    }

    console.log(alumnos);
}


