/* eslint-disable */
import React ,{useState,useEffect,useContext} from 'react'
import Store, { StoreList } from './Notifications'
import {UserContext,ObjectContext} from '../../context'

export default function EpidemiologyHome() {
    const {state,setState}=useContext(ObjectContext)
    const handleCloseModal=()=>{
        state.showStoreModal  =  "modal"                                                                                                                                                        
        setState(state)
        console.log( state.showStoreModal)
    }
    
       
 
    return (
       
            <section className= "section remPadTop">
              <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                    <h1 className="title">
                     Epidemiology Module
                    </h1>
                    <h2 className="subtitle">
                       Insights into incidence, distribution, and control of diseases as well as other factors relating to our health!
                    </h2>
                    </div>
                </div>
            </section>
                                         
            </section>
    )
}
