

function sumirTelaPrincipal() {
    let adicionarQuizzEscondido = document.querySelector(".criarQuizz");
    adicionarQuizzEscondido.classList.add("escondido");

    let quizzEscondido = document.querySelector(".todosQuizzes");
    quizzEscondido.classList.add("escondido");
}

function criarQuizz() {
    sumirTelaPrincipal()

    console.log("criar quizz, aguarde");

    //adicionar tela pra criar quizz
}

function irParaQuizz(elemento){
    sumirTelaPrincipal();

    let telaDoQuizz = document.querySelector(".quizzEscolhido");
    telaDoQuizz.classList.remove("escondido")

    console.log(elemento);
    alert("Me Clicou!");
}