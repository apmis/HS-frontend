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
    AccordionItemState,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';
import { ProductExitCreate } from './DispenseExit';



export default function Dispense() {
   
   
    const [selectedProductEntry,setSelectedProductEntry]=useState()
   
    const [error, setError] =useState(false)
   
   const [success, setSuccess] =useState(false)
   
  const [message, setMessage] = useState("") 
   const BillServ=client.service('bills')
  
 
   const [facilities,setFacilities]=useState([])
   
  const [selectedOrders, setSelectedOrders]=useState([])
  
   const {state,setState}=useContext(ObjectContext)
  
   const {user,setUser}=useContext(UserContext)
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
                <div className="column is-6 ">
                    <DispenseList />
                    </div>
              
                <div className="column is-6 ">
                
                {(state.financeModule.show ==='detail')&& <ProductExitCreate />}
                </div>

            </div>                            
            </section>
       
    )
    
}

export function DispenseList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
   const BillServ=client.service('bills')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedDispense, setSelectedDispense]=useState() 
   const [selectedOrders, setSelectedOrders]=useState([]) 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)
    const [selectedFinance, setSelectedFinance] =useState("")
    const [expanded, setExpanded] =useState("")
    const [oldClient, setOldClient] =useState("")

    const handleSelectedClient= async(Client)=>{
        
         const    newClientModule={
             selectedClient:Client,
             show :'detail'
         }
        await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
     }

    const handleChoseClient= async(client,e, order)=>{
        setOldClient(client.clientname)
        let newClient=client.clientname
        if(oldClient!==newClient){
            
            
            selectedOrders.forEach(el=>el.checked="")
            setSelectedOrders([])
        }

       
        order.checked=e.target.checked
        await handleSelectedClient(order.participantInfo.client)
        
        await setSelectedFinance(order)
        const    newProductEntryModule={
            selectedFinance:order,
            show :'detail',
            state:e.target.checked
        }
      await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule}))
      if (e.target.checked){
        await setSelectedOrders((prevstate)=>(prevstate.concat(order)))
      }else{
        setSelectedOrders( prevstate=>prevstate.filter(el=>el._id!==order._id))
      }
    
       
    }
    const handleMedicationRow= async(ProductEntry,e)=>{ 
        
        alert("Header touched")
    
    
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
       BillServ.find({query: {
                order: {
                    $regex:val,
                    $options:'i'
                   
                },
                order_status: {
                    $regex:val,
                    $options:'i'
                   
                },
                order_category:"Prescription",
                $limit:10,
                $sort: {
                    createdAt: -1
                  }``
                    }}).then((res)=>{
               setFacilities(res.data)
                setMessage(" ProductEntry  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                setMessage("Error fetching ProductEntry, probable network issues "+ err )
                setError(true)
            })
        }
    const getFacilities= async()=>{
       
    const findProductEntry= await BillServ.find(
            {query: {
                'participantInfo.billingFacility': user.currentEmployee.facilityDetail._id,
                'orderInfo.orderObj.order_category':"Prescription",
                billing_status:{
                    $ne: "Unpaid"
                },
               'orderInfo.orderObj.fulfilled':{
                $ne:"True"
               },
                $limit:100,
                $sort: {
                    updatedAt: 1
                }
                }})

            console.log("updatedorder", findProductEntry.groupedOrder)
            await setFacilities(findProductEntry.groupedOrder)
            }   
    const handleRow= async(Client,e)=>{
              
            }
    useEffect(() => {
            getFacilities()
            BillServ.on('created', (obj)=>getFacilities())
            BillServ.on('updated', (obj)=>getFacilities())
            BillServ.on('patched', (obj)=>getFacilities())
            BillServ.on('removed', (obj)=>getFacilities())
            return () => {
              cleanup()
            
            }
            },[])

    const cleanup =async ()=>{
        const    newClientModule={
            selectedClient:{},
            show :'create'
        }
       await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))

       const    newProductEntryModule={
        selectedFinance:{},
        show :'create',
        state:""
    }
  await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule}))


    }

    useEffect(() => {
        console.log(selectedOrders)
        
        return () => {
            
        }
    }, [selectedOrders])

    useEffect(() => {
       if (state.financeModule.show==="create"){
        selectedOrders.forEach(el=>el.checked="")
        setSelectedOrders([])

       }
        return () => {
           
        }
    }, [state.financeModule.show])
   
 

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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Paid Prescriptions </span></div>

                </div>
                <div className=" pullup ">
                    <div className=" is-fullwidth vscrollable pr-1">   
                    <Accordion allowZeroExpanded >
                        {facilities.map((Clinic, i)=>(
                            <AccordionItem  key={Clinic.client_id}  >
                               <AccordionItemHeading >
                                    <AccordionItemButton  >
                                    <strong> {i+1} {Clinic.clientname} </strong> 
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className=" is-fullwidth vscrollable pr-1">   
                                        <Accordion allowZeroExpanded>
                                            {Clinic.bills.map((category, i)=>(
                                                <AccordionItem  key={Clinic.client_id} >
                                                    <AccordionItemHeading >
                                                    <AccordionItemButton  >
                                                         {category.catName} with {category.order.length} Paid bill(s). 
                                                    </AccordionItemButton>
                                                    </AccordionItemHeading>
                                                    <AccordionItemPanel>
                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                                                <thead>
                                                                    <tr>
                                                                        <th><abbr title="Serial No">S/No</abbr></th>
                                                                        <th><abbr title="Date">Date</abbr></th>
                                                                        <th><abbr title="Description">Description</abbr></th>
                                                                    {/*  <th>Fulfilled</th> */}
                                                                        <th><abbr title="Status">Status</abbr></th>
                                                                        <th><abbr title="Amount">Amount</abbr></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                     { category.order.map((order, i)=>(

                                                        <tr key={order._id}  className={order._id===(selectedFinance?._id||null)?"is-selected":""}>                                         
                                                        <th><input type = "checkbox" name={order._id} onChange={(e)=>handleChoseClient(Clinic,e, order)}  checked={order.checked}/>  {i+1}</th>
                                                        <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td> 
                                                        <th>{order.serviceInfo.name}</th>
                                                        <td>{order.billing_status}</td>
                                                        <td>{order.serviceInfo.amount}</td>
                                                        </tr>
                                                ))}
                                            </tbody>
                                            </table>

                                                    </AccordionItemPanel>                                          
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </div>
                                </AccordionItemPanel>                    
                            </AccordionItem >
                        ))}
                    </Accordion >
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
    const BillServ=client.service('order')

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
        BillServ.on('patched',  (obj)=>{
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
