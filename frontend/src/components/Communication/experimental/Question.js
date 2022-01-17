import React, {useState,useContext, useEffect} from 'react'

import 'react-accessible-accordion/dist/fancy-example.css';
import ListView from './ListView';
import QuestionForm from './QuestionForm';

const QuestionDefinition = () => {
 return(
  <section className= "section remPadTop">
     {/*  <div className="level">
      <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
      </div> */}
      <div className="columns ">
          <div className="column is-6 ">
              <ListView />
              </div>
        
          <div className="column is-6 ">
          
          <QuestionForm />
          </div>
         {/*  <div className="column is-3 ">  <ReportCreate />
          
          {(state.financeModule.show ==='detail')&&<PatientProfile />}
          </div> */}

      </div>                            
      </section>
 
)
}

export default QuestionDefinition;
