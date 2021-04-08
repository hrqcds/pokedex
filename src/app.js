let getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

let generatePokemonPromises = () => Array(25).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(Response => Response.json()))

let generateHTML = pokemons => pokemons.reduce((accumlator, {name, id, types}) => {
    //Reduzir array para um tipo de dado, use reduce
    let elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumlator += `
            <li class="card ${elementTypes[0]}" >
            <img class="card-image" alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png"/>
            <h2 class="card-title">${id} ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(" | ")}</p>
            </li>`
    return accumlator

}, "")


let insertPokemonsIntoPage = pokemons => {
    let ul = document.querySelector("#pokedex")

    ul.innerHTML = pokemons
}




let pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)




 // let pokemonPromises = []


    // for (let i = 1; i <= 25; i++){

    //     pokemonPromises.push(    
    //         //Puxa requisições de dados    
    //         fetch(getPokemonUrl(i)).then(Response => Response.json())
    //     )

    // }

    //Array de pokemons