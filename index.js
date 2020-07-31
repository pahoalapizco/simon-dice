const btnEmpezar = document.getElementById('btnEmpezar')
const celeste    = document.getElementById('celeste')
const violeta    = document.getElementById('violeta')
const naranja    = document.getElementById('naranja')
const verde      = document.getElementById('verde')

class Juego {

  constructor(ultimoNivel, dificultad = 1){
    this.ultimoNivel = ultimoNivel
    this.dificultad = dificultad
    this.inicializar = this.inicializar.bind(this)
    this.inicializar() 
    this.genetarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this)
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.velocidad = Math.floor(1000 / this.dificultad)
    this.velocidadColor = Math.floor(350 / this.dificultad)
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }
  
  toggleBtnEmpezar(){
    if(btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }
  genetarSecuencia() {
    // .fill(0) es para rellenar de dicho valor las posiciones definidas del array
    // .map solo funciona cuando el array esta definido, por eso primero se hacel .fill
    const nuevaSecuencia = new Array(this.ultimoNivel).fill(0).map(n => Math.floor(Math.random() * 4))
    this.secuencia = this.secuencia 
      ? [...this.secuencia, ...nuevaSecuencia] 
      : [...nuevaSecuencia]
  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventoClick()
  }

  transformarNumeroColor(numero){
    switch(numero){
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'naranja'
      case 3:
        return 'verde'
    }
  }

  transformarColorNumero(color){
    switch(color){
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'naranja':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia(){
    for(let i = 0; i < this.nivel; i++){
      const color = this.transformarNumeroColor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), this.velocidad * i) // Mover velocidad
    }
  }

  iluminarColor(color){
    this.colores[color].classList.add('light')
    setTimeout(() => this.apagarColor(color), this.velocidadColor) // Mover velocidad
  }

  apagarColor(color){
    this.colores[color].classList.remove('light')
  }

  agregarEventoClick(){
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.naranja.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick(){
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.naranja.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorNumero(nombreColor)
    this.iluminarColor(nombreColor)

    if(numeroColor === this.secuencia[this.subnivel]){
      this.subnivel++
      if(this.subnivel === this.nivel){
        this.nivel++
        this.eliminarEventosClick()
        if(this.nivel === this.secuencia.length){
          this.genetarSecuencia()
        }
        setTimeout(this.siguienteNivel, this.velocidad) // Mover velocidad
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego(){
    swal('Platzi','Felicidades has ganado', 'success')
      .then(this.inicializar)
  }
  perdioElJuego(){
    swal('Platzi',`Lo sentimos has perdido en el nivel ${this.nivel}`, 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }
}

function empezarJuego(){
  // const juego = new Juego()
  window.juego = new Juego(2, 3)
}