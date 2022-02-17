/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import InventoryReport from './Radiology/InventoryReport'
import InventorySetup from './Radiology/InventorySetup'
import InventoryStore from './Radiology/InventoryStore'
import RadiologyHome from './Radiology/RadiologyHome'
import ProductEntry from './Radiology/ProductEntry'
import ProductExit from './Radiology/ProductExit'
import Dispense from './Radiology/Dispensary'
import BillService from './Finance/BillService'
import RadiologyReport from './Radiology/RadiologyReport'
import RadiologyPayment from './Radiology/RadiologyPayment'
import Labs, { StoreList, StoreListStandalone } from './Radiology/Radiology'
import {UserContext,ObjectContext} from '../context'
import BillLab from './Radiology/BillRadiology'

export default function RadiologyModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)

    let { path, url } = useRouteMatch();
    
    useEffect(() => {
       
        console.log("starting up Radiology module")
        if (!selectedStore){
            handleChangeStore()

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
                                        Health Stack::Radiology::{selectedStore?selectedStore.name:""}</span>
                                        <button className="button is-small is-info selectadd" onClick={()=>handleChangeStore()}>Change Location</button> 
                                </div>
                                
                            
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
                                  
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/billservice`}>Bill Client</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/lab-bill`}>Bill Radiology Orders Sent</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/lab-payment`}>Payment</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/lab-result`}>Radiology Result</NavLink>
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </nav>
                    
               {/*  </div> */}
                
                {/* <div className="section"> */}
                {/* <div className="container mvUp " > */}
                       
                    <Switch>
                        <Route path={path} exact>
                            <RadiologyHome />
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
                        </Route>
                        <Route path={`${path}/inv-products`} exact>
                            <Products />
                        </Route>*/}
                        <Route path={`${path}/billservice`} exact>
                            <BillService />
                        </Route>
                        <Route path={`${path}/lab-result`} exact>
                            <RadiologyReport />
                        </Route> 
                        <Route path={`${path}/lab-bill`} exact >
                            <BillLab />
                        </Route>
                        <Route path={`${path}/labs`} exact>
                            <Labs />
                        </Route>
                        <Route path={`${path}/lab-payment`} exact>
                            <RadiologyPayment />
                        </Route>

                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Location</p>
                                        {/* <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button> */}
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
