import StarWarsProvider from './context/StarWarsContext';
import Router from './Router';

function App() {
  return (
    <StarWarsProvider>
      <Router />
    </StarWarsProvider>
  );
}

export default App;
