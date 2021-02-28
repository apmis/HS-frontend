import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import InventoryReport from './inventory/InventoryReport'
import InventorySetup from './inventory/InventorySetup'
import InventoryStore from './inventory/InventoryStore'
import InventoryHome from './inventory/InventoryHome'
import ProductEntry from './inventory/ProductEntry'
import ProductExit from './inventory/ProductExit'
import Dispense from './inventory/Dispensary'
import Products from './inventory/Products'
import Store, { StoreList } from './inventory/Store'
import {UserContext,ObjectContext} from '../context'
import BillPrescription from './inventory/BillPrescription'

export default function InventoryModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)

    let { path, url } = useRouteMatch();
    
    useEffect(() => {
       
        console.log("starting up inventory module")
        if (!selectedStore){
            handleChangeStore()

            }
         return () => {       
            }
        }, [])
   
    useEffect(()=>{
     setSelectedStore(state.StoreModule.selectedStore)

    },[state.StoreModule])

    const handleChangeStore= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }

    return (
            <section className="section has-background-info remPad">
               
               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container minHt ">
                            <div className="navbar-brand minHt">
                                <div className="navbar-item ">
                                    <span className="is-size-6 has-text-weight-medium">
                                        Health Stack::Inventory::{selectedStore?selectedStore.name:""}</span>
                                        <button className="button is-small is-info" onClick={()=>handleChangeStore()}>Change Store</button> 
                                </div>
                                
                            {/* <div className="navbar-item">
                                <img src="https://bulma.io/images/bulma-type-white.png" alt="Logo" />
                            </div> */}
                                <span className="navbar-burger" data-target="navbarMenuHeroB">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroB" className="navbar-menu">
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-stores`}>Stores</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-dispense`}>Dispensary</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-bill`}>Bill Prescription</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-inventory`}>Store Inventory</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-entry`}>Product Entry</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-exit`}>Product Exit</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-products`}>Products</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-reports`}>Reports</NavLink>
                                    </div>
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
                            <InventoryHome />
                        </Route>
                        <Route path={`${path}/inv-dispense`} exact >
                            <Dispense />
                        </Route>
                        <Route path={`${path}/inv-bill`} exact >
                            <BillPrescription />
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
                        </Route>
                        <Route path={`${path}/inv-reports`} exact>
                            <InventoryReport />
                        </Route>
                        <Route path={`${path}/inv-stores`} exact>
                            <Store />
                        </Route>

                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Store</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <StoreList standalone="true" closeModal={()=>setShowModal(false)} />
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
