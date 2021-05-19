import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

export default function AsthmaIntake() {

    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    //const history = useHistory()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const {state}=useContext(ObjectContext)

    const order=state.financeModule.selectedFinance

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
        //setFacility(user.activeClient.FacilityId)//
      if (!user.stacker){
       /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=data
          document.documentname=`${data.Investigation} Result`  //"Lab Result"
         // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status="completed"
          console.log(document)

          if (
            document.location===undefined ||!document.createdByname || !document.facilityname ){
            toast({
                message: ' Documentation data missing, requires location and facility details' ,
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              return
          }
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Lab Result created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Lab Result ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 
const handleChangePart=(e)=>{
    console.log(e)
}
const handleChangeType=async (e)=>{
   // await setAppointment_type(e.target.value)
   console.log(e)
}
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                   Adult Asthma Questionnaire
                </p>
            </div>
            <div className="card-content vscrollable remPad1">

              {/*   <label className="label is-size-7">
                  Client:  {order.orderInfo.orderObj.clientname}
                </label>
                <label className="label is-size-7">
                 Test:  {order.serviceInfo.name}
                </label> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Date" type="text" placeholder="Date" />
                                      
                        </p>
                </div>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Name" type="text" placeholder="Name or Initials" />
                                      
                        </p>
                </div>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="DOB" type="text" placeholder="Date of Birth" />
                                      
                        </p>
                </div>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Gender" type="text" placeholder="Gender" />
                                      
                        </p>
                </div>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Race" type="text" placeholder="Race" />
                                      
                        </p>
                </div>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Marital_Status" type="text" placeholder="Marital Status" />
                                      
                        </p>
                </div>
                <div className="field">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Occupation" type="text" placeholder="Occupation" />
                                      
                        </p>
                </div>
                <div className="field ">
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="Education" type="text" placeholder="Highest Level of Education" />           
                        </p>
                </div>
                <h3><b>Symptoms</b></h3>
                <h4>A. Cough</h4>
                <div className="field">
                 <label>9. Were you ever bothered, or are you currently bothered by a cough?</label> 
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="cough" type="text" placeholder="Cough" />           
                        </p>
                </div>
                <div className="field">
                <label> 10. Has your cough been triggered by any of the following conditions?</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (a) Exercise</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (b) Breathing cold air</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (c) Breathing house dust</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (d) Being in a mouldy, musty or damp place</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (e) Change in weather</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (f) Being near cats</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (g) Being near dogs</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (h) Being near any other animal (specify)</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (i) During sleep at night</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (j) Taking aspirin</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (k) Any other thing</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                           
                        </div>
                        <p className="control ">
                            <input className="input is-small" ref={register()}  name="specify_other_cough" type="text" placeholder="Specify" />
                                      
                        </p>
                    </div>
                </div>
                <h4>B. Wheezing</h4>
                <div className="field">
                 <label>11. Has your chest ever sounded wheezy or whistling?</label> 
                    <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Uncertain" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Uncertain </span>
                                </label>
                    </div>
                </div>
                <div className="field">
                <label> 10. Has your cough been triggered by any of the following conditions?</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (a) Exercise</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (b) Breathing cold air</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (c) Breathing house dust</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (d) Being in a mouldy, musty or damp place</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (e) Change in weather</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (f) Being near cats</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (g) Being near dogs</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (h) Being near any other animal (specify)</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (i) During sleep at night</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (j) Taking aspirin</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (k) Any other thing</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                        <p className="control ">
                                <input className="input is-small" ref={register()}  name="specify_other_wheeze" type="text" placeholder="Specify" />           
                        </p>
                    </div>
                   
                </div>
                <h4>C. Shortness of breath</h4>
                <div className="field">
                 <label>13. Have you ever been bothered by shortness of breath when hurrying on flat ground or walking up a slight hill?</label> 
                    <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Uncertain" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Uncertain </span>
                                </label>
                    </div>
                </div>
                <div className="field">
                <label>14. Have you ever had shortness of breath with exposure to any of the following circumstances?</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (a) Exercise</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (b) Breathing cold air</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (c) Breathing house dust</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (d) Being in a mouldy, musty or damp place</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (e) Change in weather</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (f) Being near cats</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (g) Being near dogs</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (h) Being near any other animal (specify)</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (i) During sleep at night</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (j) Taking aspirin</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (k) Any other thing</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                        <p className="control ">
                                <input className="input is-small" ref={register()}  name="specify_other_shortness" type="text" placeholder="Specify" />           
                        </p>
                    </div>
                   
                </div>
                <h4>D. Tightness in Chest</h4>
                <div className="field">
                 <label>15. Have you ever been bothered by a tightness in your chest when hurrying on flat ground or walking up a slight hill?</label> 
                    <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Uncertain" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Uncertain </span>
                                </label>
                    </div>
                </div>
                <div className="field">
                <label>14. Have you ever had  tightness in your chest with exposure to any of the following circumstances?</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (a) Exercise</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (b) Breathing cold air</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (c) Breathing house dust</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (d) Being in a mouldy, musty or damp place</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (e) Change in weather</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (f) Being near cats</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (g) Being near dogs</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (h) Being near any other animal (specify)</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (i) During sleep at night</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (j) Taking aspirin</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (k) Any other thing</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                        <p className="control ">
                                <input className="input is-small" ref={register()}  name="specify_other_tightness" type="text" placeholder="Specify" />           
                        </p>
                    </div>
                   
                </div>
                <h4>Asthma History</h4>
                <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 17. Have you ever had asthma?</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 17b. When was your asthma diagnosed? (Age in years) </label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="age_diagnosis" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 17c. Was your asthma confirmed by a doctor?</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Not Sure" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Not Sure </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 17d. Have you ever needed to visit a doctor at least once a year for your asthma?</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Not Sure" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Not Sure </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 17e. During the last 12 months, how many times did you need to visit a doctor for 
                                your asthma? </label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="times_visit" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 18. Have you ever needed to go to the Casualty Clinic (Accident &Emergency Dept),
doctor's office, because of an asthma attack?</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Not Sure" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Not Sure </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 18b If yes to question 18a above, How many times in the last 12months? </label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="times_12months" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 18c Have you ever been hospitalized overnight because of an asthmatic attack?</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Not Sure" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Not Sure </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">19. Have you ever taken herbal /local medication for your asthma before?</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Not Sure" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Not Sure </span>
                                </label>
                            </div>
                        </div>
                    </div>
               
                <div className="field">
                <label>20. Have you ever taken any of the following medications?</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (a) Bronchodilator inhaler</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (b) Steroid inhaler</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (c) Bronchodilator nebulised</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (d) Oral steroid</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (e) Oral bronchodilators</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
           
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> (f) Others</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                        <p className="control ">
                                <input className="input is-small" ref={register()}  name="specify_other_medication" type="text" placeholder="Specify" />           
                        </p>
                    </div>
                   
                </div>
                <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> 21. During the last 12 months, how many times have you needed steroids by mouth or
injection, such as prednisone </label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="age_diagnosis" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">  22 Have you ever smoked cigarette? (Yes means more than 2 cigarette in a week for a year)</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="No" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > No</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Yes (in the past)" onChange={(e)=>handleChangePart(e)}/>
                                    <span>Yes (in the past) </span>
                                </label>
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="Yes (Currently) " onChange={(e)=>handleChangePart(e)}/>
                                    <span>Yes (Currently) </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <h3><b>23 Other Symptoms</b></h3>
                    <div className="field">
                        <label>RESPIRATION</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Chest pain</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Haemoptysis</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Sputum production</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="field">
                        <label>CARDIOVASCULAR</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Dyspnoea on exertion</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Palpitation</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Orthopnoea</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Paroxysmal Nocturnal Dyspnoea</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Leg swelling</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="field">
                        <label>GASTROINTESTINAL</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Nausea</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Vomiting</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Abdominal pain</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Abdominal swelling</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Diarrhoea</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Constipation</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="field">
                        <label>GENITOURINARY</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Dysuria</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Urge incontinence</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Terminal dribbling</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Haematuria</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="field">
                        <label>CENTRAL NERVOUS SYSTEM</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Headache</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Dizziness</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Seizures</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Tremors</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <div className="field">
                        <label>ENDOCRINE</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Polyuria</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Polydipsia</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Polyphagia</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Weight loss</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                            
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Abnormal Weight gain</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Heat intolerance</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Cold intolerance</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                        <label>ENT</label>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Ear ache</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Ear Discharges</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Snoring</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Dysphagia</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <h3><b>24 Physical Examination</b></h3>
                <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Height(cm)</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="height" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Weight (cm)</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="Weight" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Palour </label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Jaundice</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Cyanosis</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="status" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="status"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Pulse (beats/min)</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="height" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Blood Pressure (mmHg)</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="Blood_Pressure" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                  
                   
                    <div className="field">
                        <label className="is-small">Other Cardiovascular system findings</label>
                    </div>
                    <div className="field">
                            <textarea className="textarea wt100 is-small" ref={register()}  name="Cardiovascular_findings" type="text" placeholder="Specify" />           
                        
                    </div>
                       
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Respiratory rate</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="respiraatory_rate" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Oxygen Saturation</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="oxygen_saturation" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Wheeze</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="wheeze" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="wheeze"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Crackles</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="crackles" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="crackles"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div> 
                    <div className="field">
                        <label className="is-small">Other Respirtory findings</label>
                    </div>
                    <div className="field">
                            <textarea className="textarea wt100 is-small" ref={register()}  name="respiratory_findings" type="text" placeholder="Specify" />           
                        
                    </div> 
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Urticaria</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="urticaria" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="urticaria"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Rash</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="rash" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="rash"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Hypopigmentation</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="hypopigmentation" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="hypopigmentation"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Hyperpigmentation</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="hyperpigmentation" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="hyperpigmentation"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div> 
                    <div className="field">
                        <label className="is-small">Other skin findings</label>
                    </div>
                    <div className="field">
                            <textarea className="textarea wt100 is-small" ref={register()}  name="skin_findings" type="text" placeholder="Specify" />           
                        
                    </div>  
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Hepatomegaly</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="hepatomegaly" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="hepatomegaly"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">Splenomegaly</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="splenomegaly" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="splenomegaly"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> Ascites</label>
                            </div>
                            <div className="field">
                                <label className=" is-small">
                                        <input  type="radio" name="ascites" value="Yes" onChange={(e)=>{handleChangePart(e)}}/>
                                            <span > Yes</span>
                                </label> 
                                <label className=" is-small ml-2">
                                    <input type="radio" name="ascites"  value="No" onChange={(e)=>handleChangePart(e)}/>
                                    <span>No </span>
                                </label>
                            </div>
                        </div>
                    </div>
                   
                    <div className="field">
                        <label className="is-small">Other GIT findings</label>
                    </div>
                    <div className="field">
                            <textarea className="textarea wt100 is-small" ref={register()}  name="GIT_findings" type="text" placeholder="Specify" />           
                        
                    </div> 
                    <div className="field">
                        <label className="is-small">Other Physical examination findings</label>
                    </div>
                    <div className="field">
                            <textarea className="textarea wt100 is-small" ref={register()}  name="physical_exam_findings" type="text" placeholder="Specify" />           
                        
                    </div> 
                    <h3><b>Investigations</b></h3>
                   <h4>CBC</h4>
                    <div className="field is-horizontal">
                    
                    <div className="field-body ml-6"> <div className="field ml-2"><h4>ABSOLUTE</h4></div></div>
                    <div className="field-body "> <div className="field ml-2"><h4>PERCENTAGE</h4></div></div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> PCV</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="PCV_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="PCV_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> WBC</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="WBC_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="WBC_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">NEUTROPHIL</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="NEUTROPHIL_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="NEUTROPHIL_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">LYMPHOCYTE</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="LYMPHOCYTE_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="LYMPHOCYTE_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">EOSINOPHIL</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="EOSINOPHIL_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="EOSINOPHIL_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small"> BASOPHIL</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="BASOPHIL_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="BASOPHIL_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body ml-3">  
                            <div className="field">
                                <label className="is-small">MONOCYTE</label>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="MONOCYTE_absolute" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                            <div className="field">
                                <p className="control ">
                                    <input className="input is-small" ref={register()}  name="MONOCYTE_percentage" type="text" placeholder="Specify" />           
                                </p>
                            </div>
                        </div>
                    </div>
                       {/*  <p className="control ">
                            <input className="input is-small" ref={register()}  name="Education" type="text" placeholder="Hihest Level of Education" />           
                        </p> */}
               
               {/* <div className="field">
                    <label className=" is-small">
                        <input  type="radio" name="status" value="Draft" checked onChange={(e)=>{handleChangePart(e)}}/>
                        <span > Draft</span>
                    </label> <br/>
                    <label className=" is-small">
                        <input type="radio" name="status"  value="Final" onChange={(e)=>handleChangePart(e)}/>
                        <span> Final </span>
                    </label>
                </div>  */}
               {/* <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control ">
                            <textarea className="textarea is-small" ref={register()}  name="Finding" type="text" placeholder="Findings" />                 
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control ">
                        <textarea className="textarea is-small" ref={register()}  name="Recommendation" type="text" placeholder="Recommendation" />
                        </div>
                    </div>
                    </div>
                    </div>
        

     <div className="field">
                <label className=" is-small">
                        <input  type="radio" name="status" value="Draft" checked onChange={(e)=>{handleChangePart(e)}}/>
                               <span > Draft</span>
                </label> <br/>
                <label className=" is-small">
                    <input type="radio" name="status"  value="Final" onChange={(e)=>handleChangePart(e)}/>
                    <span> Final </span>
                </label>
        </div> */}
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
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


