import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import QuestionLine from './QuestionLine';

const QuestionnaireForm = ({questionnaire, onSubmitQuestionnaire, draftQuestion, onSubmitQuestion}) => {
 const { register, handleSubmit } = useForm();
 const onHandleSubmit = (obj) => {
  onSubmitQuestionnaire({...questionnaire, ...obj})
 }

 return (
     <>
         <div className="card ">
         <div className="card-header">
             <p className="card-header-title">
                 New Questionnaire
             </p>
         </div>
         <div className="card-content vscrollable remPad1">
         <form onSubmit={handleSubmit(onHandleSubmit)}>
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Name</label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                      <input className="input is-small" name="name" defaultValue={questionnaire.name} placeholder="Name" ref={register} />
                     </p>
                 </div>
                 </div>
                 </div>
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Short name</label>
                 <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input className="input is-small" name="shortName" defaultValue={questionnaire.shortName} placeholder="Short Name" ref={register} />
                     </p>
                 </div>
                 </div>
                 </div>
                 <input type="submit" className="button is-success is-small" value={questionnaire._id ? 'Update' : 'Add'} />
         </form>
         <div>{questionnaire?.questions?.length || 0} Questions</div>
        <div style={{textAlign: 'left'}}> 
        {(questionnaire.questions || []).sort((a, b) => a.index - b.index ).map((question, i) => <div key={i} style={{textAlign: 'left'}}>  <QuestionLine key={question._id || i} question={question} onSubmit={onSubmitQuestion}/></div>)}
        </div>
         <QuestionLine key={draftQuestion._id} question={draftQuestion} onSubmit={onSubmitQuestion}/>
         </div>
         </div>
              
     </>
 )
}

export default QuestionnaireForm;
