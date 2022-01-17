import React, { useContext, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { ObjectContext } from '../../../context';
import client from '../../../feathers'

const QuestionnaireListView = ({questionnaires, selectedQuestionnaire,  handleSearch, handleCreateNew, onSelectQuestionnaire}) => {

 return(     
         <>  
             <div className="level">
                 <div className="level-left">
                     <div className="level-item">
                         <div className="field">
                             <p className="control has-icons-lefot  ">
                                 <DebounceInput className="input is-small " 
                                     type="text" placeholder="Search Bills"
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
                 <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of  Questionnaires</span></div>
                 <div className="level-right">
                     <div className="level-item"> 
                         <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
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
                                 <th><abbr title="ShortName">Short Name</abbr></th>
                                 <th><abbr title="Questions">Questions</abbr></th>
                             </tr>
                     </thead>
                     <tbody>
                         { questionnaires.map((questionnaire, i)=> {
                             const {_id, name, shortName} = questionnaire;
                             return (<tr key={_id}  onClick={()=> {onSelectQuestionnaire(questionnaire)}} className={selectedQuestionnaire?._id===(_id)?"is-selected":""}>                                         
                             <td>{i+1}</td>
                             <th>{name}</th>
                             <td>{shortName}</td>
                             <th>{questionnaire.questions.length} Questions {questionnaire.questions.map((obj) => {  })}</th>
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

export default QuestionnaireListView;
