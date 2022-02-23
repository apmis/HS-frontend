import { toast } from 'bulma-toast';
import { useEffect, useState } from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import client from '../../../feathers';
import QuestionnaireForm from './QuestionnaireForm';
import QuestionnaireListView from './QuestionnaireListView';


const Questionnaire = () => {


 const [questionnaires, setQuestionnaires]=useState([])
 const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({questions: []})
 const [draftQuestion, setDraftQuestion] = useState({});

 let QuestionnaireServ = client.service('questionnaire');
 let QuestionServ = client.service('question');


 const onSubmitQuestionnaire = (questionnaire, reset) => {
   questionnaire.questions =  questionnaire.questions.map((question) => question._id);
   questionnaire._id ? QuestionnaireServ.update(questionnaire._id, questionnaire) : QuestionnaireServ.create(questionnaire)
   .then(res => {
      setSelectedQuestionnaire(res)
      toast({
        message: 'Updated Questionnaire Successfully' ,
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
      })
   })
   .catch(e => {
    toast({
      message: 'Submission Questionnaire unsuccessful' ,
      type: 'is-danger',
      dismissible: true,
      pauseOnHover: true,
    });
   })
 };
 const onSubmitQuestion = (question) => {
  question.options = question.options === "" ? [] : JSON.parse(question.options);

  (question._id ? QuestionServ.update(question._id, question) : QuestionServ.create(question))
   .then(res => {
    const questionnaire = {
      ...selectedQuestionnaire,
      questions: [...selectedQuestionnaire.questions, res]
    };
    setDraftQuestion({});
    if(!question._id)
    onSubmitQuestionnaire(questionnaire);
    toast({
      message: 'Updated Question Successfully' ,
      type: 'is-success',
      dismissible: true,
      pauseOnHover: true,
    })
   })
   .catch(e => {
    toast({
      message: 'Error submitting Questionnaire ' ,
      type: 'is-danger',
      dismissible: true,
      pauseOnHover: true,
    })
   })
 }


const handleSearch = (val) => {
 (QuestionnaireServ).find({query: {}})
     .then((res)=>{
      setQuestionnaires(res.data)
     })
     .catch((err)=>{
      console.log(err)
     });
 }


 const handleCreateNew = async()=>{
    setSelectedQuestionnaire({questions: []})
 }

 useEffect(() => {
   QuestionnaireServ.on("created", () => handleSearch());
   QuestionnaireServ.on("updated", () => handleSearch());
   QuestionnaireServ.on("patched", () => handleSearch());
   QuestionnaireServ.on("removed", () => handleSearch());
   handleSearch();
   return (() => {
    QuestionnaireServ = null;
    QuestionServ = null;
   });
}, []); //eslint-disable react-hooks/exhaustive-deps


 return(
  <section className= "section remPadTop">
      <div className="columns ">
          <div className="column is-6 ">
              <QuestionnaireListView questionnaires={questionnaires} selectedQuestionnaire={selectedQuestionnaire} onSelectQuestionnaire={(questionnaire) => setSelectedQuestionnaire(questionnaire)} handleSearch={handleSearch} handleCreateNew={handleCreateNew} />
          </div>
          <div className="column is-6 ">
              <QuestionnaireForm questionnaire={selectedQuestionnaire} draftQuestion={draftQuestion} onSubmitQuestion={onSubmitQuestion} onSubmitQuestionnaire={onSubmitQuestionnaire}/>
          </div>
      </div>                            
      </section>
 
)
}

export default Questionnaire;
