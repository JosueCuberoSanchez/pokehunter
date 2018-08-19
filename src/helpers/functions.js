// Fill the locations for a given pokemon
import Constants from './constants';

export function fillLocationsArray(encountersJSON, game) {
    let locations = [];
    if (encountersJSON.length === 0) {
        locations[0] = 'Location unknown';
    } else {
        for (var j = 0; j < encountersJSON.length; j++) { // iterate and find locations for the given game
            var encounterDetail = encountersJSON[j];
            for (var k = 0; k < encounterDetail.version_details.length; k++) {
                var versionDetail = encounterDetail.version_details[k];
                if (game === versionDetail.version.name) {
                    if (!locations.includes(encounterDetail.location_area.name)) {
                        locations.push(encounterDetail.location_area.name);
                    }
                }
            }
        }
        if (locations.length === 0)
            locations[0] = 'Location unknown';
    }
    return locations;
}

// Beautify the locations array
export function beautifyLocations(locations, game) {
    let newLocations = [];
    let location;

    const region = getGameRegion(game);
    const length = locations.length;

    for(let i=0; i < length; i++) {
        location = locations[i].split('-');
        location = location.filter(e => e !== region);
        location = location.filter(e => e !== 'area');
        location = location.join(' ');
        location = location.replace(/^\w/, c => c.toUpperCase());
        newLocations[i] = location;
    }

    return newLocations.join(', ');
}

export function beautifyHabitat(habitat) {
    return habitat.split('-').join(' ').replace(/^\w/, c => c.toUpperCase());
}

function getGameRegion(game) {
    let region;
    switch (game) {
        case 'red':
        case 'blue':
        case 'yellow':
        case 'firered':
        case 'leafgreen':
            region = 'kanto';
            break;
        case 'gold':
        case 'silver':
        case 'crystal':
        case 'heartgold':
        case 'soulsilver':
            region = ''; // as this games involve 2 different regions, the region name will remain in the location.
            break;
        case 'ruby':
        case 'sapphire':
        case 'alpha-sapphire':
        case 'omega-ruby':
            region = 'hoenn';
            break;
        case 'diamond':
        case 'pearl':
        case 'platinum':
            region = 'sinnoh';
            break;
        case 'white':
        case 'black':
        case 'white-2':
        case 'black-2':
            region = 'unova';
            break;
        case 'x':
        case 'y':
            region = 'kalos';
            break;
    }
    return region;
}

// Get the pokedex limit
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
        case 'heartgold':
        case 'soulsilver':
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

// Get the evolution info
export async function getEvolutionInfo(evolutionJSON, P) {
    const first = await getFirstPokemon(evolutionJSON, P);
    const last = await getLastPokemons(evolutionJSON, P);
    return {first: first, second: last.second, third: last.third}; // the object to be setted on the state
}

// Get the first pokemon
async function getFirstPokemon(evolutionJSON, P) {
    const name = evolutionJSON.chain.species.name;
    const speciesJSON = await P.getPokemonByName(name);
    const sprite = speciesJSON.sprites.front_default;
    return {name: name.replace(/^\w/, c => c.toUpperCase()), sprite: sprite};
}

// Get second and third evolutions
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

// Get the third evolution, if applies
async function getThirdPokemon(evolutionJSON, P) {
    const name = evolutionJSON.species.name;
    const speciesJSON = await P.getPokemonByName(name);
    const sprite = speciesJSON.sprites.front_default;
    const trigger = getEvolutionTrigger(evolutionJSON);
    return {name: name.replace(/^\w/, c => c.toUpperCase()), sprite: sprite, trigger: trigger};
}

// Get evolution trigger
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

export async function getNeighbors(number, P) {

    let num = parseInt(number)-1; //pokedex entry
    const index = num % 20; //the index in the results JSON
    let offset = Math.floor(num / 20)*20;

    if(offset === 0 && num > 19) {
        offset = 20;
    }

    let prev = '';
    let next = '';

    const neighborsJSON = await P.resource(Constants.BASE_URL + Constants.API_URL + Constants.PAGING + offset);

    if(index === 0) {
        const prevNeighborsJSON = await P.resource(Constants.BASE_URL + Constants.API_URL + Constants.PAGING + (offset-20));
        prev = prevNeighborsJSON.results[19].name;
        next = neighborsJSON.results[index+1].name;
    } else if(index === 19) {
        const nextNeighborsJSON = await P.resource(Constants.BASE_URL + Constants.API_URL + Constants.PAGING + (offset+20));
        prev = neighborsJSON.results[index-1].name;
        next = nextNeighborsJSON.results[0].name;
    } else {
        prev = neighborsJSON.results[index-1].name;
        next = neighborsJSON.results[index+1].name;
    }

    if(num === 0) {
        prev = '';
    }
    if(num === 721) {
        next = '';
    }

    return {previous: prev, next: next};
}
