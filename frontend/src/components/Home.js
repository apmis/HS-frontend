/* eslint-disable */
import React, {useContext, useEffect, useState} from 'react'
import {Route, Switch,  useRouteMatch, /* Link, */ NavLink, useHistory} from 'react-router-dom'
import FacilityModule from './FacilityModule'
import InventoryModule from './InventoryModule'
import ClinicModule from './ClinicModule'
import ClientModule from './ClientModule'
import FinanceModule from './FinanceModule'
import AccountModule from './AccountModule'
import LaboratoryModule from './LaboratoryModule'
import EpidModule from './EpidemiologyModule'
import Ward from './WardModule'
import RadiologyModule from './RadiologyModule'
import PharmacyModule from './PharmacyModule'
import TheatreModule from './TheatreModule'
import ManagedCareModule from './ManagedCareModule'
/* import NavBar from './NavBar' */
import LandingPage from './LandingPage'
import {UserContext,ObjectContext} from '../context'
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
                <Route path={`${path}/client`} >
                    <ClientModule />
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
                <Route path={`${path}/account`} >
                    <AccountModule />
                </Route>
                <Route path={`${path}/labs`} >
                    <LaboratoryModule />
                </Route>
                <Route path={`${path}/hmo`} >
                    <ManagedCareModule />
                </Route>
                <Route path={`${path}/epid`} >
                    <EpidModule />
                </Route>
                <Route path={`${path}/radiology`} >
                    <RadiologyModule />
                </Route>
                <Route path={`${path}/pharmacy`} >
                    <PharmacyModule />
                </Route>
                <Route path={`${path}/theatre`} >
                    <TheatreModule />
                </Route>
                <Route path={`${path}/ward`} >
                    <Ward />
                </Route>
            </Switch>
        </div>
    )
} 

function NavBar({url}){
    const [fullname, setFullname]=useState("")
    const [userFacility, setUserFacility]=useState()
    const {user,setUser} = useContext(UserContext)
    const {state,setState}=useContext(ObjectContext)
    const [showmenu, setShowMenu]=useState(false)
    const history =useHistory()



    useEffect(() => {
       
       if (state.showpanel){
        //handleBurger()
        setShowMenu(true)
        setState((prevstate)=>({...prevstate, showpanel:false}))
       // alert(showmenu)
         }
        return () => {
            
        }
    }, [state.showpanel])
    
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

    const handleLogOut=()=>{
        client.logout()
        history.push('/')
    }

    const handleFacilityClick=()=>{ //need to implement changing facility
        const availableFacilities=[]
        if (Array.isArray(user.employeeData)&& user.employeeData.length){
            user.employeeData.map((emp)=>{
             return   availableFacilities.push(emp.facilityDetail)
            })
        }
        console.log(availableFacilities)
    }
    const handleBurger=()=>{
       
        setShowMenu(prev=>(!prev))
    }
    if (!user) return 'Loading...'
    return(
        <div>
           <nav className="navbar is-small minHt has-background-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand minHt">
                    <div className="navbar-item is-size-5 minHt" onClick={handleFacilityClick}> 
                        <strong>{userFacility ||""} </strong> 
                    </div>
                    {/* <div className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </div> */}

                    <a role="button" className="navbar-burger minHt" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"  onClick={handleBurger} >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span> 
                    </a>
                    
                </div>

                <div  className={`navbar-menu minHt  has-background-info ${showmenu?"is-active":""}`}   id="navbarBasicExample">
                    <div className="navbar-start">
                    </div>

                    <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable  has-background-info">
                        <div className="navbar-link is-arrowless  ">
                        
                            <div className="button is-info is-inverted minHt ">
                                <span className="icon">
                                <i className="fa fa-user-md"></i>
                                </span>
                                <span>{fullname}</span>
                                
                                {/* <span>{user.firstname}</span> */}
                            </div>
                           
                        </div>

                            <div className="navbar-dropdown bckcolor">
                                <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}`}>Landing Page</NavLink> 
                                </div>
                                {(user.currentEmployee?.roles.includes('Client')||user.currentEmployee?.roles.length===0 )&&  <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/client`}>Clients</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Clinic')||user.currentEmployee?.roles.length===0 )&&  <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/clinic`}>Clinic</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Ward')||user.stacker )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/ward`}>Ward</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Pharmacy')||user.currentEmployee?.roles.length===0||user.stacker )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/Pharmacy`}>Pharmacy</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Inventory')||user.currentEmployee?.roles.length===0||user.stacker )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/inventory`}>Inventory</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Laboratory')||user.currentEmployee?.roles.length===0 )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/labs`}>Laboratory</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Radiology')||user.currentEmployee?.roles.length===0 )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/radiology`}>Radiology</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Theatre')||user.currentEmployee?.roles.length===0||user.stacker )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/theatre`}>Theatre</NavLink>
                                </div>}
                               
                               
                                {(user.currentEmployee?.roles.includes('Finance')||user.stacker )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/hmo`}>Managed Care</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Finance')||user.currentEmployee?.roles.length===0 )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/account`}>Account</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Finance')||user.currentEmployee?.roles.length===0 )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/finance`}>Finance</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Epidemiology')||user.currentEmployee?.roles.length===0 )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/epid`}>Epidemiology</NavLink>
                                </div>}
                                {(user.currentEmployee?.roles.includes('Admin')||user.currentEmployee?.roles.length===0||user.stacker )&& <div className="navbar-item" onClick={handleBurger} >
                                    <NavLink to={`${url}/facility`}>Admin</NavLink>
                                </div>}
                               
                               
                                {/* <div className="navbar-item">
                                    Front Desk
                                </div> */}
                                <hr className="navbar-divider" />
                                <div className="navbar-item showAction" onClick={handleLogOut}>
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
 
  