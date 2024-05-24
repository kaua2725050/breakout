import { Actor, CollisionType, Color, Engine, vec } from "excalibur"

// 1 - Criar uma instancia de Engine que representa o jogo
const game = new Engine({
	width: 800,
	height: 600
})

// 2 - criar barra do player
const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 200,
	height: 20,
	color: Color.Chartreuse
})

//tipo de colisao
//colisiontype.fixed significa que ele nao ira se mexer quando colidir
barra.body.collisionType = CollisionType.Fixed

// insere o actor barra
game.add(barra)


// 3 - movimentar a barra de acordo com o mouse
game.input.pointers.primary.on("move", (event) => {
	//faz a posicao x da barra ser igual a posicao x do mouse
	barra.pos.x = event.worldPos.x
})

//4 - criar bolinha
const bolinha = new Actor({
	x:100,
	y:300,
	radius: 10,
	color:Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

// 5 - criar movimento da bolinha
const velocidadeBolinha = vec(250, 250)

//define a velocidade da bolinha
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000)

// 6 - fazer bolhinha rebater na parede
bolinha.on("postupdate", () => {
	//se a bolhinha colidir com o lado esquerdo
	if (bolinha.pos.x < bolinha.width / 2) {
		bolinha.vel.x = velocidadeBolinha.x
	}
	//se a bolhinha colidir com o lado direito
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth) {
		bolinha.vel.x = -velocidadeBolinha.x
	}
	//se a bolhinha colidir com o teto
	if (bolinha.pos.y < bolinha.height / 2) {
		bolinha.vel.y = velocidadeBolinha.y
	}

	//se a bolinha colidir com o chao
	//if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight) {
	//	bolinha.vel.y = -velocidadeBolinha.y
	//}
})


//insere bolinha
game.add(bolinha)

// 7 - criar os blocos destrutiveis
const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5
const linhas = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const alturaBloco = 30

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
//const largurabloco = 136

const listaBlocos: Actor[] = []




//inicia o game
game.start()