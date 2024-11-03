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

obtenerPokemones().then(() => {
    cargarTarjetas();
});

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

    if (!nombreAlumno || Object.values(notas).some(nota => isNaN(nota) || nota < 1 || nota > 10)) {
        document.getElementById('errorContainer').innerText = "Por favor, complete todos los campos con valores válidos.";
        return;
    }

    let alumno = {
        nombre: nombreAlumno,
        notas: notas,
        pokemon: pokemones[Math.floor(Math.random() * pokemones.length)]
    };

    alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    crearTarjeta(alumno);
    form.reset();
});

function cargarTarjetas() {
    alumnos.forEach(alumno => {
        crearTarjeta(alumno);
    });
}
