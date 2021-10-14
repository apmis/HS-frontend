import React, { useState } from 'react';
import SnomedSearchInput from './SnomedSearchInput';
import client from '../../feathers'

const CaseDefinitionForm = () => {
 const [selectedDisease, setSelectedDisease] =  useState();
 const [selectedFindings,  setSelectedFindings] = useState([]);
 const [treatment, setTreatment] = useState('')
 const [test, setTest] = useState('');
 const [notification, setNotification] = useState('');

 const findingItem = (text) => {
   return <li>{text}</li>
 }

 const handleSubmit = (e) => {
  e.preventDefault()
  const CaseDefServ = client.service('casedefinition');
  const caseDefinition =  {
    diagnosis: selectedDisease,
    observations: selectedFindings,
    treatmentprotocol: treatment,
    notificationDestination: notification
  }
  CaseDefServ.create(caseDefinition);
  return false;
 };

 const conceptToDisease = ({fsn: { term }, conceptId}) => ({
   name: term,
   icdcode: 'UNKNOWN',
   snomed: conceptId,
 });

 const conceptToFinding = ({fsn: { term }, conceptId}) => ({
   name: term,
   category: 'Finding',
   duration: 5,
   note: '',
   snomed: conceptId,
   response: 'YES',
   required: true,
 })

 return (
     <>
         <div className="card ">
         <div className="card-header">
             <p className="card-header-title">
                 New Case Definition
             </p>
         </div>
         <div className="card-content vscrollable remPad1">

         <form onSubmit={handleSubmit}>
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Select Diagnosis</label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                      <SnomedSearchInput onSelected={(concept) => setSelectedDisease(conceptToDisease(concept))}  />
                      {selectedDisease && selectedDisease.name}
                     </p>
                 </div>
                 </div>
                 </div>
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Add Findings</label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                      <SnomedSearchInput onSelected={(obj)  => setSelectedFindings([...selectedFindings,  conceptToFinding(obj)])} />
                      {
                       <ul>{selectedFindings.map((obj) => findingItem(obj.name))}</ul>
                      }
                     </p>
                 </div>
                 </div>
                 </div>
          
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Enter Test Plan </label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                       <textarea onChange={(e) => setTest(e.target.value)} className="textarea is-small" placeholder="Test Plan"></textarea>
                     </p>
                 </div>
                 </div>
                 </div>
        
          
                 <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Enter Treatment Plan </label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                       <textarea onChange={(e) => setTreatment(e.target.value)} className="textarea is-small" placeholder="Treatment Plan"></textarea>
                     </p>
                 </div>
                 </div>
                 </div>

                 <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Notification Destination </label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                       <select onChange={() => setNotification(e.target.value)}><option value="LGADNSO">LocalGovenment DNSO</option></select>
                     </p>
                 </div>
                 </div>
                 </div>
        
          <div className="field  is-grouped mt-2" >
             <p className="control">
                 <button type="submit" className="button is-success is-small"  >
                 {"Submit"}
                 </button>
             </p>
         </div>
  
         </form>
         </div>
         </div>
              
     </>
 )
}

export default CaseDefinitionForm;
