/* eslint-disable */
import React,{useState,useContext,useEffect} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink} from 'react-router-dom'
import LaboratoryHome from './Epidemiology/Home'
import CaseDefinitionReport from './Epidemiology/CaseDefinition'
import EpidemiologyReport from './Epidemiology/EpidemiologyReport'
import Labs, { StoreList, StoreListStandalone } from './Laboratory/Labs'
import {UserContext,ObjectContext} from '../context'
import BillLab from './Laboratory/BillLab'

export default function EpidemiologyModule() {
    const {state,setState}=useContext(ObjectContext) //,setState
    const {user,setUser}=useContext(UserContext)
    // eslint-disable-next-line
    const [selectedStore,setSelectedStore]=useState()
    const [showModal,setShowModal]=useState(false)
    const [showmenu, setShowMenu]=useState(false)

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
                                        Health Stack::Laboratory::{selectedStore?selectedStore.name:""}</span>
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
                                    {/* <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/labs`}>Labs</NavLink>
                                    </div> */}
                                    <div className="navbar-item" onClick={handleBurger}>
                                        <NavLink to={`${url}/case-definition`}>Case Definition</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/analytics-and-reports`}>Analytics and Reports</NavLink>
                                    </div>
                                    <div className="navbar-item"  onClick={handleBurger}>
                                        <NavLink to={`${url}/notification`}>Notification</NavLink>
                                    </div>                                </div>
                            </div>
                        </div>
                    </nav>  
                    <Switch>
                        <Route path={path} exact>
                            <LaboratoryHome />
                        </Route>
                        <Route path={`${path}/case-definition`} exact>
                            <CaseDefinitionReport />
                        </Route>
                        <Route path={`${path}/analytics-and-reports`} exact>
                            <EpidemiologyReport />
                        </Route> 
                        <Route path={`${path}/notification`} exact >
                            <EpidemiologyReport />
                        </Route>

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
                                    </div>
                                </div>        
            </section>
    )
}
