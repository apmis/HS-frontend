import React from 'react';

const SubmissionView= ({onEdit, submission}) => { 
 const { questionnaire, sessionId, receiverId, currentInteraction, completed, interactions } = submission ||  {};
 if(!submission) return <></>
 return (
     <>
         <div className="card ">
         <div className="card-header">
             <p className="card-header-title">
                Submission Details
             </p>
         </div>
         <div className="card-content vscrollable remPad1">
         <table>
            <tbody>
            <tr key="name">
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-hospital'></i>
                    </span>
                    Questionnaire:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {questionnaire.name}{" "}
                  </span>
                </td>
              </tr>
              <tr key="detail">
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-hospital'></i>
                    </span>
                    Recipient:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {receiverId}{" "}
                  </span>
                </td>
              </tr>
              <tr key="currentInteraction">
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-hospital'></i>
                    </span>
                    Current Interaction:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {currentInteraction && currentInteraction.questionCaption}{" "}
                  </span>
                </td>
              </tr>
              <tr key="currentInteraction">
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-hospital'></i>
                    </span>
                    Session:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {sessionId}{" "}
                  </span>
                </td>
              </tr>
              <tr key="Completed">
                <td>
                  <label className='label is-small'>
                    {" "}
                    <span className='icon is-small is-left'>
                      <i className='fas fa-hospital'></i>
                    </span>
                    Completed:
                  </label>
                </td>
                <td>
                  <span className='is-size-7 padleft' name='name'>
                    {" "}
                    {completed ? 'Yes' : 'No'}{" "}
                  </span>
                </td>
              </tr>
              {
                  interactions.map((interaction, i) => (<tr>
                    <td key={i}>
                      <label className='label is-small'>
                        {" "}
                        <span className='icon is-small is-left'>
                          <i className='fas fa-hospital'></i>
                        </span>
                        {interaction.questionCaption}:
                      </label>
                    </td>
                    <td>
                      <span className='is-size-7 padleft' name='name'>
                        {" "}
                        {interaction.response}{" "}
                      </span>
                    </td>
                  </tr>))
              }
            </tbody>
        </table>
          <button onClick={onEdit} type="submit" className="button is-success is-small"  >
         Edit
       </button>
        
         </div>
         </div>
              
     </>
 )
}

export default SubmissionView;
