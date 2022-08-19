/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
// eslint-disable-next-line
const searchfacility={};


export default function EndEncounter() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedDocumentClass,setSelectedDocumentClass]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">DocumentClass  Module</span></div>
            </div> */}
            <div >
           {/*  <div className="column is-8 "> */}
                <EndEncounterList />
                {/* </div> */}
           {/*  <div className="column is-4 ">
                {(state.DocumentClassModule.show ==='create')&&<EndEncounterCreate />}
                {(state.DocumentClassModule.show ==='detail')&&<EndEncounterDetail  />}
                {(state.DocumentClassModule.show ==='modify')&&<EndEncounterModify DocumentClass={selectedDocumentClass} />}
               
            </div> */}

            </div>                            
            </section>
       
    )
    
}

export function EndEncounterCreate(){
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const DocumentClassServ=client.service('documentclass')
    //const history = useHistory()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()



    const getSearchfacility=(obj)=>{ // buble-up from inputsearch for creating resource
        
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
        //setFacility(user.activeDocumentClass.FacilityId)//
      if (!user.stacker){
         // console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
          data.locationType="DocumentClass"
        DocumentClassServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created DocumentClass successfully") */
                setSuccess(true)
                toast({
                    message: 'DocumentClass created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating DocumentClass ' + err,
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
                    Create DocumentClass
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name of DocumentClass" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
         
           <div className="field"  style={ !user.stacker?{display:"none"}:{}} >
                <InputSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                <p className="control has-icons-left " style={{display:"none"}}>
                    <input className="input is-small" ref={register ({ required: true }) } name="facility" type="text" placeholder="Facility" />
                    <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                    </span>
                </p>
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

export function EndEncounterList({standalone,closeModal}){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
   // const DocumentClassServ=client.service('documentclass')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedEndEncounter, setSelectedEndEncounter]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)
    const endEncounterOptions=["Continue Management", "Set Next Appointment", "Discharge", "Admit to Ward","Refer","Dead" ]

   

    const handleCreateNew = async()=>{
        const    newDocumentClassModule={
            selectedDocumentClass:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
       //console.log(state)
        

    }
    const handleRow= async(DocumentClass)=>{
        //console.log("b4",state)

        //console.log("handlerow",DocumentClass)

        await setSelectedEndEncounter(DocumentClass)

        const    newDocumentClassModule={
            selectedEndEncounter:DocumentClass,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, EndEncounterModule:newDocumentClassModule}))
       //console.log(state)

      // const expr = 'Papayas';
       
       
          closeModal()
       

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       DocumentClassServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id,
                /* locationType:"DocumentClass", */
               $limit:10,
                $sort: {
                    name: 1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" DocumentClass  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching DocumentClass, probable network issues "+ err )
                setError(true)
            })
        }
   
    const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findDocumentClass= await DocumentClassServ.find(
                {query: {
                    /* locationType:"DocumentClass",*/
                    facility:user.currentEmployee.facilityDetail._id, 
                    $limit:20,
                    $sort: {
                        name: 1
                    }
                    }})

         await setFacilities(findDocumentClass.data)
                }
                else {
                    if (user.stacker){
                        const findDocumentClass= await DocumentClassServ.find(
                            {query: {
                               /*  locationType:"DocumentClass", */
                                $limit:20,
                                $sort: {
                                    name: 1
                                }
                                }})
            
                    await setFacilities(findDocumentClass.data)

                    }
                }
          /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" DocumentClass  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating DocumentClass, probable network issues "+ err )
                    setError(true)
                }) */
            }
     

    useEffect(() => {
        switch (selectedEndEncounter) {
            case 'Continue Present Management':
                console.log('Oranges are $0.59 a pound.');
                break;
            case 'Set Next Appointment':
                break;
            case 'Discharge':
                console.log('Mangoes and papayas are $2.79 a pound.');
                // expected output: "Mangoes and papayas are $2.79 a pound."
                break;
            case 'Admit to Ward':
                //alert("Admit now!")
               /*  await setSelectedEndEncounter(DocumentClass)

                const    newDocumentClassModule={
                    selectedEndEncounter:DocumentClass,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, EndEncounterModule:newDocumentClassModule}))
               //console.log(state) */

                break;
            case 'Refer':
                break;
            case 'Patient Died':
                console.log('Mangoes and papayas are $2.79 a pound.');
                // expected output: "Mangoes and papayas are $2.79 a pound."
                break;    
            default:
                console.log(`Sorry, we are out of `);
            }
       /*  getFacilities()
            
            DocumentClassServ.on('created', (obj)=>getFacilities())
            DocumentClassServ.on('updated', (obj)=>getFacilities())
            DocumentClassServ.on('patched', (obj)=>getFacilities())
            DocumentClassServ.on('removed', (obj)=>getFacilities()) */
            return () => {
            
            }
        },[selectedEndEncounter])


    //todo: pagination and vertical scroll bar

    return(
        <>
           {user?( <>  
                <div className="level">
                    {/* <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search DocumentClass"
                                        minLength={3}
                                        debounceTimeout={400}
                                        onChange={(e)=>handleSearch(e.target.value)} />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div> */}
                   {/*  <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Document Class</span></div> */}
                  {/*   <div className="level-right">
                { !standalone &&   <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>}
                    </div> */}

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th>Options</th>
                                        {/* <th><abbr title="Last Name">DocumentClass Type</abbr></th>
                                       <th><abbr title="Profession">Profession</abbr></th>
                                         <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Department">Department</abbr></th>
                                        <th><abbr title="Departmental Unit">Departmental Unit</abbr></th> */}
                                       {/* {user.stacker &&  <th><abbr title="Facility">Facility</abbr></th>}
                                       { !standalone &&  <th><abbr title="Actions">Actions</abbr></th>} */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {endEncounterOptions.map((DocumentClass, i)=>(

                                            <tr key={i} onClick={()=>handleRow(DocumentClass)}  className={DocumentClass===selectedEndEncounter?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{DocumentClass}</th>
                                            {/*<td>{DocumentClass.DocumentClassType}</td>
                                            < td>{DocumentClass.profession}</td>
                                            <td>{DocumentClass.phone}</td>
                                            <td>{DocumentClass.email}</td>
                                            <td>{DocumentClass.department}</td>
                                            <td>{DocumentClass.deptunit}</td>*/}
                                          {/*  {user.stacker &&  <td>{DocumentClass.facility}</td>} */}
                                         {/*  { !standalone &&   <td><span   className="showAction"  >...</span></td>} */}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }


export function EndEncounterDetail(){
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const [error, setError] =useState(false) //, 
    //const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const DocumentClassServ=client.service('/DocumentClass')
    //const history = useHistory()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

   

   const DocumentClass =state.DocumentClassModule.selectedDocumentClass 

    const handleEdit= async()=>{
        const    newDocumentClassModule={
            selectedDocumentClass:DocumentClass,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
       //console.log(state)
       
    }
            
    const handleCreateForm=async()=>{
        
    }    
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    DocumentClass Details
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
                        <span className="is-size-7 padleft"   name="name"> {DocumentClass.name} </span>
                        </td>
                    </tr>
                    <tr>
               
                </tr>
            </tbody> 
            </table> 
           
            <div className="field is-grouped mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
                {/* <p className="control">
                    <button className="button is-info is-small" onClick={handleCreateForm}>
                        Create Form
                    </button>
                </p> */}
            </div>
            { error && <div className="message"> {message}</div>}
           
        </div>
        </div>
        </>
    )
   
   
}

export function EndEncounterModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
    // eslint-disable-next-line 
    const [error, setError] =useState(false)
    // eslint-disable-next-line 
    const [success, setSuccess] =useState(false)
    // eslint-disable-next-line 
    const [message,setMessage] = useState("")
    // eslint-disable-next-line 
    const DocumentClassServ=client.service('documentclass')
    //const history = useHistory()
     // eslint-disable-next-line
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const DocumentClass =state.DocumentClassModule.selectedDocumentClass 

        useEffect(() => {
            setValue("name", DocumentClass.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("locationType", DocumentClass.locationType,  {
                shouldValidate: true,
                shouldDirty: true
            })
           /*  setValue("profession", DocumentClass.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", DocumentClass.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", DocumentClass.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", DocumentClass.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", DocumentClass.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
          /*   setValue("DocumentClassCategory", DocumentClass.DocumentClassCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newDocumentClassModule={
        selectedDocumentClass:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
   //console.log(state)
           }


        const changeState =()=>{
        const    newDocumentClassModule={
            selectedDocumentClass:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=DocumentClass._id
        if (conf){
             
        DocumentClassServ.remove(dleteId)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                reset();
               /*  setMessage("Deleted DocumentClass successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
                toast({
                    message: 'DocumentClass deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
               // setMessage("Error deleting DocumentClass, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error deleting DocumentClass, probable network issues or "+ err,
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
        data.facility=DocumentClass.facility
          //console.log(data);
          
        DocumentClassServ.patch(DocumentClass._id,data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               // setMessage("updated DocumentClass successfully")
                 toast({
                    message: 'DocumentClass updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                //setMessage("Error creating DocumentClass, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error updating DocumentClass, probable network issues or "+ err,
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
                    DocumentClass Details-Modify
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
                {/* <div className="field">
                <label className="label is-small">Location Type
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register({ required: true })} disabled name="DocumentClassType" type="text" placeholder="DocumentClass Type" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
                </label>
                </div> */}
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
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="DocumentClass Email"/>
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
                    <input className="input is-small" ref={register({ required: true })} name="DocumentClassCategory" type="text" placeholder="DocumentClass Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-DocumentClass-medical"></i>
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
                {/* <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
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