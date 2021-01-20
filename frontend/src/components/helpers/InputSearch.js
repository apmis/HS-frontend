import React, {useState,useContext, useEffect} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';

export default function InputSearch2() {
    const facilityServ=client.service('facility')
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
     const [searchError, setSearchError] =useState(false)
     // eslint-disable-next-line
    const [showPanel, setShowPanel] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 

   const handleRow= async(obj)=>{
        await setSelectedFacility(obj)
        setShowPanel(false)
        /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
   //console.log(state)
}

    const handleSearch=(val)=>{
        const field='facilityName' //field variable
        console.log(val)
        facilityServ.find({query: {     //service
                 [field]: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
                 console.log(res)
                setFacilities(res.data)
                 setMessage(" facility  fetched successfully")
                 setShowPanel(false)
             })
             .catch((err)=>{
                 console.log(err)
                 setSearchMessage("Error searching facility, probable network issues "+ err )
                 setSearchError(true)
             })
         }
    return (
        <div>
            <div className="field">
                <p className="control has-icons-left  ">
                    <DebounceInput className="input is-small " 
                        type="text" placeholder="Search Facilities"
                        minLength={3}
                        debounceTimeout={400}
                        onChange={(e)=>handleSearch(e.target.value)} />
                    <span className="icon is-small is-left">
                        <i className="fas fa-search"></i>
                    </span>
                </p>
            </div>
          {showPanel &&  <div className="onTop">
            <table>
              <tbody>
                {searchError&&<tr>{searchMessage}</tr>}
                 {setTimeout(() => {
                    setSearchError(false)
                }, 200)}
                
               
                {facilities.map((facility, i)=>(

                    <tr key={facility._id} onClick={()=>handleRow(facility)}>
                        <td>{i+1}</td>
                        <td>{facility.facilityName}</td>
                        {/*< td>{facility.facilityAddress}</td>
                        <td>{facility.facilityCity}</td>
                        <td>{facility.facilityContactPhone}</td>
                        <td>{facility.facilityEmail}</td>
                        <td>{facility.facilityType}</td>
                        <td>{facility.facilityCategory}</td>
                    
                    <td><span   className="showAction"  >...</span></td> */}
                    </tr>

                ))}
             </tbody>
            </table>
            </div>}
        </div>
    )
}
