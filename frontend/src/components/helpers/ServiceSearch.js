/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ServicesCreate} from '../Finance/Services'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemState,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
const searchfacility={};

export default function ServiceSearch({getSearchfacility,clear,mode}) {
    const {user} = useContext(UserContext)
    const productServ=client.service('billing')
    const [facilities,setFacilities]=useState([])
     const [searchError, setSearchError] =useState(false)
    const [showPanel, setShowPanel] =useState(false)
   const [searchMessage, setSearchMessage] = useState("") 
   const [simpa,setSimpa]=useState("")
   const [chosen,setChosen]=useState(false)
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)
   const [val,setVal]=useState("")
    const [productModal,setProductModal]=useState(false)

   const handleRow= async(obj)=>{
        await setChosen(true)
       await setSimpa(obj.name)
       getSearchfacility(obj)
       
        setShowPanel(false)
}
    const handleBlur=async(e)=>{
    }
    const handleSearch=async(value)=>{
        console.log(mode)
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            await setFacilities([])
            return
        }
        const field='name' 

       
        if (value.length>=3 ){
            if (mode.value=== "Cash" ||mode.value=== "Family Cover"){

          
            productServ.find({query: {     
                 name: {
                     $regex:value,
                     $options:'i'
                    
                 },
                 facility: user.currentEmployee.facilityDetail._id,
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
                setFacilities(res.data)
                 setSearchMessage(" product  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error creating Services ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
             })
            }
            if (mode.value=== "CompanyCover"){
                productServ.find({query: {     
                    name: {
                        $regex:value,
                        $options:'i'
                       
                    },
                    facility: user.currentEmployee.facilityDetail._id,
                    $limit:10,
                    $sort: {
                        createdAt: -1
                      }
                        }}).then((res)=>{
                
                 
                   setFacilities(res.data)
                    setSearchMessage(" product  fetched successfully")
                    setShowPanel(true)
                })
                .catch((err)=>{
                   toast({
                       message: 'Error creating Services ' + err,
                       type: 'is-danger',
                       dismissible: true,
                       pauseOnHover: true,
                     })
                })

            }
            if (mode.value=== "HMOCover"){
                
                
                
                
                console.log(mode)
                if(true){
                    productServ.find({query: {     
                        name: {
                            $regex:value,
                            $options:'i'
                        
                        },
                        facility:mode.detail.organizationId ,
                        mode:"HMOCover",
                        dest_org:user.currentEmployee.facilityDetail._id,
                        $limit:10,
                        $sort: {
                            createdAt: -1
                        }
                            }}).then((res)=>{
                    
                    
                    setFacilities(res.data)
                        setSearchMessage(" product  fetched successfully")
                        setShowPanel(true)
                    })
                    .catch((err)=>{
                    toast({
                        message: 'Error creating Services ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                        })
                    })

                }
            }
         }
        else{
           
            
            setShowPanel(false)
            await setFacilities([])
            
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
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Services"
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
                        <div className="dropdown-menu" style={{width:"100%"}} >
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item" onClick={handleAddproduct}> <span>Add {val} to service list</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item selectadd" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.name} ({facility.category})</span>
                                        
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
                                        <p className="modal-card-title">Create Service</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <ServicesCreate />
                                        </section>
                                    </div>
                                </div>       
        </div>
    )
}