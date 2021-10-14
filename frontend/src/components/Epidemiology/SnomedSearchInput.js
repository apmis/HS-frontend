import React,  { useState } from "react";
import Autosuggest from 'react-autosuggest';
import { useDebounce } from "./util";


const SnomedSearchInput = ({limit, placeholder, onSelected}) => {

const baseUrl = 'https://browser.ihtsdotools.org/snowstorm/snomed-ct';
const edition =  'MAIN';
const version = '2019-07-31';
const defaultLimit = 10;

 
const [searchTerm, setSearchTerm] = useState('');
 const [selectedSuggestion, setSelectedSuggestion] = useState();
 const [suggestions, setSuggestions] = useState([]);


 const onChange = (_,  {newValue}) => {
  setSearchTerm(newValue)
};

const inputProps = {
 placeholder: placeholder || 'Input snomed term',
 value: searchTerm,
 onChange
};

const getSuggestions = () => {
fetch(`${baseUrl}/${edition}/${version}/concepts?term=${searchTerm}&limit=${limit || defaultLimit}`)
.then((response) => response.json())
.then(response => {
setSuggestions(response.items)
});

};


const handleOnSelected = (suggestion2) => {
 console.log({suggestion2})
// setSearchTerm(suggestion.fsn.term)
 onSelected(suggestion2)
}



useDebounce(getSuggestions, 100, [searchTerm]);




return ( <Autosuggest
 suggestions={suggestions}
 onSuggestionsFetchRequested={({ value }) => { setSearchTerm(value)}}
 onSuggestionsClearRequested={() => setSuggestions([])}
 getSuggestionValue={suggestion => {return suggestion.pt.term}}
 renderSuggestion={(concept) => (<div>{concept.fsn.term}</div>)}
 inputProps={inputProps}
 onSuggestionSelected={handleOnSelected}
/>)

}


export default SnomedSearchInput;
