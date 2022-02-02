/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'

import PatientProfile from '../ClientMgt/PatientProfile'


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


import 'react-accessible-accordion/dist/fancy-example.css';

export default function ClientBilledPrescription({selectedClient}){
    
     
     const [error, setError] =useState(false)
      
     const [success, setSuccess] =useState(false)
      
    const [message, setMessage] = useState("") 
     const OrderServ=client.service('order')
     
    
     const [clientOrders,setClientOrders]=useState([])
      
    const [selectedDispense, setSelectedDispense]=useState() 
     
     const {state,setState}=useContext(ObjectContext)
     
     const {user,setUser}=useContext(UserContext)
     const [selectedMedication, setSelectedMedication] =useState("")


     console.log(selectedClient)
 
     const handleSelectedClient= async(Client)=>{
         
          const    newClientModule={
              selectedClient:Client,
              show :'detail'
          }
         await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
      }
 
     const handleMedicationRow= async(ProductEntry)=>{ 
         
     
         
         await handleSelectedClient(ProductEntry.client)
 
     
         await setSelectedMedication(ProductEntry)
     
         const    newProductEntryModule={
             selectedMedication:ProductEntry,
             show :'detail'
         }
       await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
        
       
     
     }
 
     const handleCreateNew = async()=>{
         const    newProductEntryModule={
             selectedDispense:{},
             show :'create'
             }
        await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
        
         
 
     }
   
 
     const handleSearch=(val)=>{
        const field='name'
        
        OrderServ.find({query: {
                 order: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 order_status: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 order_status:"Billed",  
                 clientId:selectedClient,
                 order_category:"Prescription",
                
                
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
                
                setClientOrders(res.data)
                 setMessage(" ProductEntry  fetched successfully")
                 setSuccess(true) 
             })
             .catch((err)=>{
                
                 setMessage("Error fetching ProductEntry, probable network issues "+ err )
                 setError(true)
             })
         }
     const getFacilities= async()=>{
        
             
     const findProductEntry= await OrderServ.find(
             {query: {
                 order_category:"Prescription",
                 fulfilled:false,
                 destination: user.currentEmployee.facilityDetail._id,
                 order_status:"Billed",  
                 clientId:selectedClient,
                 
                 
                 
                 $limit:50,
                 $sort: {
                     createdAt: -1
                 }
                 }})
 
             console.log("clientorders", findProductEntry)
             await setClientOrders(findProductEntry.data)
             
             }   
 
     
     useEffect(() => {
         
             getFacilities()
             OrderServ.on('created', (obj)=>getFacilities())
             OrderServ.on('updated', (obj)=>getFacilities())
             OrderServ.on('patched', (obj)=>getFacilities())
             OrderServ.on('removed', (obj)=>getFacilities())
             return () => {
             
             }
             },[])
 
         const handleRow= async(ProductEntry)=>{
     
         await setSelectedDispense(ProductEntry)
 
         const    newProductEntryModule={
             selectedDispense:ProductEntry,
             show :'detail'
         }
         await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
         
         
         }
 
 
     return(     
             <>  
                 <div className=" pullupx ">
                     <div className=" is-fullwidth vscrollable pr-1">   
                     <Accordion allowZeroExpanded>
                         
                             <AccordionItem  >
                                <AccordionItemHeading >
                                <AccordionItemButton  >
                                    {clientOrders.length} billed medication(s)  
                                 </AccordionItemButton>
                                 </AccordionItemHeading>
                                 <AccordionItemPanel>
                                     <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                             <thead>
                                                 <tr>
                                                     <th><abbr title="Serial No">S/No</abbr></th>
                                                     <th><abbr title="Date">Date</abbr></th>
                                                     <th><abbr title="Order">Medication</abbr></th>
                                                     <th>Fulfilled</th>
                                                     <th><abbr title="Status">Status</abbr></th>
                                                     <th><abbr title="Requesting Physician">Requesting Physician</abbr></th>
                                                 </tr>
                                             </thead>
                                             <tbody>
                                             { clientOrders.map((order, i)=>(
 
                                                         <tr key={order._id}className={order._id===(selectedMedication?._id||null)?"is-selected":""}>                                         
                                                         <th>{i+1}</th>
                                                         <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td> 
                                                         <th>{order.order}</th>
                                                         <td>{order.fulfilled==="True"?"Yes":"No"}</td>
                                                         <td>{order.order_status}</td>
                                                         <td>{order.requestingdoctor_Name}</td>
                                                         </tr>
                                                 ))}
                                             </tbody>
                                             </table>
 
                               </AccordionItemPanel>                                          
                                 </AccordionItem>
                           
                         </Accordion>
                     </div>                   
                 </div>  
             </>          
     )
     }
