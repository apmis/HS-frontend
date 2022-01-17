import './input-fields/App.css';
import Autocomplete from './input-fields/Autocomplete';
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
import 'rsuite/dist/rsuite.min.css';

const options = ['Lagos', 'Abuja', 'Oyo'];
const suggestions = [
  'Alligator',
  'Bask',
  'Crocodilian',
  'Death Roll',
  'Eggs',
  'Jaws',
  'Reptile',
  'Solitary',
  'Tail',
  'Wetlands',
];

function InputFields() {
  return (
    <>
      <div
        style={{
        }}
      >
        <div className='container'>
         <div className='columns'>
          <div className='column'>
          <Input
            label='Full Name'
            type='text'
            placeholder='Goodness Dare'
            error={true}
          />
          </div>

          <div className='column'>
          <Textarea
            label='Description'
            error={true}
            errorText='Errorcheck your field'
          /></div>
          </div>
          <EmailInput label='E-mail' placeholder='E-mail' />
          <DateInput label='Date' placeholder='Date' />
          <DateTimeInput label='Date and Time' placeholder='Date and Time' />

          <Input label='Password' type='password' placeholder='Password' />
          <NumberInput label='Number' />
          <DecimalInput label='Decimal' />

          <SelectInput label='States' options={options} />
          <Autocomplete label='Country' suggestions={suggestions} />
          <FileUpload label='Upload' />
          <RadioInput label='Personal' />
          <CheckboxInput label='On' />
          <DateRangeInput ranges={[]} hoverRange='week' />
        </div>
      </div>
    </>
  );
}

export default InputFields;
