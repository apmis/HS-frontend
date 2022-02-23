import React from 'react';
import { Controller } from 'react-hook-form';
import CheckboxInput from './input-fields/CheckboxInput';
import DateInput from './input-fields/DateInput';
import DateRangeInput from './input-fields/DateRangeInput';
import DateTimeInput from './input-fields/DateTimeInput';
import DecimalInput from './input-fields/DecimalInput';
import EmailInput from './input-fields/EmailInput';
import FileUpload from './input-fields/FileUpload';
import Input from './input-fields/Input';
import NumberInput from './input-fields/NumberInput';
import RadioInput from './input-fields/RadioInput';
import SelectInput from './input-fields/SelectInput';
import Textarea from './input-fields/Textarea';

const SubmissionLine = ({control, interaction: {question, response}}) => {
 const  getFormControl = (question) => {
    switch(question.formInputType) {
     case  'TEXT_INPUT':
      return (
       <Controller  noRef={true}
       as={Input}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />
     )
     case  'TEXT_AREA':
      return (<Textarea
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       error={true}
       errorText='Errorcheck your field'
     />)
     case  'EMAIL':
      return (<Controller  noRef={true}
       as={EmailInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'DATE':
      return (<Controller  noRef={true}
       as={DateInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'DATE_TIME':
      return (<Controller  noRef={true}
       as={DateTimeInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'DATE_RANGE':
      return (<Controller  noRef={true}
       as={DateRangeInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'NUMBER':
      return (<Controller  noRef={true}
       as={NumberInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'DECIMAL':
      return (<Controller  noRef={true}
       as={DecimalInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'FILE_UPLOAD':
      return (<Controller  noRef={true}
       as={FileUpload}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'RADIO_OPTIONS':
      return (<Controller  noRef={true}
       as={RadioInput}
       label={question.name}
       name={question.name}
       options={question.options || []}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
     case  'CHECKBOX_OPTIONS':
      return (<Controller  noRef={true}
       as={CheckboxInput}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
      case  'SELECT_OPTIONS':
       return (<Controller  noRef={true}
        as={SelectInput}
        label={question.name}
        name={question.name}
        type='text'
        placeholder={question.caption}
        control={control}
        options={question.options}
        defaultValue={response}
        error={true}
      />)
       case  'INFO':
        return (<div>{question.caption}</div>)
       default:
      return (<Controller  noRef={true}
       as={Input}
       label={question.name}
       name={question.name}
       placeholder={question.caption}
       control={control}
       defaultValue={response}
       error={true}
     />)
    }
 }

 return (<div className='grid grid-cols-3'>
   <div className="field">
     <input className="input is-small" type="hidden"  name="_id" defaultValue={question._id} />
      <div className="control has-icons-left grid-cols-2">
        {question.caption}
       </div>
       {getFormControl(question)}
   </div>
 </div>)
}

export default SubmissionLine;
