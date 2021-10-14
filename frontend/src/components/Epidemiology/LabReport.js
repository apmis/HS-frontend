/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'

import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
import ReportCreate from './ReportCreate'
import PatientProfile from '../ClientMgt/PatientProfile'
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemState,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import { useDebounce } from './util';
import SnomedSearchInput from './SnomedSearchInput';
//import BillPrescriptionCreate from './BillPrescriptionCreate';



export default function LabReport() {
    //const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    const [error, setError] =useState(false)
    // eslint-disable-next-line
   const [success, setSuccess] =useState(false)
    // eslint-disable-next-line
  const [message, setMessage] = useState("") 
   const BillServ=client.service('bills')
   //const history = useHistory()
  // const {user,setUser} = useContext(UserContext)
   const [facilities,setFacilities]=useState([])
    // eslint-disable-next-line
  const [selectedOrders, setSelectedOrders]=useState([]) //
   // eslint-disable-next-line
   const {state,setState}=useContext(ObjectContext)
   // eslint-disable-next-line
   const {user,setUser}=useContext(UserContext)
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
            <div className="columns ">
                <div className="column is-6 ">
                    <LabOrderList />
                    </div>
              
                <div className="column is-6 ">
                
                {(state.financeModule.show ==='detail')&&  <LabNoteCreate />}
                </div>
               {/*  <div className="column is-3 ">  <ReportCreate />
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}

            </div>                            
            </section>
       
    )
    
}

export function LabOrderList(){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
   const BillServ=client.service('bills')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedDispense, setSelectedDispense]=useState() //
   const [selectedOrders, setSelectedOrders]=useState([]) 
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)
    const [selectedFinance, setSelectedFinance] =useState("")
    const [expanded, setExpanded] =useState("")
    const [oldClient, setOldClient] =useState("")

    const handleSelectedClient= async(Client)=>{
        // await setSelectedClient(Client)
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
            //alert("New Client Onboard")
            //remove all checked clientsly
            selectedOrders.forEach(el=>el.checked="")
            setSelectedOrders([])
        }

       // console.log(e.target.checked)
        order.checked=e.target.checked
        await handleSelectedClient(order.participantInfo.client)
        //handleMedicationRow(order)
        await setSelectedFinance(order)
        const    newProductEntryModule={
            selectedFinance:order,
            show :'detail',
            state:e.target.checked
        }
      await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule}))
      
      //set of checked items
      if (e.target.checked){
        await setSelectedOrders((prevstate)=>(prevstate.concat(order)))
      }else{
        setSelectedOrders( prevstate=>prevstate.filter(el=>el._id!==order._id))
      }
    
       // console.log(selectedOrders)
    }
    const handleMedicationRow= async(order)=>{
        
        await setSelectedFinance(order)
        // grab report
        // if draft show create/modify
        //if final: show final
       // console.log(order)
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
       //console.log(state)
        

    }
  

    const handleSearch=(val)=>{
       const field='name'
       //console.log(val)
       BillServ.find({query: {
        'participantInfo.paymentmode.detail.principalName': {
            $regex:val,
            $options:'i'
        
        },
           /*  $or:[
                {
           
                } ,
                {
            'orderInfo.orderObj.clientname': {
                        $regex:val,
                        $options:'i'
                    
                    }
                }
                ], */
                
                //order_category:"Prescription",
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
                billing_status:"Unpaid",  // need to set this finally
               // storeId:state.StoreModule.selectedStore._id,
               //facility:user.currentEmployee.facilityDetail._id || "",
                $limit:20,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
               // console.log(res)
               setFacilities(res.groupedOrder)
                setMessage(" ProductEntry  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
               // console.log(err)
                setMessage("Error fetching ProductEntry, probable network issues "+ err )
                setError(true)
            })
        }
    const getFacilities= async()=>{
       
            // console.log("here b4 server")
    const findProductEntry= await BillServ.find(
            {query: {
               /*  $or:[
                    {
                       'participantInfo.paymentmode.type':"Cash"
                    },
                    {
                       'participantInfo.paymentmode.type':"Family Cover"
                    }
                ], */
                'participantInfo.billingFacility': user.currentEmployee.facilityDetail._id,
                'orderInfo.orderObj.order_category':"Lab Order",
               // billing_status:"Unpaid",  // need to set this finally
                //storeId:state.StoreModule.selectedStore._id,
                //clientId:state.ClientModule.selectedClient._id,
                $limit:100,
                $sort: {
                    createdAt: -1
                }
                }})

        //    console.log("bills", findProductEntry.data)
            await setFacilities(findProductEntry.data)
          //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
            }   
    const handleRow= async(Client,e)=>{
           // alert(expanded)
              
            }
    //1.consider using props for global data
    useEffect(() => {
        // console.log("started")
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
                     {/* <div className="level-right">
                       <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div> 
                    </div>*/}

                </div>
                <div className=" pullup ">
                    <div className=" is-fullwidth vscrollable pr-1"> 
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                                <tr>
                                    <th><abbr title="Serial No">S/No</abbr></th>
                                    <th><abbr title="Date">Date</abbr></th>
                                    <th><abbr title="Client">Client</abbr></th>
                                   {/*  <th><abbr title="Client">Client</abbr></th> */}
                                    <th><abbr title="Description">Test</abbr></th>
                                    <th><abbr title="Amount">Amount</abbr></th>
                                {/*  <th>Fulfilled</th> */}
                                    <th><abbr title="Status">Payment Status</abbr></th>
                                    <th><abbr title="Status">Result Status</abbr></th> 
                                </tr>
                        </thead>
                        <tbody>
                            { facilities.map((order, i)=>(
                                <tr key={order._id}  onClick={()=>handleMedicationRow(order)} className={order._id===(selectedFinance?._id||null)?"is-selected":""}>                                         
                                <th>{i+1}</th>
                                <td><span>{format(new Date(order.createdAt),'dd-MM-yy')}</span></td>  {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */} 
                                <th>{order.orderInfo.orderObj.clientname}</th>{/* client name */}
                                <th>{order.serviceInfo.name}</th>{/* test name */} {/*  <td>{order.fulfilled==="True"?"Yes":"No"}</td> */}
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
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const ClientServ=client.service('labresults')
    //const history = useHistory()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const [reportStatus,setReportStatus] = useState("Draft")
    const {state, setState}=useContext(ObjectContext)
    const [selectedDisease, setSelectedDisease] =  useState();
    const [selectedFindings,  setSelectedFindings] = useState([]);


    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    New Case Definition
                </p>
            </div>
            <div className="card-content vscrollable remPad1">

            <form onSubmit={() => {}}>
            <div className="field is-horizontal">
                <div className="field-body">
                <label className=" is-small">Select Diagnosis</label>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                         <SnomedSearchInput onSelected={setSelectedDisease}  />
                         {selectedDisease?.fsn?.term}
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                <label className=" is-small">Add Findings</label>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                         <SnomedSearchInput onSelected={(obj)  => setSelectedFindings([...selectedFindings,  obj])}  />
                         {selectedFindings.map((obj) => obj?.fsn?.term)}
                        </p>
                    </div>
                    </div>
                    </div>
             
            <div className="field is-horizontal">
                <div className="field-body">
                <label className=" is-small">Select Diagnosis</label>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                         <SnomedSearchInput onSelected={(obj)  => setSelectedFindings([...selectedFindings,  obj])}  />
                         {selectedFindings.map((obj) => obj?.fsn?.term)}
                        </p>
                    </div>
                    </div>
                    </div>
           
             <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small"  >
                    {"Submit"}
                    </button>
                </p>
               {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
               
            </div>
     
            </form>
            </div>
            </div>
                 
        </>
    )
   
}

