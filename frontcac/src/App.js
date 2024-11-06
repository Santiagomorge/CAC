import './App.css';
import { Index } from './components/index/index';
import { Header } from './components/header/header';
import { Usuarios } from './components/usuarios/usuarios';

function App() {
  return (
    <div className="app-container">
        <Header />
        <Index />
        <Usuarios />
    </div>
  );
}

export default App;
