import React from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import InventoryReport from './inventory/InventoryReport'
import InventorySetup from './inventory/InventorySetup'
import InventoryStore from './inventory/InventoryStore'
import InventoryHome from './inventory/InventoryHome'
import ProductEntry from './inventory/ProductEntry'
import ProductExit from './inventory/ProductExit'
import Store from './inventory/Store'

export default function InventoryModule() {
    let { path, url } = useRouteMatch();
    return (
            <section className="section has-background-info remPad">
               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container ">
                            <div className="navbar-brand ">
                                <div className="navbar-item ">
                                    <span className="is-size-6 has-text-weight-medium">Health Stack::Pharmacy</span> 
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
                                        <NavLink to={`${url}/inv-admin`}>Admin</NavLink>
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
                        <Route path={`${path}/inv-reports`} exact>
                            <InventoryReport />
                        </Route>

                    </Switch>
                        {/*  */}
                   {/*  </div> */}
               {/*  </div> */}

                
            </section>
    )
}
