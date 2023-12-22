document.addEventListener('DOMContentLoaded', () => {

    let countError = 0;
    let palabras = ['escuela', 'fideos', 'documento', 'teclado', 'programar', 'television', 'diccionario', 'hamburguesa'];
    const mostrarLetras = document.querySelector('.mostrarLetras');
    const errorSpan = document.getElementById('errores')
    const letras = document.querySelectorAll('button')
    const elegirPalabra = Math.floor(Math.random() * palabras.length);
    const reiniciar = document.getElementById('reiniciarJuego');
    let nombreUsuario = prompt('Antes de empezar, ingresa tu nombre');
    let terminoJuego = false;
    let palabraElegida = palabras[elegirPalabra];
    let termino = document.getElementById('mensaje')
    reiniciar.addEventListener('click', reiniciarJuego)

    for (let i = 0; i < palabraElegida.length; i++) {
        const letraAdivinar = document.innerText = '_';
        const contenedorLetra = document.createElement('span');
        contenedorLetra.setAttribute('index', i)
        contenedorLetra.append(letraAdivinar);
        mostrarLetras.append(contenedorLetra);
    }

    letras.forEach((letra) => {
        letra.addEventListener('click', (e) => {
            if (nombreUsuario === '' || nombreUsuario === null || nombreUsuario === undefined) {
                reiniciarJuego();
            }else{
                let letraClickeada = e.target.value;
                chequearLetra(letraClickeada, e);
            }
        })
    })

    function chequearLetra(letra, letraInfo) {
        if (terminoJuego) {
            return true;
        }
        if (palabraElegida.includes(letra)) {
            letraInfo.target.classList.add('acierto')
            revelarLetra(letra);
            if (adivinoPalabra()) {
                chequearResultado(true);
            }
            //Si adivino terminar
        } else {
            countError++;
            letraInfo.target.classList.add('error')
            letraInfo.target.disabled = true
            errorSpan.innerText = countError;
            if (countError > 3) {
                chequearResultado(false);
            }
        }
    }

    function revelarLetra(letra) {
        let cantLetras = [];
        for (let i = 0; i < palabraElegida.length; i++) {
            if (palabraElegida[i] === letra) {
                cantLetras.push(i);
            }
        }
        cantLetras.forEach((index) => {
            let spans = document.querySelectorAll('.mostrarLetras span');
            spans[index].innerHTML = letra;
        });

        let posLetra = palabraElegida.indexOf(letra);
        let spans = document.querySelectorAll('.mostrarLetras span');
        spans[posLetra].innerHTML = letra;
    }

    function adivinoPalabra() {
        let spans = document.querySelectorAll('.mostrarLetras span');
        for (let span of spans) {
            if (span.innerHTML === '_') {
                return false;
            }
        }
        return true;
    }

    function chequearResultado(resultado) {
        if (resultado) {
            terminoJuego = true;
            termino.innerHTML = `${nombreUsuario}, Ganaste! Completaste todas la palabra! En  segundos.`
            reiniciar.style.display = "block";
            reiniciar.style.margin = "0 auto";
            reiniciar.style.padding = "16px";
        } else {
            terminoJuego = true;
            termino.innerHTML = `${nombreUsuario}, Perdiste! No conseguiste adivinar la palabra..`;
            reiniciar.style.display = "block";
            reiniciar.style.margin = "0 auto";
            reiniciar.style.padding = "16px";
        }
    }

    function reiniciarJuego() {
        terminoJuego = false;
        countError = 0;


        let errorMessages = document.querySelectorAll('span:not(.mostrarLetras span)');
        errorMessages.forEach(message => message.remove());
        let errorLetters = document.querySelectorAll('button.error')
        let aciertoLetters = document.querySelectorAll('button.acierto')
        errorLetters.forEach(error => error.classList.remove('error'))
        aciertoLetters.forEach(error => error.classList.remove('acierto'))
        termino.innerHTML = ""
        reiniciar.style.display = "none";
        reiniciar.style.margin = "0 auto";
        reiniciar.style.padding = "16";

        mostrarLetras.innerHTML = '';
        for (let i = 0; i < palabraElegida.length; i++) {
            const letraAdivinar = document.createTextNode('_');
            const contenedorLetra = document.createElement('span');
            contenedorLetra.setAttribute('index', i);
            contenedorLetra.appendChild(letraAdivinar);
            mostrarLetras.appendChild(contenedorLetra);
        }


        letras.forEach((letra) => {
            letra.disabled = false;
        });
        
        pedirNombre();
    }


    function pedirNombre() {
        nombreUsuario = prompt('Ingresa tu nombre antes de avanzar');
        return nombreUsuario;
    }
});