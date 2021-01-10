//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login' 
import SignUp from './components/SignUp'


import 'bulma/css/bulma.css'
import "@fortawesome/fontawesome-free/css/all.css"; 

function App() {
  return (
    <Router>
      <div className="App has-background-info">
        <Switch>
          <Route path='/signup' exact>
            <SignUp />
          </Route>
          <Route path='/app' >
            <Home/>
          </Route>
          <Route path='/' exact>
            <Login /> 
          </Route>
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
