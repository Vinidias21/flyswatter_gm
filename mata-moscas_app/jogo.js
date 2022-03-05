var altura = 0; 
var largura = 0; // Precisa declarar antes pq são variáveis que terão seu valor modificado
var vidas = 1;
var tempo = 10;

/* Recuperar o nível do jogo */

var criaMoscaTempo = 1500;
var nivel = window.location.search; // Pegar somente as informações passadas a URL, tudo aquilo que está após o ?
nivel = nivel.replace('?', '');

if(nivel === 'normal') {
    criaMoscaTempo = 1500;
} else if(nivel === 'medio') {
    criaMoscaTempo = 1000;
} else if(nivel === 'insano') {
    criaMoscaTempo = 750;
}

/* Término da lógica de dificuldade do jogo */

function ajustaTamanhoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;

    console.log(largura, altura);
}

ajustaTamanhoJogo();

var cronometro = setInterval(function() {

    tempo -= 1;

    if(tempo < 0) {
        
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = 'vitoria.html';
    } else {
        document.getElementById('tmp').innerHTML = tempo;
    }
    
}, 1000)

function posicaoAleatoriaMosca() {

    /* Identificar se existe outra mosca existente ou não e ir retirando as existentes */

    if(document.getElementById('mosca')) {
        document.getElementById('mosca').remove();

        if(vidas > 3) {
            window.location.href = 'fim_jogo.html';
        } else {
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png';
            vidas++;
        }

    }

    /* POSIÇÕES ALEATÓRIAS DA MOSCA */

    var posicao_X = Math.floor(Math.random() * largura - 90);
    var posicao_Y = Math.floor(Math.random() * altura - 90);

    posicao_X = posicao_X < 0 ? 0 : posicao_X
    posicao_Y = posicao_Y < 0 ? 0 : posicao_Y

    console.log(posicao_X, posicao_Y);

    // Criando o elemento HTML(img) da mosca

    var mosca = document.createElement('img');
    mosca.src = 'imagens/mosca.png';
    mosca.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
    mosca.style.left = posicao_X + 'px';
    mosca.style.top = posicao_Y + 'px';
    mosca.style.position = 'absolute';
    mosca.id = 'mosca';
    // Função de clicar no elemento para removê-lo
    mosca.onclick = function sumirMosca() {
        this.remove(); 
    }

    document.body.appendChild(mosca);

}
/* Definindo o tamanho da mosca */

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3);

    switch(classe) {
        case 0:
            return 'mosca1'; // Não será necessário o uso do break, pois o "return" finaliza a operação
        case 1:
            return 'mosca2';
        case 2:
            return 'mosca3';
    }
}

/* Definindo o lado da mosca */

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2);

    switch(classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB';
    }
}
