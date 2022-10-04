// Assign IIFE to pokemonRepository variable 
let pokemonRepository = (() => {
	// Pokemon List 	
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
	let spinner = document.querySelector('#spinner');
	
	
	// display a loading message while data is being loaded. 
	let showSpinner = () => {
		spinner.classList.remove('spinner-img');
	}
	
	
	let hideSpinner = () => {
		spinner.classList.add('spinner-img');
	}

	let getAll = () => {
		return pokemonList;
	}

	// checks if item is an object
	// validates whether all Object.keys() of the parameter are equal to the specific keys expected
	let add = pokemon => {
		if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
			pokemonList.push(pokemon);
		}
	}

	let addListItem = pokemon => {

		let listContainer = document.querySelector('.pokemon-list');

		// create list and button variables
		let listItem = document.createElement('li');
		let button = document.createElement('button');

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
	let loadList = () => {
		showSpinner();
		return fetch(apiUrl).then(response => {
			hideSpinner();
			return response.json();
		}).then(json => {
			json.results.forEach(item => {
				let pokemon = {
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
	let loadDetails = item => {
		showSpinner();
		let url = item.detailsUrl;
		return fetch(url).then(response => {
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
	let showDetails = pokemon => {
		loadDetails(pokemon).then(() => {
			showModal(pokemon);
		});
	}

	
	let showModal = pokemon => {
		let modalContainer = document.querySelector('#modal-container');

		modalContainer.classList.add('is-visible');

		modalContainer.innerText = '';

		// Modal
		let modal = document.createElement('div');
		modal.classList.add('modal');

		// Modal elements 
		let pokemonTitle = document.createElement('h1');
		pokemonTitle.innerText = pokemon.name;

		let pokemonContent = document.createElement('p');
		pokemonContent.innerText = 'Height: ' + pokemon.height;

		let pokemonImage = document.createElement('img');
		pokemonImage.src = pokemon.imageUrl;

		modal.appendChild(pokemonTitle);
		modal.appendChild(pokemonContent);
		modal.appendChild(pokemonImage);
		modalContainer.appendChild(modal);

		
		// display modal when button is clicked
		// hide modal when screen is clicked 
		modalContainer.addEventListener('click', (e) => {
			let target = e.target;
			if (target === modalContainer) {
				hideModal();
			}
		})
	}
	
	
	// hide modal function 
	function hideModal() {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.classList.remove('is-visible');
	}

	
	// hide modal when escape key is pressed 
	window.addEventListener('keydown', (e) => {
		let modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
			hideModal();
		}
	})


	return {
		getAll: getAll,
		add: add,
		addListItem: addListItem,
		showDetails: showDetails,
		loadList: loadList,
		loadDetails: loadDetails
	}
})();


pokemonRepository.loadList().then(function() {
	// data is loaded
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});