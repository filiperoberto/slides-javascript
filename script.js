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

/*
function preencherRoteiro() {

  let slides = document.querySelectorAll('.slide'); //NodeList
  let listaRoteiro = document.querySelector('.roteiro ul');

  listaRoteiro.innerHTML = '';

  [...slides]
    .filter(element => !element.classList.contains('main') && !element.classList.contains('roteiro')) // filtra primeiro slide e roteiro
    .map(element => element.querySelector('.title')) //pega o elemento título de cada slide
    .map(title => title.textContent) // pega conteúdo de texto de cada título
    .filter((item, pos, a) => a.indexOf(item) === pos) // filtra os repetidos
    .map(title => {
      let item = document.createElement('li');
      item.textContent = title;
      return item;
    }) //cria um item de lista com o conteúdo dos títulos
    .forEach(item => listaRoteiro.appendChild(item)); // inclui no roteiro
}*/

var timeout;
function debounce(callback) {
  clearTimeout(timeout);
  timeout = setTimeout(callback, 100);
}

window.addEventListener("scroll", function(){
  debounce(processaScroll);
});

adicionarNavegacao();
preencherRoteiro();

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
