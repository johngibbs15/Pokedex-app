// Assign IIFE to pokemonRepository variable 
const pokemonRepository = (() => {
	// Pokemon List 	
	const pokemonList = [];
	const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	const spinner = document.querySelector('#spinner');
	// display a loading message while data is being loaded. 
	const showSpinner = () =>{spinner.classList.remove('spinner-img');}
	const hideSpinner =() => { spinner.classList.add('spinner-img');}

	const getAll = () => {return pokemonList;}

	// checks if item is an object
	// validates whether all Object.keys() of the parameter are equal to the specific keys expected
	const add = pokemon => {
		if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
			pokemonList.push(pokemon);
		}
	}

	const addListItem = pokemon => {

		const listContainer = document.querySelector('.pokemon-list');

		// create list and button variables
		const listItem = document.createElement('li');
		const button = document.createElement('button');

		// assign pokemon name to the button
		button.innerText = pokemon.name
		button.classList.add("button-class");

		// append button to the <li> and the the <li> to the <ul>
		listItem.appendChild(button);
		listContainer.appendChild(listItem);

		// add an event listenter that listens to a click. call the showDetails function.
		button.addEventListener('click', (event) => showDetails(pokemon))		
		
	}

	// fetch data from API, then add each pokemon to the pokemonList with add add function
	const loadList = () => {
		showSpinner();
		return fetch(apiUrl).then(response => {
			hideSpinner();
			return response.json();
		}).then(json => {
			json.results.forEach(item => {
				const pokemon = {
					name: item.name,
					detailsUrl: item.url
				};
				add(pokemon);
				console.log(pokemon);
			});
		}).catch(e => {
			hideSpinner();
			console.error(e);
		})
	}

	// loads detailed data for a given pokemon
	const loadDetails = (item) => {
		showSpinner();
		const url = item.detailsUrl;
		return fetch(url).then(response =>{
			hideSpinner();
			return response.json();
		}).then(details => {
			item.imageUrl = details.sprites.front_default;
			item.height = details.height;
			item.types = details.types;
		}).catch(e => {
			hideSpinner();
			console.error(e);
		});
	}

	// executes load details function
	const showDetails = (item) => {
		loadDetails(item).then(() => {
			console.log(item);
		});
	}

	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails
	}
})()


pokemonRepository.loadList().then(function() {
	// data is loaded
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});