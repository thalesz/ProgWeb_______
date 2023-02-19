var empate = function() { console.log("A rodada empatou"); };

var vitoria = function(obj) { 
	obj.pontos += 1; 
	console.log("Você ganhou!"); 
};

var derrota = function() { console.log("Você perdeu!"); };

var jogadaPc = function(str) { 
	switch (str){
		case "1":
			console.log("O computador jogou Papel");
			break;
		case "2":
			console.log("O computador jogou Pedra");
			break;
		default:
			console.log("O computador jogou Tesoura");
			break;
	}
}

var jogador = {
	pontos: 0,
	jogada: "0",
};

do {
	console.log("Escolha sua jogada:");
	console.log("1 - Papel");
	console.log("2 - Pedra");
	console.log("3 - Tesoura");

	jogador.jogada = parseInt(prompt());
	var pc = Math.ceil(Math.random()*3);
	jogadaPc(pc);
	var jogo = `${jogador.jogada}${pc}`;


	switch ( jogo ) {
		case "11":
			empate();
			break;
		case "12":
			vitoria(jogador);
			break;
		case "13":
			derrota();
			break;
		case "21":
			derrota();
			break;
		case "22":
			empate();
			break;
		case "23":
			vitoria(jogador);
			break;
		case "31":
			vitoria(jogador);
			break;
		case "32":
			derrota();
			break;
		case "33":
			empate();
			break;
		default:
			console.log("Você perdeu! Sua pontuação foi de " + jogador.pontos);
			jogador.jogada = -1;
			break;
	}

} while (jogador.jogada > 0);