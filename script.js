
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
preencherRoteiro();
