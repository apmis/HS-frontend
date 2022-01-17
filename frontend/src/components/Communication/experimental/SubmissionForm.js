import React from 'react';
import { useForm } from "react-hook-form";
import SubmissionLine from './SubmissionLine';

const SubmissionForm = ({onSave, submission}) => {
 const { register, handleSubmit, control } = useForm();
 
 const { questionnaire } = submission ||  {};
 if(!submission) return <></>
 return (
     <>
         <div className="card ">
         <div className="card-header">
             <p className="card-header-title">
                 New Submission
             </p>
         </div>
         <div className="card-content vscrollable remPad1">
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Name</label>
                 <div className="field">
                     <p className="control has-icons-left has-icons-right">
                      <input className="input is-small" name="name" readOnly type="text"  defaultValue={questionnaire.name} placeholder="Question"  />
                     </p>
                 </div>
                 </div>
                 </div>
         <div className="field is-horizontal">
             <div className="field-body">
             <label className=" is-small">Short name</label>
                 <div className="field">
                    <p className="control has-icons-left has-icons-right">
                      <input className="input is-small" name="response"  type="text" defaultValue={questionnaire.shortName} placeholder="Response"  />
                     </p>
                 </div>
                 </div>
                 </div>

        <div>{questionnaire?.questions?.length || 0} Questions</div>
        <form  onSubmit={handleSubmit(onSave)}>
          <input type="hidden" name="questionnaire_id" value={questionnaire._id}  ref={register}/>
          {(submission.interactions || []).sort((a, b) => a.index - b.index ).map((interaction, i) => <div key={i} style={{textAlign: 'left'}}>  <SubmissionLine control={control} key={interaction._id} interaction={interaction}/></div> )}
          <button type="submit" className="button is-success is-small"  >
         Submit
       </button>
        </form>
        
         </div>
         </div>
              
     </>
 )
}

export default SubmissionForm;
