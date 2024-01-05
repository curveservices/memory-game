import Gameboard from "./gameboard";
import pokeball from '../assets/pokeball.png'
import '../styles/App.css'

const App = () => {
  return (
  <div className="app">
      <header className="header">
        <img src={pokeball} className="logo" alt="pokeball"/>
        <h1>PokeMem</h1>
      </header>
      <Gameboard />
    </div>
  );
};

export default App;
