import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Auth from './pages/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/auth' element={<Auth />}/>
      </Routes>
    </div>
  );
}

export default App
