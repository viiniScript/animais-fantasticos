export default class AnimaNumeros {
  constructor(numeros, observerTarget, observerClass) {
    this.numeros = document.querySelectorAll(numeros);
    this.observerTarget = document.querySelector(observerTarget);
    this.observerClass = observerClass;

    // bind o this do obj ao callback da mutação
    this.handleMutation = this.handleMutation.bind(this);
  }

  // Recebe um elemento do DOM, com número em seu texto.
  // Incrementa a partir de 0 até seu número final.
  static incrementarNumero(numero) { // static pois não necessita do obj pra funcionar.
    const total = +numero.innerText;
    const incremento = Math.floor(total / 100);
    let start = 0;
    const timer = setInterval(() => {
      start += incremento;
      numero.innerText = start;
      if (start > total) {
        numero.innerText = total;
        clearInterval(timer);
      }
    }, 25 * Math.random());
  }

  // Ativa incrementar número para cada
  // número selecionado do DOM.
  animaNumeros() {
    // this.constructor pois o método é estático.
    this.numeros.forEach(numero => this.constructor.incrementarNumero(numero));
  }

  // Função que ocorre quando a mutação ocorrer.
  handleMutation(mutation) {
    // this precisa ser a instância da classe. (bind)
    if (mutation[0].target.classList.contains(this.observerClass)) {
      this.observer.disconnect();
      this.animaNumeros();
    }
  }

  // Adiciona o mutatitionObserver para verificar
  // quanto a classe ativo é adicionada ao elemento target.
  addMutationObserver() {
    this.observer = new MutationObserver(this.handleMutation);
    this.observer.observe(this.observerTarget, { attributes: true });
  }

  init() {
    if (this.numeros.length && this.observerTarget) {
      this.addMutationObserver();
    }
    return this;
  }
}
