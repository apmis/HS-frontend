/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
import ReportCreate from './ReportCreate'
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




export default function LabReport() {
    
    
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
                    <LabOrderList />
                    </div>
              
                <div className="column is-6 ">
                
                {(state.financeModule.show ==='detail')&&  <LabNoteCreate />}
                </div>

            </div>                            
            </section>
       
    )
    
}

export function LabOrderList(){
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
    const handleMedicationRow= async(order)=>{
        
        await setSelectedFinance(order)
        
        
        
       
        const    newProductEntryModule={
            selectedFinance:order,
            show :'detail',
            report_status:order.report_status
           
        }
      await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule}))
    
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
        'participantInfo.paymentmode.detail.principalName': {
            $regex:val,
            $options:'i'
        
        },
             $or:[
                    {
                       'participantInfo.paymentmode.type':"Cash"
                    },
                    {
                       'participantInfo.paymentmode.type':"Family Cover"
                    }
                ],
                'orderInfo.orderObj.order_category':"Lab Order",
                'participantInfo.billingFacility': user.currentEmployee.facilityDetail._id,
                billing_status:"Unpaid", 
                $limit:20,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
              
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
       
           
    const findProductEntry= await BillServ.find(
            {query: {
                'participantInfo.billingFacility': user.currentEmployee.facilityDetail._id,
                'orderInfo.orderObj.order_category':"Lab Order",
                $limit:100,
                $sort: {
                    createdAt: -1
                }
                }})

        
            await setFacilities(findProductEntry.data)
          
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
            
            }
            },[])

    useEffect(() => {
      
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
                                        type="text" placeholder="Search Bills"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Laboratory test </span></div>

                </div>
                <div className=" pullup ">
                    <div className=" is-fullwidth vscrollable pr-1"> 
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                                <tr>
                                    <th><abbr title="Serial No">S/No</abbr></th>
                                    <th><abbr title="Date">Date</abbr></th>
                                    <th><abbr title="Client">Client</abbr></th>
                                    <th><abbr title="Description">Test</abbr></th>
                                    <th><abbr title="Amount">Amount</abbr></th>
                                    <th><abbr title="Status">Payment Status</abbr></th>
                                    <th><abbr title="Status">Result Status</abbr></th> 
                                </tr>
                        </thead>
                        <tbody>
                            { facilities.map((order, i)=>(
                                <tr key={order._id}  onClick={()=>handleMedicationRow(order)} className={order._id===(selectedFinance?._id||null)?"is-selected":""}>                                         
                                <th>{i+1}</th>
                                <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td> 
                                <th>{order.orderInfo.orderObj.clientname}</th>
                                <th>{order.serviceInfo.name}</th>
                                <td>{order.serviceInfo.amount}</td>
                                <td>{order.billing_status}</td>
                                <td>{order.report_status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    </div>  
                </div>
            </>          
    )
}

export function LabNoteCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClientServ=client.service('labresults')
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()
    const [reportStatus,setReportStatus] = useState("Draft")
    const {state, setState}=useContext(ObjectContext)

    const order=state.financeModule.selectedFinance
    const bill_report_status=state.financeModule.report_status

    const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    }
    
    useEffect(() => {
        setCurrentUser(user)
        
        return () => {
        
        }
    }, [user])

  
    useEffect(()=>{
        
      if (!user.stacker){
      }
    })

    const onSubmit = async(data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
          }
         document.documentdetail=data
          document.documentname= `${order.serviceInfo.name} Result`
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
          document.client=order.orderInfo.orderObj.clientId
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status=reportStatus
          document.billId=order._id

          if (
            document.location===undefined ||!document.createdByname || !document.facilityname ){
            toast({
                message: ' Documentation data missing, requires location and facility details' ,
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              return
          }

        if (bill_report_status==="Pending"){
            ClientServ.create(document)
            .then((res)=>{
                  
                    e.target.reset();
                  
                    setSuccess(true)
                    toast({
                        message: 'Lab Result created succesfully',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                      setSuccess(false)
                })
                .catch((err)=>{
                    toast({
                        message: 'Error creating Lab Result ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                })  
        }

        if (bill_report_status==="Draft"){
         ClientServ.patch(order.resultDetail._id, document)
        .then((res)=>{
              
                e.target.reset();
              
                setSuccess(true)
                toast({
                    message: 'Lab Result updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error updating Lab Result ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            }) 
        }
        const    newProductEntryModule={
            selectedFinance:order,
            show :'show',
           
        }
      await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule}))
      } 

    const handleChangePart=async (e)=>{
        console.log(e.target.value)
        await setReportStatus(e.target.value)

    }

    useEffect(() => {
        if (!order.resultDetail?.documentdetail ){
            setValue("Finding", "",  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("Recommendation","",  {
                shouldValidate: true,
                shouldDirty: true
            })
           // setReportStatus(order.report_status)
           
            return

        }
        if (order.report_status !=="Pending"){
            console.log(order.resultDetail.documentdetail)

        setValue("Finding", order.resultDetail.documentdetail.Finding,  {
            shouldValidate: true,
            shouldDirty: true
        })
        setValue("Recommendation", order.resultDetail.documentdetail.Recommendation,  {
            shouldValidate: true,
            shouldDirty: true
        })
        setReportStatus(order.report_status)
    }
        
        return () => {
            
        }
    }, [order])

    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Lab Result
                </p>
            </div>
            <div className="card-content vscrollable remPad1">

                <label className="label is-size-7">
                  Client:  {order.orderInfo.orderObj.clientname}
                </label>
                <label className="label is-size-7">
                 Test:  {order.serviceInfo.name}
                </label>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <textarea className="textarea is-small" ref={register()}  name="Finding" type="text" placeholder="Findings" disabled={bill_report_status==="Final"}/>                 
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                        <textarea className="textarea is-small" ref={register()}  name="Recommendation" type="text" placeholder="Recommendation" disabled={bill_report_status==="Final"}/>
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="field">
                    <label className=" is-small">
                             <input  type="radio" name="status" value="Draft"   checked={reportStatus==="Draft"||reportStatus==="Pending"} onChange={(e)=>{handleChangePart(e)}} disabled={bill_report_status==="Final"}/>
                               <span > Draft</span>
                              </label> <br/>
                              <label className=" is-small">
                             <input type="radio" name="status"  value="Final"   checked={reportStatus==="Final"} onChange={(e)=>handleChangePart(e)} disabled={bill_report_status==="Final"}/>
                             <span> Final </span>
                              </label>
                              </div> 
             <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" disabled={bill_report_status==="Final"} >
                    {bill_report_status==="Pending"? "Save":"Update"}
                    </button>
                </p>
               
            </div>
     
            </form>
            </div>
            </div>
                 
        </>
    )
   
}

