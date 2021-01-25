import React ,{useState,useEffect,useContext} from 'react'
import Store, { StoreList } from './Store'
import {UserContext,ObjectContext} from '../../context'

export default function InventoryHome() {
   // const [activeModal, setActiveModal]=useState("modal is-active ")
    const {state,setState}=useContext(ObjectContext)
    const handleCloseModal=()=>{
        state.showStoreModal  =  "modal"                                                                                                                                                        
        setState(state)
        console.log( state.showStoreModal)
    }
    
       
 
    return (
       
            <section className= "section remPadTop">
               <div className="is-1"> Inventory Module</div>
                                         
            </section>
    )
}
