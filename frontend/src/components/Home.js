import React from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import FacilityModule from './FacilityModule'
import InventoryModule from './InventoryModule'
/* import NavBar from './NavBar' */
import LandingPage from './LandingPage'

export default function Home() {
    let { path, url } = useRouteMatch();
    console.log(path)

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
                
            </Switch>
        </div>
    )
} 

function NavBar({url}){

    return(
        <div>
           <nav className="navbar is-small minHt" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-size-5 "> <strong>Foremost Base Hospital </strong> </div>
                    {/* <div className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </div> */}

                    <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
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
                        
                            <div className="button is-info is-inverted">
                                <span className="icon">
                                <i className="fa fa-user-md"></i>
                                </span>
                                <span>Simpa Dania</span>
                            </div>
                           
                        </div>

                            <div className="navbar-dropdown bckcolor">
                                <div className="navbar-item">
                                    <NavLink to={`${url}`}>Landing Page</NavLink> 
                                </div>
                                <div className="navbar-item">
                                    <NavLink to={`${url}/inventory`}>Pharmacy</NavLink>
                                </div>
                                <div className="navbar-item">
                                    <NavLink to={`${url}/facility`}>Admin</NavLink>
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
 
  