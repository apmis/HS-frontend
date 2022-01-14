/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

const searchfacility={};


export default function DocumentClass() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedDocumentClass,setSelectedDocumentClass]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-8 ">
                <DocumentClassList />
                </div>
            <div className="column is-4 ">
                {(state.DocumentClassModule.show ==='create')&&<DocumentClassCreate />}
                {(state.DocumentClassModule.show ==='detail')&&<DocumentClassDetail  />}
                {(state.DocumentClassModule.show ==='modify')&&<DocumentClassModify DocumentClass={selectedDocumentClass} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function DocumentClassCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const DocumentClassServ=client.service('documentclass')
    
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
          data.locationType="DocumentClass"
        DocumentClassServ.create(data)
        .then((res)=>{
                
                e.target.reset();
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

export function DocumentClassList({standalone,closeModal}){
   
   
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
   const [message, setMessage] = useState("") 
    const DocumentClassServ=client.service('documentclass')
   
  
    const [facilities,setFacilities]=useState([])
    
   const [selectedDocumentClass, setSelectedDocumentClass]=useState()
   
    const {state,setState}=useContext(ObjectContext)
   
    const {user,setUser}=useContext(UserContext)

   

    const handleCreateNew = async()=>{
        const    newDocumentClassModule={
            selectedDocumentClass:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
      
        

    }
    const handleRow= async(DocumentClass)=>{
       

       

        await setSelectedDocumentClass(DocumentClass)

        const    newDocumentClassModule={
            selectedDocumentClass:DocumentClass,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
      
       if (standalone){
           closeModal()
       }

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
                                $limit:20,
                                $sort: {
                                    name: 1
                                }
                                }})
            
                    await setFacilities(findDocumentClass.data)

                    }
                }
            }
     

    useEffect(() => {
        getFacilities()
            
            DocumentClassServ.on('created', (obj)=>getFacilities())
            DocumentClassServ.on('updated', (obj)=>getFacilities())
            DocumentClassServ.on('patched', (obj)=>getFacilities())
            DocumentClassServ.on('removed', (obj)=>getFacilities())
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
                    </div>
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Document Class</span></div>
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
                                       {user.stacker &&  <th><abbr title="Facility">Facility</abbr></th>}
                                       { !standalone &&  <th><abbr title="Actions">Actions</abbr></th>}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((DocumentClass, i)=>(

                                            <tr key={DocumentClass._id} onClick={()=>handleRow(DocumentClass)}  className={DocumentClass._id===(selectedDocumentClass?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{DocumentClass.name}</th>
                                           {user.stacker &&  <td>{DocumentClass.facility}</td>}
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


export function DocumentClassDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)

   

   const DocumentClass =state.DocumentClassModule.selectedDocumentClass 

    const handleEdit= async()=>{
        const    newDocumentClassModule={
            selectedDocumentClass:DocumentClass,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
       
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
            </div>
            { error && <div className="message"> {message}</div>}
           
        </div>
        </div>
        </>
    )
   
   
}

export function DocumentClassModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    
    const DocumentClassServ=client.service('documentclass')
    
     
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
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newDocumentClassModule={
        selectedDocumentClass:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, DocumentClassModule:newDocumentClassModule}))
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
                reset();
                toast({
                    message: 'DocumentClass deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting DocumentClass, probable network issues or "+ err,
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
        data.facility=DocumentClass.facility
          
        DocumentClassServ.patch(DocumentClass._id,data)
        .then((res)=>{
                 toast({
                    message: 'DocumentClass updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
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