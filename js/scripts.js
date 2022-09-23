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
	type: ['water', 'turtle']
}];

//Exercise 1.4
//Refactor code to use the foreach() function rather than the for loop
//Pokemon's name is written on website's DOM
pokemonList.forEach(function(pokemon) {
//If pokemon is bigger than 0.6 'is huge' is printed in the DOM
	if (pokemonList.height > 0.6) {
		document.write(pokemon.name + '  ' + 'height:\(' + pokemon.height + '\)  ' + 'is huge!' + '<br>');
	} else {
		document.write(pokemon.name + '  ' + 'height:\(' + pokemon.height + '\)' + '<br>');
	}
});



