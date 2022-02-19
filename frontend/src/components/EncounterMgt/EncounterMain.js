/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'
import EndEncounter, {EndEncounterList} from './EndEncounter'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
import  VideoConference  from '../utils/VideoConference';
import  Prescription, { PrescriptionCreate } from './Prescription';
import LabOrders from './LabOrders';
import AdmitOrders from './AdmitOrders';
import RadiologyOrders from './RadiologyOrders';
import { useReactToPrint } from 'react-to-print';

export default function EncounterMain ({nopresc}) {
 
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const ClinicServ=client.service('clinicaldocument')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedClinic, setSelectedClinic]=useState() 
   const [selectedNote, setSelectedNote]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)
    const [showModal,setShowModal]=useState(false)
    
    const [showEncounterModal,setShowEncounterModal]=useState(false)
    const [showPrescriptionModal,setShowPrescriptionModal]=useState(false)
    const [showLabModal,setShowLabModal]=useState(false)
    const [showRadModal,setShowRadModal]=useState(false)
    const componentRef = useRef();
    const myRefs = useRef([]);
    
    
    const [page, setPage] = useState(0);
    
    const loader = useRef(null);
    
    const standalone=false
    

    const handleNewDocument= async()=>{
        await setShowModal(true)                                                                                                                                                        
        console.log( showModal)
    }

    const handleNewPrescription= async()=>{
        await setShowPrescriptionModal(true)                                                                                                                                                        
        console.log( showPrescriptionModal)
    }


    const handleCreateNew = async()=>{
        const    newClinicModule={
            selectedClinic:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, ClinicModule:newClinicModule}))
        

    }
    const handleRow= async(Clinic)=>{

        if (Clinic.status==="completed"){
            await setSelectedNote(Clinic)

            const    newClinicModule={
                selectedNote:Clinic,
                show :true
            }
        await setState((prevstate)=>({...prevstate, NoteModule:newClinicModule})) 
       Clinic.show=!Clinic.show
        }else{
            let documentobj={}
            documentobj.name=Clinic.documentname
            documentobj.facility=Clinic.facility
            documentobj.document=Clinic
            const    newDocumentClassModule={
                selectedDocumentClass:documentobj,
                show :'detail'
            }
           await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
        }


    }

   const handleSearch=(val)=>{
       const field='documentname'
       console.log(val)
       ClinicServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               client:state.ClientModule.selectedClient._id,
               $limit:50,
                $sort: {
                    name: 1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Clinic  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Clinic, probable network issues "+ err )
                setError(true)
            })
        }
   
    const getFacilities= async(page=0)=>{
            if (user.currentEmployee){
            
        const findClinic= await ClinicServ.find(
                {query: {
                    client:state.ClientModule.selectedClient._id,
                    $limit:50,
                    $sort: {
                        createdAt: -1
                    }
                    }})
            const total= findClinic.total
            const ulimit=total*page
            await setFacilities(findClinic.data)
           console.log(findClinic.data)
           /*  } */
                }
                else {
                    if (user.stacker){
                        const findClinic= await ClinicServ.find(
                            {query: {
                                client:state.ClientModule.selectedClient._id,
                                    $limit:20,
                                    $sort: {
                                        createdAt: -1
                                    }
                                }})
            
                    await setFacilities(findClinic.data)

                    }
                }
         
            }
    const handleLabOrders =async()=>{
        await setShowLabModal(true)    
    } 
    
    const handleOtherOrders =async()=>{
       // await setShowLabModal(true)    
    } 

    const handleRadOrders =async()=>{
        await setShowRadModal(true)    
    } 

    const handleEndEncounter =async()=>{
        await setShowEncounterModal(true)    
    } 

   const handlePrint =async(i)=>{
       var content = document.getElementById(i);
            var pri = document.getElementById("ifmcontentstoprint").contentWindow;
            pri.document.open();
            pri.document.write(content.innerHTML);
            pri.document.close();
            pri.focus();
            pri.print();
    }     
    

 useEffect(() => {
                getFacilities()
                if (user){
                    
                }else{
                }
                ClinicServ.on('created', (obj)=>getFacilities(page))
                ClinicServ.on('updated', (obj)=>getFacilities(page))
                ClinicServ.on('patched', (obj)=>getFacilities(page))
                ClinicServ.on('removed', (obj)=>getFacilities(page))

                return () => {
                
                }
            },[])

    const handleDelete=(doc)=>{
        let confirm = window.confirm(`You are about to delete a document: ${doc.documentname} created on ${format(new Date(doc.createdAt),'dd-MM-yy')} ?`)
        if (confirm){
        ClinicServ.remove(doc._id)
        .then((res)=>{
            toast({
                message: 'Adult Asthma Questionnaire deleted succesfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
              })
              setSuccess(false)
        })
        .catch((err)=>{
            toast({
                message: 'Error deleting Adult Asthma Questionnaire ' + err,
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
        })
     }
    }

    const handleAdmit = async()=>{
        

        const    newDocumentClassModule={
            selectedEndEncounter:"",
            show :''
        }
       await setState((prevstate)=>({...prevstate, EndEncounterModule:newDocumentClassModule}))
       //console.log(state)
    }

    return (
        <div>
            <VideoConference/>
            <div className="level is-mobile warp ">
                    <div className="level-left mt-2">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search documentation"
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
                    <div className="level-right my-2">
                   {!standalone &&   <div className="level-item"> 
                        <div className="level-item ">
                           {!nopresc && <>
                            <div className="button is-dark is-small mr-2" onClick={handleEndEncounter}>End Encounter</div>
                            <div className="button is-black is-small mr-2" onClick={handleOtherOrders}> Other Orders</div>
                            <div className="button is-primary is-small mr-2" onClick={handleRadOrders}>Radiology</div>
                                <div className="button is-warning is-small mr-2" onClick={handleLabOrders}>Lab</div>
                                <div className="button is-danger is-small mr-2" onClick={handleNewPrescription}>Prescription</div>
                                </>}
                                <div className="button is-success is-small" onClick={handleNewDocument}>New Document</div>
                                </div>
                        </div>}
                    </div>

                </div>
                
                <div className=" pullup mb-2 ">
                                <div className=" is-fullwidth vscrollNote pr-1 ">
                                   
                                        {facilities.map((Clinic, i)=>(

                                            <div key={i}    className={Clinic._id===(selectedNote?._id||null)?"is-selected":""}  id={i}>
                                               <div className="card mt-1 hovercard">
                                                    {/* header */}
                                                <header className="card-header"  >
                                                        <div className="card-header-title" onClick={()=>handleRow(Clinic,i)}>
                                                        <div className="docdate">{formatDistanceToNowStrict(new Date(Clinic.createdAt),{addSuffix: true})} <br/><span>{format(new Date(Clinic.createdAt),'dd-MM-yy')}</span></div> {Clinic.documentname} by {Clinic.createdByname} at {Clinic.location},{Clinic.facilityname} 
                                                        <p className="right ml-2 mr-0">{Clinic.status} </p> 
                                                        </div>
                                                        <button className="button  sbut" aria-label="more options" onClick={()=>handleDelete (Clinic)}>
                                                            <span>x</span>
                                                        </button> 
                                                        { <button className="button  sbut" aria-label="more options" onClick={()=>handlePrint(i) }>
                                                            <span>Print</span>
                                                        </button>  }
                                                    </header>

                                                        {/* is not prescription,billed orders, or lab order, medication List or asthma docs 
                                                            change to switch
                                                        */}
                                                        {(Clinic.documentname!=="Prescription" && Clinic.documentname!=="Billed Orders"  
                                                        && Clinic.documentname!=="Lab Orders" 
                                                        && Clinic.documentname!=="Radiology Orders" 
                                                        && Clinic.documentname!=="Adult Asthma Questionnaire" 
                                                        && Clinic.documentname!=="Medication List" 
                                                        && Clinic.documentname!=="Admission Order"
                                                        && Clinic.documentname!=="Pediatric Pulmonology Form") &&  Clinic.status!=="Draft"
                                                         && <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)}  >
                                                                {Array.isArray(Clinic.documentdetail)? Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                                    <div className="field is-horizontal"> 
                                                                            <div className="field-label"> 
                                                                                <label className="label is-size-7" key={i}>
                                                                                    {keys}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {value}   
                                                                                </div>  
                                                                            </div>                                                 
                                                                    </div>
                                                                    ))
                                                                    :
                                                                    <div className="field">
                                                                    {    Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                                    <div className="field is-horizontal"> 
                                                                            <div className="field-label"> 
                                                                                <label className="label is-size-7" key={i}>
                                                                                    {keys}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {value}   
                                                                                </div>  
                                                                            </div>                                                 
                                                                    </div>
                                                                    )) }
                                                                           {/*  <div className="field-label">
                                                                                <label className="label is-size-7" >
                                                                                    {Object.keys(Clinic.documentdetail)[0]}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {Object.values(Clinic.documentdetail)[0]}   
                                                                                </div>  
                                                                            </div> */}                                                 
                                                                    </div>

                                                                }
                                                        </div>}

                                                       { Clinic.documentname=="Admission Order" &&  Clinic.status!=="Draft"
                                                         && <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)}  >
                                                                <div > 
                                                                            <div className="ml-4">
                                                                                <p>
                                                                                   Admit to { Clinic.documentdetail.ward.name}
                                                                                </p>
                                                                               {Clinic.documentdetail.instruction &&<p>
                                                                                <label className="label is-size-7"> Instructions:</label> 
                                                                                {Clinic.documentdetail.instruction}
                                                                                </p> }
                                                                            </div>                                                 
                                                                    </div>
                                                                {/* { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                                    <div className="field is-horizontal"> 
                                                                            <div className="field-label"> 
                                                                                <label className="label is-size-7" key={i}>
                                                                                    {keys}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {value}   
                                                                                </div>  
                                                                  
                                                                    ))
                                                                } */}
                                                        </div>}




                                                    {/* is  Medication List */}
                                                    {Clinic.documentname==="Medication List" &&  Clinic.status!=="Draft" &&
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)} >
                                                             { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                              <>  
                                                              { value.length>0 &&  <>
                                                                {(keys !=="Allergies" && 
                                                                keys !=="Medications") && 
                                                                    <div className="field is-horizontal"> 
                                                                            <div className="field-label"> 
                                                                                <label className="label is-size-7" key={i}>
                                                                                    {keys}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {value}   
                                                                                </div>  
                                                                            </div>                                                 
                                                                    </div>}
                                                                    { keys ==="Allergies" &&
                                                                        <div id="skintest">
                                                                        {(Clinic.documentdetail.Allergies.length>0) && <div>
                                                                            <label className="label is-size-7">Allergies:</label>
                                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                                                                                <thead>
                                                                                    <tr>
                                                                                    <th><abbr title="Serial No">S/No</abbr></th>
                                                                                
                                                                                    <th><abbr title="Type">Allergine</abbr></th>
                                                                                    <th><abbr title="Destination">Reaction</abbr></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tfoot>
                                                                                    
                                                                                </tfoot>
                                                                                <tbody>
                                                                                { Clinic.documentdetail.Allergies.map((ProductEntry, i)=>(
        
                                                                                        <tr key={i}>
                                                                                        <th>{i+1}</th>
                                                                                        <td>{ProductEntry.allergine}</td> 
                                                                                        <td>{ProductEntry.reaction}</td>                                                                     
                                                                                        </tr>
        
                                                                                    ))}
                                                                                </tbody>
                                                                                </table>
                                                                                </div>} 
                                                                                </div>  
                                                                                }
                                                                     { keys ==="Medications" &&
                                                                        <div id="Medications">
                                                                        {(Clinic.documentdetail.Medications.length>0) && <div>
                                                                            <label className="label is-size-7">Medications:</label>
                                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                                                                                <thead>
                                                                                    <tr>
                                                                                    <th><abbr title="Serial No">S/No</abbr></th>
                                                                                
                                                                                    <th><abbr title="Drug Name">Drug Name</abbr></th>
                                                                                    <th><abbr title="Strength/Frequency">Strength/Frequency</abbr></th>
                                                                                    <th><abbr title="Notes">Notes</abbr></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tfoot>
                                                                                    
                                                                                </tfoot>
                                                                                <tbody>
                                                                                { Clinic.documentdetail.Medications.map((ProductEntry, i)=>(
        
                                                                                        <tr key={i}>
                                                                                        <th>{i+1}</th>
                                                                                        <td>{ProductEntry.drugname}</td> 
                                                                                        <td>{ProductEntry.strengthfreq}</td>   
                                                                                        <td>{ProductEntry.notes}</td>                                                                    
                                                                                        </tr>
        
                                                                                    ))}
                                                                                </tbody>
                                                                                </table>
                                                                                </div>} 
                                                                                </div>  
                                                                                }
                                                                    
                                                                    </>}</>

                                                                    ))
                                                                }
                                                                                                            
                                                        </div>}
                                                    {Clinic.documentname==="Pediatric Pulmonology Form" &&  Clinic.status!=="Draft" &&
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)} >
                                                             { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                              <>  
                                                              { value.length>0 &&  <>
                                                                {(keys !=="Allergy_Skin_Test" && 
                                                                keys !=="Presenting_Complaints") && 
                                                                    <div className="field is-horizontal"> 
                                                                            <div className="field-label"> 
                                                                                <label className="label is-size-7" key={i}>
                                                                                    {keys}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {value}   
                                                                                </div>  
                                                                            </div>                                                 
                                                                    </div>}
                                                                    { keys ==="Allergy_Skin_Test" &&
                                                                        <div id="skintest">
                                                                        {(Clinic.documentdetail.Allergy_Skin_Test.length>0) && <div>
                                                                            <label className="label is-size-7">Allergy_Skin_Test:</label>
                                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                                                                                <thead>
                                                                                    <tr>
                                                                                    <th><abbr title="Serial No">S/No</abbr></th>
                                                                                
                                                                                    <th><abbr title="Type">Allergine</abbr></th>
                                                                                    <th><abbr title="Destination">Reaction</abbr></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tfoot>
                                                                                    
                                                                                </tfoot>
                                                                                <tbody>
                                                                                { Clinic.documentdetail.Allergy_Skin_Test.map((ProductEntry, i)=>(
        
                                                                                        <tr key={i}>
                                                                                        <th>{i+1}</th>
                                                                                        <td>{ProductEntry.allergine}</td> 
                                                                                        <td>{ProductEntry.reaction}</td>                                                                     
                                                                                        </tr>
        
                                                                                    ))}
                                                                                </tbody>
                                                                                </table>
                                                                                </div>} 
                                                                                </div>  
                                                                                }
                                                                     { keys ==="Presenting_Complaints" &&
                                                                        <div id="Presenting_Complaints">
                                                                        {(Clinic.documentdetail.Presenting_Complaints.length>0) && <div>
                                                                            <label className="label is-size-7">Presenting_Complaints:</label>
                                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                                                                                <thead>
                                                                                    <tr>
                                                                                    <th><abbr title="Serial No">S/No</abbr></th>
                                                                                
                                                                                    <th><abbr title="Type">Symptoms</abbr></th>
                                                                                    <th><abbr title="Destination">Duration</abbr></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tfoot>
                                                                                    
                                                                                </tfoot>
                                                                                <tbody>
                                                                                { Clinic.documentdetail.Presenting_Complaints.map((ProductEntry, i)=>(
        
                                                                                        <tr key={i}>
                                                                                        <th>{i+1}</th>
                                                                                        <td>{ProductEntry.symptom}</td> 
                                                                                        <td>{ProductEntry.duration}</td>                                                                     
                                                                                        </tr>
        
                                                                                    ))}
                                                                                </tbody>
                                                                                </table>
                                                                                </div>} 
                                                                                </div>  
                                                                                }
                                                                    
                                                                    </>}</>

                                                                    ))
                                                                }
                                                                                                            
                                                        </div>}



                                                          {Clinic.documentname==="Adult Asthma Questionnaire" &&  Clinic.status!=="Draft" &&
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)}>
                                                             { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
                                                               <>  
                                                               { value.length>0 &&  <>
                                                                { keys !=="Allergy_Skin_Test"?
                                                                    <div className="field is-horizontal"> 
                                                                            <div className="field-label"> 
                                                                                <label className="label is-size-7" key={i}>
                                                                                    {keys}:
                                                                                    </label>
                                                                            </div>
                                                                            <div className="field-body"> 
                                                                                <div className="field" >
                                                                                    {value}   
                                                                                </div>  
                                                                            </div>                                                 
                                                                    </div>:
                                                                        <div id="skintest">
                                                                        {(Clinic.documentdetail.Allergy_Skin_Test.length>0) && <div>
                                                                            <label className="label is-size-7">Allergy_Skin_Test:</label>
                                                                        <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-5 ml-5 ">
                                                                                <thead>
                                                                                    <tr>
                                                                                    <th><abbr title="Serial No">S/No</abbr></th>
                                                                                
                                                                                    <th><abbr title="Type">Allergine</abbr></th>
                                                                                    <th><abbr title="Destination">Reaction</abbr></th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tfoot>
                                                                                    
                                                                                </tfoot>
                                                                                <tbody>
                                                                                { Clinic.documentdetail.Allergy_Skin_Test.map((ProductEntry, i)=>(
        
                                                                                        <tr key={i}>
                                                                                        <th>{i+1}</th>
                                                                                        <td>{ProductEntry.allergine}</td> 
                                                                                        <td>{ProductEntry.reaction}</td>                                                                     
                                                                                        </tr>
        
                                                                                    ))}
                                                                                </tbody>
                                                                                </table>
                                                                                </div>} 
                                                                                </div>  
                                                                    
                                                                    }</>
                                                                }</> 
                                                                ))
                                                                }
                                                                                                            
                                                        </div>}
                                                    
                                                        {Clinic.documentname==="Prescription" &&  
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)}>
                                                                
                                                                {(Clinic.documentdetail.length>0) && <div>
                                                                    <label>Medications:</label>
                                                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                                                        <thead>
                                                                            <tr>
                                                                            <th><abbr title="Serial No">S/No</abbr></th>
                                                                        
                                                                            <th><abbr title="Type">Medication</abbr></th>
                                                                            <th><abbr title="Destination">Destination</abbr></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tfoot>
                                                                            
                                                                        </tfoot>
                                                                        <tbody>
                                                                        { Clinic.documentdetail.map((ProductEntry, i)=>(

                                                                                <tr key={i}>
                                                                                <th>{i+1}</th>
                                                                                <td>{ProductEntry.medication}<br/>
                                                                                <span className="help is-size-7">{ProductEntry.instruction}</span></td> 
                                                                                <td>{ProductEntry.destination}</td>                                                                     
                                                                                </tr>

                                                                            ))}
                                                                        </tbody>
                                                                        </table>
                                                                        </div>}                                                   
                                                                    </div>}
                                                         {/* is  Radiology orders,  */}
                                                         {Clinic.documentname==="Radiology Orders" &&  
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)} >
                                                                
                                                                {(Clinic.documentdetail.length>0) && <div>
                                                                    <label>Tests:</label>
                                                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                                                        <thead>
                                                                            <tr>
                                                                            <th><abbr title="Serial No">S/No</abbr></th>
                                                                        
                                                                            <th><abbr title="Test">Test</abbr></th>
                                                                            <th><abbr title="Destination">Destination</abbr></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tfoot>
                                                                            
                                                                        </tfoot>
                                                                        <tbody>
                                                                        { Clinic.documentdetail.map((ProductEntry, i)=>(

                                                                                <tr key={i}>
                                                                                <th>{i+1}</th>
                                                                                {/* <td>{ProductEntry.name}</td> */}
                                                                                <td>{ProductEntry.test}<br/>
                                                                                {/* <span className="help is-size-7">{ProductEntry.instruction}</span> */}</td> 
                                                                                <td>{ProductEntry.destination}</td>                                                                     
                                                                                </tr>

                                                                            ))}
                                                                        </tbody>
                                                                        </table>
                                                                        </div>}                                                   
                                                                    </div>}
                                                    
                                                        {Clinic.documentname==="Lab Orders" &&  
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)} >
                                                                
                                                                {(Clinic.documentdetail.length>0) && <div>
                                                                    <label>Tests:</label>
                                                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                                                        <thead>
                                                                            <tr>
                                                                            <th><abbr title="Serial No">S/No</abbr></th>
                                                                        
                                                                            <th><abbr title="Test">Test</abbr></th>
                                                                            <th><abbr title="Destination">Destination</abbr></th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tfoot>
                                                                            
                                                                        </tfoot>
                                                                        <tbody>
                                                                        { Clinic.documentdetail.map((ProductEntry, i)=>(

                                                                                <tr key={i}>
                                                                                <th>{i+1}</th>
                                                                                <td>{ProductEntry.test}<br/>
                                                                                </td> 
                                                                                <td>{ProductEntry.destination}</td>                                                                     
                                                                                </tr>

                                                                            ))}
                                                                        </tbody>
                                                                        </table>
                                                                        </div>}                                                   
                                                                    </div>}
                                                        {Clinic.documentname==="Billed Orders" &&  
                                                        <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"} ref={el => (myRefs.current[i] = el)} >
                                                                
                                                                {(Clinic.documentdetail.length>0) && <div>
                                                                    <label>Billed Orders:</label>
                                                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                                                                        <thead>
                                                                        <tr>
                                                                            <th><abbr title="Serial No">S/No</abbr></th>
                                                                            <th><abbr title="Category">Category</abbr></th>
                                                                            <th><abbr title="Name">Name</abbr></th>
                                                                            <th><abbr title="Quantity">Quanitity</abbr></th>
                                                                            <th><abbr title="Unit">Unit</abbr></th>
                                                                            <th><abbr title="Selling Price">Selling Price</abbr></th>
                                                                            <th><abbr title="Amount">Amount</abbr></th>
                                                                            <th><abbr title="Billing Mode">Mode</abbr></th>
                                                                            
                                                                            </tr>
                                                                        </thead>
                                                                        <tfoot>
                                                                            
                                                                        </tfoot>
                                                                        <tbody>
                                                                        { Clinic.documentdetail.map((ProductEntry, i)=>(

                                                                                <tr key={i}>
                                                                                <th>{i+1}</th>
                                                                                <td>{ProductEntry.category}</td>
                                                                                <td>{ProductEntry.name}</td>
                                                                                <th>{ProductEntry.quantity}</th>
                                                                                <td>{ProductEntry.baseunit}</td>
                                                                                <td>{ProductEntry.sellingprice}</td>
                                                                                <td>{ProductEntry.amount}</td>
                                                                                <td>{ProductEntry.billMode.type}</td>
                                                                                </tr>
                                                                            ))}
                                                                        </tbody>
                                                                        </table>
                                                                        </div>}                                                   
                                                                    </div>}
                                                                
                                                </div>                                           
                                            </div>

                                        ))}

                                    
                                </div>
                                    
                </div> 
                <div className={`modal  ${showModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card ">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Document Class</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <DocumentClassList standalone="true" closeModal={()=>setShowModal(false)} />
                                        </section>
                                    </div>
                                </div>
                <div className={`modal ${showPrescriptionModal?"is-active":""}` }>
                    <div className="modal-background"></div>
                    <div className="modal-card larger card-overflow">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Prescription</p>
                        <button className="delete" aria-label="close"  onClick={()=>setShowPrescriptionModal(false)}></button>
                        </header>
                        <section className="modal-card-body card-overflow">
                        <Prescription standalone="true" />
                        </section>
                    </div>
                </div>   
                <div className={`modal ${showLabModal?"is-active":""}` }>
                    <div className="modal-background"></div>
                    <div className="modal-card larger card-overflow">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Lab Orders</p>
                        <button className="delete" aria-label="close"  onClick={()=>setShowLabModal(false)}></button>
                        </header>
                        <section className="modal-card-body card-overflow">
                        <LabOrders standalone="true"  closeModal={()=>setShowLabModal(false)} />
                        </section>
                        {/* <footer className="modal-card-foot">
                        <button className="button is-success">Save changes</button>
                        <button className="button">Cancel</button>
                        </footer> */}
                    </div>
                </div>
                <div className={`modal  ${showEncounterModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card ">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">End Encounter</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowEncounterModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <EndEncounterList standalone = "true" closeModal={()=>setShowEncounterModal(false)} />
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>  
                <div className={`modal ${state.EndEncounterModule.selectedEndEncounter==='Admit to Ward'?"is-active":""}` }>
                    <div className="modal-background"></div>
                    <div className="modal-card larger card-overflow">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Admit Orders</p>
                        <button className="delete" aria-label="close"  onClick={()=>handleAdmit()}></button>
                        </header>
                        <section className="modal-card-body card-overflow">
                        <AdmitOrders standalone="true" closeModal={()=>handleAdmit()} />
                        </section>
                        {/* <footer className="modal-card-foot">
                        <button className="button is-success">Save changes</button>
                        <button className="button">Cancel</button>
                        </footer> */}
                    </div>
                </div>
               <div className={`modal ${showRadModal?"is-active":""}` }>
                    <div className="modal-background"></div>
                    <div className="modal-card larger card-overflow">
                        <header className="modal-card-head">
                        <p className="modal-card-title">Radiology Orders</p>
                        <button className="delete" aria-label="close"  onClick={()=>setShowRadModal(false)}></button>
                        </header>
                        <section className="modal-card-body card-overflow">
                        <RadiologyOrders standalone="true" closeModal={()=>setShowRadModal(false)} />
                        </section>
                    </div>
                </div>                                    
        </div>
    )
}
