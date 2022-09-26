// Assign IIFE to pokemonRepository variable 
let pokemonRepository = (function() {
	// Pokemon List 	
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

	function getAll() {
		return pokemonList;
	}

	// checks if item is an object
	// validates whether all Object.keys() of the parameter are equal to the specific keys expected
	function add(pokemon) {
		if (typeof pokemon === 'object' && Object.keys(pokemon) !== ['name', 'height', 'type']){
			pokemonList.push(pokemon);
		}
	}

	return {
		getAll: getAll,
		add: add
	}
})()

// below is a test to check if function is working properly
// function will only add item if "!==" is used. this is not the intended outcome. 
// function should use "===" to validate object keys
// the keys entered below seem equal to the parameters defined in the function
pokemonRepository.add({name:'Charzard', height:'1.0', type:'fire'});

// Refactor code to use the foreach() function rather than the for loop
// Pokemon's name is written on website's DOM
pokemonRepository.getAll().forEach(function(pokemon) {
	// If pokemon is bigger than 0.6 'is huge' is printed in the DOM
	if (pokemon.height > 0.6) {
		document.write(pokemon.name + '  ' + 'height:\(' + pokemon.height + '\)  ' + 'is huge!' + '<br>');
	} else {
		document.write(pokemon.name + '  ' + 'height:\(' + pokemon.height + '\)' + '<br>');
	}
});



