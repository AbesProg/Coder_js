document.addEventListener('DOMContentLoaded', function() {
    let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    const pokemones = [];

    async function obtenerPokemones() {
        for (let i = 1; i <= 20; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();
            pokemones.push({
                nombre: data.name,
                imagen: data.sprites.front_default
            });
        }
    }

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

    obtenerPokemones().then(() => {
        cargarTarjetas();
    });

    let form = document.querySelector("#userDatos");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombreAlumno = form.elements['nombre'].value;
        const apellidoAlumno = form.elements['apellido'].value;

        const notas = {
            matematica: Number(form.querySelector('input[name="matematica"]').value),
            ingles: Number(form.querySelector('input[name="ingles"]').value),
            biologia: Number(form.querySelector('input[name="biologia"]').value),
            computacion: Number(form.querySelector('input[name="computacion"]').value),
            historia: Number(form.querySelector('input[name="historia"]').value)
        };

        if (!nombreAlumno || !apellidoAlumno || Object.values(notas).some(nota => isNaN(nota) || nota < 1 || nota > 10)) {
            document.getElementById('errorContainer').innerText = "Por favor, complete todos los campos con valores válidos.";
            return;
        }

        let alumnoExistente = alumnos.some(alumno => alumno.nombre.toLowerCase() === nombreAlumno.toLowerCase() && alumno.apellido.toLowerCase() === apellidoAlumno.toLowerCase());

        if (alumnoExistente) {
            document.getElementById('errorContainer').innerText = "Este alumno ya ha sido registrado.";
            return;
        }

        let alumno = {
            nombre: nombreAlumno,
            apellido: apellidoAlumno,
            notas: notas,
            pokemon: pokemones[Math.floor(Math.random() * pokemones.length)]
        };

        alumnos.push(alumno);
        localStorage.setItem('alumnos', JSON.stringify(alumnos));
        cargarTarjetas(); 
        form.reset();
    });

    function cargarTarjetas() {
        const tarjetasContainer = document.getElementById('tarjetasContainer');
        tarjetasContainer.innerHTML = ''; 

        alumnos.forEach(alumno => {
            crearTarjeta(alumno); 
        });
    }

    function ordenarAlumnos(metodo) {
        if (metodo === "nombre") {
            alumnos.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else if (metodo === "promedio") {
            alumnos.sort((a, b) => calcularPromedio(b.notas) - calcularPromedio(a.notas));
        } else if (metodo === "mejorNota") {
            alumnos.sort((a, b) => {
                const mejorA = Math.max(...Object.values(a.notas));
                const mejorB = Math.max(...Object.values(b.notas));
                return mejorB - mejorA;
            });
        } else if (metodo === "peorNota") {
            alumnos.sort((a, b) => {
                const peorA = Math.min(...Object.values(a.notas));
                const peorB = Math.min(...Object.values(b.notas));
                return peorA - peorB; 
            });
        }

        cargarTarjetas();
    }

    document.getElementById("ordenarButton").addEventListener("click", () => {
        const metodo = document.getElementById("ordenarPor").value;
        ordenarAlumnos(metodo);
    });

    document.getElementById("buscador").addEventListener("input", function() {
        const query = this.value.toLowerCase(); 

        const alumnosFiltrados = alumnos.filter(alumno => {
            return alumno.nombre.toLowerCase().includes(query) || alumno.apellido.toLowerCase().includes(query); 
        });

        const tarjetasContainer = document.getElementById('tarjetasContainer');
        tarjetasContainer.innerHTML = ''; 

        if (alumnosFiltrados.length === 0) {
            tarjetasContainer.innerHTML = "<p>No se encontraron resultados</p>";
        } else {
            alumnosFiltrados.forEach(alumno => {
                crearTarjeta(alumno);
            });
        }
    });

    document.getElementById('borrarAlumnos').addEventListener('click', () => {
        Swal.fire({
            title: '¿Seguro que quieres borrar todos los alumnos?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('alumnos');
                alumnos = [];
                cargarTarjetas();
                Swal.fire('¡Alumnos borrados!', '', 'success');
            }
        });
    });
});


