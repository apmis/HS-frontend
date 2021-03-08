/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react'
import {Route, Switch,  useRouteMatch, /* Link, */ NavLink, useHistory} from 'react-router-dom'
import FacilityModule from './FacilityModule'
import InventoryModule from './InventoryModule'
import ClinicModule from './ClinicModule'
import FinanceModule from './FinanceModule'
/* import NavBar from './NavBar' */
import LandingPage from './LandingPage'
import {UserContext} from '../context'
import client from '../feathers'

export default function Home() {
    let { path, url } = useRouteMatch();
   // const {user,setUser} = useContext(UserContext)

    
    //console.log(path)

    return (
        <div>
            <NavBar url={url}/>
                     
            <Switch>
            <Route path={path} exact>
                    <LandingPage />
                </Route>
                <Route path={`${path}/inventory`} >
                    <InventoryModule />
                </Route>
                <Route path={`${path}/facility`} >
                    <FacilityModule />
                </Route>
                <Route path={`${path}/clinic`} >
                    <ClinicModule />
                </Route>
                <Route path={`${path}/finance`} >
                    <FinanceModule />
                </Route>
            </Switch>
        </div>
    )
} 

function NavBar({url}){
    const [fullname, setFullname]=useState("")
    const [userFacility, setUserFacility]=useState()
    const {user,setUser} = useContext(UserContext)
    const history =useHistory()
    
    const reAuth =  async() =>{
        try{
            const resp = await client.reAuthenticate();
            //console.log(resp)
            await setUser(resp.user)
            /* console.log("lastname:",  user.lastname)
            console.log("reauth tried")
            */
           console.log(user)
            return
            }
        catch(error){
            console.log(error)
           history.push("/")
        }  
    }

    /* useEffect(() => {
        const localUser= JSON.parse(localStorage.getItem("user"))
        setUser(localUser)
        console.log(user)
        return () => {
           
        }
    }, []) */


    useEffect( () => {
        if(!user){
           console.log("No user")
            reAuth()
          
            //history.push("/")    
             return
        }

        async function getFullname(){
            const zed= user.firstname+" "+user.lastname
           await setFullname(zed)
        // console.log(zed)
         if (user.employeeData.length){
            user.currentEmployee= user.employeeData[0] //choose the first facilty
            const fac=  user.currentEmployee.facilityDetail.facilityName
           // await set
           await setUserFacility(fac)
         }else{
            user.currentEmployee= null
           
         }
        
         await setUser(user)
         localStorage.setItem("user",JSON.stringify(user))
         
         
         
        }
        getFullname()
        //console.log(user)
       /*  console.log(user.lastname)
      console.log(user) */
        return () => {
            
        }
        // eslint-disable-next-line 
    },[] )

    const handleFacilityClick=()=>{ //need to implement changing facility
        const availableFacilities=[]
        if (Array.isArray(user.employeeData)&& user.employeeData.length){
            user.employeeData.map((emp)=>{
             return   availableFacilities.push(emp.facilityDetail)
            })
        }
        console.log(availableFacilities)
    }
    if (!user) return 'Loading...'
    return(
        <div>
           <nav className="navbar is-small minHt has-background-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand minHt">
                    <div className="navbar-item is-size-5 minHt" onClick={handleFacilityClick}> <strong>{userFacility ||""} </strong> </div>
                    {/* <div className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </div> */}

                    <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <div className="navbar-item">
                        <NavLink to={`${url}`}>Landing Page</NavLink> 
                    </div>
                    <div className="navbar-item">
                        <NavLink to={`${url}/clinic`}>Clinic</NavLink>
                    </div>
                    <div className="navbar-item">
                        <NavLink to={`${url}/inventory`}>Inventory</NavLink>
                    </div>
                    <div className="navbar-item">
                        <NavLink to={`${url}/facility`}>Admin</NavLink>
                    </div>
                    <div className="navbar-item">
                        <NavLink to={`${url}/finance`}>Finance</NavLink>
                    </div>
                    <div className="navbar-item">
                        Front Desk
                    </div>
                    <hr className="navbar-divider" />
                    <div className="navbar-item">
                        Sign Out
                    </div>
                    
                  {/*   <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span> */}
                    </div>
                </div>

                <div id="navbarBasicExample" className="navbar-menu minHt">
                    <div className="navbar-start">
                    {/* <div className="navbar-item">
                        Home
                    </div>

                    <div className="navbar-item">
                        Documentation
                    </div> */}

                    
                    </div>

                    <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">
                        
                            <div className="button is-info is-inverted minHt">
                                <span className="icon">
                                <i className="fa fa-user-md"></i>
                                </span>
                                <span>{fullname}</span>
                                
                                {/* <span>{user.firstname}</span> */}
                            </div>
                           
                        </div>

                            <div className="navbar-dropdown bckcolor">
                                <div className="navbar-item">
                                    <NavLink to={`${url}`}>Landing Page</NavLink> 
                                </div>
                                <div className="navbar-item">
                                    <NavLink to={`${url}/clinic`}>Clinic</NavLink>
                                </div>
                                <div className="navbar-item">
                                    <NavLink to={`${url}/inventory`}>Inventory</NavLink>
                                </div>
                                <div className="navbar-item">
                                    <NavLink to={`${url}/facility`}>Admin</NavLink>
                                </div>
                                <div className="navbar-item">
                                    <NavLink to={`${url}/finance`}>Finance</NavLink>
                                </div>
                                <div className="navbar-item">
                                    Front Desk
                                </div>
                                <hr className="navbar-divider" />
                                <div className="navbar-item">
                                   Sign Out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
 
  