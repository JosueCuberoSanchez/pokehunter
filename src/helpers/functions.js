export function fillLocationsArray(encountersJSON, game) {
    let locations = [];
    if (encountersJSON.length === 0) {
        locations[0] = 'Location unknown';
    } else {
        for (var j = 0; j < encountersJSON.length; j++) {
            var encounterDetail = encountersJSON[j];
            for (var k = 0; k < encounterDetail.version_details.length; k++) {
                var versionDetail = encounterDetail.version_details[k];
                if (game === versionDetail.version.name) {
                    if (!locations.includes(encounterDetail.location_area.name)) {
                        locations.push(encounterDetail.location_area.name.replace(/^\w/, c => c.toUpperCase()));
                    }
                }
            }
        }
        if (locations.length === 0)
            locations[0] = 'Location unknown';
    }
    return locations;
}

export function beautifyLocations(locations) {
    return locations.map(function(location) {
        return location.split('-').join(' ');
    }).join(', ');
}

export function getPokedexLimit(game) {
    let limit;
    switch (game) {
        case 'red':
        case 'blue':
        case 'yellow':
            limit = 151;
            break;
        case 'gold':
        case 'silver':
        case 'crystal':
            limit = 251;
            break;
        case 'ruby':
        case 'sapphire':
        case 'firered':
        case 'leafgreen':
            limit = 439;
            break;
        case 'diamond':
        case 'pearl':
        case 'platinum':
            limit = 507;
            break;
        case 'white':
        case 'black':
        case 'white-2':
        case 'black-2':
            limit = 651;
            break;
        case 'x':
        case 'y':
        case 'alpha-sapphire':
        case 'omega-ruby':
            limit = 721;
            break;
    }
    return limit;
}

export async function getEvolutionInfo(evolutionJSON, P) {
    const first = await getFirstPokemon(evolutionJSON, P);
    const last = await getLastPokemons(evolutionJSON, P);
    return {first: first, second: last.second, third: last.third}; // the object to be setted on the state
}

async function getFirstPokemon(evolutionJSON, P) {
    const name = evolutionJSON.chain.species.name;
    const speciesJSON = await P.getPokemonByName(name);
    const sprite = speciesJSON.sprites.front_default;
    return {name: name.replace(/^\w/, c => c.toUpperCase()), sprite: sprite};
}

async function getLastPokemons(evolutionJSON, P) {
    let secondEvolutionArray = [];
    let thirdEvolutionArray = [];

    const evolutions = evolutionJSON.chain.evolves_to;
    if(evolutions.length !== 0) { // if it has evolutions
        for (let i in evolutions) {

            const trigger = getEvolutionTrigger(evolutions[i]);

            const name = evolutions[i].species.name;
            const speciesJSON = await P.getPokemonByName(name); // get sprite
            const sprite = speciesJSON.sprites.front_default;

            const nextEvolutions = evolutions[i].evolves_to;
            if(nextEvolutions.length !== 0) {
                for(let j in nextEvolutions) {
                    thirdEvolutionArray.push(await getThirdPokemon(nextEvolutions[j], P));
                }
            }

            secondEvolutionArray.push({
                trigger: trigger, sprite: sprite, name: name.replace(/^\w/, c => c.toUpperCase())
            });
        }
    }
    return {second: secondEvolutionArray, third: thirdEvolutionArray};
}

async function getThirdPokemon(evolutionJSON, P) {
    const name = evolutionJSON.species.name;
    const speciesJSON = await P.getPokemonByName(name);
    const sprite = speciesJSON.sprites.front_default;
    const trigger = getEvolutionTrigger(evolutionJSON);
    return {name: name.replace(/^\w/, c => c.toUpperCase()), sprite: sprite, trigger: trigger};
}

function getEvolutionTrigger(evolution) {
    let trigger = '';
    let level = 'up';
    let happiness = '';
    let affection = '';
    let time = '';
    let item = '';
    let location = '';
    if (evolution.evolution_details[0].trigger.name === 'level-up') { // if leveling up
        if (evolution.evolution_details[0].time_of_day !== '') { // if some time in the day
            time = ` at ${evolution.evolution_details[0].time_of_day}`;
        }
        if (evolution.evolution_details[0].min_happiness !== null) { // if with happiness
            happiness = ` with minimum happiness of ${evolution.evolution_details[0].min_happiness}`;
        }
        if (evolution.evolution_details[0].min_affection !== null) { // if with happiness
            affection = ` with minimum affection of ${evolution.evolution_details[0].min_affection}`;
        }
        if (evolution.evolution_details[0].location !== null) { // if near a certain location
            location = ` near ${evolution.evolution_details[0].location.name}`;
        }
        level = evolution.evolution_details[0].min_level;
        if (level === null) // if a certain level
            level = 'up';
        trigger = `Level ${level}${time}${happiness}${affection}${location}`;

    } else if (evolution.evolution_details[0].trigger.name === 'use-item') { // if with item
        trigger = `Use ${evolution.evolution_details[0].item.name}`;
    } else if (evolution.evolution_details[0].trigger.name === 'trade') { // if traded
        if (evolution.evolution_details[0].item !== null) {
            item = `equipped with ${evolution.evolution_details[0].item.name}`;
        }
        trigger = `Trade ${item}`;
    }
    return trigger;
}