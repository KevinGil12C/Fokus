//Cambiar fondo
const html = document.querySelector('html');

//Constantes botones
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusic = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const imageIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

const audioPlay = new Audio('./sonidos/play.wav');
const audioStop = new Audio('./sonidos/beep.mp3');
const audioPausa = new Audio('./sonidos/pause.mp3')


let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

musica.loop = true

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
});

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

inputEnfoqueMusic.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

function cambiarContexto(contexto) {
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    mostrarTiempo()
    switch (contexto) {
        case 'enfoque':
            tiempoTranscurridoEnSegundos = 1500
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
            <strong class="app__title-strong" >sumérgete en lo que importa.</strong>
            `
            break;
        case 'descanso-corto':
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro?<br>
            <strong class="app__title-strong" >¡Haz una pausa corta!.</strong>
            `
            break;
        case 'descanso-largo':
            titulo.innerHTML = `
            Hora de volver a la superficie<br>
            <strong class="app__title-strong" >Haz una pausa larga.</strong>
            `
            break;
        default: 
            break;
    }
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <= 0){
        audioStop.play()
        alert('¡Tiempo final!');
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    imageIniciarPausar.setAttribute('src', './imagenes/pause.png');
    tiempoTranscurridoEnSegundos -= 1;
    console.log('Temporizador: ' + tiempoTranscurridoEnSegundos)
    mostrarTiempo()

};

botonIniciarPausar.addEventListener('click', iniciarOpausar);

function iniciarOpausar() {
    if(idIntervalo){
        audioPausa.play()    
        reiniciar();
        return;
    }
    audioPlay.play()
    idIntervalo = setInterval(cuentaRegresiva, 1000);
   
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    imageIniciarPausar.setAttribute('src', './imagenes/play_arrow.png');
    textoIniciarPausar.textContent = "Comenzar"
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos*1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('ex-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()