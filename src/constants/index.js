const Constants = {
    BASE_URL: 'http://pokeapi.co',
    API_URL: '/api/v2/',
    POKEMON: 'pokemon/',
    FORM: 'pokemon-form/',
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
    }]
};

export default Constants;