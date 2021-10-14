import React, {useState,useContext, useEffect} from 'react'

import 'react-accessible-accordion/dist/fancy-example.css';
import CaseDefinitionForm from './CaseDefinitionForm';
import ListView from './ListView';

const CaseDefinition = () => {
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
          
          <CaseDefinitionForm />
          </div>
         {/*  <div className="column is-3 ">  <ReportCreate />
          
          {(state.financeModule.show ==='detail')&&<PatientProfile />}
          </div> */}

      </div>                            
      </section>
 
)
}

export default CaseDefinition;
