import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import FinanceReport from './Finance/FinanceReport'
import FinanceSetup from './Finance/FinanceSetup'
import FinanceStore from './Finance/FinanceStore'
import FinanceHome from './Finance/FinanceHome'
import ProductEntry from './Finance/ProductEntry'
import ProductExit from './Finance/ProductExit'
import Payment from './Finance/Payment'
import Products from './Finance/Products'
import Store, { StoreList } from './Finance/Store'
import {UserContext,ObjectContext} from '../context'
import BillPrescription from './Finance/BillPrescription'

export default function FinanceModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)

    let { path, url } = useRouteMatch();
    
    useEffect(() => {
       
        console.log("starting up Finance module")
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
                                        Health Stack::Finance::{selectedStore?selectedStore.name:""}</span>
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
                                        <NavLink to={`${url}/payment`}>Payment</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/location`}>Finance Locations</NavLink>
                                    </div>
                                    
                                    {/* <div className="navbar-item">
                                        <NavLink to={`${url}/inv-bill`}>Bill Prescription</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/inv-Finance`}>Store Finance</NavLink>
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
                            <FinanceHome />
                        </Route>
                        <Route path={`${path}/payment`} exact >
                            <Payment />
                        </Route>
                        {/* <Route path={`${path}/inv-bill`} exact >
                            <BillPrescription />
                        </Route>
                        <Route path={`${path}/inv-admin`} exact >
                            <FinanceSetup />
                        </Route>
                        <Route path={`${path}/inv-Finance`} exact>
                            <FinanceStore />
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
                            <FinanceReport />
                        </Route> */}
                        <Route path={`${path}/location`} exact>
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
