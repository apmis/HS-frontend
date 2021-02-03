import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import ClinicReport from './Clinic/ClinicReport'
import ClinicSetup from './Clinic/ClinicSetup'
import ClinicStore from './Clinic/ClinicStore'
import ClinicHome from './Clinic/ClinicHome'
import ClinicEntry from './Clinic/ClinicEntry'
import Encounter from './Clinic/Encounter'
import Patients from './Clinic/Patient'
import Clinic, { ClinicList } from './Clinic/Clinic'
import {UserContext,ObjectContext} from '../context'

export default function ClinicModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedClinic,setSelectedClinic]=useState()
    const [showModal,setShowModal]=useState(false)

    let { path, url } = useRouteMatch();
    
    useEffect(() => {
       
        console.log("starting up Clinic module")
        if (!selectedClinic){
            handleChangeClinic()

            }
         return () => {       
            }
        }, [])
   
    useEffect(()=>{
     setSelectedClinic(state.ClinicModule.selectedClinic)

    },[state.ClinicModule])

    const handleChangeClinic= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }

    return (
            <section className="section has-background-info remPad">
               
               {/*  <div className=""> */}
                    <nav className="navbar minHt z10 has-background-info">
                        <div className="container ">
                            <div className="navbar-brand ">
                                <div className="navbar-item ">
                                    <span className="is-size-6 has-text-weight-medium">
                                        Health Stack::Clinic::{selectedClinic?selectedClinic.name:""}</span>
                                        <button className="button is-small is-info" onClick={()=>handleChangeClinic()}>Change Clinic</button> 
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
                                        <NavLink to={`${url}/clinics`}>Clinics</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/clinicsetup`}> Clinic Admin</NavLink>
                                    </div>
                                   {/*  <div className="navbar-item">
                                        <NavLink to={`${url}/clinicstore`}>Clinic Store</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/clinicentry`}>Clinic Entry</NavLink>
                                    </div> */}
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/encounter`}>Attend to Client</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/patients`}>Clients</NavLink>
                                    </div>
                                    <div className="navbar-item">
                                        <NavLink to={`${url}/clinicreports`}>Reports</NavLink>
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
                            <ClinicHome />
                        </Route>
                        <Route path={`${path}/clinicsetup`} exact >
                            <ClinicSetup />
                        </Route>
                        <Route path={`${path}/clinicstore`} exact>
                            <ClinicStore />
                        </Route>
                        <Route path={`${path}/clinicentry`} exact>
                            <ClinicEntry />
                        </Route>
                        <Route path={`${path}/encounter`} exact>
                            <Encounter/>
                        </Route>
                        <Route path={`${path}/patients`} exact>
                            <Patients />
                        </Route>
                        <Route path={`${path}/clinicreports`} exact>
                            <ClinicReport />
                        </Route>
                        <Route path={`${path}/clinics`} exact>
                            <Clinic />
                        </Route>

                    </Switch>
                  

                    <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Clinic</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <ClinicList standalone="true" />
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
