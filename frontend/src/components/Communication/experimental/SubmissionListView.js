import React, { useState } from 'react';

const SubmissionListView = ({onSelectSubmission, handleSearch, onChangeQuestionnnaire, questionnaires, submissions, onNew}) => {
 const [selectedSubmission, setSelectedSubmission] = useState({});

 return(     
         <> 
             <div className="level">
              <div className="level-left">
               <div className="level-item">
                <div className="field">
                 <p className="control has-icons-left  ">
                  <input className="input is-small " type="text" placeholder="Search Submissions" onChange={handleSearch} />
                   <span className="icon is-small is-left"><i className="fas fa-search"></i></span>
                   </p>
                   </div>
                   </div>
                   <div className="level-item">
                    <div className="react-datepicker-wrapper">
                     <div className="react-datepicker__input-container">
                     <select name="questionnaire" onChange={(e) => onChangeQuestionnnaire(e.target.value)}>
                           {questionnaires.map((questionnaire, i) => (<option key={i} value={questionnaire._id}>{questionnaire.name}</option>))}
                         </select>
                       </div>
                       </div>
                       </div>
                       </div>
                       <div className="level-item">
                        <span className="is-size-6 has-text-weight-medium">Submissions</span>
                       </div>
                       <div className="level-right">
                        <div className="level-item">
                         <div className="level-item">
                          <div className="button is-success is-small">
                           <button onClick={onNew} >New</button>
                          </div>
                          </div>
                         </div>
                        </div>
                       </div>
             <div className=" pullup ">
                 <div className=" is-fullwidth vscrollable pr-1"> 
                 <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                     <thead>
                             <tr>
                                 <th><abbr title="ID">S/No</abbr></th>
                                 <th><abbr title="Name">Name</abbr></th>
                                 <th><abbr title="Short-Name">Short Name</abbr></th>
                                 <th><abbr title="Asked">Asked</abbr></th>
                                 <th><abbr title="Answered">Answered</abbr></th>
                             </tr>
                     </thead>
                     <tbody>
                          {console.log(submissions)}
                         { submissions.map((submission, i)=> {
                             const {questionGroup:questionnaire, interactions} = submission;
                             const {_id, name, shortName, questions} = questionnaire || {};
                             return (<tr key={_id}  onClick={()=> {setSelectedSubmission(submission); onSelectSubmission(submission);}} className={selectedSubmission?._id===(_id)?"is-selected":""}>                                         
                             <td>{i+1}</td>
                             <th>{name}</th>
                             <td>{shortName}</td>
                             <th>{(questions || []).length} Questions</th>
                             <th>{(interactions || []).length} Questions</th>
                             </tr>
                         )})
                        }
                     </tbody>
                 </table>
                 
                 </div>  
             </div>
         </>          
 )
};

export default SubmissionListView;
