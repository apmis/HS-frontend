/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
/* import InventoryReport from './Epidemiology/InventoryReport'
import InventorySetup from './Epidemiology/InventorySetup'
import InventoryStore from './Epidemiology/InventoryStore' */
import EpidemiologyHome from './Epidemiology/EpidemiologyHome'
/* import ProductEntry from './Epidemiology/ProductEntry'
import ProductExit from './Epidemiology/ProductExit'
//import BillService from './Finance/BillService'
/* import LabPayment from './Epidemiology/LabPayment' */
import Signals, { StoreList, StoreListStandalone } from './Epidemiology/Signals'
import {UserContext,ObjectContext} from '../context'
import BillLab from './Epidemiology/BillLab'
import Dashboard from './Epidemiology/DashBoard'
import Map from './Epidemiology/Map'
import CaseDefinition from './Epidemiology/CaseDefinition'

export default function EpidModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)

    let { path, url } = useRouteMatch();
    
    useEffect(() => {
       
        console.log("starting up epidemiology module")
        if (!selectedStore){
          /*   handleChangeStore() */

            }
         return () => {       
            } 
        }, [])
   
    useEffect(()=>{
     setSelectedStore(state.StoreModule.selectedStore)
     const    newEmployeeLocation={
        locationName:state.StoreModule.selectedStore.name,
        locationType:state.StoreModule.selectedStore.locationType,
        locationId:state.StoreModule.selectedStore._id,
        facilityId:user.currentEmployee.facilityDetail._id   ,
        facilityName:user.currentEmployee.facilityDetail.facilityName
    }
   setState((prevstate)=>({...prevstate, employeeLocation:newEmployeeLocation}))

    },[state.StoreModule])

    const handleChangeStore= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }
    const handleBurger=()=>{
       
        setShowMenu(prev=>(!prev))
    }

    return (
            <section className="section has-background-info remPad">
               
               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container minHt ">
                            <div className="navbar-brand minHt">
                                <div className="navbar-item ">
                                    <span className="is-small has-text-weight-medium">
                                        Health Stack::Epidemiology{/* ::{selectedStore?selectedStore.name:""} */}</span>
                                       {/*  <button className="button is-small is-info selectadd" onClick={()=>handleChangeStore()}>Change LGA</button>  */}
                                </div>
                                
                            {/* <div className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </div> */}
                                <span className="navbar-burger minHt" data-target="navbarMenuHeroB"  onClick={handleBurger}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroB" className={`navbar-menu minHt  has-background-info ${showmenu?"is-active":""}`}>
                                <div className={`navbar-end ${showmenu?"bckcolor":""}`}>
                                    <div className="navbar-item"   onClick={handleBurger}>
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>
                                    {/* <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/labs`}>Labs</NavLink>
                                    </div> */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/dashboard`}>Dashboard</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/definitions`}>Case Definition</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/signals`}>Signals</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/map`}>Map</NavLink>
                                    </div> 
                                    {/*  <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-inventory`}>Store Inventory</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-entry`}>Product Entry</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-exit`}>POS</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-products`}>Products</NavLink>
                                    </div>
                                   <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/inv-reports`}>Reports</NavLink>
                                    </div> */}
                                {/* <span className="navbar-item">
                                <div className="button is-info is-inverted">
                                    <span className="icon">
                                    <i className="fab fa-github"></i>
                                    </span>
                                    <span>Download</span>
                                </div>
                                </span> */}
                                </div>
                            </div>
                        </div>
                    </nav>
                    
               {/*  </div> */}
                
                {/* <div className="section"> */}
                {/* <div className="container mvUp " > */}
                       
                    <Switch>
                        <Route path={path} exact>
                            <EpidemiologyHome />
                        </Route>
                        {/* <Route path={`${path}/inv-dispense`} exact >
                            <Dispense />
                        </Route>
                      
                        <Route path={`${path}/inv-admin`} exact >
                            <InventorySetup />
                        </Route>
                        <Route path={`${path}/inv-inventory`} exact>
                            <InventoryStore />
                        </Route>
                        <Route path={`${path}/inv-entry`} exact>
                            <ProductEntry />
                        </Route>
                        <Route path={`${path}/inv-exit`} exact>
                            <ProductExit/>
                        </Route>*/}
                        <Route path={`${path}/map`} exact>
                            <Map />
                        </Route>
                        <Route path={`${path}/dashboard`} exact>
                            <Dashboard />
                        </Route>
                        <Route path={`${path}/definitions`} exact>
                            <CaseDefinition />
                        </Route> 
                        <Route path={`${path}/communication`} exact >
                            <BillLab />
                        </Route>
                        <Route path={`${path}/signals`} exact>
                            <Signals />
                        </Route>
                       {/*  <Route path={`${path}/lab-payment`} exact>
                            <LabPayment />
                        </Route> */}

                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Location</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <StoreListStandalone standalone="true" closeModal={()=>setShowModal(false)} />
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>        
            </section>
    )
}
