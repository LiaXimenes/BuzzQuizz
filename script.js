carregarPaginaPrincipal();

function carregarPaginaPrincipal() {
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promessa.then(processarQuizz);
}

function processarQuizz(resposta) {
    let ul = document.querySelector(".todosQuizzes ul");
	
    for(let i = 0; i < resposta.data.length; i++){
        ul.innerHTML += `
        <li class="quizz"> 
                <img src="${resposta.data[i].image}" onclick="irParaQuizz(this)">
                <span class="descricaoDoQuizz">${resposta.data[i].title}</span>
        </li>`
    }
    
}

function sumirTelaPrincipal() {
    let adicionarQuizzEscondido = document.querySelector(".criarQuizz");
    adicionarQuizzEscondido.classList.add("escondido");

    let quizzEscondido = document.querySelector(".todosQuizzes");
    quizzEscondido.classList.add("escondido");
}

function criarQuizz() {
    sumirTelaPrincipal();

    console.log("criar quizz, aguarde");

   let paginaDaCriacao = document.querySelector(".criandoUmQuizz");
   paginaDaCriacao.classList.remove("escondido");
}

function crieSuasPerguntas() {
    let paginaDaCriacao = document.querySelector(".criandoUmQuizz");
    paginaDaCriacao.classList.add("escondido");

    let paginaDePerguntas = document.querySelector(".criarPerguntas");
    paginaDePerguntas.classList.remove("escondido");
}

function irParaQuizz(elemento){
    sumirTelaPrincipal();

    let telaDoQuizz = document.querySelector(".quizzEscolhido");
    telaDoQuizz.classList.remove("escondido")

    console.log(elemento);
}