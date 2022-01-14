/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
import BillPrescriptionCreate from './BillPrescriptionCreate'
import PatientProfile from '../ClientMgt/PatientProfile'


import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';


import 'react-accessible-accordion/dist/fancy-example.css';
import ClientBilledPrescription from './ClientPrescription';



export default function BillPrescription() {
    
    
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    
    const [error, setError] =useState(false)
    
   const [success, setSuccess] =useState(false)
    
  const [message, setMessage] = useState("") 
   const OrderServ=client.service('order')
   
  
   const [facilities,setFacilities]=useState([])
    
  const [selectedDispense, setSelectedDispense]=useState() 
   
   const {state,setState}=useContext(ObjectContext)
   
   const {user,setUser}=useContext(UserContext)




    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
                <div className="column is-5 ">
                    <BillPrescriptionList />
                    </div>
              
                <div className="column is-4 ">
                
                {(state.medicationModule.show ==='detail')&&<BillPrescriptionCreate />}
                </div>
                <div className="column is-3 ">
                
                {(state.medicationModule.show ==='detail')&&<PatientProfile />}
                </div>

            </div>                            
            </section>
       
    )
    
}

export function BillPrescriptionList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const OrderServ=client.service('order')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedDispense, setSelectedDispense]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)
    const [selectedMedication, setSelectedMedication] =useState("")

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
  

    const handleSearch= async(val)=>{
       const field='name'
       console.log(val)
       OrderServ.find({query: {
           $or:[
                {order: {
                    $regex:val,
                    $options:'i'
                   
                }},
               { order_status: {
                    $regex:val,
                    $options:'i'
                   
                }},
                {clientname: {
                    $regex:val,
                    $options:'i'
                   
                }}
                ],
                order_category:"Prescription",
                fulfilled:false,
                destination: user.currentEmployee.facilityDetail._id,
                order_status:"Pending",
               
               
                $limit:50,
                $sort: {
                    createdAt: -1
                  }
                }}).then( async(res)=>{
               console.log(res)
               setFacilities(res.groupedOrder)
              
                setMessage(" ProductEntry  fetched successfully")
                setSuccess(true)
            })
            .catch((err)=>{
               
                setMessage("Error fetching ProductEntry, probable network issues "+ err )
                setError(true)
            })
        }
    const getFacilities= async()=>{
       
             console.log("here b4 server")
    const findProductEntry= await OrderServ.find(
            {query: {
                order_category:"Prescription",
                fulfilled:"False",
                destination: user.currentEmployee.facilityDetail._id,
                order_status:"Pending",  
                
                
                $limit:50,
                $sort: {
                    createdAt: -1
                }
                }})

           
            await setFacilities(findProductEntry.groupedOrder)
            await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
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
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search Medications"
                                        minLength={3}
                                        debounceTimeout={400}
                                        onChange={(e)=>handleSearch(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Pending Prescriptions </span></div>

                </div>
                <div className=" pullup">
                    <div className=" is-fullwidth vscrollable pr-1">   
                    <Accordion allowZeroExpanded>
                        {facilities.map((Clinic, i)=>(
                            <AccordionItem  key={Clinic.client_id} >
                               <AccordionItemHeading >
                               <AccordionItemButton  >
                                      <strong> {i+1} {Clinic.clientname} with {Clinic.orders.length} Pending Prescription(s)  </strong>
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
                                            { Clinic.orders.map((order, i)=>(

                                                        <tr key={order._id} onClick={()=>handleMedicationRow(order)} className={order._id===(selectedMedication?._id||null)?"is-selected":""}>                                         
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
                                            {/*   */}<ClientBilledPrescription  selectedClient={Clinic.client_id}/>
                              </AccordionItemPanel>                                          
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>                   
                </div>  
            </>          
    )
    }


export function DispenseDetail(){
    
     
    const [error, setError] =useState(false) 
    const [selectedMedication, setSelectedMedication] =useState("")
    const [currentOrder, setCurrentOrder] =useState("")
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)
    const OrderServ=client.service('order')

 let ProductEntry =state.DispenseModule.selectedDispense
   

   const handleRow= async(ProductEntry)=>{
    

    

    await setSelectedMedication(ProductEntry)

    const    newProductEntryModule={
        selectedMedication:ProductEntry,
        show :'detail'
    }
  await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
   
  

}

    const handleEdit= async(ProductEntry)=>{
        const    newProductEntryModule={
            selectedDispense:ProductEntry,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
       
       
    }

    useEffect(() => {


      const client1=  state.currentClients.find(el=>{
            return JSON.stringify(el.client_id)===JSON.stringify(state.DispenseModule.selectedDispense)
        })

    setCurrentOrder(client1)
   
        return () => {
        
        }
    }, [])
   

 
    useEffect(() => {
        OrderServ.on('patched',  (obj)=>{
           const current1=state.currentClients.find(el=>(JSON.stringify(el.client_id)===JSON.stringify(obj.clientId)))
           setCurrentOrder(current1)
        })
      
        return () => {
         
        }
    },[])
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Dispense Details
                </p>
            </div>
            <div className="card-content vscrollable">
            <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
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
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {state.DispenseModule.selectedDispense.orders.map((order, i)=>(

                                            <tr key={order._id} onClick={()=>handleRow(order)} className={order._id===(selectedMedication?._id||null)?"is-selected":""}>
                                            
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
                        
                </div>              
               
            </div>
        </div>
        </>
    )
}
