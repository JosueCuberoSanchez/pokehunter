import * as t from "../actions/types";
import Constants from "../../helpers/constants";
import {beautifyLocations, fillLocationsArray, getEvolutionInfo, getPokedexLimit, getNeighbors, beautifyHabitat} from "../../helpers/functions";
import Link from "react-router-dom/es/Link";
import React from "react";

export const fillDataTable = (game) => {
    return async dispatch => {
        dispatch({
            type: t.GET_DATA_TABLE_REQUEST
        });

        try {
            // Variables needed by js-wrapper
            const Pokedex = require('pokeapi-js-wrapper');
            const P = new Pokedex.Pokedex(Constants.POKEDEX_OPTIONS); // P will be in charge of making the fetches and storing them on cache.

            // Variables to inject on table rows
            let sprite;
            let name;
            let number;
            let locations;
            let pokemons = [];

            // This will limit the entries based on the chosen game, no one will want a pokemon from Platinum if it picked Crystal...
            const limit = getPokedexLimit(game);

            for (let i = 1; i < limit; i++) {

                // Basic pokemon info
                const pokemonJSON = await P.getPokemonByName(i);

                // Get pokemon name
                name = pokemonJSON.name;

                // Get pokedex entry
                switch (pokemonJSON.id.toString().length) {
                    case 1:
                        number = '00' + pokemonJSON.id;
                        break;
                    case 2:
                        number = '0' + pokemonJSON.id;
                        break;
                    default:
                        number = pokemonJSON.id;
                        break;
                }

                // Pokemon sprite
                sprite = <Link to={'/info/' + name + '/' + game} className='pokemon-link'>
                    <img src={pokemonJSON.sprites.front_default} className="d-block mx-auto"/>
                </Link>;

                // Pokemon locations
                const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
                locations = fillLocationsArray(encountersJSON, game);
                locations = beautifyLocations(locations, game);

                name = name.replace(/^\w/, c => c.toUpperCase()); // beautify name

                // Inject pokemon-basic-info to table
                pokemons.push({
                    sprite: sprite,
                    name: name,
                    number: number,
                    location: locations
                });
            }
            // Update payload in reducer on success
            dispatch({
                type: t.GET_DATA_TABLE_SUCCESS,
                payload: {pokemons: pokemons, game: game}
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_DATA_TABLE_FAILURE,
                error: err
            })
        }
    }
};

export const fetchPokemon = (name, game) => {

    return async dispatch => {
        dispatch({
            type: t.GET_POKEMON_REQUEST
        });
        try {
            // pokeapi wrapper variables
            const Pokedex = require('pokeapi-js-wrapper');
            const P = new Pokedex.Pokedex(Constants.POKEDEX_OPTIONS);

            const pokemonJSON = await P.getPokemonByName(name);

            // sprites
            const sprites = pokemonJSON.sprites;

            // pokedex entry
            let number;
            switch (pokemonJSON.id.toString().length) {
                case 1:
                    number = '00' + pokemonJSON.id;
                    break;
                case 2:
                    number = '0' + pokemonJSON.id;
                    break;
                default:
                    number = '' + pokemonJSON.id;
                    break;
            }

            const specieJSON = await P.getPokemonSpeciesByName(name);

            // description
            let description;
            description = specieJSON.flavor_text_entries.filter(entry => entry.version.name === game && entry.language.name === 'en')[0].flavor_text;
            if (description === '')
                description = 'This description is missing in the PokeAPI';

            // types
            const types = pokemonJSON.types.map(function(position) {
                return position.type.name;
            });

            // generation
            let generationArray = specieJSON.generation.name.split('-');
            let generation = generationArray[0].replace(/^\w/, c => c.toUpperCase());
            switch (generationArray[1]) {
                case 'i':
                    generation += ' 1 (Kanto)';
                    break;
                case 'ii':
                    generation += ' 2 (Johto)';
                    break;
                case 'iii':
                    generation += ' 3 (Hoenn)';
                    break;
                case 'iv':
                    generation += ' 4 (Sinnoh)';
                    break;
                case 'v':
                    generation += ' 5 (Unova)';
                    break;
                case 'vi':
                    generation += ' 6 (Kalos)';
                    break;
            }

            // Pokemon locations
            const encountersJSON = await P.resource(Constants.BASE_URL + pokemonJSON.location_area_encounters);
            let locations = fillLocationsArray(encountersJSON, game);
            locations = beautifyLocations(locations, game);

            // Evolution chain
            const evolutionsJSON = await P.resource(specieJSON.evolution_chain.url);
            const evolutionInfo = await getEvolutionInfo(evolutionsJSON, P);

            name = name.replace(/^\w/, c => c.toUpperCase());

            let habitat = specieJSON.habitat;
            if(habitat === null) {
                habitat = 'This pokemon comes from a fossil';
            } else {
                habitat = beautifyHabitat(habitat.name);
            }

            const neighbors = await getNeighbors(number, P);

            // Update payload in reducer on success
            dispatch({
                type: t.GET_POKEMON_SUCCESS,
                payload: {
                    name: name.toLowerCase(),
                    basicInfo: {
                        name: name,
                        number: number,
                        height: pokemonJSON.height,
                        weight: pokemonJSON.weight,
                        types: types,
                        generation: generation,
                        description: description,
                        locations: locations,
                        habitat: habitat
                    },
                    asideInfo: {
                        baseExperience: pokemonJSON.base_experience,
                        baseHappiness: specieJSON.base_happiness
                    },
                    sprites: {
                        frontDefault: sprites.front_default,
                        backDefault: sprites.back_default,
                        backShiny: sprites.back_shiny,
                        frontShiny: sprites.front_shiny
                    },
                    evolutionChain: {
                        first: evolutionInfo.first,
                        second: evolutionInfo.second,
                        third: evolutionInfo.third,
                        game: game
                    },
                    game: game,
                    previous: neighbors.previous,
                    next: neighbors.next
                }
            })
        } catch (err) {
            // Update error in reducer on failure
            dispatch({
                type: t.GET_POKEMON_FAILURE,
                error: err
            })
        }
    }
}