/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
import  VideoConference  from '../utils/VideoConference';
import  Prescription, { PrescriptionCreate } from './Prescription';

export default function DispensaryMain() {
 
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const ClinicServ=client.service('clinicaldocument')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedClinic, setSelectedClinic]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)
    const [showModal,setShowModal]=useState(false)
    const [showPrescriptionModal,setShowPrescriptionModal]=useState(false)
    
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
        

        

        await setSelectedClinic(Clinic)

        const    newClinicModule={
            selectedClinic:Clinic,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, ClinicModule:newClinicModule}))
       
       Clinic.show=!Clinic.show

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
               $limit:10,
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
                    $limit:20,
                    $sort: {
                        createdAt: -1
                    }
                    }})
            const total= findClinic.total
            const ulimit=total*page
            await setFacilities(findClinic.data)
            console.log(findClinic.data)
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

    return (
        <div>
            <VideoConference/>
            <div className="level">
                    <div className="level-left">
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
                    <div className="level-right">
                { !standalone &&   <div className="level-item"> 
                            <div className="level-item">
                            <div className="button is-danger is-small mr-2" onClick={handleNewPrescription}>Presciption</div>
                                <div className="button is-success is-small" onClick={handleNewDocument}>New Document</div>
                                </div>
                        </div>}
                    </div>

                </div>
                
                <div className=" pullup ">
                                <div className=" is-fullwidth vscrollable pr-1">
                                   
                                        {facilities.map((Clinic, i)=>(

                                            <div key={Clinic._id}  onClick={()=>handleRow(Clinic)}   className={Clinic._id===(selectedClinic?._id||null)?"is-selected":""}>
                                               <div className="card mt-1 hovercard">
                                                    <header className="card-header" onClick={(Clinic)=>Clinic.show=!Clinic.show}>
                                                        <div className="card-header-title">
                                                        <div className="docdate">{formatDistanceToNowStrict(new Date(Clinic.createdAt),{addSuffix: true})} <br/><span>{format(new Date(Clinic.createdAt),'dd-MM-yy')}</span></div> {Clinic.documentname} by {Clinic.createdByname} at {Clinic.location},{Clinic.facilityname} 
                                                        <p className="right ml-2 mr-0">{Clinic.status} </p> 
                                                        </div>
                                                    </header>
                                                  {Clinic.documentname!=="Prescription" &&  <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"}>
                                                        { Object.entries(Clinic.documentdetail).map(([keys,value],i)=>(
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
                                                        }
                                                </div>}
                                                {Clinic.documentname==="Prescription" &&  
                                                <div className={Clinic.show?"card-content p-1":"card-content p-1 is-hidden"}>
                                                        
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
                                        <DocumentClassList standalone="true" />
                                        </section>
                                    </div>
                                </div>
                                <div className={`modal ${showPrescriptionModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card larger">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Prescription</p>
                                        <button className="delete" aria-label="close"  onClick={()=>setShowPrescriptionModal(false)}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <Prescription standalone="true" />
                                        </section>
                                    </div>
                                </div>                            
        </div>
    )
}
