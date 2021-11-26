function estaVisivelNaTela(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function pegaSlideAtual() {
  let slides = document.querySelectorAll(".slide");

  for (let i = 0; i < slides.length; i++) {
    let slide = slides[i];
    let titulo = slide.querySelector(".title");

    if (estaVisivelNaTela(titulo)) {
      return slide;
    }
  }
  return null;
}

function daDestaqueAoBotaoNavegacao(hash) {
  let anchors = document.querySelectorAll(".nav a");

  for (let i = 0; i < anchors.length; i++) {
    let ancora = anchors[i];
    if (ancora.hash === hash) {
      ancora.classList.add("active");
    } else {
      ancora.classList.remove("active");
    }
  }
}

function processaScroll() {
  let slideAtual = pegaSlideAtual();
  if (slideAtual) {
    daDestaqueAoBotaoNavegacao('#' + slideAtual.id);
  }
}

function adicionarNavegacao() {
  let slides = document.querySelectorAll(".slide");
  let navegacao = document.createElement("nav");
  navegacao.className = "nav";

  for (let i = 0; i < slides.length; i++) {
    let hash = `slide-${i + 1}`;
    slides[i].id = `slide-${i + 1}`;

    let anchor = document.createElement("a");
    anchor.href = `#${hash}`;
    anchor.innerHTML = i + 1;

    navegacao.appendChild(anchor);
  }

  document.body.appendChild(navegacao);

  processaScroll();
}

function preencherRoteiro() {
  let slides = document.querySelectorAll(".slide"); //NodeList
  let listaRoteiro = document.querySelector(".roteiro ul");

  listaRoteiro.innerHTML = "";

  let titulosAdicionados = [];

  for (let i = 0; i < slides.length; i++) {
    let slide = slides[i];

    if (
      slide.classList.contains("main") ||
      slide.classList.contains("roteiro")
    ) {
      continue;
    }

    let elementoTitulo = slide.querySelector(".title");
    let tituloTexto = elementoTitulo.textContent;

    if (titulosAdicionados.indexOf(tituloTexto) != -1) {
      continue;
    }

    titulosAdicionados.push(tituloTexto);

    let item = document.createElement("li");
    item.textContent = tituloTexto;

    listaRoteiro.appendChild(item);
  }
}

function proximoSlide() {
  let slideAtual = pegaSlideAtual();

  if (slideAtual && slideAtual.nextElementSibling) {
    navegaParaId(slideAtual.nextElementSibling.id);
  }
}

function slideAnterior() {
  let slideAtual = pegaSlideAtual();

  if (slideAtual && slideAtual.previousElementSibling) {
    navegaParaId(slideAtual.previousElementSibling.id);
  }
}

function navegaParaId(id) {
  window.location.hash =  '#' + id;
}

function incrementarContador() {

  let contador = document.querySelector('#contador');

  contador.textContent++;
}

var timeout;
function debounce(callback) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, 100);
}

window.addEventListener("scroll", function(){
  debounce(processaScroll);
});

// Botões slide

let botaoSlideAnterior = document.querySelector("#prev-slide");
let botaoProximoSlide = document.querySelector("#next-slide");

botaoProximoSlide.addEventListener("click", proximoSlide);
botaoSlideAnterior.addEventListener("click", slideAnterior);

window.addEventListener("keydown", function (evt) {

  evt.preventDefault();
  switch (evt.key) {
    case "ArrowLeft":
      slideAnterior();
      break;
    case "ArrowRight":
      proximoSlide();
      break;
    case "ArrowUp":
      slideAnterior();
      break;
    case "ArrowDown":
      proximoSlide();
      break;
  }
});

// Contador

let botaoLigarContador = document.querySelector('#ligar-contador');
let botaoDesligarContador = document.querySelector('#desligar-contador');
let contadorInterval = null;

botaoLigarContador.addEventListener('click', function() {

  clearInterval(contadorInterval);
  contadorInterval = setInterval(incrementarContador,1000);
  botaoLigarContador.disabled = true;
});

botaoDesligarContador.addEventListener('click', function() {
  clearInterval(contadorInterval);
  botaoLigarContador.disabled = false;
})

adicionarNavegacao();
preencherRoteiro();
