import * as t from "./types";

export const fillTable = game => ({ type: t.GET_DATA_TABLE_REQUEST, payload: game });
export const fillBasicInfo = basicInfo => ({ type: t.GET_POKEMON_BASIC_REQUEST, payload: basicInfo });
export const fillAsideInfo = asideInfo => ({ type: t.GET_POKEMON_ASIDE_REQUEST, payload: asideInfo });
export const fillSprites = sprites => ({ type: t.GET_SPRITES_REQUEST, payload: sprites });
export const fillEvolutionChain = evolutionChain => ({ type: t.GET_EVOLUTION_CHAIN_REQUEST, payload: evolutionChain });
