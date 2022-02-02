/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

const searchfacility={};


export default function Location() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedLocation,setSelectedLocation]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-8 ">
                <LocationList />
                </div>
            <div className="column is-4 ">
                {(state.LocationModule.show ==='create')&&<LocationCreate />}
                {(state.LocationModule.show ==='detail')&&<LocationDetail  />}
                {(state.LocationModule.show ==='modify')&&<LocationModify Location={selectedLocation} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function LocationCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const LocationServ=client.service('location')
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()
    const locationTypeOptions =["Front Desk","Clinic", "Store", "Laboratory", "Finance", ]


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
        if (data.locationType===""){
            alert("Kindly choose location type")
            return
        }
        setMessage("")
        setError(false)
        setSuccess(false)
         
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  
          }
        LocationServ.create(data)
        .then((res)=>{
                
                e.target.reset();
                setSuccess(true)
                toast({
                    message: 'Location created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Location ' + err,
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
                    Create Location
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="locationType"  ref={register({ required: true })} className="selectadd" >
                         <option value="">Choose Location Type </option>
                           {locationTypeOptions.map((option,i)=>(
                               <option key={i} value={option}> {option}</option>
                           ))}
                         </select>
                     </div>
                 </div>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name of Location" />
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

export function LocationList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const LocationServ=client.service('location')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedLocation, setSelectedLocation]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newLocationModule={
            selectedLocation:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, LocationModule:newLocationModule}))
       
        

    }
    const handleRow= async(Location)=>{
        

        

        await setSelectedLocation(Location)

        const    newLocationModule={
            selectedLocation:Location,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, LocationModule:newLocationModule}))
       

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       LocationServ.find({query: {
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
                setMessage(" Location  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Location, probable network issues "+ err )
                setError(true)
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findLocation= await LocationServ.find(
                {query: {
                    facility:user.currentEmployee.facilityDetail._id,
                    $limit:200,
                    $sort: {
                        createdAt: -1
                    }
                    }})

         await setFacilities(findLocation.data)
                }
                else {
                    if (user.stacker){
                        const findLocation= await LocationServ.find(
                            {query: {
                                
                                $limit:200,
                                $sort: {
                                    facility: -1
                                }
                                }})
            
                    await setFacilities(findLocation.data)

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
                LocationServ.on('created', (obj)=>getFacilities())
                LocationServ.on('updated', (obj)=>getFacilities())
                LocationServ.on('patched', (obj)=>getFacilities())
                LocationServ.on('removed', (obj)=>getFacilities())
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
                                        type="text" placeholder="Search Locations"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Locations </span></div>
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
                                        <th><abbr title="Last Name">Location Type</abbr></th>
                                       {user.stacker && <th><abbr title="Facility">Facility</abbr></th>}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Location, i)=>(

                                            <tr key={Location._id} onClick={()=>handleRow(Location)} className={Location._id===(selectedLocation?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{Location.name}</th>
                                            <td>{Location.locationType}</td>
                                           {user.stacker &&  <td>{Location.facility}</td>}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }


export function LocationDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)

   

   const Location =state.LocationModule.selectedLocation 

    const handleEdit= async()=>{
        const    newLocationModule={
            selectedLocation:Location,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, LocationModule:newLocationModule}))
       
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Location Details
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
                        <span className="is-size-7 padleft"   name="name"> {Location.name} </span>
                        </td>
                    </tr>
                    <tr>
                    <td>
                <label className="label is-small"><span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>Location Type:
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft"   name="LocationType">{Location.locationType} </span> 
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

export function LocationModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    
    const LocationServ=client.service('location')
    
     
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const Location =state.LocationModule.selectedLocation 

        useEffect(() => {
            setValue("name", Location.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("locationType", Location.locationType,  {
                shouldValidate: true,
                shouldDirty: true
            })
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newLocationModule={
        selectedLocation:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, LocationModule:newLocationModule}))
           }


        const changeState =()=>{
        const    newLocationModule={
            selectedLocation:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, LocationModule:newLocationModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Location._id
        if (conf){
             
        LocationServ.remove(dleteId)
        .then((res)=>{
                reset();
                toast({
                    message: 'Location deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting Location, probable network issues or "+ err,
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
        data.facility=Location.facility
          //console.log(data);
          
        LocationServ.patch(Location._id,data)
        .then((res)=>{
                 toast({
                    message: 'Location updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                toast({
                    message: "Error updating Location, probable network issues or "+ err,
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
                    Location Details-Modify
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
                    <input className="input is-small " ref={register({ required: true })} disabled name="locationType" type="text" placeholder="Location Type" />
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