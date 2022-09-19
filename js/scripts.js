//Exercise 1.2
//Pokemon List 
let pokemonList = [{
	name: 'Bulbasaur',
	height: '0.7',
	type: ['grass', 'poison']
}, {
	name: 'Charmander',
	height: '0.6',
	type: ['fire', 'dragon']
}, {
	name: 'Squirtle',
	height: '0.5',
	type: ['water', 'Turtle']
}];
//Exercise 1.3
//Loop that iterates over each item in Pokemon List
//Pokemon's name is written on website's DOM
for(let i = 0; i < pokemonList.length; i++) {
//If pokemon is bigger than 0.6 'is huge' is printed in the DOM
	if(pokemonList[i].height > 0.6) {
		document.write(pokemonList[i].name + '  ' + 'height:\(' + pokemonList[i].height + '\)  ' + 'is huge!' + '<br>');
	} else {
		document.write(pokemonList[i].name + '  ' + 'height:\(' + pokemonList[i].height + '\)' + '<br>');
	}
}



