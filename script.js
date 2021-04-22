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
// variáveis globais que vão servir quando criar o quizz

let urlimagemQuizzCriado;
let tituloDoQuizzCriado;
let qtdDePerguntasQuizzCriado;
let qtdDeNiveisQuizzCriado;

let arrayPerguntas;
let arrayNiveis;

//criando o quizz

function crieSuasPerguntas() {
    let listaDeRespostas = document.querySelector(".caixaDePerguntas").children;
    let tituloDoQuizz = listaDeRespostas[0].value;
    let urlDaImagemDoSeuQuizz = listaDeRespostas[1].value;
    let qtdDeperguntasDoSeuQuizz = listaDeRespostas[2].value;
    let qtdDeNiveisDoQuizz = listaDeRespostas[3].value

    //condição para passar para a próxima página
    let tituloCerto = tituloDoQuizz.length < 65 && tituloDoQuizz.length > 20;
    let urlCerto = checkImgOnline(urlDaImagemDoSeuQuizz);
    let qtdDeperguntasCerto = parseInt(qtdDeperguntasDoSeuQuizz) > 2;
    let qtdNiveisCerto = parseInt(qtdDeNiveisDoQuizz) > 1;


    if(tituloCerto && urlCerto && qtdDeperguntasCerto && qtdNiveisCerto){
        urlimagemQuizzCriado = urlDaImagemDoSeuQuizz;
        tituloDoQuizzCriado = tituloDoQuizz;
        qtdDePerguntasQuizzCriado = qtdDeperguntasDoSeuQuizz;
        qtdDeNiveisQuizzCriado = qtdDeNiveisDoQuizz;


        let paginaDaCriacao = document.querySelector(".criandoUmQuizz");
        paginaDaCriacao.classList.add("escondido");

        let paginaDePerguntas = document.querySelector(".criarPerguntas");
        paginaDePerguntas.classList.remove("escondido");

        let perguntas = document.querySelector(".criarPerguntas");
        let numeroDePerguntas = ""

        for(let i = 0; i < qtdDeperguntasDoSeuQuizz; i++){
            numeroDePerguntas +=`
            
            <div class="caixaDeCriarPerguntas pergunta${i}">
                <div class="perguntaCriada">
                    <p>Pergunta ${i+1}</p>
                    <ion-icon onclick="colocarPerguntas(this,${i})" name="create-outline"></ion-icon>
                </div>
            </div>`
        
        }
        perguntas.innerHTML = numeroDePerguntas +`<input onclick="crieSeusNiveis()" type="button" value="Prosseguir para criar níveis">`
        }

    else{
        alert(`Ocorreu um erro :(\nPreencha os dados novamente`);
    }
}

// perguntas para o quizz

function colocarPerguntas(elemento,numeroDaPergunta) {
    let abrirCaixa = elemento.parentNode.parentNode;
    console.log(abrirCaixa);
    abrirCaixa.innerHTML = `
            <div class="perguntaCriada">
                <p>Pergunta ${numeroDaPergunta+1}</p>
                <ion-icon name="create-outline"></ion-icon>
            </div>
            <input type="text" value="" placeholder="Texto da pergunta">
            <input type="text" value="" placeholder="Cor de fundo da pergunta">
            <p>Resposta correta</p>
            <input type="text" value="" placeholder="Resposta correta">
            <input type="text" value="" placeholder="URL da imagem">
            <p>Respostas incorretas</p>
            <input type="text" value="" placeholder="Resposta incorreta 1">
            <input type="text" value="" placeholder="URL da imagem 1">
            <input type="text" value="" placeholder="Resposta incorreta 2">
            <input type="text" value="" placeholder="URL da imagem 2">
            <input type="text" value="" placeholder="Resposta incorreta 3">
            <input type="text" value="" placeholder="URL da imagem 3">`
}

// ir para a parte de criar níveis

function crieSeusNiveis() {

    arrayPerguntas = [];
    for(let i = 0; i <qtdDePerguntasQuizzCriado; i++){
        let listaDePerguntas = document.querySelector(`.pergunta${i}`).children;

        let textoDaPergunta = listaDePerguntas[1].value;
        let corDeFundo = listaDePerguntas[2].value;
        let respostaCorreta = listaDePerguntas[4].value;
        let urlDaImagemCorreta = listaDePerguntas[5].value;
        let respostaIncorreta1 = listaDePerguntas[7].value;
        let urlRespostaIncorreta1 = listaDePerguntas[8].value;
        let respostaIncorreta2 = listaDePerguntas[9].value;
        let urlRespostaIncorreta2 = listaDePerguntas[10].value;
        let respostaIncorreta3 = listaDePerguntas[11].value;
        let urlRespostaIncorreta3 = listaDePerguntas[12].value;

        // condições para ir para a próxima página
        let textoDaPerguntaCerto = textoDaPergunta.length >= 20 && textoDaPergunta != null;
        let corDeFundoCerta = corDeFundo[0] =="#" && corDeFundo.length == 7;
        let corDeFundoHexa1 = typeof(corDeFundo[1]) == "string" ||typeof(corDeFundo[1]) == "number";
        let corDeFundoHexa2 = typeof(corDeFundo[2]) == "string" ||typeof(corDeFundo[2]) == "number";
        let corDeFundoHexa3 = typeof(corDeFundo[3]) == "string" ||typeof(corDeFundo[3]) == "number";
        let corDeFundoHexa4 = typeof(corDeFundo[4]) == "string" ||typeof(corDeFundo[4]) == "number";
        let corDeFundoHexa5 = typeof(corDeFundo[5]) == "string" ||typeof(corDeFundo[5]) == "number";
        let corDeFundoHexa6 = typeof(corDeFundo[6]) == "string" ||typeof(corDeFundo[6]) == "number";
        let urlCorreta = checkImgOnline(urlDaImagemCorreta) && checkImgOnline(urlRespostaIncorreta1) && checkImgOnline(urlRespostaIncorreta2) && checkImgOnline(urlRespostaIncorreta3);
        let respostaCorretaCerto = respostaCorreta != null;
        let respostaInconrretaCerto = respostaIncorreta1 !=null || respostaIncorreta2 != null || respostaIncorreta3!= null;



        if(textoDaPerguntaCerto && corDeFundoCerta && corDeFundoHexa1 && corDeFundoHexa2 && corDeFundoHexa3 && corDeFundoHexa4 && corDeFundoHexa5 && corDeFundoHexa6 && urlCorreta && respostaCorretaCerto && respostaInconrretaCerto){
            arrayPerguntas.push({title: textoDaPergunta, color: corDeFundo,answers:[{text: respostaCorreta, image: urlDaImagemCorreta, isCorrectAnswer: true},{text: respostaIncorreta1, image: urlRespostaIncorreta1, isCorrectAnswer: false},{text: respostaIncorreta2, image: urlRespostaIncorreta2, isCorrectAnswer: false},{text: respostaIncorreta3, image: urlRespostaIncorreta3, isCorrectAnswer: false}]})
        
            let paginaDePerguntas = document.querySelector(".criarPerguntas");
            paginaDePerguntas.classList.add("escondido");
        
            let paginaDeQuizz = document.querySelector(".quizzNiveis");
            paginaDeQuizz.classList.remove("escondido");
        
            let niveis = document.querySelector(".quizzNiveis");
            let numeroDeNiveis = "";
        
            for(let i = 0; i < qtdDeNiveisQuizzCriado; i++){
                numeroDeNiveis +=`
                <div class="caixaDeNiveis nivel${i}">
                <div class="nivelCriado">
                            <p>Nível ${i+1}</p>
                            <ion-icon onclick="abrirNiveis(this,${i})" name="create-outline"></ion-icon>
                        </div></div>`
            
            }
            niveis.innerHTML = numeroDeNiveis+`<input onclick="quizzCriado()" type="button" value="Finalizar Quizz"> 
            `;
        }
        else{
            alert(`Ocorreu um erro :(\nPreencha os dados novamente`);
        }

    }  
}

function abrirNiveis(elemento,numeroDoQuizz) {
    let abrirCaixa = elemento.parentNode.parentNode;
    console.log(abrirCaixa);
    abrirCaixa.innerHTML = `
                <div class="nivelCriado">
                    <p>Nível ${numeroDoQuizz+1}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            <input type="text" value="" placeholder="Título do nível">
            <input type="text" value="" placeholder="% de acerto mínimo">
            <input type="text" value="" placeholder="URL da imagem do nível">
            <input type="text" value="" placeholder="Descrição do nível">`
}

// quizz criado

function quizzCriado() {


    arrayNiveis = [];
    for(let i = 0; i <qtdDeNiveisQuizzCriado; i++){
        let listaDeNiveis = document.querySelector(`.nivel${i}`).children;

        let tituloDoNivel = listaDeNiveis[1].value;
        let acertoMinimo = listaDeNiveis[2].value;
        let urlDaImagem = listaDeNiveis[3].value;
        let descricao = listaDeNiveis[4].value;


        let tituloNivelCerto = tituloDoNivel.length > 10;
        let acertoMinCerto = parseInt(acertoMinimo) <= 100 && parseInt(acertoMinimo) >= 0;
        let urlDaImagemCerto = checkImgOnline(urlDaImagem);
        let descricaoCerta = descricao.length > 30;


        if(tituloNivelCerto && acertoMinCerto && urlDaImagemCerto && descricaoCerta){
            arrayNiveis.push({title: tituloDoNivel, image: urlDaImagem, text: descricao, minValue: acertoMinimo});

        }
        else{
            alert(`Ocorreu um erro :(\nPreencha os dados novamente`);
            return "errado :(";
        }
    }

    for(let i = 0; i < arrayDeRespostas.length; i++){
        if(arrayDeRespostas[i].minValue == 0){
            //colocando tudo no servidor
            const dados = {
                title: tituloDoQuizzCriado,
                image: urlimagemQuizzCriado,
                questions: arrayPerguntas,
                levels: arrayNiveis
            }
            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes", dados);

            // abrindo a última página
            let paginaDeQuizz = document.querySelector(".quizzNiveis");
            paginaDeQuizz.classList.add("escondido");
        
            let finalizarQuizz = document.querySelector(".quizzPronto");
            finalizarQuizz.classList.remove("escondido");  
            
            let informacoesDoQuizz = document.querySelector(".imagemQuizzPronto")
            informacoesDoQuizz.innerHTML = `
                <div><img src="${urlimagemQuizzCriado}" alt=""> </div>
                <p>${tituloDoQuizzCriado}</p>
            `
            return "concluiu quizz";
        }
        
    }  
    
    alert(`Ocorreu um erro :(\nPreencha os dados novamente`);
}

function irParaQuizzCriado() {
    //vou fazer hoje
}

function voltarHome() {
    let finalizarQuizz = document.querySelector(".quizzPronto");
    console.log(finalizarQuizz);
    finalizarQuizz.classList.add("escondido"); 

    let adicionarQuizzEscondido = document.querySelector(".quizzesAdicionados");
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
    console.log(conteudo.data.questions[0].answers);

    let addFotoFundo = document.querySelector(".fotoDeFundo")
    addFotoFundo.innerHTML += `
    <img src="${conteudo.data.image}">
    <span>${conteudo.data.title}</span>` 

    let addPerguntas = document.querySelector(".conteiner")

   // for(let i = 0; i < conteudo.data.questions[0].answers.length; i++){//
        addPerguntas.innerHTML += `
        <div class="conteinerDePerguntas" >
        <span class="pergunta">${conteudo.data.questions[0].title}</span>
        <ul>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[0].answers[0].image}" onclick="escolhida(this)">
                <span><strong>${conteudo.data.questions[0].answers[0].text}</strong></span>
            </li>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[0].answers[1].image}" onclick="escolhida(this)">
                <span><strong>${conteudo.data.questions[0].answers[1].text}</strong></span>
            </li>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[0].answers[2].image}" onclick="escolhida(this)">
                <span><strong>${conteudo.data.questions[0].answers[2].text}</strong></span>
            </li>
            <li class="opcaoDeImg">
                <img src="${conteudo.data.questions[0].answers[3].image}" onclick="escolhida(this)">
                <span><strong>${conteudo.data.questions[0].answers[3].text}</strong></span>
            </li>
        </ul>
        </div>`
        
    //}//

//colocar a porcentagem de acerto e achar indice representante//

    let addResultado = document.querySelector(".conteirerResultado");

    addResultado.innerHTML +=`
    <span class="porcentagemDeAcerto">${conteudo.data.levels[1].title}</span>
    <ul>
        <li>
            <img src="${conteudo.data.levels[1].image}">
        </li>
        <li><strong>${conteudo.data.levels[1].text}</strong> 
        </li>
    </ul>`
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

function escolhida(imagem){
    imagem.classList.toggle("opacidade")
   
}
