const Constants = {
    BASE_URL: 'http://pokeapi.co',
    API_URL: '/api/v2/',
    POKEMON: 'pokemon-basic-info/',
    FORM: 'pokemon-basic-info-form/',
    ENCOUNTERS: 'encounters',
    SLASH: '/',
    COLUMNS: [{
        dataField: 'sprite',
        text: 'Sprite'
    }, {
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'number',
        text: 'Pokédex No.',
        sort: true
    }, {
        dataField: 'location',
        text: 'Location'
    }],
    POKEDEX_OPTIONS: {
        protocol: 'https',
        hostName: 'pokeapi.co:443',
        versionPath: '/api/v2/',
        cache: true,
        timeout: 15 * 1000 // 15s
    }
};

export default Constants;