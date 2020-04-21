let canvas = document.getElementById("tela")
let context = canvas.getContext("2d")
let btPausa = document.getElementById("btPausa")

//Info sobre o tabuleiro
let nx = 0 //Num de quadro de  X 
let ny = 0
let largura = 20 //Largura dos quadros
let distancia = 5 //Distancia entre os quadros
let borda_x, borda_y //Posições da borda
let nodos = new Array() //pontos snake
nodos.length = 0
//Info sobre estado atual do game
let rodando = false
let xfruta 
let yfruta
let relogio
let intervalo
let proxDirec = new Array()
proxDirec.length = 0

//Um pequeno teste (remover depois de testar)
// context.fillStyle = "red" //Usar cor vermelha
// context.fillRect(20, 30, 50, 100) //x=20, y=30, w=50 e h=100


//Inicia 
CriarTabuleiro()
NovoJogo()

let botaoAdicionarn = document.querySelector("#btNovo")
botaoAdicionarn.addEventListener("click", function(event) {
    NovoJogo()

    pausa()
})

function pausa() { 
    rodando = !rodando
    if (rodando) { 
        btPausa.innerHTML = "Pausar"
        relogio = setInterval("loopPrincipal()", intervalo)
    }
    else { 
        clearInterval(relogio)
        btPausa.innerHTML = "Continuar"
    }
}

function CriarTabuleiro() { 
    nx = Math.floor((canvas.width - distancia) / (largura + distancia))
    ny = Math.floor((canvas.height - distancia) / (largura + distancia))
    borda_x = nx * (distancia + largura) + distancia;
    borda_y = ny * (distancia + largura) + distancia;
}

function NovoJogo() { 
    if (rodando)
    pausa();
        intervalo = 200
    xfruta = nx -1
    yfruta = ny -1
    let xcenter = Math.floor(nx / 2)
    let ycenter = Math.floor(ny / 2)
    nodos.length = 0;
    nodos.push(new Nodo(xcenter, ycenter + 2, dbaixo)) //fim snake
    nodos.push(new Nodo(xcenter, ycenter + 1, dbaixo))
    nodos.push(new Nodo(xcenter, ycenter, dbaixo))
    nodos.push(new Nodo(xcenter, ycenter - 1, dbaixo))
    nodos.push(new Nodo(xcenter, ycenter - 2, dbaixo)) //inicio snake desenho
    btPausa.innerHTML = "Iniciar"
    btPausa.disable=false
    desenhar()
}

function loopPrincipal() { 
    //atulizarr valores
    moverSnake()
    detectarColisoes()
    desenhar()
}



function detectarColisoes() {
    //Colisão da cabeça com alguma parede
     if ((nodos[0].x < 0) || (nodos[0].x >= nx) || (nodos[0].y < 0) || (nodos[0].y >= ny)) {
     executarGameOver() //Game Over!
     }
     //Colisão da cabeça com o corpo
 for (i = 1; i < nodos.length; i++) {
    if ((nodos[0].x == nodos[i].x) && (nodos[0].y == nodos[i].y)) {
    executarGameOver(); //Game Over!
    }
    }

    //Comer a fruta
 if ((nodos[0].x == xfruta) && (nodos[0].y == yfruta)) {

 var ultimo = nodos.length - 1;
 nodos.push(new Nodo(nodos[ultimo].x, nodos[ultimo].y, nodos[ultimo].direc));
 var novoultimo = ultimo + 1;
 switch (nodos[ultimo].direc) {
 case dbaixo:
 nodos[novoultimo].y -= 1;
 break;
 case ddireita:
 nodos[novoultimo].x -= 1;
 break;
 case dcima:
 nodos[novoultimo].y += 1;
 break;
 case desquerda:
 nodos[novoultimo].x += 1;
 break;
 }
 novaPosFruta();
 }
   }


function executarGameOver() {
    btPausa.disabled = true
    if (rodando)
    pausa()
}

function moverSnake() {
    //Mover todos os nodos, exceto cabeça
    for (i = nodos.length - 1; i > 0; i--) {
    nodos[i].x = nodos[i-1].x
    nodos[i].y = nodos[i-1].y
    nodos[i].direc = nodos[i-1].direc
    }
//Se lista de comandos não estiver vazia
if (proxDirec.length > 0)
//Se há uma direção diferente da atual
if (nodos[0].direc != proxDirec[0])
//Alterar a direção
nodos[0].direc = proxDirec[0];
//Executa movimento da cabeça
nodos[0].Mover();
//Enquanto houverem comandos na lista
while (proxDirec.length > 0) {
//Se o comando é redundante
if (proxDirec[0] == nodos[0].direc)
//Remove o comando do inicio da lista
proxDirec.shift();
else
//Se não for, para a repetição
break;
}
}
function desenhar() { 
 //Variáveis auxiliares para desenhar
 var xi, yi;
 //Limpar a tela
 context.clearRect(0, 0, canvas.width, canvas.height);
 //Desenhar bordas
 context.fillStyle = "#888888";
 context.fillRect(borda_x, 0, canvas.width - 1, canvas.height - 1)
 context.fillRect(0, borda_y, canvas.width - 1, canvas.height - 1)
  //Desenhar a Snake
  context.fillStyle = "#00FF00";
  for (i = 0; i < nodos.length; i++) {
  xi = distancia + nodos[i].x * (largura + distancia)
  yi = distancia + nodos[i].y * (largura + distancia)
  context.fillRect(xi, yi, largura, largura)
  }
  //Desenhar a fruta
  context.fillStyle = "#FF0000"
  xi = distancia + (xfruta * (largura + distancia)) + Math.floor(largura/2)
  yi = distancia + (yfruta * (largura + distancia)) + Math.floor(largura/2)
  context.beginPath()
  context.arc(xi, yi, distancia, 0, Math.PI * 2, true)
  context.closePath()
  context.fill()

 
}

//Eventos
document.onkeydown=onKD;
function onKD(evt) {
switch (evt.keyCode) {
 case 37: //esquerda
//  nodos[0].direc = desquerda;
proxDirec.push(desquerda)
 break;
 case 38: //cima
//  nodos[0].direc = dcima;
proxDirec.push(dcima)
 break;s
 case 39: //direita
//  nodos[0].direc = ddireita;
proxDirec.push(ddireita)
 break;
 case 40: //baixo
//  nodos[0].direc = dbaixo;
proxDirec.push(dbaixo)
 break;
 }
}


function novaPosFruta() { //Determinar uma nova posição para a fruta
    do {
    xfruta = Math.floor(Math.random() * nx)
    yfruta = Math.floor(Math.random() * ny)
    } while (colisaoFruta() == true);
   }

   
   
function colisaoFruta() { //Verificar se posição da fruta colide com corpo da snake
    for (i = 0; i < nodos.length; i++) {
    if ((xfruta == nodos[i].x) && (yfruta == nodos[i].y))
    return true
    }
    return false
   }


