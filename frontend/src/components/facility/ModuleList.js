import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

export default function ModuleList({handlecloseModal}) {

    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const EmployeeServ=client.service('employee')
    
    const {user} = useContext(UserContext) 
 
    const {state}=useContext(ObjectContext)

    let draftDoc={}
     draftDoc=state.EmployeeModule.selectedEmployee 
    
   
     const mList=[ "Client","Clinic", "Laboratory","Pharmacy","Finance", "Epidemiology","Admin", "Bill Client","Adjust Price"] 
     

     useEffect(() => {
          

            Object.entries(draftDoc).map(([keys,value],i)=>(
                setValue(keys, value,  {
                    shouldValidate: true,
                    shouldDirty: true
                })

            ))
          
    
         return () => {
            
         }
     })

  useEffect(() => {
    draftDoc=state.EmployeeModule.selectedEmployee 
      return () => {
        
      }
  }, [state.EmployeeModule.selectedEmployee])
   
    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        console.log(data)
     
         
         
        let confirm = window.confirm(`You are about to update roles for the employee ?`)
        if (confirm){
            EmployeeServ.patch(draftDoc._id, data) 
            .then((res)=>{
                    
                    e.target.reset();
                   
                    setSuccess(true)
                    toast({
                        message: 'Roles updated succesfully',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                      setSuccess(false)
                      draftDoc={}
                      handlecloseModal()
                })
                .catch((err)=>{
                    console.log(err)
                    toast({
                        message: 'Error updating Roles' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                })

       
        }
      
    }

    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                Choose Modules
                </p>
            </div>
            <div className="card-content vscrollable remPad1">

              
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className="field is-horizontal">
                       
                    <div className="field ml-3 ">
                    <label className= "mr-2 "> <b>Modules:</b></label>
                        {
                            mList.map((c,i) => 
                                <label  className=" is-small" key={c}>
                                    <input type="checkbox" value={c} name="roles" ref={register} />{c + " "}
                                </label>
                            )
                        }
                    </div>  
                    </div> 
                      
                  
              
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button type="reset" className="button is-warning is-small" >
                        Cancel
                    </button>
                </p>
               
            </div>
     
            </form>
            </div>
            </div>
                 
        </>
    )
   
}
