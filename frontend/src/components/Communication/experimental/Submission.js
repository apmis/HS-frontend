import { useEffect, useState } from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import client from '../../../feathers';
import SubmissionForm from './SubmissionForm';
import SubmissionListView from './SubmissionListView';
import SubmissionView from './SubmissionView';

let QuestionnaireServ;
let SubmissionServ;

const Submission = () => {
 const [questionnaires, setQuestionnaires] = useState([]);
 const [submissions, setSubmissions] = useState([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({questions: []});
 const [selectedSubmission, setSelectedSubmission] = useState()
 const [view, setView] = useState('edit');

 const onSubmitSubmission = (data) => {
  const questionnaire = questionnaires.find(q => q._id === data.questionnaire_id);
  const interactions = Object.keys(data).filter(key => key!== 'questionnaire_id').map((key) => {
   const question = questionnaire.questions.find(obj => obj.name ===  key);
   return {
     question: question._id,
     questionCaption: question.caption,
     index: question.index,
     response: data[key] || '',
   }});
   const submission = {
     interactions,
     questionGroup: questionnaire._id,
   }
   SubmissionServ.create(submission)
 };

 const handleSearch = (val) => {
  SubmissionServ.find({query: {questionGroup: selectedQuestionnaire._id}})
      .then((res)=>{
       setSubmissions(res.data)
      })
      .catch((err)=>{
       console.log(err)
      });
  }

  const handleRow = async (submission) => {
    setSelectedSubmission(submission);
    setView('detail');
  };


  const fetchQuestionnaires = () => {
   QuestionnaireServ.find({})
   .then(res => {
     setQuestionnaires(res.data || []);
     if(res.data.length)
     setSelectedQuestionnaire(res.data[0])
   }).catch(e => {
    console.log(e);
   })
 }

 const prepNewSubmission = (questionnaire) => {
   setSelectedSubmission({
    questionnaire,
    interactions: questionnaire.questions.map((question) => ({ question }))
   });
};

 useEffect(() => {
  QuestionnaireServ = client.service('questionnaire');
   SubmissionServ = client.service('conversation');

   SubmissionServ.on("created", () => handleSearch());
   SubmissionServ.on("updated", () => handleSearch());
   SubmissionServ.on("patched", () => handleSearch());
   SubmissionServ.on("removed", () => handleSearch());
   fetchQuestionnaires();
   handleSearch();
}, []);


 return(
  <section className= "section remPadTop">
      <div className="columns ">
          <div className="column is-6 ">
              <SubmissionListView
                onSelectSubmission={(submission) => { setView('detail'); setSelectedSubmission(submission)}}
                onChangeQuestionnnaire={(_id) => {
                 setSelectedQuestionnaire(questionnaires.find(q => q._id === _id))
                 if (selectedSubmission)
                 prepNewSubmission(selectedQuestionnaire);
                }}
                handleSearch={handleSearch}
                questionnaires={questionnaires} 
                submissions={submissions}
                onNew={() => prepNewSubmission(selectedQuestionnaire)}
              />
          </div>
          <div className="column is-6 ">
              { selectedSubmission && view === 'edit' ? <SubmissionForm onSave={onSubmitSubmission} submission={selectedSubmission}/> : <SubmissionView onEdit={handleRow} submission={selectedSubmission}/>}
          </div>
      </div>                            
      </section>
)
}

export default Submission;