import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const QuestionLine = ({question, onSubmit}) => {
 const { register, handleSubmit, formState: { errors } } = useForm();
 const [newOption, setNewOption] = useState(null);
 const [options, setOptions]  = useState(question.options || []);
 const [optionsStr, setOptionsStr] = useState('');

 const handleChangeInputType = (e) => {
   setNewOption(e.target.value.includes('OPTIONS') ? {label: '', value: ''} : null);
 }

 const addNewOption = () => {
  if (newOption.label && newOption.value) {
    setOptions([...options,  newOption]);
    setOptionsStr(JSON.stringify(options));
    setNewOption({label: '', value: ''})
  }
 }

useEffect(() => {
 setOptions(question.options || []);
},[question])
return (<div className='grid grid-cols-3'>
 <form onSubmit={handleSubmit(onSubmit)}>
   <div className="field">
     <input className="input is-small" type="hidden"  name="_id" defaultValue={question._id}  ref={register} />
      <div className="control has-icons-left grid-cols-2">
        <input className="input is-small" type="text" placeholder="Caption"  defaultValue={question.caption}  name="caption" ref={register}  />
       </div>
       <div className="control has-icons-left grid-cols-2">
        <input className="input is-small" type="text" defaultValue={question.name} placeholder="Name" name="name" ref={register}  />
       </div>
       <div className="control has-icons-left grid-cols-2">
        <input className="input is-small" type="number" {...register('index')} defaultValue={question.index} placeholder="Index" name="index" ref={register}  />
       </div>
       <div className="control has-icons-left grid-cols-2">
        <input className="input is-small" type="number" {...register('columns')} defaultValue={question.columns || 1} placeholder="Column sizing" min="1" max="3" defaultValue="1" name="columns" ref={register}  />
       </div>
       <select  className="is-small" onChange={handleChangeInputType} defaultValue={question.formInputType || 'default'} name="formInputType" ref={register} >
         <option value="TEXT_INPUT">Text Input</option>
         <option value="TEXT_AREA">Text Area</option>
         <option value="EMAIL">Email</option>
         <option value="DATE">Date</option>
         <option value="DATE_TIME">Date Time</option>
         <option value="DATE_RANGE">Date Range</option>
         <option value="NUMBER">Number</option>
         <option value="DECIMAL">Decimal</option>
         <option value="FILE_UPLOAD">File Upload</option>
         <option value="RADIO_OPTIONS">Radio Options</option>
         <option value="CHECKBOX_OPTIONS">Checkbox Options</option>
         <option value="SELECT_OPTIONS">Select Options</option>
       </select>
       <input type="hidden" name="options" value={optionsStr} ref={register} />
       {newOption && (<div className="control has-icons-left grid-cols-2">
       <div>Options {options.map((option,  i) => (<div key={i}><span>{option.label}({option.value}),</span><button type="button" className="react-datepicker__close-icon undefined" aria-label="Close" tabIndex="-1"></button></div>))} </div>
        <div className="react-datepicker__input-container">
         <input type="text" placeholder="Label" className="input is-small" value={newOption.label} onChange={({target: {value: label}}) => setNewOption({...newOption, label})}/>
         <input  className="input is-small"  type="text" placeholder="Value" value={newOption.value} onChange={({target: {value}}) => setNewOption({...newOption, value})}/>
         <button type="button" className="fas fa-plus-circle" aria-label="Close" onClick={addNewOption}></button>
        </div>
       </div>)}
       <button type="submit" className="button is-success is-small"  >
        {question._id ? 'Update' : 'Add'}
       </button>
   </div>
 </form>
 </div>)
}

export default QuestionLine;
