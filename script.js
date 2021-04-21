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

// criar quizz

function criarQuizz() {
    sumirTelaPrincipal();

    console.log("criar quizz, aguarde");

   let paginaDaCriacao = document.querySelector(".criandoUmQuizz");
   paginaDaCriacao.classList.remove("escondido");
}

// verificar imagem
function checkImgOnline(imageUrl){
    var img = new Image();        
    try {
        img.src = imageUrl;
        return true;
    } catch(err) {
        return false;
    }   
}

function crieSuasPerguntas() {
    let listaDeRespostas = document.querySelector(".caixaDePerguntas").children;
    let tituloDoQuizz = listaDeRespostas[0].value;
    let urlDaImagemDoSeuQuizz = listaDeRespostas[1].value;
    let qtdDeperguntasDoSeuQuizz = listaDeRespostas[2].value;
    let qtdDeNiveisDoQuizz = listaDeRespostas[3].value
    console.log([tituloDoQuizz, urlDaImagemDoSeuQuizz, qtdDeperguntasDoSeuQuizz, qtdDeNiveisDoQuizz]);

    console.log(tituloDoQuizz.length);

    let tituloCerto = tituloDoQuizz.length < 65 && tituloDoQuizz.length > 20;
    let urlCerto = checkImgOnline(urlDaImagemDoSeuQuizz);
    let qtdDeperguntasCerto = parseInt(qtdDeperguntasDoSeuQuizz) > 2;
    let qtdNiveisCerto = parseInt(qtdDeNiveisDoQuizz) > 1;


    if(tituloCerto && urlCerto && qtdDeperguntasCerto && qtdNiveisCerto){
        let paginaDaCriacao = document.querySelector(".criandoUmQuizz");
        paginaDaCriacao.classList.add("escondido");

        let paginaDePerguntas = document.querySelector(".criarPerguntas");
        paginaDePerguntas.classList.remove("escondido");
        }

    else{
        alert(`Ocorreu um erro :(\n Preencha os dados novamente`);
    }
}

function crieSeusNiveis() {
    let paginaDePerguntas = document.querySelector(".criarPerguntas");
    paginaDePerguntas.classList.add("escondido");

    let paginaDeQuizz = document.querySelector(".quizzNiveis");
    paginaDeQuizz.classList.remove("escondido");
    
}

function quizzCriado() {
    let paginaDeQuizz = document.querySelector(".quizzNiveis");
    paginaDeQuizz.classList.add("escondido");

    let finalizarQuizz = document.querySelector(".quizzPronto");
    finalizarQuizz.classList.remove("escondido");    
}

function voltarHome() {
    let finalizarQuizz = document.querySelector(".quizzPronto");
    finalizarQuizz.classList.add("escondido"); 

    let adicionarQuizzEscondido = document.querySelector(".criarQuizz");
    adicionarQuizzEscondido.classList.remove("escondido");

    let quizzEscondido = document.querySelector(".todosQuizzes");
    quizzEscondido.classList.remove("escondido");

    carregarPaginaPrincipal();
}

//fim de criar quizz

//ir para quizz escolhido

function irParaQuizz(elemento){
    sumirTelaPrincipal();
    chamandoQuizzEscolhido();

    let telaDoQuizz = document.querySelector(".quizzEscolhido");
    telaDoQuizz.classList.remove("escondido")

    
}

function chamandoQuizzEscolhido(){
    const retorno = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/1");
    retorno.then(montandoQuizzEscolhido)
}

function montandoQuizzEscolhido(conteudo){
    console.log(conteudo.data.levels);

    let addFotoFundo = document.querySelector(".fotoDeFundo")
    addFotoFundo.innerHTML += `
    <img src="${conteudo.data.image}">
    <span>${conteudo.data.title}</span>` 

    let addPerguntas = document.querySelector(".conteinerDePerguntas")

    for(let i = 0; i < conteudo.data.length; i++){
        addPerguntas.innerHTML += `
        <span class="pergunta">${conteudo.data.questions[1].title}</span>
        <ul>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[1].answer[i].image}" onclick="">
                <span><strong>${conteudo.data.questions[1].answer[i].text}</strong></span>
            </li>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[1].answer[i].image}" onclick="">
                <span><strong>${conteudo.data.questions[1].answer[i].text}</strong></span>
            </li>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[1].answer[i].image}" onclick="">
                <span><strong>${conteudo.data.questions[1].answer[i].text}</strong></span>
            </li>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[1].answer[i].image}" onclick="">
                <span><strong>${conteudo.data.questions[1].answer[i].text}</strong></span>
            </li>
        </ul>`
    }


    let addResultado = document.querySelector(".conteirerResultado");
    for(let i = 0; i < conteudo.data.length; i++){
        addResultado.innerHTML +=`
        <span class="porcentagemDeAcerto">${conteudo.data.levels.title}</span>
        <ul>
            <li>
                <img src="${conteudo.data.levels.image[i]}">
            </li>
            <li><strong>${conteudo.data.levels[i].text[i]}</strong> 
            </li>
        </ul>`
    }
    
}

function reiniciarQuizz(){

}

function voltarHome(){
    let telaDoQuizz = document.querySelector(".quizzEscolhido");
    telaDoQuizz.classList.add("escondido");

    let todosQuizzes = document.querySelector(".todosQuizzes");
    todosQuizzes.classList.remove("escondido");

    let criarQuizz = document.querySelector(".criarQuizz");
    criarQuizz.classList.remove("escondido");

}