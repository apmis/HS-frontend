//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login' 
import SignUp from './components/SignUp'
import {useState} from 'react'
import {UserContext,ObjectContext} from './context'

import 'bulma/css/bulma.css'
import "@fortawesome/fontawesome-free/css/all.css"; 

function App() {
  const [user,setUser] = useState()
  const [state,setState] = useState({
    facilityModule:{
      show:'create',
      selectedFacility:{}
    }
  })
  return (
    <ObjectContext.Provider value={{state,setState}}>
    <UserContext.Provider value={{user,setUser}}>
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
    </UserContext.Provider>
    </ObjectContext.Provider>
  );
}

export default App;
