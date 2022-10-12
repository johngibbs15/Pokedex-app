/* eslint-env jquery */
// Assign IIFE to pokemonRepository variable
let pokemonRepository = (() => {
  // Pokemon List
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  let getAll = () => {
    return pokemonList;
  };

  // checks if item is an object
  // validates whether all Object.keys() of the parameter are equal to the specific keys expected
  let add = (pokemon) => {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    }
  };
  // define separate function addListItem()
  let addListItem = (pokemon) => {
    let listContainer = document.querySelector(".list-group");

    // create list and button variables
    let listItem = document.createElement("li");
    let button = document.createElement("button");

    // assign pokemon name to the button
    button.innerText = pokemon.name;

    // toggle modal
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    listContainer.appendChild(listItem);

    // add an event listenter that listens to a click. call the showDetails function.
    button.addEventListener("click", () => showDetails(pokemon));
  };

  //fetch data from API, then add each pokemon to the pokemonList with add add function
  let loadList = () => {
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // loads detailed data for a given pokemon
  let loadDetails = (item) => {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = [];
        for (let i = 0; details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // executes load details function
  let showDetails = (pokemon) => {
    loadDetails(pokemon).then(() => {
      showModal(pokemon);
    });
  };

  function showModal(pokemon) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");

    // clear modal
    modalTitle.empty();
    modalBody.empty();

    // create elements for modal
    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
    let abilitiesElement = $(
      "<p>" + "abilities: " + pokemon.abilities + "</p>"
    );
    let imageElement = $('<img class="modal-img">');
    imageElement.attr("src", pokemon.imageUrl);

    // append elements to modal
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
