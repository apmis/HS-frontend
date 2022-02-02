/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

const searchfacility={};

export default function FacilityAccount() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedInventory,setSelectedInventory]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-3 ">
                   
                </div>
                <div className="column is-6 ">
                    <FacilityServiceRevenue />
                </div>
           <div className="column is-3 ">
               
            </div> 

            </div>                            
            </section>
       
    )
    
}

export  function FacilityServiceRevenue(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState([])
    const InventoryServ=client.service('subwallettransactions')
    const SubwalletServ=client.service('subwallet')
    
    const {user} = useContext(UserContext) 
    const {state,setState}=useContext(ObjectContext)
    
    const [currentUser,setCurrentUser] = useState()
    const [balance, setBalance]=useState(0)


    
    const getSearchfacility=(obj)=>{
    }
    
    useEffect(() => {
        setCurrentUser(user)
        return () => {
        
        }
    }, [user])


    useEffect(() => {
        getaccountdetails()
        //getBalance()
        return () => {
           
        }
    }, [])



    const getaccountdetails=()=>{
        InventoryServ.find({query: {
            facility:user.currentEmployee.facilityDetail._id,
            category:"debit",
            
            $sort: {
                createdAt: -1
            }
            }})
        .then((res)=>{
                console.log(res)
                setFacility(res.data)
                toast({
                    message: 'Account details succesful',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
            .catch((err)=>{
                toast({
                    message: 'Error getting account details ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
    }

    

    return (
        <>
            <div className="card cardheight">
                <div className="card-header">
                    <p className="card-header-title">
                      Service  Revenue 
                    </p>
                </div>
               
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable  is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Date">Date</abbr></th>
                                        <th><abbr title="Client">Client</abbr></th>
                                         <th><abbr title="Description">Description</abbr></th> 
                                        
                                        <th><abbr title="Amount">Amount</abbr></th>
                                        <th><abbr title="Mode">Mode</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facility.map((Inventory, i)=>(
                                        <>
                                          {Inventory.category==="debit" && <tr key={Inventory._id} >
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> 
                                            <th>{Inventory.fromName}</th>
                                            <th>{Inventory.description}</th>
                                            <td>{Inventory.amount}</td>
                                            <td>{Inventory.paymentmode}</td>
                                           
                                            </tr>

                                            }
                                        </>
                                        ))}
                                    </tbody>
                                    </table>
                                    
                        </div>              
                                    
                            </div>
                    </div>
               
           
        </>
    )
   
}