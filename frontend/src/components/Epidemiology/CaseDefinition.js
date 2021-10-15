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
//import BillPrescriptionCreate from './BillPrescriptionCreate';



export default function CaseDefinition() {
    //const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    const [error, setError] =useState(false)
    // eslint-disable-next-line
   const [success, setSuccess] =useState(false)
    // eslint-disable-next-line
  const [message, setMessage] = useState("") 
   const BillServ=client.service('casedefinition')
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
                    <CaseDefinitionList/>
                    </div>
              
                <div className="column is-6 ">
                {(state.EpidemiologyModule.show ==='create')&&  <CaseDefinitionCreate />}
                {(state.EpidemiologyModule.show ==='detail')&&  <CaseDefinitionDetail />}
                </div>
               {/*  <div className="column is-3 ">  <ReportCreate />
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}

            </div>                            
            </section>
       
    )
    
}

export function CaseDefinitionCreate(){
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const BandServ=client.service('casedefinition')
    //const history = useHistory()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const bandTypeOptions =["Immediate Notification","Weekly", "Monthly" ]
    const notifierOptions =["Facility Focal Person","DSNO", "Asst DSNO","State Epidemiologist" ]
    const [symptom,setSymptom] = useState("")
    const [symptoms,setSymptoms] = useState([])
    const [duration,setDuration] = useState("")
    const [sympreq,setSympreq] = useState(false)

    const getSearchfacility=(obj)=>{
        
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    }
    
    useEffect(() => {
        setCurrentUser(user)
        //console.log(currentUser)
        return () => {
        
        }
    }, [user])

  //check user for facility or get list of facility  
    useEffect(()=>{
        //setFacility(user.activeBand.FacilityId)//
      if (!user.stacker){
         
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    })
    const handleChecked=e=>{
        console.log(e.target.checked)
        setSympreq(e.target.checked)
    }

    const onSubmit = (data,e) =>{
        e.preventDefault();
        data.Presenting_Complaints=symptoms
        if (data.bandType===""){
            alert("Kindly choose band type")
            return
        }
        setMessage("")
        setError(false)
        setSuccess(false)
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
        BandServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Band successfully") */
                setSuccess(true)
              /*   setAllergies([]) */
                setSymptoms([])
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
       // setAllergy({})
        setSymptom("")
        setDuration("")
        setSympreq(false)
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
               {/*  <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small"  ref={register({ required: true })}  name="bandType" type="text" placeholder="Type of Band" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div> */}
                <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="bandType"  ref={register({ required: true })} /* onChange={(e)=>handleChangeMode(e.target.value)} */ className="selectadd" >
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
                    <input className="input is-small" ref={register({ required: true })}  name="diagnosis" type="text" placeholder="Name of Disease" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
          {/*   <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="description" type="text" placeholder="Description of Band" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div> */}
           {/*  <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className=" fas fa-user-md "></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="phone" type="text" placeholder=" Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
            </div>
           
            <div className="field">
                <p className="control has-icons-left">
                
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="Email"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div> */}
        {/*    <div className="field"  style={ !user.stacker?{display:"none"}:{}} >
                <InputSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                <p className="control has-icons-left " style={{display:"none"}}>
                    <input className="input is-small" ref={register ({ required: true }) } name="facility" type="text" placeholder="Facility" />
                    <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                    </span>
                </p>
            </div> */}
           {/*  <div className="field">
                <div className="control has-icons-left">
                    <div className="dropdown ">
                        <div className="dropdown-trigger">
                            <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-hospital-symbol"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    simpa
                                </div>
                                <div className="dropdown-item is-active">
                                    simpa 2
                                </div>
                                <div className="dropdown-item">
                                    simpa 3
                                </div>
                                <div className="dropdown-item">
                                    simpa 4
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="deptunit" type="text" placeholder="Department Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="password" type="text" placeholder="password"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
            </div> */}
            <>
             <h3><b>Symptoms</b></h3>
                <input className="input is-small is-hidden"   ref={register} name="Symptoms" type="text" placeholder="Specify" />  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                           {/*  <div className="field">
                                <label className="is-small"> Symptom</label>
                            </div> */}
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={symptom} /* ref={register} */ onChange={(e)=>{setSymptom(e.target.value)}} name="symptom" type="text" placeholder="Symptom" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={duration}  /* ref={register} */ onChange={(e)=>{setDuration(e.target.value)}}  name="durationn" type="text" placeholder="Duration" />           
                                </p>
                            </div>
                            <div className="field">
                            <label  className=" is-small" >
                                    <input type="checkbox" value={sympreq} name="sympreq"  onChange={(e)=>{handleChecked(e)}}/* ref={register} */ />Required
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

                                </tr>

                            ))}
                        </tbody>
                        </table>

</>
<>
             <h3><b>Clinical Findings</b></h3>
                <input className="input is-small is-hidden"   ref={register} name="ClinicalFindings" type="text" placeholder="Specify" />  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                           {/*  <div className="field">
                                <label className="is-small"> Symptom</label>
                            </div> */}
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={symptom} /* ref={register} */ onChange={(e)=>{setSymptom(e.target.value)}} name="symptom" type="text" placeholder="Symptom" />           
                                </p>
                            </div>
                            
                            <div className="field">
                            <label  className=" is-small" >
                                    <input type="checkbox" value={sympreq} name="sympreq"  onChange={(e)=>{handleChecked(e)}}/* ref={register} */ />Required
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
                        
                            <th><abbr title="Type"> Finding</abbr></th>
                           
                            <th><abbr title="Destination">Required</abbr></th>
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                        { symptoms.map((ProductEntry, i)=>(

                                <tr key={i}>
                                <th>{i+1}</th>
                                <td>{ProductEntry.symptom}</td> 
                                
                                <td>{ProductEntry.sympreq.toString()}</td>                                                                     

                                </tr>

                            ))}
                        </tbody>
                        </table>

</>
<>
             <h3><b>Laboratory Confirmation</b></h3>
                <input className="input is-small is-hidden"   ref={register} name="LaboratoryConfirmation" type="text" placeholder="Specify" />  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                           {/*  <div className="field">
                                <label className="is-small"> Symptom</label>
                            </div> */}
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={symptom} /* ref={register} */ onChange={(e)=>{setSymptom(e.target.value)}} name="symptom" type="text" placeholder="Symptom" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small"  value={duration}  /* ref={register} */ onChange={(e)=>{setDuration(e.target.value)}}  name="durationn" type="text" placeholder="Duration" />           
                                </p>
                            </div>
                           {/*  <div className="field">
                            <label  className=" is-small" >
                                    <input type="checkbox" value={sympreq} name="sympreq"  onChange={(e)=>{handleChecked(e)}}/* ref={register} */ /* />Required */
                                /* </label>
                                </div> */} 
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
                        
                            <th><abbr title="Type"> Test</abbr></th>
                            <th><abbr title="Destination">Value</abbr></th>
                          {/*   <th><abbr title="Destination">Required</abbr></th> */}
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
                                {/* <td>{ProductEntry.sympreq.toString()}</td>   */}                                                                   

                                </tr>

                            ))}
                        </tbody>
                        </table>

</>
<>
                   
                        <div className="field-body ml-3">  
                          <div className="field">
                                <label className="is-small">Management Protocol</label>
                            </div> 
                            <div className="field">
                                <p className="control ">
                                    <textarea className="textarea is-small"  value={symptom} /* ref={register} */ onChange={(e)=>{setSymptom(e.target.value)}} name="symptom" type="text" placeholder="Mangement Protocol" />           
                                </p>
                            </div>
                            </div>
                          

</>

             <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="bandType"  ref={register({ required: true })} /* onChange={(e)=>handleChangeMode(e.target.value)} */ className="selectadd" >
                         <option value="">Choose Notification Person </option>
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
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const BandServ=client.service('casedefinition')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedBand, setSelectedBand]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newBandModule={
            selectedBand:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
       //console.log(state)
        

    }
    const handleRow= async(Band)=>{
        //console.log("b4",state)

        //console.log("handlerow",Band)

        await setSelectedBand(Band)

        const    newBandModule={
            selectedBand:Band,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
       //console.log(state)

    }

   const handleSearch=(val)=>{
       const field='name'
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
          /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Band  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Band, probable network issues "+ err )
                    setError(true)
                }) */
            }
            
            useEffect(() => {
             

                return () => {
                    

                }
            },[])

            useEffect(() => {
               
                if (user){
                    getFacilities()
                }else{
                    /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
                }
                BandServ.on('created', (obj)=>getFacilities())
                BandServ.on('updated', (obj)=>getFacilities())
                BandServ.on('patched', (obj)=>getFacilities())
                BandServ.on('removed', (obj)=>getFacilities())
                return () => {
                
                }
            },[])


    //todo: pagination and vertical scroll bar

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
                                        <th>Name</th>
                                        <th><abbr title="Band Type">Band Type</abbr></th>
                                       <th><abbr title="Description">Description</abbr></th>
                                          {/*<th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Department">Department</abbr></th>
                                        <th><abbr title="Departmental Unit">Departmental Unit</abbr></th> */}
                                       {user.stacker && <th><abbr title="Facility">Facility</abbr></th>}
                                        {/* <th><abbr title="Actions">Actions</abbr></th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Band, i)=>(

                                            <tr key={Band._id} onClick={()=>handleRow(Band)} className={Band._id===(selectedBand?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{Band.name}</th>
                                            <td>{Band.bandType}</td>
                                            < td>{Band.description}</td>
                                            {/*<td>{Band.phone}</td>
                                            <td>{Band.email}</td>
                                            <td>{Band.department}</td>
                                            <td>{Band.deptunit}</td> */}
                                           {user.stacker &&  <td>{Band.facility}</td>}
                                           {/*  <td><span   className="showAction"  >...</span></td> */}
                                           
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
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const [error, setError] =useState(false) //, 
    //const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const BandServ=client.service('/Band')
    //const history = useHistory()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

   

   const Band =state.BandModule.selectedBand 

    const handleEdit= async()=>{
        const    newBandModule={
            selectedBand:Band,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
       //console.log(state)
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Band Details
                </p>
            </div>
            <div className="card-content vscrollable">
           
                <table> 
                <tbody>         
                <tr>
                    <td>
                
                    <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                        Name: 
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft"   name="name"> {Band.name} </span>
                        </td>
                    </tr>
                    <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Band Type:
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft"   name="BandType">{Band.bandType} </span> 
                    </td>
                </tr>
                  {/*   <tr>
                    <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>Profession: 
                
                    
                    </label>
                    </td>
                <td>
                <span className="is-size-7 padleft "  name="BandCity">{Band.profession}</span> 
                </td>
                </tr>
                    <tr>
            <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>Phone:           
                    
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft "  name="BandContactPhone" >{Band.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-size-7 padleft "  name="BandEmail" >{Band.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft "  name="BandOwner">{Band.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-size-7 padleft "  name="BandType">{Band.deptunit}</span>
                </td>
              
                </tr> */}
                    
          {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-size-7 padleft "  name= "BandCategory">{Band.BandCategory}</span>
                </label>
                 </div> */}

            </tbody> 
            </table> 
           
            <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
            </div>
            { error && <div className="message"> {message}</div>}
           
        </div>
        </div>
        </>
    )
   
   
}

export function CaseDefinitionModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
    // eslint-disable-next-line 
    const [error, setError] =useState(false)
    // eslint-disable-next-line 
    const [success, setSuccess] =useState(false)
    // eslint-disable-next-line 
    const [message,setMessage] = useState("")
    // eslint-disable-next-line 
    const BandServ=client.service('casedefinition')
    //const history = useHistory()
     // eslint-disable-next-line
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const Band =state.BandModule.selectedBand 

        useEffect(() => {
            setValue("name", Band.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("bandType", Band.bandType,  {
                shouldValidate: true,
                shouldDirty: true
            })
           /*  setValue("profession", Band.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Band.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Band.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Band.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Band.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
          /*   setValue("BandCategory", Band.BandCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newBandModule={
        selectedBand:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
   //console.log(state)
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
                //console.log(JSON.stringify(res))
                reset();
               /*  setMessage("Deleted Band successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
                toast({
                    message: 'Band deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
               // setMessage("Error deleting Band, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error deleting Band, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
    }
        

   /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
    const onSubmit = (data,e) =>{
        e.preventDefault();
        
        setSuccess(false)
        console.log(data)
        data.facility=Band.facility
          //console.log(data);
          
        BandServ.patch(Band._id,data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               // setMessage("updated Band successfully")
                 toast({
                    message: 'Band updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                //setMessage("Error creating Band, probable network issues "+ err )
               // setError(true)
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
            {/* <div className="field">
            <label className="label is-small">Profession
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Phone
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="phone" type="text" placeholder="Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
                </label>
                 </div>
            <div className="field">
            <label className="label is-small">Email
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="Band Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Department
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
                </label>
                {errors.department && <span>This field is required</span>}
                </div>
            <div className="field">
            <label className="label is-small">Departmental Unit
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="deptunit" type="text" placeholder="Departmental Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
                </label>
                </div> */}
           {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="BandCategory" type="text" placeholder="Band Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
           
           
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
     // eslint-disable-next-line
     const [searchError, setSearchError] =useState(false)
     // eslint-disable-next-line
    const [showPanel, setShowPanel] =useState(false)
     // eslint-disable-next-line
   const [searchMessage, setSearchMessage] = useState("") 
   // eslint-disable-next-line 
   const [simpa,setSimpa]=useState("")
   // eslint-disable-next-line 
   const [chosen,setChosen]=useState(false)
   // eslint-disable-next-line 
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)


   const handleRow= async(obj)=>{
        await setChosen(true)
        //alert("something is chaning")
       getSearchfacility(obj)
       
       await setSimpa(obj.facilityName)
       
        // setSelectedFacility(obj)
        setShowPanel(false)
        await setCount(2)
        /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
   //console.log(state)
}
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was chosen")
         }
       
       /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
    }
    const handleSearch=async(val)=>{
        
        const field='facilityName' //field variable
       
        if (val.length>=3){
            facilityServ.find({query: {     //service
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