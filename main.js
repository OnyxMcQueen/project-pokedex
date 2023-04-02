const form = document.querySelector(".search");

form.addEventListener("submit", (event) => {
event.preventDefault();

let userInput = document.querySelector('input[name="userinput"]').value;
userInput = userInput.toLowerCase();

fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
.then((response) => response.json())
.then((pokemon) => {

    let main = document.querySelector("main");
    main.classList.remove("hidden");

    // Pokemon Description

    let name = userInput[0].toUpperCase() + userInput.slice(1).toLowerCase();
    document.querySelector("#name").textContent = `${name}`;

    const type1 = document.querySelector("#type1");
    const type2 = document.querySelector("#type2");

    if(pokemon.types.length == 2){
        let string1 = pokemon.types[0].type.name
        string1 = string1[0].toUpperCase() + string1.slice(1);

        let string2 = pokemon.types[1].type.name
        string2 = string2[0].toUpperCase() + string2.slice(1);

        type1.textContent = `Type: ${string1}`;
        type2.textContent = `/ ${string2}`;
    }
    else {
        let string1 = pokemon.types[0].type.name
        string1 = string1[0].toUpperCase() + string1.slice(1);
        
        type1.textContent = `Type: ${string1}`;

        type2.textContent = "";
    }

    const img = document.querySelector(".pokemondescription img");
    img.setAttribute("src", `${pokemon.sprites.front_default}`);
    img.setAttribute("alt", "Image of a pokemon");

    let height = document.querySelector("#height");
    let weight = document.querySelector("#weight");

    pokemon.height = (pokemon.height / 10);
    pokemon.weight = (pokemon.weight / 10);

    height.textContent = `Height: ${pokemon.height} m`;
    weight.textContent = `Weight: ${pokemon.weight} lbs`;

    // Fetching Data for pokemon description and Evolves from section
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${userInput}`)
    .then((response) => response.json())
    .then((pokemon) => {
        let pokeInfo = pokemon.flavor_text_entries[1].flavor_text;

        document.querySelector("#description").textContent = pokeInfo;

        // Evolves From 

        document.querySelector(".evolvesfrom h2").textContent = `Evolves From`;

        if(pokemon.evolves_from_species !== null){
        
            let prevEvolName = pokemon.evolves_from_species.name;
            prevEvolName = prevEvolName[0].toUpperCase() + prevEvolName.slice(1);
            document.querySelector(".evolvesfrom p").textContent = `${prevEvolName}`;

            fetch(pokemon.evolves_from_species.url)
            .then((response) => response.json())
            .then((pokemon) => {
                fetch(pokemon.varieties[0].pokemon.url)
                .then((response) => response.json())
                .then((pokemon) => {
                    let img = document.querySelector(".evolvesfrom img");
                    img.setAttribute("src", `${pokemon.sprites.front_default}`);
                    img.setAttribute("alt", "Image of a pokemon");
                })
            })

        }
        else {
            document.querySelector(".evolvesfrom p").textContent = `No previous evolution`;
            
            let img = document.querySelector(".evolvesfrom img");

            img.removeAttribute("src");
            img.removeAttribute("alt");
        }

    })

    // Stats 

    document.querySelector(".stats h2").textContent = "Stats";

    document.querySelector("#hp").innerHTML = `<span>HP: </span> ${pokemon.stats[0].base_stat}`;
    document.querySelector("#attack").innerHTML = `<span>Attack: </span> ${pokemon.stats[1].base_stat}`;
    document.querySelector("#defense").innerHTML = `<span>Defense: </span> ${pokemon.stats[2].base_stat}`;
    document.querySelector("#specialattack").innerHTML = `<span>Special Attack: </span> ${pokemon.stats[3].base_stat}`;
    document.querySelector("#specialdefense").innerHTML = `<span>Special Defense: </span> ${pokemon.stats[4].base_stat}`;
    document.querySelector("#speed").innerHTML = `<span>Speed: </span> ${pokemon.stats[5].base_stat}`;


    // Abilities 
    document.querySelector(".abilities h2").textContent = `Abilities`;

    
    if(pokemon.abilities.length === 1){
        let ability1 = pokemon.abilities[0].ability.name;
        ability1 = ability1[0].toUpperCase() + ability1.slice(1);

        document.querySelector("#ability1").textContent = `${ability1}`;
        document.querySelector("#ability2").textContent = ``;
    }
    else{
        let ability1 = pokemon.abilities[0].ability.name;
        ability1 = ability1[0].toUpperCase() + ability1.slice(1);
    
        let ability2 = pokemon.abilities[1].ability.name;
        ability2 = ability2[0].toUpperCase() + ability2.slice(1);
    
        document.querySelector("#ability1").textContent = `${ability1}`;
        document.querySelector("#ability2").textContent = `${ability2}`;
    }
    
    
    
    // let ability1 = pokemon.abilities[0].ability.name;
    // ability1 = ability1[0].toUpperCase() + ability1.slice(1);

    // // let ability2 = pokemon.abilities[1].ability.name;
    // // ability2 = ability2[0].toUpperCase() + ability2.slice(1);

    // document.querySelector("#ability1").textContent = `${ability1}`;
    // // document.querySelector("#ability2").textContent = `${ability2}`;



    // Moves

    document.querySelector(".moves h2").textContent = `MoveSet`;

    let mv1 = pokemon.moves[0].move.name;
    mv1 = mv1[0].toUpperCase() + mv1.slice(1);

    let mv2 = pokemon.moves[1].move.name;
    mv2 = mv2[0].toUpperCase() + mv2.slice(1);

    let mv3 = pokemon.moves[2].move.name;
    mv3 = mv3[0].toUpperCase() + mv3.slice(1);

    let mv4 = pokemon.moves[3].move.name;
    mv4 = mv4[0].toUpperCase() + mv4.slice(1);

    let mv5 = pokemon.moves[4].move.name;
    mv5 = mv5[0].toUpperCase() + mv5.slice(1);

    document.querySelector("#move1").textContent = `${mv1}`;
    document.querySelector("#move2").textContent = `${mv2}`;
    document.querySelector("#move3").textContent = `${mv3}`;
    document.querySelector("#move4").textContent = `${mv4}`;
    document.querySelector("#move5").textContent = `${mv5}`;


})

form.reset();

})