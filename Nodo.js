//Sentidos de movimento
let dcima = 1
let ddireita = 2
let dbaixo = 3
let desquerda = 4
function Nodo(px, py, dir) {
 let x, y, direc
 this.x = px
 this.y = py
 this.direc = dir
 this.Mover = function() {
 switch (this.direc) {
 case dcima:
 this.y -= 1
 break
 case dbaixo:
 this.y += 1
 break
 case ddireita:
 this.x += 1
 break
 case desquerda:
 this.x -= 1
 break
 }
 }
}
