/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ClientCreate, ClientDetail, ClientList} from '../ClientMgt/Patient'

import EncounterMain from './EncounterMain';
import EncounterRight from './EncounterRight';
import PatientProfile from '../ClientMgt/PatientProfile';
var random = require('random-string-generator');

const searchfacility={};


export default function Encounter({standalone}) {
    const {state}=useContext(ObjectContext) 
    
    
    
    
    
    const [selectedClient,setSelectedClient]=useState()
    const [showModal,setShowModal]=useState(false)

    
    
    useEffect(() => {
       
        console.log("starting up Encounter module")
        console.log(state.ClientModule.selectedClient)
        if (Object.keys(state.ClientModule.selectedClient).length === 0 && state.ClientModule.selectedClient.constructor === Object){
            handleChangeClient()

            }
         return () => {       
            }
        }, [])
   
    useEffect(()=>{
     setSelectedClient(state.ClientModule.selectedClient)

    },[state.ClientModule])

    const handleChangeClient= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }




    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            {!standalone && <div className="column is-2 ">
                   <PatientProfile  />
                    </div>}

            {!standalone &&     <div className= {(state.DocumentClassModule.show ==='detail')?"column is-6":"column is-6 "}>
                   <EncounterMain client={selectedClient}/>
                </div>}
                {standalone &&     <div className= {(state.DocumentClassModule.show ==='detail')?"column is-8":"column is-12 "}>
                   <EncounterMain client={selectedClient} nopresc={standalone}/>
                </div>}
              <div className="column is-4 " >
                {(state.DocumentClassModule.show ==='detail')&& <EncounterRight  client={selectedClient}/>}
                </div>
            </div>
            <div className={`modal ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head btnheight">
                                        <p className="modal-card-title">Choose Client</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body ">
                                        <ClientList standalone="true" />
                                        </section>
                                    </div>
                                </div>                                    
            </section>
       
    )
    
}


   
                
  

export  function InventorySearch({getSearchfacility,clear}) {
    
    const productServ=client.service('inventory')
    const [facilities,setFacilities]=useState([])
     const [searchError, setSearchError] =useState(false)
    const [showPanel, setShowPanel] =useState(false)
   const [searchMessage, setSearchMessage] = useState("") 
   const [simpa,setSimpa]=useState("")
   const [chosen,setChosen]=useState(false)
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)
   const [val,setVal]=useState("")
   const {user} = useContext(UserContext) 
   const {state}=useContext(ObjectContext)
    const [productModal,setProductModal]=useState(false)

   const handleRow= async(obj)=>{
        await setChosen(true)
       getSearchfacility(obj)
       
       await setSimpa(obj.name)
       
        setShowPanel(false)
        await setCount(2)
    }
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was chosen")
         }
       
    }
    const handleSearch=async(value)=>{
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' 

       
        if (value.length>=3 ){
            productServ.find({query: {     
                 [field]: {
                     $regex:value,
                     $options:'i'
                    
                 },
                 facility: user.currentEmployee.facilityDetail._id,
                 storeId: state.StoreModule.selectedStore._id,
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
              console.log("product  fetched successfully") 
              console.log(res.data) 
                setFacilities(res.data)
                 setSearchMessage(" product  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error creating ProductEntry ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
             })
         }
        else{
            console.log("less than 3 ")
            console.log(val)
            setShowPanel(false)
            await setFacilities([])
            console.log(facilities)
        }
    }

    const handleAddproduct =()=>{
        setProductModal(true) 
    }
    const handlecloseModal =()=>{
        setProductModal(false)
        handleSearch(val)
    }
    useEffect(() => {
       if (clear){
           console.log("success has changed",clear)
           setSimpa("")
       }
        return () => {
            
        }
    }, [clear] )
    return (
        <div>
            <div className="field">
                <div className="control has-icons-left  ">
                    <div className={`dropdown ${showPanel?"is-active":""}`} style={{width:"100%"}}>
                        <div className="dropdown-trigger" style={{width:"100%"}}>
                            <DebounceInput className="input is-small  is-expanded" 
                                type="text" placeholder="Search Product"
                                value={simpa}
                                minLength={3}
                                debounceTimeout={400}
                                onBlur={(e)=>handleBlur(e)}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu expanded" style={{width:"100%"}}>
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item" /* onClick={handleAddproduct} */> <span> {val} is not in your inventory</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <div><span>{facility.name}</span></div>
                                        <div><span><strong>{facility.quantity}</strong></span>
                                        <span>{facility.baseunit}(s) remaining</span>
                                        <span className="padleft"><strong>Price:</strong> N{facility.sellingprice}</span></div>
                                        
                                    </div>
                                    
                                    ))}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal ${productModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Store</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        {/* <StoreList standalone="true" /> */}
                                        <ClientCreate />
                                        </section>
                                    </div>
                                </div>       
        </div>
    )
}