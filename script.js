// primero selecciono todos los huecos del contenedor con querySelectorAll
// o sea todos los divs que están dentro de #contai
const huecos = document.querySelectorAll("#contai > div");

// aquí inicio mis variables para el puntaje y para los fallos
let score = 0;
let fails = 0;

// selecciono también los elementos donde voy a mostrar los puntos y fallos
const scoreEl = document.getElementById("score");
const failsEl = document.getElementById("fails");

// este es mi mazo de colombianadas, aquí guardo todas mis frases con su clase e imagen y con su audio respectivo
// cada una tiene una clase que está en el CSS y el audio que tengo en la carpeta
const colombianadas = [
    { clase: "colombianada1", audio: "west.mp3" },
    { clase: "colombianada2", audio: "Yamete Kudasai.mp3" },
    { clase: "colombianada3", audio: "ya sapa hp.mp3" },
    { clase: "colombianada4", audio: "mierda.mp3" },
    { clase: "colombianada5", audio: "cachaco.mp3" },
    { clase: "colombianada6", audio: "gloria.mp3" },
    { clase: "colombianada8", audio: "enano.mp3" },
    { clase: "colombianada9", audio: "rodolfo.mp3" }
];

// esta función lo que hace es hacer aparecer un topo en un hueco random
function appearMole() {
    // primero escojo un hueco random
    const randomIndex = Math.floor(Math.random() * huecos.length);
    const hueco = huecos[randomIndex];

    // si ese hueco ya tiene un topo, entonces no hago nada
    if (hueco.classList.contains('huecotopo')) return;

    // si no tiene topo, entonces lo convierto en topo
    hueco.classList.remove('huecos');
    hueco.classList.add('huecotopo');

    // y luego de un segundo lo vuelvo a dejar vacío
    setTimeout(() => {
        hueco.classList.remove('huecotopo');
        hueco.classList.add('huecos');
    }, 1000);
}

// aquí creo un mazo temporal que va a ser mi copia de todas las colombianadas
let mazo = [...colombianadas];

// creo mi música de fondo, la pongo en loop para que nunca se acabe
const musica = new Audio('musica topo.mp3');
musica.loop = true;
musica.play();

// esta función me da una colombianada random del mazo y además la elimina
// así me aseguro de que no se repitan hasta que se acaben todas
function obtenerColombianada() {
    if (mazo.length === 0) {
        // si ya no quedan, vuelvo a llenar el mazo con todas otra vez
        mazo = [...colombianadas];
    }
    const index = Math.floor(Math.random() * mazo.length);
    return mazo.splice(index, 1)[0];
}

// funciones para iniciar y detener el juego
function startGame() {
    intervalo = setInterval(appearMole, 800); // cada 800ms aparece un topo
}

function stopGame() {
    clearInterval(intervalo); // paro el intervalo para que dejen de salir
}

// esta es la parte divertida, cuando le pego a un topo y suena una colombianada
function playColombianada(hueco) {
    const item = obtenerColombianada();

    // detengo el juego y pauso la música
    stopGame();
    musica.pause();

    // le aplico la clase de la cara que corresponde
    hueco.classList.add("colombianada", item.clase);

    // y su audio
    const sonido = new Audio(item.audio);
    sonido.play();

    // cuando termina el audio, quito la cara, prendo la música y reanudo el juego
    sonido.addEventListener("ended", () => {
        hueco.classList.remove("colombianada", item.clase);
        musica.play();
        startGame();
    });
}

// aquí escucho los clicks en todos los huecos
huecos.forEach(hueco => {
    hueco.addEventListener("click", () => {
        // si tiene topo es acierto, sumo score y disparo colombianada
        if (hueco.classList.contains("huecotopo")) {
            score++;
            scoreEl.textContent = score;
            playColombianada(hueco);
        } else {
            // si no tenía topo, entonces es fallo
            fails++;
            failsEl.textContent = fails;
        }
    });
});

// al final arranco el juego
startGame();
