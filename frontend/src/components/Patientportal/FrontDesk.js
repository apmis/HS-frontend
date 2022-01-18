/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

const searchfacility={};


export default function FrontDesk() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedClinic,setSelectedClinic]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-8 ">
                <FrontDeskList />
                </div>
            <div className="column is-4 ">
                {(state.FrontDesk.show ==='create')&&<FrontDeskCreate />}
                {(state.FrontDesk.show ==='detail')&&<FrontDeskDetail  />}
                {(state.FrontDesk.show ==='modify')&&<FrontDeskModify Clinic={selectedClinic} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function FrontDeskCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClinicServ=client.service('location')
    
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()



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
          console.log(currentUser)
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
         
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  
          }
          data.locationType="Front Desk"
        ClinicServ.create(data)
        .then((res)=>{
                
                e.target.reset();
                setSuccess(true)
                toast({
                    message: 'Front Desk created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Front Desk ' + err,
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
                    Create Front Desk
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name of Front Desk" />
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

export function FrontDeskList({standalone,closeModal}){
   
    
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
   const [message, setMessage] = useState("") 
    const ClinicServ=client.service('location')
    const [facilities,setFacilities]=useState([])
     
   const [selectedClinic, setSelectedClinic]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newClinicModule={
            selectedFrontDesk:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, FrontDesk:newClinicModule}))
        

    }
    const handleRow= async(Clinic)=>{
       
       

        await setSelectedClinic(Clinic)

        const    newClinicModule={
            selectedFrontDesk:Clinic,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, FrontDesk:newClinicModule}))
        closeModal()
    }
    useEffect(() => {
        console.log(state.FrontDesk)
        return () => {
            
        }
    }, [state.FrontDesk])


   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       ClinicServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "" ,
                locationType:"Front Desk",
               $limit:10,
                $sort: {
                    name: 1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Front Desk  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Front Desk, probable network issues "+ err )
                setError(true)
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findClinic= await ClinicServ.find(
                {query: {
                    locationType:"Front Desk",
                    facility:user.currentEmployee.facilityDetail._id,
                    $limit:20,
                    $sort: {
                        name: 1
                    }
                    }})

         await setFacilities(findClinic.data)
                }
                else {
                    if (user.stacker){
                        const findClinic= await ClinicServ.find(
                            {query: {
                                locationType:"Front Desk",
                                $limit:20,
                                $sort: {
                                    name: 1
                                }
                                }})
            
                    await setFacilities(findClinic.data)

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
                ClinicServ.on('created', (obj)=>getFacilities())
                ClinicServ.on('updated', (obj)=>getFacilities())
                ClinicServ.on('patched', (obj)=>getFacilities())
                ClinicServ.on('removed', (obj)=>getFacilities())
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
                                        type="text" placeholder="Search Front Desks"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Front Desks</span></div>
                    <div className="level-right">
                { !standalone &&   <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>}
                    </div>

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th>Name</th>
                                       { !standalone &&  <th><abbr title="Actions">Actions</abbr></th>}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Clinic, i)=>(

                                            <tr key={Clinic._id} onClick={()=>handleRow(Clinic)}  className={Clinic._id===(selectedClinic?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{Clinic.name}</th>
                                          { !standalone &&   <td><span   className="showAction"  >...</span></td>}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }


export function FrontDeskDetail(){
    
     
    const [error, setError] =useState(false) 
    
    const [message, setMessage] = useState("") 
    
    const {state,setState} = useContext(ObjectContext)

   const Clinic =state.FrontDesk.selectedFrontDesk

    const handleEdit= async()=>{
        const    newClinicModule={
            selectedFrontDesk:Clinic,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, FrontDesk:newClinicModule}))
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                Front Desk Details
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
                        <span className="is-size-7 padleft"   name="name"> {Clinic.name} </span>
                        </td>
                    </tr>
                    <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Location Type:
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft"   name="ClinicType">{Clinic.locationType} </span> 
                    </td>
                </tr>

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

export function FrontDeskModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    const ClinicServ=client.service('location')
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const Clinic =state.FrontDesk.selectedClinic 

        useEffect(() => {
            setValue("name", Clinic.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("locationType", Clinic.locationType,  {
                shouldValidate: true,
                shouldDirty: true
            })

            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newClinicModule={
        selectedFrontDesk:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, FrontDesk:newClinicModule}))
           }


        const changeState =()=>{
        const    newClinicModule={
            selectedFrontDesk:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, FrontDesk:newClinicModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Clinic._id
        if (conf){
             
        ClinicServ.remove(dleteId)
        .then((res)=>{
                reset();
                toast({
                    message: 'Front Desk deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting Front Desk, probable network issues or "+ err,
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
        data.facility=Clinic.facility
          
        ClinicServ.patch(Clinic._id,data)
        .then((res)=>{
                 toast({
                    message: 'Front Desk updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                toast({
                    message: "Error updating Front Desk, probable network issues or "+ err,
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
                    Clinic Details-Modify
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
                <label className="label is-small">Location Type
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register({ required: true })} disabled name="ClinicType" type="text" placeholder="Front Desk" />
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