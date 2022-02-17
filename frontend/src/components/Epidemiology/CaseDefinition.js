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



export default function CaseDefinition() {
    
    
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    
    const [error, setError] =useState(false)
    
   const [success, setSuccess] =useState(false)
    
  const [message, setMessage] = useState("") 
   const BillServ=client.service('casedefinition')
   
  
   const [facilities,setFacilities]=useState([])
    
  const [selectedOrders, setSelectedOrders]=useState([]) 
   
   const {state,setState}=useContext(ObjectContext)
   
   const {user,setUser}=useContext(UserContext)
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
                <div className="column is-6 ">
                    <CaseDefinitionList/>
                    </div>
              
                <div className="column is-6 ">
                {(state.EpidemiologyModule.show ==='create')&&  <CaseDefinitionCreate />}
                {(state.EpidemiologyModule.show ==='detail')&&  <CaseDefinitionDetail />}
                </div>

            </div>                            
            </section>
       
    )
    
}

export function CaseDefinitionCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const BandServ=client.service('casedefinition')
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()
    const bandTypeOptions =["Immediate Notification","Weekly", "Monthly" ]
    const notifierOptions =["Facility Focal Person","DSNO", "Asst DSNO","State Epidemiologist" ]
    
    const [finding,setFinding] = useState("")
    const [findings,setFindings] = useState([])
    const [findingreq,setFindingreq] = useState(false)

    const [symptom,setSymptom] = useState("")
    const [symptoms,setSymptoms] = useState([])
    const [duration,setDuration] = useState("")
    const [sympreq,setSympreq] = useState(false)

    const [lab,setLab] = useState("")
    const [labs,setLabs] = useState([])
    const [labvalue,setLabvalue] = useState("")
    const [observations,setObservations]=useState([])
    const [mgtProtocol,setMgtProtocol] = useState("")
    const [notified,setNotified] = useState("")

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
         
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    })
    const handleChecked=e=>{
        setSympreq(e.target.checked)
    }

    const handleChecked2=e=>{
        setFindingreq(e.target.checked)
    }

    const onSubmit = async(data,e) =>{
        e.preventDefault();
        data.observations=[]
        data.disease={
            name:data.disease,
            icdcode:"",
            icdver:"",
            snomed:"",
            snomedver:"",
        }

        if (data.notificationtype===""){
            alert("Kindly choose notification type")
            return
        }
        if (symptoms.length>0){
            let sympcollection = []
            symptoms.forEach(el=>{
                let obs={
                    category:"symptoms" ,
                    name:el.symptom ,
                    duration:el.duration ,
                    required:el.sympreq,
                }
                console.log(obs)
                sympcollection.push(obs)
                console.log(sympcollection)

            })
            data.observations=[...data.observations, ...sympcollection]
        }
        if (findings.length>0){
            let findingscollection = []
            findings.forEach(el=>{
                let obs={
                    category:"Signs" ,
                    name:el.finding ,
                    required:el.findingreq,
                }
                findingscollection.push(obs)

            })
            data.observations=[...data.observations, ...findingscollection]

        }
        if (labs.length>0){
            let labscollection = []
            labs.forEach(el=>{
                let obs={
                    category:"Laboratory" ,
                    name:el.lab ,
                    value:el.labvalue 
                }
               labscollection.push(obs)

            })
            data.observations=[...data.observations, ...labscollection]

        }
        let notifiedlist=[]
        notifiedlist.push(data.notifiedPerson)
        console.log(notifiedlist)
        data.notification_destination= notifiedlist[0]
        data.treatmentprotocol=mgtProtocol
        setMessage("")
        setError(false)
        setSuccess(false)
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  
          }
        BandServ.create(data)
        .then((res)=>{
                e.target.reset();
                setSuccess(true)
                setSymptoms([])
                setFindings([])
                setLabs([])
                setMgtProtocol([])
                toast({
                    message: 'Band created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Band ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 
      const handleAddSymptoms = ()=>{
        let newsymptom = {
            symptom,
            duration,
            sympreq
        } 
        console.log(newsymptom)
        setSymptoms((prev)=>([...prev, newsymptom]))
        setSymptom("")
        setDuration("")
        setSympreq(false)
    }
    const handleAddFindings = ()=>{
        let newFinding = {
            finding,
            findingreq
        } 
        console.log(newFinding)
        setFindings((prev)=>([...prev, newFinding]))
        setFinding("")
        setFindingreq(false)
    }
    const handleAddLabs = ()=>{
        let newLabs = {
            lab,
            labvalue
        } 
        console.log(newLabs)
        setLabs((prev)=>([...prev, newLabs]))
        setLab("")
        setLabvalue("")
    }
    const onDelete = (comp,i)=>{
       setSymptoms(prevstate=>prevstate.filter((el,index)=>index!==i))
    }
    const onDeleteFinding = (comp,i)=>{
       setFindings(prevstate=>prevstate.filter((el,index)=>index!==i))
    }
    const onDeleteLab = (comp,i)=>{
       setLabs(prevstate=>prevstate.filter((el,index)=>index!==i))
    }
    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Create Case Definition
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="notificationtype"  ref={register({ required: true })} className="selectadd" >
                         <option value="">Choose Notification Type </option>
                           {bandTypeOptions.map((option,i)=>(
                               <option key={i} value={option}> {option}</option>
                           ))}
                         </select>
                     </div>
                 </div>
            </div>
            <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="disease" type="text" placeholder="Name of Disease" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
            <>
             <h3 className=" mt-2"><b>Symptoms</b></h3>
                <input className="input is-small is-hidden"   ref={register} name="Symptoms" type="text" placeholder="Specify" />  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={symptom} onChange={(e)=>{setSymptom(e.target.value)}} name="symptom" type="text" placeholder="Symptom" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={duration}  onChange={(e)=>{setDuration(e.target.value)}}  name="durationn" type="text" placeholder="Duration" />           
                                </p>
                            </div>
                            <div className="field">
                            <label  className=" is-small" >
                                    <input type="checkbox" value={sympreq} name="sympreq"  onChange={(e)=>{handleChecked(e)}} />Required
                                </label>
                                </div>
                            <div className="field">
                            <div className="control">
                            <div  className="button is-success is-small selectadd" onClick={handleAddSymptoms}>
                               Add
                            </div>
                            </div>
                        </div>
                        
                        </div>
                    </div> 
                    
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                        
                            <th><abbr title="Type"> Symptom</abbr></th>
                            <th><abbr title="Destination">Duration</abbr></th>
                            <th><abbr title="Destination">Required</abbr></th>
                            <th><abbr title="Action"> Action</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { symptoms.map((ProductEntry, i)=>(

                                <tr key={i}>
                                <th>{i+1}</th>
                                <td>{ProductEntry.symptom}</td> 
                                <td>{ProductEntry.duration}</td>
                                <td>{ProductEntry.sympreq.toString()}</td>                                                                     
                                <td onClick={()=>onDelete(ProductEntry, i)}>x</td> 
                                </tr>

                            ))}
                        </tbody>
                        </table>

            </>
            <>
                        <h3 className=" mt-2"><b>Clinical Signs</b></h3>
                            <input className="input is-small is-hidden"   ref={register} name="ClinicalFindings" type="text" placeholder="Specify" />  
                                <div className="field is-horizontal">
                                    <div className="field-body ml-3">  
                                        <div className="field">
                                            <p className="control ">
                                                <input className="input is-small"  value={finding}  onChange={(e)=>{setFinding(e.target.value)}} name="finding" type="text" placeholder="Finding" />           
                                            </p>
                                        </div>
                                        
                                        <div className="field">
                                        <label  className=" is-small" >
                                                <input type="checkbox" value={findingreq} name="sympreq"  onChange={(e)=>{handleChecked2(e)}}/* ref={register} */ />Required
                                            </label>
                                            </div>
                                        <div className="field">
                                        <div className="control">
                                        <div  className="button is-success is-small selectadd" onClick={handleAddFindings}>
                                        Add
                                        </div>
                                        </div>
                                    </div>
                                    
                                    </div>
                                </div> 
                                
                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                    
                                        <th><abbr title="Type"> Finding</abbr></th>
                                    
                                        <th><abbr title="Destination">Required</abbr></th>
                                        <th><abbr title="Action"> Action</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                    { findings.map((ProductEntry, i)=>(

                                            <tr key={i}>
                                            <th>{i+1}</th>
                                            <td>{ProductEntry.finding}</td> 
                                            
                                            <td>{ProductEntry.findingreq.toString()}</td>                                                                     
                                            <td onClick={()=>onDeleteFinding(ProductEntry, i)}>x</td>
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>

            </>
            <>
                        <h3 className=" mt-2"><b>Laboratory Confirmation</b></h3>
                            <input className="input is-small is-hidden"   ref={register} name="LaboratoryConfirmation" type="text" placeholder="Specify" />  
                                <div className="field is-horizontal">
                                    <div className="field-body ml-3">  
                                        <div className="field">
                                            <p className="control ">
                                                <input className="input is-small"  value={lab}  onChange={(e)=>{setLab(e.target.value)}} name="lab" type="text" placeholder="Lab" />           
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control ">
                                                <input className="input is-small"  value={labvalue}   onChange={(e)=>{setLabvalue(e.target.value)}}  name="lab value" type="text" placeholder=" Value" />           
                                            </p>
                                        </div>
                                        <div className="field">
                                        <div className="control">
                                        <div  className="button is-success is-small selectadd" onClick={handleAddLabs}>
                                        Add
                                        </div>
                                        </div>
                                    </div>
                                    
                                    </div>
                                </div> 
                                
                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                    
                                        <th><abbr title="Type"> Test</abbr></th>
                                        <th><abbr title="Destination">Value</abbr></th>
                                        <th><abbr title="Action"> Action</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                    { labs.map((ProductEntry, i)=>(

                                            <tr key={i}>
                                            <th>{i+1}</th>
                                            <td>{ProductEntry.lab}</td> 
                                            <td>{ProductEntry.labvalue}</td>
                                            <td onClick={()=>onDeleteLab(ProductEntry, i)}>x</td>

                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>

            </>
            <>
                            
                                    <div className="field-body ml-3">  
                                    <div className="field">
                                            <label className="is-small">Management Protocol</label>
                                            <p className="control mt-1 mb-2">
                                                <textarea className="textarea is-small"  value={mgtProtocol} onChange={(e)=>{setMgtProtocol(e.target.value)}} name="mgtProtocol" type="text" placeholder="Mangement Protocol" />           
                                            </p>
                                        </div>
                                        </div>
                                    

            </>

            <div className="field  ml-3 mt-2">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="notifiedPerson"  ref={register({ required: true })} className="selectadd" >
                         <option value="">Choose Person to Notify </option>
                           {notifierOptions.map((option,i)=>(
                               <option key={i} value={option}> {option}</option>
                           ))}
                         </select>
                     </div>
                 </div>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-success is-small">
                        Create
                    </button>
                </p>
            </div>
            
            </form>
            </div>
            </div>
        </>
    )
   
}

export function CaseDefinitionList(){
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
   const [message, setMessage] = useState("") 
    const BandServ=client.service('casedefinition')
    const [facilities,setFacilities]=useState([])
    const {state,setState}=useContext(ObjectContext)
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newBandModule={
            selectedEpid:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, EpidemiologyModule:newBandModule}))
        

    }
    const handleRow= async(Band)=>{


        await setSelectedBand(Band)
       
        const    newBandModule={
            selectedEpid:Band,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, EpidemiologyModule:newBandModule}))
       console.log(newBandModule)

    }

   const handleSearch=(val)=>{
       const field='disease.name'
       console.log(val)
       BandServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "",
                $limit:100,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Band  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Band, probable network issues "+ err )
                setError(true)
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findBand= await BandServ.find(
                {query: {
                    facility:user.currentEmployee.facilityDetail._id,
                    $limit:200,
                    $sort: {
                        createdAt: -1
                    }
                    }})

         await setFacilities(findBand.data)
                }
                else {
                    if (user.stacker){
                        const findBand= await BandServ.find(
                            {query: {
                                
                                $limit:200,
                                $sort: {
                                    facility: -1
                                }
                                }})
            
                    await setFacilities(findBand.data)

                    }
                }
            }
            
            useEffect(() => {
             

                return () => {
                    

                }
            },[])

            useEffect(() => {
               
                if (user){
                    getFacilities()
                }else{
                }
                BandServ.on('created', (obj)=>getFacilities())
                BandServ.on('updated', (obj)=>getFacilities())
                BandServ.on('patched', (obj)=>getFacilities())
                BandServ.on('removed', (obj)=>getFacilities())
                return () => {
                
                }
            },[])



    return(
        <>
           {user?( <>  
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search Bands"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Bands </span></div>
                    <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div>

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th>Disease</th>
                                        <th><abbr title="Notification Type">Notification Type</abbr></th>
                                       {user.stacker && <th><abbr title="Facility">Facility</abbr></th>}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Band, i)=>(

                                            <tr key={Band._id} onClick={()=>handleRow(Band)} className={Band._id===(selectedBand?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{Band.disease.name}</th>
                                            <td>{Band.notificationtype}</td>
                                           {user.stacker &&  <td>{Band.facility}</td>}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }


export function CaseDefinitionDetail(){
    const {state,setState} = useContext(ObjectContext)

   

   const Band =state.EpidemiologyModule.selectedEpid 

    const handleEdit= async()=>{
        const    newBandModule={
            EpidemiologyModule:Band,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate,  EpidemiologyModule:newBandModule}))
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Case Definition Details
                </p>
            </div>
            <div className="card-content vscrollable">
                    <div >
                     <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                        Disease : 
                        <span className="is-size-7 padleft"   name="name"> {Band.disease.name} </span>
                        </label>
                        
                       
                        
                    </div>
                    <div className=" mt-2"> 
                    <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Notification Type: <span className="is-size-7 padleft"   name="BandType">{Band.notificationtype} </span> 
                    </label>
                    
                    
                   
                    </div>
                    <div className=" mt-2">
                    <label className=" mt-2">
                       <b> Symptoms </b>
                    </label>
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                        
                            <th><abbr title="Type"> Symptom</abbr></th>
                            <th><abbr title="Destination">Duration</abbr></th>
                            <th><abbr title="Destination">Required</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { Band.observations.map((ProductEntry, i)=>(
                           <>
                            { (ProductEntry.category==="symptoms") &&   <tr key={i}>
                                <th>{i+1}</th>
                                <td>{ProductEntry.name}</td> 
                                <td>{ProductEntry.duration}</td>
                                <td>{ProductEntry.required.toString()}</td>                                                                     

                                </tr>
                        }
                        </>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <div className=" mt-2">
                    <label className=" mt-2">
                        <b>Clinical Signs </b>
                    </label>
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                        
                            <th><abbr title="Type"> Symptom</abbr></th>
                            <th><abbr title="Destination">Duration</abbr></th>
                            <th><abbr title="Destination">Required</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { Band.observations.map((ProductEntry, i)=>(
                           <>
                            { (ProductEntry.category==="Signs") &&   <tr key={i}>
                                <th>{i+1}</th>
                                <td>{ProductEntry.name}</td> 
                                <td>{ProductEntry.required}</td>
                                                                                                  

                                </tr>
                        }
                        </>
                            ))}
                        </tbody>
                        </table>
                    </div>
                    <div className=" mt-2">
                    <label className=" mt-2">
                       <b> Laboratory</b>
                    </label>
                    <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                        
                            <th><abbr title="Type"> Lab Test </abbr></th>
                            <th><abbr title="Destination">Value</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { Band.observations.map((ProductEntry, i)=>(
                           <>
                            { (ProductEntry.category==="symptoms") &&   <tr key={i}>
                                <th>{i+1}</th>
                                <td>{ProductEntry.name}</td> 
                                <td>{ProductEntry.duration}</td>
                                <td>{ProductEntry.required.toString()}</td>                                                                     

                                </tr>
                        }
                        </>
                            ))}
                        </tbody>
                        </table> 

                    </div>
                    <div className=" mt-2">
                     <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                        Treatment Protocol: 
                        </label>
                        
                       
                        <span className="is-size-7 padleft"   name="name"> {Band.treatmentprotocol} </span>
                    </div>
                    <div className=" mt-2">
                     <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                        Person to Notify :  <span className="is-size-7 padleft"   name="name"> {Band.notification_destination[0]} </span>
                        </label>
                        
                       
                        
                    </div>
          
           
        </div>
        </div>
        </>
    )
   
   
}

export function CaseDefinitionModify(){
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    const BandServ=client.service('casedefinition')
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const Band =state.EpidemiologyModule.selectedBand 

        useEffect(() => {
            setValue("name", Band.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("bandType", Band.bandType,  {
                shouldValidate: true,
                shouldDirty: true
            })
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newBandModule={
        selectedBand:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
           }


        const changeState =()=>{
        const    newBandModule={
            selectedBand:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, BandModule:newBandModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Band._id
        if (conf){
             
        BandServ.remove(dleteId)
        .then((res)=>{
                reset();
                toast({
                    message: 'Band deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting Band, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
    }
        

    const onSubmit = (data,e) =>{
        e.preventDefault();
        
        setSuccess(false)
        console.log(data)
        data.facility=Band.facility
          
        BandServ.patch(Band._id,data)
        .then((res)=>{
                 toast({
                    message: 'Band updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                toast({
                    message: "Error updating Band, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 
     
      
    return (
        
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Band Details-Modify
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label is-small"> Name
                    <p className="control has-icons-left has-icons-right">
                        <input className="input  is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                    </label>
                    </div>
                <div className="field">
                <label className="label is-small">Band Type
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register({ required: true })} disabled name="bandType" type="text" placeholder="Band Type" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
                </label>
                </div>
           
           
            </form>
            
            <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" onClick={handleSubmit(onSubmit)}>
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" onClick={handleCancel}>
                        Cancel
                    </button>
                </p>
                <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p>
            </div>
        </div>
        </div>
        </>
    )
   
   
                
}   

export  function InputSearch({getSearchfacility,clear}) {
    
    const facilityServ=client.service('facility')
    const [facilities,setFacilities]=useState([])
     const [searchError, setSearchError] =useState(false)
    const [showPanel, setShowPanel] =useState(false)
   const [searchMessage, setSearchMessage] = useState("") 
   const [simpa,setSimpa]=useState("")
   const [chosen,setChosen]=useState(false)
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)


   const handleRow= async(obj)=>{
        await setChosen(true)
       getSearchfacility(obj)
       
       await setSimpa(obj.facilityName)
       
        setShowPanel(false)
        await setCount(2)
}
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was chosen")
         }
       
    }
    const handleSearch=async(val)=>{
        
        const field='facilityName' 
       
        if (val.length>=3){
            facilityServ.find({query: {    
                 [field]: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
              console.log("facility  fetched successfully") 
                setFacilities(res.data)
                 setSearchMessage(" facility  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                 console.log(err)
                 setSearchMessage("Error searching facility, probable network issues "+ err )
                 setSearchError(true)
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
                    <div className={`dropdown ${showPanel?"is-active":""}`}>
                        <div className="dropdown-trigger">
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Facilities"
                                value={simpa}
                                minLength={1}
                                debounceTimeout={400}
                                onBlur={(e)=>handleBlur(e)}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        {searchError&&<div>{searchMessage}</div>}
                        <div className="dropdown-menu" >
                            <div className="dropdown-content">
                            {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.facilityName}</span>
                                        
                                    </div>
                                    
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    )
}