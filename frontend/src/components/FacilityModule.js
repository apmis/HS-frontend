/* eslint-disable */
import React ,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import CareTeam from './facility/CareTeam'
import Department from './facility/Department'
import DeptUnits from './facility/DeptUnits'
import FacilityHome from './facility/FacilityHome'
import Employee from './facility/Employee'
import Facility from './facility/Facility'
import HSModules from './facility/HSModules'
import Location from './facility/Location'
import Roaster from './facility/Roaster'
import Workspace from './facility/Workspace'
import Accessibility from './facility/Accessibility'
import ClinicSetup from './Clinic/ClinicSetup'
import {UserContext,ObjectContext} from '../context'
import Bands from './facility/Bands'

export default function FacilityModule() {
    const [showmenu, setShowMenu]=useState(false)
    let { path, url } = useRouteMatch();
    const {user,setUser}=useContext(UserContext)
    const handleBurger=()=>{
       
        setShowMenu(prev=>(!prev))
    }
    return (
            <section className="section has-background-info remPad">
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container minHt ">
                            <div className="navbar-brand minHt ">
                                <div className="navbar-item ">
                                    <span className="is-small has-text-weight-medium">Health Stack::Facility</span> 
                                </div>
                                <span className="navbar-burger minHt" data-target="navbarMenuHeroB" onClick={handleBurger}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenuHeroB" className={`navbar-menu minHt  has-background-info ${showmenu?"is-active":""}`}>
                                <div className={`navbar-end ${showmenu?"bckcolor":""}`}>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}`}>Home Page</NavLink> 
                                    </div>
                                     <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/bands`}>Bands</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/employees`}>Employees</NavLink>
                                    </div>
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/location`}>Locations</NavLink>
                                    </div>
                                    {user.stacker &&  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/facility`}>Facility</NavLink>
                                    </div>}
                                    {user.stacker &&  <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/clinicsetup`}> Clinic Admin</NavLink>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </nav>
                       
                    <Switch>
                        <Route path={path} exact>
                            <FacilityHome />
                        </Route>
                        <Route path={`${path}/accessibility`} exact >
                            <Accessibility />
                        </Route>
                      
                        <Route path={`${path}/careteam`} exact>
                            <CareTeam />
                        </Route>
                        <Route path={`${path}/department`} exact>
                            <Department/>
                        </Route>
                        <Route path={`${path}/dept-unit`} exact>
                            <DeptUnits />
                        </Route>
                        <Route path={`${path}/employees`} >
                            <Employee />
                        </Route>
                        <Route path={`${path}/facility`} exact >
                            <Facility />
                        </Route>
                        <Route path={`${path}/hsmodules`} exact>
                            <HSModules />
                        </Route>
                        <Route path={`${path}/location`} exact>
                            <Location/>
                        </Route>
                        <Route path={`${path}/bands`} exact>
                            <Bands/>
                        </Route>
                        <Route path={`${path}/roaster`} exact>
                            <Roaster/>
                        </Route>
                        <Route path={`${path}/Workspace`} exact>
                            <Workspace />
                        </Route>
                        <Route path={`${path}/clinicsetup`} exact >
                            <ClinicSetup />
                        </Route>

                    </Switch>
                  

                
            </section>
    )
}
