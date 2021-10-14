import React,  { useState } from "react";
import Autosuggest from 'react-autosuggest';
import { useDebounce } from "./util";


const SnomedSearchInput = ({limit, placeholder, onSelected}) => {

const baseUrl = 'https://browser.ihtsdotools.org/snowstorm/snomed-ct';
const edition =  'MAIN';
const version = '2020-07-31';
const defaultLimit = 10;


 
 const [searchTerm, setSearchTerm] = useState('');
 const [inputValue, setInputValue] = useState('')
 const [suggestions, setSuggestions] = useState([]);


 const onChange = (_,  {newValue}) => {
  if(typeof newValue === 'object') { setInputValue('');}
  else { setInputValue(newValue); }
};

const inputProps = {
 placeholder: placeholder || 'Input snomed term',
 value: inputValue,
 onChange
};

const getSuggestions = () => {
fetch(`${baseUrl}/${edition}/${version}/concepts?term=${searchTerm}&limit=${limit || defaultLimit}&semanticFilter=disorder`)
.then((response) => response.json())
.then(response => {
setSuggestions(response.items)
})
.catch(exception  =>{
 setSuggestions([])
});

};


const handleOnSelected = (_, { suggestion }) => {
 onSelected(suggestion)
}


useDebounce(getSuggestions, 100, [searchTerm]);

return ( <Autosuggest
 suggestions={suggestions}
 onSuggestionsFetchRequested={({ value }) => { setSearchTerm(value)}}
 onSuggestionsClearRequested={() => setSuggestions([])}
 getSuggestionValue={suggestion => suggestion}
 renderSuggestion={(concept) => (<div>{concept.fsn.term}</div>)}
 inputProps={inputProps}
 onSuggestionSelected={handleOnSelected}
/>)

}


export default SnomedSearchInput;
