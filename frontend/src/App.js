/* eslint-disable */
//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,  Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login' 
import SignUp from './components/SignUp'
import {useState, useContext, useEffect} from 'react'
import {UserContext,ObjectContext} from './context'
import MyUserProvider from './context'
import client from './feathers'

import 'bulma/css/bulma.css'
import "@fortawesome/fontawesome-free/css/all.css"; 


function App() {

  const [state,setState] = useState({
    facilityModule:{
      show:'create',
      selectedFacility:{}
    },
    EmployeeModule:{
      show:'create',
      selectedEmployee:{}
    },
    LocationModule:{
      show:'create',
      selectedLocation:{}
    },
    ProductModule:{
      show:'create',
      selectedProduct:{}
    },
    StoreModule:{
      show:'create',
      selectedStore:{}
    },
    InventoryModule:{
      show:'detail',
      selectedInventory:{}
    },
    ProductEntryModule:{
      show:'create',
      selectedProductEntry:{}
    },
    ProductExitModule:{
      show:'create',
      selectedProductEntry:{}
    },
    ClinicModule:{
      show:'create',
      selectedClinic:{}
    },
    ClientModule:{
      show:'create',
      selectedClient:{}
    },
    DocumentClassModule:{
      show:'create',
      selectedDocumentClass:{}
    },
    AppointmentModule:{
      show:'create',
      selectedAppointment:{}
    },
    OrderModule:{
      show:'create',
      selectedOrder:{}
    },
    DispenseModule:{
      show:'create',
      selectedDispense:{}
    },
    DestinationModule:{
      show:'create',
      selectedDestination:{}
    },
    medicationModule:{
      show:'create',
      selectedMedication:{}
    },
    ServicesModule:{
      show:'create',
      selectedServices:{}
    },
    financeModule:{
      show:'create',
      state:'false',
      selectedFinance:{}
    },
    currentClients:[]

  })
  
  
 
  return (
    <ObjectContext.Provider value={{state,setState}}>
   {/*  <UserContext.Provider value={{user,setUser}}> */}
   <MyUserProvider>
    <Router>
      <div className="App has-background-info">
        <Switch>
          <Route path='/signup' exact>
            <SignUp />
          </Route>
         <ProtectedRoute path='/app' >
            <Home/>
          </ProtectedRoute>
          <Route path='/' exact>
            <Login /> 
          </Route>
          <Route path='*' >
            <div>404-not found</div>
          </Route>
        </Switch>  
      </div>
    </Router>
    </MyUserProvider>
    {/* </UserContext.Provider> */}
    </ObjectContext.Provider>
  );
}

export default App;

// eslint-disable-next-line 
const ProtectedRoute =({children,...props})=>{
 // const history = useHistory()
  const {user,setUser} = useContext(UserContext)

 
useEffect(()=>{
const check=async ()=>{
  if (!user){
    (async () => {
      try {
        // First try to log in with an existing JWT
        const resp= await client.reAuthenticate();
           // console.log(resp)
          // const user1=await resp.user 
              await setUser(resp.user)
              //history.push('/app')

              return
        
      } catch (error) {
        // If that errors, log in with email/password
        // Here we would normally show a login page
        // to get the login information
        /* return await client.authenticate({
          strategy: 'local',
          email: 'hello@feathersjs.com',
          password: 'supersecret'
        }); */
        console.log(error)
      }
    })()
   }
}
 check().then((resp)=>{
  //console.log("testing")
 })
// eslint-disable-next-line 
}, [])


  return  (<Route {...props} render={({location}) => {
    return  user/* fakeAuth.isAuthenticated === true */
      ? children
      : <Redirect to={{
        pathname: '/',
        state: { from: location }
      }} />
  }} />)
  /* user? <Route {...props}>{children}</Route>:<Redirect to='/'></Redirect> */

}

