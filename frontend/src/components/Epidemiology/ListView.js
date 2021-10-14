import React, { useContext, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { ObjectContext } from '../../context';
import client from '../../feathers'

const ListView = () => {
 let CaseDefServ;

 const stubList = [{
  diagnosis: {name:'Malaria'},
  snomed: 'Malaria',
  observation: [{
   name: 'Fever',
   category: 'Symptom',
   note: '',
   response: '',
   required: true
  }
  ],
  test: 'Test Protocol',
  treatment: 'Treatment Protocol',
  notification_destination: 'LGADNSO'
 }]

 const [caseDefinitions,setCaseDefinitions]=useState(stubList)
 const [selectedCaseDefinition, setSelectedCaseDefinition] = useState()

 useEffect(() => {
   CaseDefServ = client.service('casedefinition');
   handleSearch()
   return () => {
    CaseDefServ = null
   }
 }, []);

 const handleSearch = (val) => {
    CaseDefServ.find({query: {}})
      .then((res)=>{
         setCaseDefinitions([])
      })
      .catch((err)=>{
      });
  }

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
                 <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Laboratory test </span></div>
             </div>
             <div className=" pullup ">
                 <div className=" is-fullwidth vscrollable pr-1"> 
                 <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
                     <thead>
                             <tr>
                                 <th><abbr title="Serial No">S/No</abbr></th>
                                 <th><abbr title="Disease">Disease</abbr></th>
                                 <th><abbr title="Observation">Observations</abbr></th>
                                 <th><abbr title="Test">Test</abbr></th>
                                 <th><abbr title="Treatment">Treatment Protocol</abbr></th>
                                 <th><abbr title="Notifiable">Notifiable</abbr></th>
                             </tr>
                     </thead>
                     <tbody>
                         { caseDefinitions.map((definition, i)=> {
                             const {_id, diagnosis: {name}, observation, test, treatment, notification_destination} = definition;
                             return (<tr key={_id}  onClick={()=>handleRow(definition)} className={selectedCaseDefinition?._id===(_id)?"is-selected":""}>                                         
                             <th>{i+1}</th>
                             <td><span>{name}</span></td>
                             <th>{observation.length} Observations {observation.map((obj) => { `${obj.name},` })}</th>
                             <th>{test}</th>
                             <td>{treatment}</td>
                             <td>{notification_destination}</td>
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

const ReportView = () => {
 const {state,setState}=useContext(ObjectContext)
 
 return(
     <section className= "section remPadTop">
         <div className="columns ">
             <div className="column is-6 ">
                 <ListView />
                 </div>
           
             <div className="column is-6 ">
             
             {(state.financeModule.show ==='detail')&&  <Form />}
             </div>

         </div>                            
         </section>
    
 )
 
};


export default ListView;
