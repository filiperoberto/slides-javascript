function estaVisivelNaTela(el) {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth)
  );
}

function daDestaqueAoBotaoNavegacao(hash) {
  let anchors = document.querySelectorAll(".nav a");

  [...anchors].forEach((element) => {
    if (element.hash === hash) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

function processaScroll() {
  let slides = document.querySelectorAll(".slide");

  [...slides].forEach((element) => {
    let title = element.querySelector(".title");

    if (estaVisivelNaTela(title)) {
      if (window.history.pushState) {
        let hash = `#${element.id}`;
        window.history.pushState(null, null, hash);

        daDestaqueAoBotaoNavegacao(hash);
      }
    }
  });
}

function adicionarNavegacao() {

  let slides = document.querySelectorAll('.slide');
  let navegacao = document.createElement('nav');
  navegacao.className = 'nav'

  for(let i = 0 ; i < slides.length ; i++) {

    let hash = `slide-${i+1}`;
    slides[i].id = `slide-${i+1}`;

    let anchor = document.createElement('a');
    anchor.href = `#${hash}`;
    anchor.innerHTML = i+1;

    navegacao.appendChild(anchor);
  }

  document.body.appendChild(navegacao)

}

function preencherRoteiro() {

  let slides = document.querySelectorAll('.slide');
  let listaRoteiro = document.querySelector('.roteiro ul');

  listaRoteiro.innerHTML = '';

  [...slides]
    .filter(element => !element.classList.contains('main') && !element.classList.contains('roteiro'))
    .map(element => element.querySelector('.title'))
    .map(title => title.textContent)
    .filter((item, pos, a) => a.indexOf(item) === pos)
    .map(title => {
      let item = document.createElement('li');
      item.textContent = title;
      return item;
    })
    .forEach(item => listaRoteiro.appendChild(item));
}

var timeout;

window.addEventListener("scroll", function () {

  clearTimeout(timeout);
  timeout = setTimeout(processaScroll,100)
  
});

//adicionarNavegacao();
//preencherRoteiro();