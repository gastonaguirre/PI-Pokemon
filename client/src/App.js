import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import Home from './views/Home/Home';
import PokemonDetail from './views/PokemonDetail/PokemonDetail';
import CreatePokemon from './views/CreatePokemon/CreatePokemon';

function App() {
  return (
    <div className="App">
      <Route exact path="/"  component={LandingPage} />
      <Route exact path="/home"  component={Home} />
      <Route exact path="/pokemons/:id"  component={PokemonDetail} />
      <Route exact path="/createPokemon"  component={CreatePokemon} />
    </div>
  );
}

export default App;
