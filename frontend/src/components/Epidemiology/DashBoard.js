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



export default function Dashboard() {
    
    
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
                <div className="column is-2 ">

                </div>
                <div className="column is-8 ">
                    <DashBoardMain />
                    </div>
              
                <div className="column is-2 ">
                
           
                </div>

            </div>                            
            </section>
       
    )
    
}

export function DashBoardMain(){
   
    
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
            <img src="\dashboard-epid.PNG"></img>
            
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
