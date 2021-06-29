/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import AsthmaIntake from './AsthmaIntake';
import PulmonologyIntake from './Pulmonology';
import NewPatientConsult from './NewPatientConsult';
import ProgressNote from './ProgressNote';
import MedicationList from './MedicationList';

export default function EncounterRight() {
    const {state,setState}=useContext(ObjectContext)
    console.log(state.DocumentClassModule.selectedDocumentClass)
    return (
        <div>
          {(state.DocumentClassModule.selectedDocumentClass.name==='Vital Signs') &&  <VitalSignCreate />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Clinical Note') &&   <ClinicalNoteCreate />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Lab Result') &&   <LabNoteCreate />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Prescription') &&   <PrescriptionCreate />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Diagnostic Request') &&   <LabrequestCreate />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Adult Asthma Questionnaire') &&   <AsthmaIntake />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Pediatric Pulmonology Form') &&   <PulmonologyIntake />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='New Patient Consultation Form') &&   <NewPatientConsult />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Progress Note') &&   <ProgressNote />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Medication List') &&   <MedicationList />}
         {( typeof state.DocumentClassModule.selectedDocumentClass.document !=='undefined' ) &&( typeof state.DocumentClassModule.selectedDocumentClass.document.documentType !=='undefined' ) && (state.DocumentClassModule.selectedDocumentClass.document.documentType==='Diagnostic Result') &&   <LabNoteCreate />} 
          
          
        </div>
    )
}

export function VitalSignCreate(){
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
    const [docStatus,setDocStatus] = useState("Draft")

    let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

    
    useEffect(() => {
        if( !!draftDoc && draftDoc.status==="Draft"){

           Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
               setValue(keys, value,  {
                   shouldValidate: true,
                   shouldDirty: true
               })

           ))
          // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
          // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
   }
        return () => {
            draftDoc={}
        }
    }, [draftDoc])

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
         // console.log(data);
        if (!!data.Height && !!data.Weight){
            data.BMI=Number(data.Weight)/((Number(data.Height))**2)
          //  console.log(data.Height,data.Weight)
           
                if (data.BMI>=30){
                    data.BMI_Status="Obese"
                }
                if (data.BMI>=25 && data.BMI<=29.9){
                    data.BMI_Status="Overweight"
                }
                if (data.BMI>=18.5&& data.BMI<=24.9){
                    data.BMI_Status="Normal Weight"
                }
                if (data.BMI< 18.5){
                    data.BMI_Status="Underweight "
                }
              //  console.log(data.BMI, data.BMI_Status)
           // return
        }
        
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=data
          document.documentname=state.DocumentClassModule.selectedDocumentClass.name
          document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.ClinicModule.selectedClinic.name+" "+state.ClinicModule.selectedClinic.locationType
          document.locationId=state.ClinicModule.selectedClinic._id
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status=docStatus==="Draft"?"Draft":"completed"

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

         // console.log(document)
         let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
         if (confirm){
           if (!!draftDoc &&  draftDoc.status==="Draft"){
               ClientServ.patch(draftDoc._id, document)
               .then((res)=>{
                   //console.log(JSON.stringify(res))
                   e.target.reset();
                   setDocStatus("Draft")
                  // setAllergies([])
                  /*  setMessage("Created Client successfully") */
                   setSuccess(true)
                   toast({
                       message: 'Documentation updated succesfully',
                       type: 'is-success',
                       dismissible: true,
                       pauseOnHover: true,
                     })
                     setSuccess(false)
               })
               .catch((err)=>{
                   toast({
                       message: 'Error updating Documentation ' + err,
                       type: 'is-danger',
                       dismissible: true,
                       pauseOnHover: true,
                     })
               })

           }else{
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Documentation created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Documentation ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
     }

    } 

      const handleChangeStatus=async (e)=>{
        // await setAppointment_type(e.target.value)
       
        setDocStatus(e.target.value)

        //console.log(e.target.value)

        }

    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    {state?.DocumentClassModule.selectedDocumentClass.name||""}
                </p>
            </div>
            <div className="card-content vscrollable">
            {/* <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small" ref={register()}  name="Temperature" type="text" placeholder="Temperature" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>                    
                        </p>
                    </div>
                
                
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register()}  name="Pulse" type="text" placeholder="Pulse" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>
                        
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">   
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small" ref={register()} name="Respiratory_rate" type="text" placeholder="Respiratory rate"/>
                        <span className="icon is-small is-left">
                        <i className=" fas fa-user-md "></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="Random_glucose" type="text" placeholder="Blood Glucose"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
            </div>  
        </div>
        <div className="field is-horizontal">
            <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="Systolic_BP" type="text" placeholder="Systolic BP"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="Diastolic_BP" type="text" placeholder="Diastolic_BP"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                </div> 
                </div> 
            <div className="field is-horizontal">
             <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="SPO2" type="text" placeholder="SPO2"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="Pain" type="text" placeholder="Pain"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
            </div>
        </div>
        <div className="field is-horizontal">
            <div className="field-body">
            <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="Height" type="text" placeholder="Height (m)"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="Weight" type="text" placeholder="Weight (Kg)"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                
            </div> 
        </div> 
        <div className="field">
                    <label className=" is-small">
                        <input  type="radio"  checked={docStatus==="Draft"} name="status" value="Draft"  onChange={(e)=>{handleChangeStatus(e)}}/>
                        <span > Draft</span>
                    </label> <br/>
                    <label className=" is-small">
                        <input type="radio" checked={docStatus==="Final"} name="status"  value="Final" onChange={(e)=>handleChangeStatus(e)}/>
                        <span> Final </span>
                    </label>
                </div>  
               
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" type="reset">
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

export function ClinicalNoteCreate(){
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
    const [docStatus,setDocStatus] = useState("Draft")

    let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

    useEffect(() => {
        if( !!draftDoc && draftDoc.status==="Draft"){

           Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
               setValue(keys, value,  {
                   shouldValidate: true,
                   shouldDirty: true
               })

           ))
          // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
          // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
   }
        return () => {
            draftDoc={}
        }
    }, [draftDoc])

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
          //console.log(data);
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=data
          document.documentname=state.DocumentClassModule.selectedDocumentClass.name
          document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.ClinicModule.selectedClinic.name+" "+state.ClinicModule.selectedClinic.locationType
          document.locationId=state.ClinicModule.selectedClinic._id
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status=docStatus==="Draft"?"Draft":"completed"
          //console.log(document)

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
        
          let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
          if (confirm){
            if (!!draftDoc &&  draftDoc.status==="Draft"){
                ClientServ.patch(draftDoc._id, document)
                .then((res)=>{
                    //console.log(JSON.stringify(res))
                    e.target.reset();
                    setDocStatus("Draft")
                   // setAllergies([])
                   /*  setMessage("Created Client successfully") */
                    setSuccess(true)
                    toast({
                        message: 'Documentation updated succesfully',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                      setSuccess(false)
                })
                .catch((err)=>{
                    toast({
                        message: 'Error updating Documentation ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                })
 
            }else{
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Documentation created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Documentation ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 
    }
}
const handleChangeStatus=async (e)=>{
    // await setAppointment_type(e.target.value)
   
    setDocStatus(e.target.value)

    //console.log(e.target.value)

    }
    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    {state?.DocumentClassModule.selectedDocumentClass.name||""}
                </p>
            </div>
            <div className="card-content vscrollable">
            {/* <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <textarea className="textarea is-small" ref={register()}  name="Symptoms" type="text" placeholder="Symptoms" />
                           {/*  <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>   */}                  
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                        <textarea className="textarea is-small" ref={register()}  name="Clinical Findings" type="text" placeholder="Clinical Findings" />
                        {/* <span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span> */}
                        
                        </div>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">   
                <div className="field">
                    <p className="control has-icons-left">
                        <textarea className="textarea is-small" ref={register()} name="Diagnosis" type="text" placeholder="Diagnosis"/>
                        {/* <span className="icon is-small is-left">
                        <i className=" fas fa-user-md "></i>
                        </span> */}
                    </p>
                </div>
                </div>
                </div>
        {/* <div className="field is-horizontal">
            <div className="field-body"> */}       
                <div className="field">
                    <div className="control has-icons-left">
                    
                        <textarea className="textarea is-small " ref={register()} name="Plan" type="text" placeholder="Plan"  />
   
                    </div>
        </div>
      
         <div className="field">
                    <label className=" is-small">
                        <input  type="radio"  checked={docStatus==="Draft"} name="status" value="Draft"  onChange={(e)=>{handleChangeStatus(e)}}/>
                        <span > Draft</span>
                    </label> <br/>
                    <label className=" is-small">
                        <input type="radio" checked={docStatus==="Final"} name="status"  value="Final" onChange={(e)=>handleChangeStatus(e)}/>
                        <span> Final </span>
                    </label>
                </div>  
               
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" type="reset">
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

export function LabNoteCreate(){
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

    const [docStatus,setDocStatus] = useState("Draft")

    let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

    useEffect(() => {
        if( !!draftDoc && draftDoc.status==="Draft"){

           Object.entries(draftDoc.documentdetail).map(([keys,value],i)=>(
               setValue(keys, value,  {
                   shouldValidate: true,
                   shouldDirty: true
               })

           ))
          // setSymptoms(draftDoc.documentdetail.Presenting_Complaints)
          // setAllergies(draftDoc.documentdetail.Allergy_Skin_Test)
   }
        return () => {
            draftDoc={}
        }
    }, [draftDoc])

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
          //console.log(data);
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=data
          document.documentname=`${data.Investigation} Result`  //"Lab Result"
          document.documentType="Diagnostic Result"
         // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status=docStatus==="Draft"?"Draft":"completed"
         // console.log(document)

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
          let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
          if (confirm){
            if (!!draftDoc &&  draftDoc.status==="Draft"){
                ClientServ.patch(draftDoc._id, document)
                .then((res)=>{
                    //console.log(JSON.stringify(res))
                    e.target.reset();
                    setDocStatus("Draft")
                   // setAllergies([])
                   /*  setMessage("Created Client successfully") */
                    setSuccess(true)
                    toast({
                        message: 'Documentation updated succesfully',
                        type: 'is-success',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                      setSuccess(false)
                })
                .catch((err)=>{
                    toast({
                        message: 'Error updating Documentation ' + err,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      })
                })
 
            }else{
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
    }

} 

const handleChangeStatus=async (e)=>{
    // await setAppointment_type(e.target.value)
   
    setDocStatus(e.target.value)

    //console.log(e.target.value)

    }
const handleChangePart=(e)=>{
    console.log(e)
}
    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Lab Result
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
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small" ref={register()}  name="Investigation" type="text" placeholder="Investigation" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>                    
                        </p>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <textarea className="textarea is-small" ref={register()}  name="Finding" type="text" placeholder="Findings" />                 
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                        <textarea className="textarea is-small" ref={register()}  name="Recommendation" type="text" placeholder="Recommendation" />
                        </div>
                    </div>
                    </div>
                    </div>
                    <div className="field">
                    <label className=" is-small">
                        <input  type="radio"  checked={docStatus==="Draft"} name="status" value="Draft"  onChange={(e)=>{handleChangeStatus(e)}}/>
                        <span > Draft</span>
                    </label> <br/>
                    <label className=" is-small">
                        <input type="radio" checked={docStatus==="Final"} name="status"  value="Final" onChange={(e)=>handleChangeStatus(e)}/>
                        <span> Final </span>
                    </label>
                </div>  
                
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" type="reset">
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

export function PrescriptionCreate(){
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
          document.documentname=state.DocumentClassModule.selectedDocumentClass.name
          document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.ClinicModule.selectedClinic.name+" "+state.ClinicModule.selectedClinic.locationType
          document.locationId=state.ClinicModule.selectedClinic._id
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status="completed"
          console.log(document)
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Documentation created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Documentation ' + err,
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
                    {state?.DocumentClassModule.selectedDocumentClass.name||""}
                </p>
            </div>
            <div className="card-content vscrollable">
            {/* <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small" ref={register()}  name="temperature" type="text" placeholder="temperature" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>                    
                        </p>
                    </div>
                
                
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register()}  name="pulse" type="text" placeholder="pulse" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>
                        
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">   
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small" ref={register()} name="respiratory_rate" type="text" placeholder="Respiratory rate"/>
                        <span className="icon is-small is-left">
                        <i className=" fas fa-user-md "></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="random_glucose" type="text" placeholder="Blood Glucose"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
            </div>  
        </div>
        <div className="field is-horizontal">
            <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="systolic_BP" type="text" placeholder="Systolic BP"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="diastolic_BP" type="text" placeholder="Diastolic_BP"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                </div> 
                </div> 
            <div className="field is-horizontal">
             <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="SPO2" type="text" placeholder="SPO2"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="pain" type="text" placeholder="Pain"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
            </div>
        </div>
        <div className="field is-horizontal">
            <div className="field-body">
                
            </div> 
        </div> 
               
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" type="reset">
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
export function LabrequestCreate(){
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
          document.documentname=state.DocumentClassModule.selectedDocumentClass.name
          document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.ClinicModule.selectedClinic.name+" "+state.ClinicModule.selectedClinic.locationType
          document.locationId=state.ClinicModule.selectedClinic._id
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status="completed"
          console.log(document)
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Documentation created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Documentation ' + err,
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
                    {state?.DocumentClassModule.selectedDocumentClass.name||""}
                </p>
            </div>
            <div className="card-content vscrollable">
            {/* <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small" ref={register()}  name="temperature" type="text" placeholder="temperature" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>                    
                        </p>
                    </div>
                
                
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register()}  name="pulse" type="text" placeholder="pulse" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>
                        
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">   
                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small" ref={register()} name="respiratory_rate" type="text" placeholder="Respiratory rate"/>
                        <span className="icon is-small is-left">
                        <i className=" fas fa-user-md "></i>
                        </span>
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="random_glucose" type="text" placeholder="Blood Glucose"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
            </div>  
        </div>
        <div className="field is-horizontal">
            <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="systolic_BP" type="text" placeholder="Systolic BP"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="diastolic_BP" type="text" placeholder="Diastolic_BP"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                </div> 
                </div> 
            <div className="field is-horizontal">
             <div className="field-body">
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="SPO2" type="text" placeholder="SPO2"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
                <div className="field">
                    <p className="control has-icons-left">
                    
                        <input className="input is-small" ref={register()} name="pain" type="text" placeholder="Pain"  />
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                    </p>
                </div> 
            </div>
        </div>
        <div className="field is-horizontal">
            <div className="field-body">
                
            </div> 
        </div> 
               
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" type="reset">
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