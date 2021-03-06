carregarPaginaPrincipal();

function carregarPaginaPrincipal() {
    const promessa = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes");
    promessa.then(processarQuizz);
}

function processarQuizz(resposta) {
    carregarCriarQuizz();

    let ul = document.querySelector(".todosQuizzes ul");
	
   

    for(let i = 0; i < resposta.data.length; i++){

        if(localStorage.length != 0){
            for(let j = 0; j < localStorage.length; j++){
                let quizzIDlocalStorage = localStorage.key(j);
                let quizzID = localStorage.getItem(quizzIDlocalStorage);
                if(quizzID == resposta.data[i].id){
                    let quizzesCriados = document.querySelector(".quizzesAdicionados").children;
                    let ul = "";  
                            
                    ul = `<li class="quizz"> 
                            <img src="${resposta.data[i].image}" onclick="irParaQuizz(this)" id="${resposta.data[i].id}">
                            <span class="descricaoDoQuizz">${resposta.data[i].title}</span>
                       </li>` + ul
                    
        
                    quizzesCriados[1].innerHTML +=  ul 
                }
                else{
                    ul.innerHTML += `
                <li class="quizz"> 
                        <img src="${resposta.data[i].image}" id="${resposta.data[i].id}" onclick="irParaQuizz(this)">
                        <span class="descricaoDoQuizz">${resposta.data[i].title}</span>
                </li>`
                }
            }
                    
        }
 
        else{
            ul.innerHTML += `
        <li class="quizz"> 
                <img src="${resposta.data[i].image}" id="${resposta.data[i].id}" onclick="irParaQuizz(this)">
                <span class="descricaoDoQuizz">${resposta.data[i].title}</span>
        </li>`
        }
        
    }
    
}

function sumirTelaPrincipal() {
    let adicionarQuizzEscondido = document.querySelector(".criarQuizz");
    adicionarQuizzEscondido.classList.add("escondido");

    let QuizzesAdicionadosEscondido = document.querySelector(".quizzesAdicionados");
    QuizzesAdicionadosEscondido.classList.add("escondido");

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
// vari??veis globais que v??o servir quando criar o quizz

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
    let qtdDeNiveisDoQuizz = listaDeRespostas[3].value;

    //condi????o para passar para a pr??xima p??gina
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
        perguntas.innerHTML = `<p>Crie suas perguntas</p>` + numeroDePerguntas +`<input onclick="crieSeusNiveis()" type="button" value="Prosseguir para criar n??veis">`
        
        listaDeRespostas[0].value = "";
        listaDeRespostas[1].value = "";
        listaDeRespostas[2].value = "";
        listaDeRespostas[3].value = "";
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

// ir para a parte de criar n??veis

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

        // condi????es para ir para a pr??xima p??gina
        let textoDaPerguntaCerto = textoDaPergunta.length >= 20 
        let textoCerto = textoDaPergunta != null;
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


        if(textoCerto && textoDaPerguntaCerto && corDeFundoCerta && corDeFundoHexa1 && corDeFundoHexa2 && corDeFundoHexa3 && corDeFundoHexa4 && corDeFundoHexa5 && corDeFundoHexa6 && urlCorreta && respostaCorretaCerto && respostaInconrretaCerto){
                       
            arrayPerguntas.push({title: textoDaPergunta, color: corDeFundo, answers:[{text: respostaCorreta, image: urlDaImagemCorreta, isCorrectAnswer: true},{text: respostaIncorreta1, image: urlRespostaIncorreta1, isCorrectAnswer: false},{text: respostaIncorreta2, image: urlRespostaIncorreta2, isCorrectAnswer: false},{text: respostaIncorreta3, image: urlRespostaIncorreta3, isCorrectAnswer: false}]})
        
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
                            <p>N??vel ${i+1}</p>
                            <ion-icon onclick="abrirNiveis(this,${i})" name="create-outline"></ion-icon>
                        </div></div>`
            
            }
            niveis.innerHTML = `<p>Agora, decida os n??veis</p>`+numeroDeNiveis+`<input onclick="quizzCriado()" type="button" value="Finalizar Quizz"> 
            `;
        }
        else{
            alert(`Ocorreu um erro :(\nPreencha os dados novamente`);
            break;
        }

    }  
}

function abrirNiveis(elemento,numeroDoQuizz) {
    let abrirCaixa = elemento.parentNode.parentNode;
    console.log(abrirCaixa);
    abrirCaixa.innerHTML = `
                <div class="nivelCriado">
                    <p>N??vel ${numeroDoQuizz+1}</p>
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            <input type="text" value="" placeholder="T??tulo do n??vel">
            <input type="text" value="" placeholder="% de acerto m??nimo">
            <input type="text" value="" placeholder="URL da imagem do n??vel">
            <input class="caixaDeNiveisDescricao" type="text" value="" placeholder="Descri????o do n??vel">`
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

    for(let i = 0; i < arrayNiveis.length; i++){
        if(arrayNiveis[i].minValue == 0){
            //colocando tudo no servidor
            const dados = {
                title: tituloDoQuizzCriado,
                image: urlimagemQuizzCriado,
                questions: arrayPerguntas,
                levels: arrayNiveis
            }

            const requisicao = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes", dados);
            
            let resposta = requisicao.then(tratarSucesso)
            
            
            // abrindo a ??ltima p??gina
            let paginaDeQuizz = document.querySelector(".quizzNiveis");
            paginaDeQuizz.classList.add("escondido");
        
            let finalizarQuizz = document.querySelector(".quizzPronto");
            finalizarQuizz.classList.remove("escondido");  
            
            let informacoesDoQuizz = document.querySelector(".imagemQuizzPronto")
            informacoesDoQuizz.innerHTML = `
                <div><img src="${urlimagemQuizzCriado}" alt=""> 
                <p>${tituloDoQuizzCriado}</p></div>
            `
            return "concluiu quizz";
        }
        
    }  
    
    alert(`Ocorreu um erro :(\nPreencha os dados novamente`);
}

function tratarSucesso(resposta) {
    console.log("deu certo")
    localStorage.setItem(`quizz${resposta.data.id}`, JSON.stringify(resposta.data.id));

    let acessarQuizz = document.querySelector(".botoesQuizzPronto");
    acessarQuizz.innerHTML = `<input onclick="irParaQuizz(this)" id="${resposta.data.id}" type="button" value="Acessar Quizz">
    <p onclick="voltarParaHome()">Voltar para home</p>`


        let quizzesCriados = document.querySelector(".quizzesAdicionados").children;
        let ul = "";

        
        const quizzResposta = JSON.parse(localStorage.getItem(`quizz${resposta.data.id}`));     
    

    
        ul = `<li class="quizz"> 
                <img src="${urlimagemQuizzCriado}" onclick="irParaQuizz(this)" id="${quizzResposta}">
                <span class="descricaoDoQuizz">${tituloDoQuizzCriado}</span>
            </li>` + ul
        

        quizzesCriados[1].innerHTML +=  ul 
}


function processarQuizzCriado(resposta) {
    for(let i = 0; i < resposta.data.length; i++){
        const quizzSerializado = localStorage.getItem("listaDeQuizz");
        const listaDeQuizz = JSON.parse(quizzSerializado); 
        if(resposta.data[i].image == listaDeQuizz.image && resposta.data[i].title == listaDeQuizz.title){
            const retorno = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${resposta.data[i].id}`);
            retorno.then(montandoQuizzEscolhido);
        }
}
}

function carregarCriarQuizz() {
    if(localStorage.length != 0){
        let criarQuizz = document.querySelector(".criarQuizz");
        criarQuizz.classList.add("escondido");

        let adicionarQuizzEscondido = document.querySelector(".quizzesAdicionados");
        adicionarQuizzEscondido.classList.remove("escondido");
    }
}

function voltarParaHome() {
    carregarCriarQuizz();
    let finalizarQuizz = document.querySelector(".quizzPronto");
    finalizarQuizz.classList.add("escondido"); 
    
    let quizzEscondido = document.querySelector(".todosQuizzes");
    quizzEscondido.classList.remove("escondido");

    carregarPaginaPrincipal();
}

function criarQuizzDeNovo() {
    let adicionarQuizzEscondido = document.querySelector(".quizzesAdicionados");
    adicionarQuizzEscondido.classList.add("escondido");

    let quizzEscondido = document.querySelector(".todosQuizzes");
    quizzEscondido.classList.add("escondido");

    let paginaDaCriacao = document.querySelector(".criandoUmQuizz");
    paginaDaCriacao.classList.remove("escondido");
}

//fim de criar quizz

//ir para quizz escolhido

let elementoTeste;

function irParaQuizz(elemento){
    let finalizarQuizz = document.querySelector(".quizzPronto");
    finalizarQuizz.classList.add("escondido"); 

    sumirTelaPrincipal();

    elementoTeste = elemento;

    let telaDoQuizz = document.querySelector(".quizzEscolhido");
    telaDoQuizz.classList.remove("escondido")

    const scrollParaCima = document.querySelector('.fotoDeFundo');
    scrollParaCima.scrollIntoView();

    const retorno = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes/${elemento.id}`);
    retorno.then(montandoQuizzEscolhido);
}

function montandoQuizzEscolhido(conteudo){

    arrayLevels = conteudo.data.levels;

    let addFotoFundo = document.querySelector(".fotoDeFundo");
    addFotoFundo.innerHTML = "";
    addFotoFundo.innerHTML += `
    <img src="${conteudo.data.image}">
    <span>${conteudo.data.title}</span>` 

    let addPerguntas = document.querySelector(".conteiner");
    addPerguntas.innerHTML = "";

    if(conteudo.data.questions[0].answers.length === 4){
        for(let i = 0; i < conteudo.data.questions.length; i++){
            addPerguntas.innerHTML += `
            <div class="conteinerDePerguntas" >
            <span class="pergunta" style="background-color: ${conteudo.data.questions[i].color}">${conteudo.data.questions[i].title}</span>
            <ul class = "ullis">
                <li class="opcaoDeImg ${conteudo.data.questions[i].answers[0].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[0].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[0].text}</strong></span>
                </li>
                <li class="opcaoDeImg  ${conteudo.data.questions[i].answers[1].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[1].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[1].text}</strong></span>
                </li>
                <li class="opcaoDeImg ${conteudo.data.questions[i].answers[2].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[2].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[2].text}</strong></span>
                </li>
                <li class="opcaoDeImg ${conteudo.data.questions[i].answers[3].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[3].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[3].text}</strong></span>
                </li>
            </ul>
            </div>`
            
        }
    } else if (conteudo.data.questions[0].answers.length === 3){
        for(let i = 0; i < conteudo.data.questions.length; i++){
            addPerguntas.innerHTML += `
            <div class="conteinerDePerguntas" >
            <span class="pergunta">${conteudo.data.questions[i].title}</span>
            <ul class = "ullis">
                <li class="opcaoDeImg ${conteudo.data.questions[i].answers[0].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[0].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[0].text}</strong></span>
                </li>
                <li class="opcaoDeImg  ${conteudo.data.questions[i].answers[1].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[1].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[1].text}</strong></span>
                </li>
                <li class="opcaoDeImg ${conteudo.data.questions[i].answers[2].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[2].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[2].text}</strong></span>
                </li>
            </ul>
            </div>`
        }
    } else if (conteudo.data.questions[0].answers.length === 2){
        for(let i = 0; i < conteudo.data.questions.length; i++){
            addPerguntas.innerHTML += `
            <div class="conteinerDePerguntas" >
            <span class="pergunta">${conteudo.data.questions[i].title}</span>
            <ul class = "ullis">
                <li class="opcaoDeImg ${conteudo.data.questions[i].answers[0].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[0].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[0].text}</strong></span>
                </li>
                <li class="opcaoDeImg  ${conteudo.data.questions[i].answers[1].isCorrectAnswer}" onclick="escolhida(this)">
                    <img src="${conteudo.data.questions[i].answers[1].image}">
                    <span class="classeTeste"><strong>${conteudo.data.questions[i].answers[1].text}</strong></span>
                </li>
            </ul>
            </div>`
        }
    }
}

let soma = 0;
let arrayLevels;

function escolhida(retorno){
    const lista = retorno.parentNode; // isso ?? = ullis
    const listaFilhos = lista.children; // isso ?? os li no ullis
    
    for(let i = 0; i < listaFilhos.length; i++){
        listaFilhos[i].classList.add("opacidade");
        listaFilhos[i].setAttribute("onclick", "");

        if(listaFilhos[i].classList.contains('true')){
            const span = listaFilhos[i].querySelector("span");
            span.classList.add("verde");
        } else{
            const span = listaFilhos[i].querySelector("span");
            span.classList.add("vermelho");
        }
    }

    retorno.classList.remove("opacidade");

    setTimeout(function (){
        retorno.parentNode.parentNode.nextElementSibling.scrollIntoView({behavior: 'smooth', block:'center'})
    }, 2000);


    // resultado do quizz//

    let buscandoPerguntas = document.querySelector(".conteiner"); //div conteiner
    let quantidadePerguntas = buscandoPerguntas.children.length; // quantidade de div conteinerdePerguntas dentro da div conteiner

    
    if (retorno.classList.contains("true")){
        soma = soma + 1;
    }

    total = Math.floor((soma/quantidadePerguntas)*100);
    console.log(total)

    for(let i = 0; i < arrayLevels.length; i++){
        let maior = 0;
        let maiorIndice = 0;
        
        if(arrayLevels[i].minValue == 0){
            let addResultado = document.querySelector(".conteirerResultado");
            addResultado.innerHTML = "";
            addResultado.innerHTML +=`
            <span class="porcentagemDeAcerto">${total + "% de acertos: " + arrayLevels[i].title}</span>
            <ul>
                <li>
                    <img src="${arrayLevels[i].image}">
                </li>
                <li>
                    <strong>${arrayLevels[i].text}</strong> 
                </li>
            </ul>`

        } else if(total >= arrayLevels[i].minValue){
            if(arrayLevels[i].minValue > maior){
                maior = arrayLevels[i].minValue;
                maiorIndice = i;
            }
            let addResultado = document.querySelector(".conteirerResultado");
            addResultado.innerHTML = "";
            addResultado.innerHTML +=`
            <span class="porcentagemDeAcerto">${total + "% de acertos: " + arrayLevels[maiorIndice].title}</span>
            <ul>
                <li>
                    <img src="${arrayLevels[maiorIndice].image}">
                </li>
                <li>
                    <strong>${arrayLevels[maiorIndice].text}</strong> 
                </li>
            </ul>`
        }
    }

    console.log(retorno.parentNode.parentNode.parentNode.nextElementSibling)
    if (retorno == retorno.parentNode.parentNode.parentNode.lastChild){
        setTimeout(function (){
            retorno.parentNode.parentNode.parentNode.nextElementSibling.scrollIntoView({behavior: 'smooth', block:'center'})
        }, 2000);
    }
 
}

function reiniciarQuizz(){
    const scrollParaCima = document.querySelector('.fotoDeFundo');
    scrollParaCima.scrollIntoView();

    irParaQuizz(elementoTeste);
}

function voltarHome(){
    let telaDoQuizz = document.querySelector(".quizzEscolhido");
    telaDoQuizz.classList.add("escondido");

    let todosQuizzes = document.querySelector(".todosQuizzes");
    todosQuizzes.classList.remove("escondido");

    let criarQuizz = document.querySelector(".criarQuizz");
    criarQuizz.classList.remove("escondido");

    const scrollParaCima = document.querySelector('.criarQuizz');
    scrollParaCima.scrollIntoView();

    carregarCriarQuizz();
}

