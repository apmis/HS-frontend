/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {DocumentClassList} from './DocumentClass'

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import AsthmaIntake from './AsthmaIntake';
import PulmonologyIntake from './Pulmonology';
import NewPatientConsult from './NewPatientConsult';
import ProgressNote from './ProgressNote';
import MedicationList from './MedicationList';
import Clerking from './Clerking';
import AdmissionConsentForm from "../../clientForm/forms/admissionConsentForm";
import BinCard from "../../clientForm/forms/binCard";
import ContinuationSheet from "../../clientForm/forms/continuationSheet";
import DailyShiftHandoverNote from "../../clientForm/forms/dailyShiftHandoverNote";
import DamaForm from "../../clientForm/forms/damaForm";
import DiabetesMelitus from "../../clientForm/forms/diabetesMelitus";
import DialysisLogSheet from "../../clientForm/forms/dialysisLogSheet";
import DietOrder from "../../clientForm/forms/dietOrder";
import DischargeSummary from "../../clientForm/forms/dischargeSummary";
import ECGForm from "../../clientForm/forms/ecgForm";
import EmergencyForm from "../../clientForm/forms/emergencyForm";
import FluidIntakeOutput from "../../clientForm/forms/fluidIntake";
import GreenDiagnosticCentre from "../../clientForm/forms/greenDiagnosticCentre";
import MedicalBillingSheet from "../../clientForm/forms/medicalBillingSheet";
import LaboratoryReportForm from "../../clientForm/forms/laboratoryReportForm";
import LaboratoryObservationChart from "../../clientForm/forms/laboratoryObservationChart";
import MedicalSickLeave from "../../clientForm/forms/medicalSickLeave";
import OutpatientBillingSheet from "../../clientForm/forms/outpatientBillingSheet";
import OutpatientRegistrationForm from "../../clientForm/forms/outpatientRegistrationForm";
import PatientAppointmentCard from "../../clientForm/forms/patientAppointmentCard";
import PaymentVoucher from "../../clientForm/forms/paymentVoucher";
import PressureAreasTreatmentChart from "../../clientForm/forms/pressureAreasTreatmentChart";
import RadiologyRequestForm from "../../clientForm/forms/radiologyRequestForm";
import Receipt from "../../clientForm/forms/receipt";
import ReferralFormForConsultation from "../../clientForm/forms/referralFormForConsultation";
import VitalSignsFlowSheet from "../../clientForm/forms/vitalSignsFlowSheet";
import VitalSignsRecord from "../../clientForm/forms/vitalSignsRecord";
import SurgicalBookletConsentForm from "../../clientForm/forms/surgicalBookletConsentForm";

export default function EncounterRight() {
    const {state,setState}=useContext(ObjectContext)
    console.log(state.DocumentClassModule.selectedDocumentClass)

    const submitDocument = (data) => {
        console.log({data});
    }
    return (
        <div>
          {(state.DocumentClassModule.selectedDocumentClass.name==='Vital Signs') &&  <VitalSignCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Clinical Note') &&   <ClinicalNoteCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Lab Result') &&   <LabNoteCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Nursing Note') &&   <NursingNoteCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Doctor Note') &&   <DoctorsNoteCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Prescription') &&   <PrescriptionCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Diagnostic Request') &&   <LabrequestCreate onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Adult Asthma Questionnaire') &&   <AsthmaIntake onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Pediatric Pulmonology Form') &&   <PulmonologyIntake onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='New Patient Consultation Form') &&   <NewPatientConsult onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Progress Note') &&   <ProgressNote onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Medication List') &&   <MedicationList onSubmit={submitDocument} />}
          {(state.DocumentClassModule.selectedDocumentClass.name==='Clerking') &&   <Clerking onSubmit={submitDocument} />}
          {state.DocumentClassModule.selectedDocumentClass.name ===
        "Laboratory Report Form" && <LaboratoryReportForm  onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Labour Observation Chart" && <LaboratoryObservationChart  onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Green Diagnostic Center Request" && <GreenDiagnosticCentre  onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Admission Consent Form" && <AdmissionConsentForm  onSubmit={submitDocument}/>}
      {state.DocumentClassModule.selectedDocumentClass.name === "Bin Card" && (
        <BinCard onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Outpatient Registration Form" && <OutpatientRegistrationForm onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Outpatient Billing Sheet" && <OutpatientBillingSheet onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Medical Sick Leave Form" && <MedicalSickLeave onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Daily Shift Handover Note" && <DailyShiftHandoverNote onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name === "Dama Form" && (
        <DamaForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Inpatient Billing Sheet" && <MedicalBillingSheet onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Emergency Form" && <EmergencyForm onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Discharge Summary" && <DischargeSummary onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Diet Order" && <DietOrder onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name === "Ecg Form" && (
        <ECGForm onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Vital Signs Flow Sheet" && <VitalSignsFlowSheet onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Referral Form For Consultation" && <ReferralFormForConsultation onSubmit={submitDocument}/>}
      {state.DocumentClassModule.selectedDocumentClass.name === "Receipt" && (
        <Receipt  onSubmit={submitDocument} />
      )}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Radiology Request Form" && <RadiologyRequestForm  onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Pressure Areas Treatment Chart" && <PressureAreasTreatmentChart  onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Payment Voucher" && <PaymentVoucher  onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Surgical Booklet Consent Form" && <SurgicalBookletConsentForm onSubmit={submitDocument}/>}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Vital Signs Record" && <VitalSignsRecord onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Patient Appointment Card" && <PatientAppointmentCard onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Fluid Intake And Output Record" && <FluidIntakeOutput onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Diabetes Melitus Flowsheet" && <DiabetesMelitus onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Dialysis Log Sheet" && <DialysisLogSheet onSubmit={submitDocument} />}
      {state.DocumentClassModule.selectedDocumentClass.name ===
        "Continuation Sheet" && <ContinuationSheet onSubmit={submitDocument} />}
         {( typeof state.DocumentClassModule.selectedDocumentClass.document !=='undefined' ) 
            &&( typeof state.DocumentClassModule.selectedDocumentClass.document.documentType !=='undefined' ) 
            && (state.DocumentClassModule.selectedDocumentClass.document.documentType==='Diagnostic Result') 
            &&   <LabNoteCreate onSubmit={submitDocument} />} 
          
          
        </div>
    )
}

export function VitalSignCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    
    const {user} = useContext(UserContext) 
    
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
        
        return () => {
        
        }
    }, [user])

  
    useEffect(()=>{
        
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
        if (!!data.Height && !!data.Weight){
            data.BMI=Number(data.Weight)/((Number(data.Height))**2)
           
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
        }
        
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
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

         let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
         if (confirm){
           if (!!draftDoc &&  draftDoc.status==="Draft"){
               ClientServ.patch(draftDoc._id, document)
               .then((res)=>{
                   e.target.reset();
                   setDocStatus("Draft")
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
                e.target.reset();
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
       
        setDocStatus(e.target.value)


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
    const { register, handleSubmit,setValue} = useForm(); 
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
        return () => {
        
        }
    }, [user])

    useEffect(()=>{
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
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
        
          let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
          if (confirm){
            if (!!draftDoc &&  draftDoc.status==="Draft"){
                ClientServ.patch(draftDoc._id, document)
                .then((res)=>{
                    e.target.reset();
                    setDocStatus("Draft")
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
                e.target.reset();
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
   
    setDocStatus(e.target.value)


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
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <textarea className="textarea is-small" ref={register()}  name="Symptoms" type="text" placeholder="Symptoms" />
                        </p>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                        <textarea className="textarea is-small" ref={register()}  name="Clinical Findings" type="text" placeholder="Clinical Findings" />
                        
                        </div>
                    </div>
                    </div>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">   
                <div className="field">
                    <p className="control has-icons-left">
                        <textarea className="textarea is-small" ref={register()} name="Diagnosis" type="text" placeholder="Diagnosis"/>
                    </p>
                </div>
                </div>
                </div>
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
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    
    const {user} = useContext(UserContext) 
    
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
        return () => {
        
        }
    }, [user])

    useEffect(()=>{
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
          }
         document.documentdetail=data
          document.documentname=`${data.Investigation} Result`  
          document.documentType="Diagnostic Result"
         
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
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
          let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
          if (confirm){
            if (!!draftDoc &&  draftDoc.status==="Draft"){
                ClientServ.patch(draftDoc._id, document)
                .then((res)=>{
                    
                    e.target.reset();
                    setDocStatus("Draft")
                   
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
                e.target.reset();
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
   
    setDocStatus(e.target.value)


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

export function NursingNoteCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    
    const {user} = useContext(UserContext) 
    
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
        
        return () => {
        
        }
    }, [user])

  
    useEffect(()=>{
        
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
          }
         document.documentdetail=data
          document.documentname="Nursing Note"
          document.documentType="Nursing Note"
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
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
          let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
          if (confirm){
            if (!!draftDoc &&  draftDoc.status==="Draft"){
                ClientServ.patch(draftDoc._id, document)
                .then((res)=>{
                    e.target.reset();
                    setDocStatus("Draft")
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
                e.target.reset();
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
   
    setDocStatus(e.target.value)


    }
const handleChangePart=(e)=>{
    console.log(e)
}
    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Nursing Note
                </p>
            </div>
            <div className="card-content vscrollable remPad1">

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small" ref={register()}  name="Title" type="text" placeholder="Title" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>                    
                        </p>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <textarea className="textarea is-small" ref={register()}  name="Documentation" type="text" placeholder="Documentation" />                 
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

export function DoctorsNoteCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    
    const {user} = useContext(UserContext) 
    
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
        
        return () => {
        
        }
    }, [user])

  
    useEffect(()=>{
        
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
          }
         document.documentdetail=data
          document.documentname="Doctor Note"
          document.documentType="Doctor Note"
          document.location=state.employeeLocation.locationName +" "+ state.employeeLocation.locationType
          document.locationId=state.employeeLocation.locationId
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
          let confirm = window.confirm(`You are about to save this document ${ document.documentname} ?`)
          if (confirm){
            if (!!draftDoc &&  draftDoc.status==="Draft"){
                ClientServ.patch(draftDoc._id, document)
                .then((res)=>{
                    e.target.reset();
                    setDocStatus("Draft")
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
                e.target.reset();
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
   
    setDocStatus(e.target.value)


    }
const handleChangePart=(e)=>{
    console.log(e)
}
    return (
        <>
            <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                   Doctor's Note
                </p>
            </div>
            <div className="card-content vscrollable remPad1">

            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-small" ref={register()}  name="Title" type="text" placeholder="Title" />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hospital"></i>
                            </span>                    
                        </p>
                    </div>
            <div className="field is-horizontal">
                <div className="field-body">
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <textarea className="textarea is-small" ref={register()}  name="Documentation" type="text" placeholder="Documentation" />                 
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
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
    
    const {user} = useContext(UserContext) 
    
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
        
        return () => {
        
        }
    }, [user])

  
    useEffect(()=>{
        
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          console.log(data);
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
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
                e.target.reset();
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
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    const [facility,setFacility] = useState()
    const ClientServ=client.service('clinicaldocument')
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
        return () => {
        
        }
    }, [user])

    useEffect(()=>{
      if (!user.stacker){
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          console.log(data);
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName 
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
                e.target.reset();
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
