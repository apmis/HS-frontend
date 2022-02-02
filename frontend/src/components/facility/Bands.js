/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

const searchfacility={};


export default function Bands() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedBand,setSelectedBand]=useState()
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-8 ">
            <BandList />
                </div>
            <div className="column is-8 ">
                
                
                {(state.BandModule.show ==='create')&&<BandCreate />}
                {(state.BandModule.show ==='detail')&&<BandDetail  />}
                {(state.BandModule.show ==='modify')&&<BandModify Band={selectedBand} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function BandCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const BandServ=client.service('bands')
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()
    const bandTypeOptions =["Provider","Company", "Patient","Plan" ]


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
        if (data.bandType===""){
            alert("Kindly choose band type")
            return
        }
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

    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Create Band
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="bandType"  ref={register({ required: true })} className="selectadd" >
                         <option value="">Choose Band Type </option>
                           {bandTypeOptions.map((option,i)=>(
                               <option key={i} value={option}> {option}</option>
                           ))}
                         </select>
                     </div>
                 </div>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name of Band" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
            <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="description" type="text" placeholder="Description of Band" />
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

export function BandList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const BandServ=client.service('bands')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedBand, setSelectedBand]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newBandModule={
            selectedBand:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
       
        

    }
    const handleRow= async(Band)=>{
        

        

        await setSelectedBand(Band)

        const    newBandModule={
            selectedBand:Band,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
       

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
                                        <th>Name</th>
                                        <th><abbr title="Band Type">Band Type</abbr></th>
                                       <th><abbr title="Description">Description</abbr></th>
                                       {user.stacker && <th><abbr title="Facility">Facility</abbr></th>}
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


export function BandDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)

   

   const Band =state.BandModule.selectedBand 

    const handleEdit= async()=>{
        const    newBandModule={
            selectedBand:Band,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, BandModule:newBandModule}))
       
       
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

export function BandModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    
    const BandServ=client.service('bands')
    
     
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
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newBandModule={
        selectedBand:{},
        show :'list'
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