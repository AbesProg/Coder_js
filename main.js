

function cancelar_juego() {
    return true;
}


function jugar() {

    let intentos = 0;
    let nombre = prompt('Ingrese su nombre');
    if (nombre === null) {
        return cancelar_juego();
    }
    let numero_random = Math.ceil(Math.random() * 20);


    while (!nombre || !isNaN(nombre)) {
        nombre = prompt('Ingrese un nombre válido');
        if (nombre === null) {
            return cancelar_juego();
        }
    }

    while (intentos < 3) {

        let numero_usuario = Number(prompt('Ingrese un numero entre 1 y 20'));

        if (numero_usuario < 1 || numero_usuario > 20 || isNaN(numero_usuario)) {
            alert('Ingrese un numero válido entre 1 y 20');
            if (numero_usuario === null) {
                return cancelar_juego();
            }
        } else if (numero_usuario == numero_random) {
            alert('¡Felicitaciones ' + nombre + ', GANASTE!');
            break;
        } else if (numero_usuario !== numero_random) {
            alert('Seguí participando');
            intentos++;
        } else {
            alert('se acabaron los intentos. El número era ' + numero_random);
        }
    }

    let jugar_nuevamente = confirm('¿Queres volver a jugar?');
    if (jugar_nuevamente) {
        jugar();
    }
}
jugar();

