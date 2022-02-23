import { toast } from 'bulma-toast';
import { useEffect, useState } from 'react';
import client from '../../../feathers';
import SubmissionForm from './SubmissionForm';
import SubmissionListView from './SubmissionListView';
import SubmissionView from './SubmissionView';

const Submission = () => {
 const [questionnaires, setQuestionnaires] = useState([]);
 const [submissions, setSubmissions] = useState([]);
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({questions: []});
 const [selectedSubmission, setSelectedSubmission] = useState()
 const [view, setView] = useState('form');

 let QuestionnaireServ = client.service('questionnaire');
 let SubmissionServ = client.service('conversation');

 const onSubmitSubmission = (data) => {
   console.log({data});
  const questionnaire = questionnaires.find(q => q._id === selectedQuestionnaire._id);
  const interactions = Object.keys(data).filter(key => key!== 'questionnaire_id').map((key) => {
   const question = questionnaire.questions.find(obj => obj.name ===  key);
   return {
     question: question._id,
     questionCaption: question.caption,
     index: question.index,
     response: data[key] || '',
     active: false,
   }});
   const submission = {
     interactions,
     questionnaire: questionnaire._id,
     completed: true,
   }
   const id = selectedSubmission._id;
   console.log({id, submission})
  //  (id ? SubmissionServ.create(submission) : 
   SubmissionServ.update(id, submission).then((success) => {
      console.log({success})
      toast({
        message: 'Submited Successfully ' ,
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
      })
    })
    .catch((e) => {
      console.log({e})
      toast({
        message: 'Error occured submitting ' ,
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      })
    })
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

  const handleEdit = async (submission) => {
    const questionnaire = questionnaires.find(q => q._id === submission.questionnaire._id);
    setSelectedSubmission({
      ...submission,
      interactions: submission
        .interactions
        .map(interaction => ({...interaction, question: questionnaire.questions.find(({_id}) => _id === interaction.question) }))
    });
    setView('edit');
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
   setView('form');
};

 useEffect(() => {

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
              { selectedSubmission && view === 'detail' ? <SubmissionView onEdit={handleEdit} submission={selectedSubmission}/> : <SubmissionForm onSave={onSubmitSubmission} submission={selectedSubmission}/>}
          </div>
      </div>                            
      </section>
)
}

export default Submission;
