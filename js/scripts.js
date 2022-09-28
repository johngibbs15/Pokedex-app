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
		if (typeof pokemon === 'object' && 'name' in pokemon && 'height' in pokemon && 'type' in pokemon) {
			pokemonList.push(pokemon);
		}
	}

	function addListItem(pokemon) {

		let pokemonList = document.querySelector('.pokemon-list');

		// create list and button variables
		let listItem = document.createElement('li');
		let button = document.createElement('button');

		// assign pokemon name to the button
		button.innerText = pokemon.name
		button.classList.add("button-class");

		// append button to the <li> and the the <li> to the <ul>
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);

		// add an event listenter that listens to a click. call the showDetails function.
		button.addEventListener('click', function(event) {
			showDetails(pokemon)
		})
	}

	function showDetails(pokemon) {
		console.log(pokemon);

	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		showDetails: showDetails
	}
})()

let pokemonObject = {
	name: 'Charzard',
	height: '1.0',
	type: 'fire'
};

pokemonRepository.add(pokemonObject);

pokemonRepository.getAll().forEach(function(pokemon) {
	pokemonRepository.addListItem(pokemon);
});