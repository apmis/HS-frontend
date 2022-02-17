import { useEffect, useState } from 'react';
import 'react-accessible-accordion/dist/fancy-example.css';
import client from '../../../feathers';
import QuestionnaireForm from './QuestionnaireForm';
import QuestionnaireListView from './QuestionnaireListView';


const Questionnaire = () => {


const QuestionnaireServ = client.service('questionnaire');
const QuestionServ = client.service('question');

 const [questionnaires, setQuestionnaires]=useState([])
 const [selectedQuestionnaire, setSelectedQuestionnaire] = useState({questions: []})
 const [draftQuestion, setDraftQuestion] = useState({});


 const onSubmitQuestionnaire = (questionnaire, reset) => {
   questionnaire.questions =  questionnaire.questions.map((question) => question._id);
  if (questionnaire._id) {
   return QuestionnaireServ.update(questionnaire._id, questionnaire);
  } else {
   questionnaire._id = undefined
   return QuestionnaireServ.create(questionnaire)
   .then(res => {
    console.log({res});
    setSelectedQuestionnaire(res)
   })
   .catch(e => {
    throw e
   })
  }
 };
 const onSubmitQuestion = (question) => {
  if (question.options === ""){
    question.options = [];
  }else {
    question.options = JSON.parse(question.options);
  }
  console.log({ question })
  if(question._id) {
    return QuestionServ.update(question._id, question);
  } else {
   question._id = undefined
   return QuestionServ.create(question)
   .then(res => {
    const questionnaire = {
     ...selectedQuestionnaire,
     questions: [...selectedQuestionnaire.questions, res]
    };
    setSelectedQuestionnaire(questionnaire);
    setDraftQuestion({});
    onSubmitQuestionnaire(questionnaire);
   })
   .catch(e => {
    throw e
   })
  }
 }


const handleSearch = (val) => {
 (QuestionnaireServ || client.service('question-group')).find({query: {}})
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
  return () => {
   // QuestionServ = null
   // QuestionnaireServ = null
  }
}, []);


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
