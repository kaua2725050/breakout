import { Actor, CollisionType, Color, Engine, Font, FontUnit, Label, Loader, Sound, Sound, Text, vec } from "excalibur"

// 1 - Criar uma instancia de Engine que representa o jogo
const game = new Engine({
	width: 800,
	height: 600
})

// 2 - criar barra do player
const barra = new Actor({
	x: 180,
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
	x: 100,
	y: 300,
	radius: 10,
	color: Color.Red
})

bolinha.body.collisionType = CollisionType.Passive

// 5 - criar movimento da bolinha
const velocidadeBolinha = vec(800, 800)

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
const linhas = 5

const corBloco = [Color.Red, Color.Orange, Color.Yellow, Color.Green, Color.Blue, Color.Violet, Color.Rose, Color.Black, Color.White]

const alturaBloco = 30

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)

//const largurabloco = 136

const listaBlocos: Actor[] = []

//renderizacao dos bloquinhos

for (let j = 0; j < linhas; j++) {

	for (let i = 0; i < colunas; i++) {
		listaBlocos.push(
			new Actor({
				x: xoffset + i * (larguraBloco + padding) + padding,
				y: yoffset + j * (alturaBloco + padding) + padding,
				width: larguraBloco,
				height: alturaBloco,
				color: corBloco[j]
			})
		)
	}
}



listaBlocos.forEach(bloco => {
	//define cada tipo de colisor dos blocos
	bloco.body.collisionType = CollisionType.Active

	//adiciona o bloco
	game.add(bloco)
})

//pontos
let pontos = 0

//const textoPontos = new Text({
//	text: "hello world",
//	font: new Font({ size: 20 })
//})

//const objetoTexto = new Actor({
//	x: game.drawWidth -80,
//	y: game.drawHeight -15
//})

//objetoTexto.graphics.use(textoPontos)

//game.add(objetoTexto)

const textoPontos = new Label({
	text: pontos.toString(),
	font: new Font({
		size: 40,
		color: Color.White,
		strokeColor: Color.Black,
		unit: FontUnit.Px
	}),
	pos: vec(600, 500)
})

game.add(textoPontos)


let colidindo: boolean = false

const sound = new Sound('pop-94319.mp3')

bolinha.on("collisionstart", (event) => {
	if (listaBlocos.includes(event.other) ) {

		//destruir bloco
		event.other.kill()

		//adiciona pontos
		pontos++

		//adiciona valor do placar
		textoPontos.text = pontos.toString()

		console.log(pontos)

		if (pontos == colunas * linhas) {
			alert("GANHOU!!")
			window.location.reload()
		}
	}
		//rebater a bolinha invertendo as direcoes
		let interseccao = event.contact.mtv.normalize()

//! = false

		if (!colidindo) {
			colidindo = true

			//intersecao x e y

			//o maior representa o eixo
			if (Math.abs(interseccao.x) > Math.abs(interseccao.y) ) {
				bolinha.vel.x = bolinha.vel.x * -1
			} else {
				bolinha.vel.y = bolinha.vel.y * -1
			}
			
		}

	})

bolinha.on("collisionend", () => {
	colidindo = false
})

bolinha.on("exitviewport", () => {
	alert("MORREU!")
	window.location.reload()
})

//inicia o game
game.start()