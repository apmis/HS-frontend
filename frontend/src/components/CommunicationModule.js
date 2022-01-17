/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
// import EpidemiologyHome from './Epidemiology/EpidemiologyHome'
import ChannelHome from "./Communication/ChannelHome"
import Questionnaire from "./Communication/experimental/Questionnaire"
import Submission from "./Communication/experimental/Submission"
import InputFields  from  "./Communication/experimental/InputFields"


import Channel from './Communication/Channel'
export default function CommunicationModule() {
    const [showmenu, setShowMenu]=useState(false)
    let { path, url } = useRouteMatch();
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
                                    
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/Channel`}>Channel</NavLink>
                                    </div>

                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/questionnaire`}>Questionnaires</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/submission`}>Submissions</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/input-fields`}>Input Fields</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    
               
                       
                    <Switch>
                        <Route path={path} exact>
                            <ChannelHome />
                        </Route>
                        
                        <Route path={`${path}/Channel`} exact>
                            <Channel />
                        </Route>

                        <Route path={`${path}/questionnaire`} exact >
                            <Questionnaire />
                        </Route>
                        <Route path={`${path}/submission`} exact >
                            <Submission />
                        </Route>
                        <Route path={`${path}/input-fields`} exact >
                            <InputFields />
                        </Route>

                        

                    </Switch>
                  

                    
            </section>
    )
}
