

const initialState = {
  pokemons: [],
  pokemonsDetail: [],
  pokemonsOrigin: [],
  pokemonTypes: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    //todos los pokemones
    case 'GET_POKES':
      return {
        ...state,
        pokemons: action.payload,
        pokemonsOrigin: action.payload
      };

    //todos los tipos de pokemones
    case 'GET_TYPES':
      return {
        ...state,
        pokemonTypes: action.payload,
      };

    //pokemones buscados por nombre
    case 'GET_POKE_NAME':
      return {
        ...state,
        pokemons: action.payload
      }

    //pokemones buscados por id
    case 'GET_POKE_ID':
      return {
        ...state,
        pokemonsDetail: action.payload
      }

    //filtra los pokemones en orden alfabetico de la A-Z y Z-A
    case 'ORDER_POKE':
      return {
        ...state,
        pokemons: state.pokemons.sort((a, b) => {
          if (action.payload === 'A-Z') {
            if (a.name < b.name) return -1;
            if (b.name < a.name) return 1;
            return 0;
          } else {
            if (b.name < a.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          }
        })
      }

    //filtra por tipo de pokemon
    case 'FILTER_TYPE':
      const allPokes = state.pokemonsOrigin;
      const typeFiltered = action.payload === 'ALL' ? allPokes :
        allPokes.filter(pt => pt.types.map(pt => pt.name).includes(action.payload))
      return {
        ...state,
        pokemons: typeFiltered
      }

    //filtra pokemones creados por la db o la api 
    case 'ORIGIN':
      let pokes = []
      if (action.payload === "pokes") {
        pokes = state.pokemonsOrigin
      } else if (action.payload === "db") {
        pokes = state.pokemonsOrigin.filter(p => p.createdInDb)
      } else if (action.payload === "api") {
        pokes = state.pokemonsOrigin.filter(p => !p.createdInDb)
      }
      return {
        ...state,
        pokemons: pokes
      }

    //filtra los pokemones del mas fuerte al mas debil y viceversa
    case 'FILTER_ATTACK':
      let filterAttack = action.payload === "weak" ?
        state.pokemons.sort((a, z) => {
          if (a.attack > z.attack) {
            return 1
          }
          if (z.attack > a.attack) {
            return -1
          }
          return 0
        }) :
        state.pokemons.sort((a, z) => {
          if (a.attack > z.attack) {
            return -1
          }
          if (z.attack > a.attack) {
            return 1
          }
          return 0
        })
      return {
        ...state,
        pokemons: filterAttack
      }

    //crea un pokemon
    case 'POST_POKE':
      return {
        ...state,
      }

    default:
      return {
        ...state
      }
  }
}

export default rootReducer;