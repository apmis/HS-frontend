/* eslint-disable */
import React, {useState,useContext, useEffect} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
import {toast} from 'bulma-toast'

import {UserContext,ObjectContext} from '../../context'
import {FacilitySearch} from '../helpers/FacilitySearch'




export function OrgList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const facilityServ=client.service('facility')
    const orgServ=client.service('organizationclient')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedFacility, setSelectedFacility]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    const {user} = useContext(UserContext)

   

    const handleCreateNew = async()=>{
        const    newfacilityModule={
            selectedFacility:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule}))
       
        

    }
    const handleRow= async(facility)=>{
        

        

        await setSelectedFacility(facility.organizationDetail)

        const    newfacilityModule={
            selectedFacility:facility.organizationDetail,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule}))
       

    }

   const handleSearch=(val)=>{
       const field='facilityName'
       console.log(val)
       if (val.length >0){
       orgServ.find({query: {
                $search:val,
                $limit:10,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Organization  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error creating facility, probable network issues "+ err )
                setError(true)
            })
        }else{
            getFacilities() 
        }
        }

        const getFacilities=()=>{
            orgServ.find({query: {
                facility:user.currentEmployee.facilityDetail._id,
                $limit:100,
                $sort: {
                    createdAt: -1
                  }
                    }})
            .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Organization  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating facility, probable network issues "+ err )
                    setError(true)
                })

        }

    useEffect(() => {
        getFacilities()

        orgServ.on('created', (obj)=>getFacilities())
        orgServ.on('updated', (obj)=>getFacilities())
        orgServ.on('patched', (obj)=>getFacilities())
        orgServ.on('removed', (obj)=>getFacilities())
        return () => {
           
        }
    },[])


    return(
            <>   
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
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
                        </div>
                    </div>
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Contracted Organizations </span></div>

                </div>
               {!!facilities[1] && <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="S/No">S/No</abbr></th>
                                        <th>Organization Name</th>
                                        <th><abbr title="Type">Type</abbr></th>
                                        <th><abbr title="Category">Category</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((facility, i)=>(

                                            <tr key={facility.organizationDetail._id} onClick={()=>handleRow(facility)} className={facility.organizationDetail._id===(selectedFacility?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <th>{facility.organizationDetail.facilityName}</th>
                                            <td>{facility.organizationDetail.facilityType}</td>
                                            <td>{facility.organizationDetail.facilityCategory}</td> 
                                           
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>   }            
            </>
              
    )
}

