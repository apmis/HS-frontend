import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import { formatDistanceToNowStrict, format } from 'date-fns'


export  default function EmployeeSearch({id,getSearchfacility,clear}) {
    
    const ClientServ=client.service('employee')
    const [facilities,setFacilities]=useState([])
     const [searchError, setSearchError] =useState(false)
    const [showPanel, setShowPanel] =useState(false)
   const [searchMessage, setSearchMessage] = useState("") 
   const [simpa,setSimpa]=useState("")
   const [chosen,setChosen]=useState(false)
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)
   const [val,setVal]=useState("")
   const {user} = useContext(UserContext) 
   const {state}=useContext(ObjectContext)
    const [productModal,setProductModal]=useState(false)

    const getInitial=async(id)=>{
        if(!!id){
        await ClientServ.get(id).then((resp)=>{
            handleRow(resp)
        })
        .catch((err)=>console.log(err))
         }
       }
    
        useEffect(() => {
            getInitial(id)
            return () => {
                
            }
        }, [])

   const handleRow= async(obj)=>{
        await setChosen(true)
      
       
       await setSimpa(obj.firstname + " "+ obj.lastname + "  ("+ obj.profession + ", "+ obj.department + " Department )" )
       getSearchfacility(obj)
        setShowPanel(false)
        await setCount(2)
    }

    const handleBlur=async(e)=>{
    }
    const handleSearch=async(val)=>{
        setVal(val)
        if (val===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' 
       
        if (val.length>=3 ){
            ClientServ.find({query: {
                $or:[
                    {firstname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { lastname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { profession: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { department: {
                        $regex:val,
                        $options:'i' 
                    }},
                ],
              
                 facility: user.currentEmployee.facilityDetail._id,
                 $limit:20,
                 $sort: {
                    lastname: 1
                   }
                     }}).then((res)=>{
              console.log("employees  fetched successfully") 
              console.log(res.data) 
                setFacilities(res.data)
                 setSearchMessage(" Employees  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error searching Employees ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
             })
         }
        else{
            console.log("less than 3 ")
            console.log(val)
            setShowPanel(false)
            await setFacilities([])
            console.log(facilities)
        }
    }

    const handleAddproduct =()=>{
        setProductModal(true) 
    }
    const handlecloseModal =()=>{
        setProductModal(false)
        handleSearch(val)
    }
    useEffect(() => {
       if (clear){
           console.log("success has changed",clear)
           setSimpa("")
       }
        return () => {
            
        }
    }, [clear] )
    return (
        <div>
            <div className="field">
                <div className="control has-icons-left  ">
                    <div className={`dropdown ${showPanel?"is-active":""}`} style={{width:"100%"}}>
                        <div className="dropdown-trigger" style={{width:"100%"}}>
                            <DebounceInput className="input is-small  is-expanded mb-0" 
                                type="text" placeholder="Search for Employee"
                                value={simpa}
                                minLength={3}
                                debounceTimeout={400}
                                onBlur={(e)=>handleBlur(e)}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu expanded" style={{width:"100%"}}>
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item selectadd" > <span> {val} is not an employee</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item selectadd " key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <div ><span>{facility.lastname}</span>
                                        <span className="padleft">{facility.firstname}</span>
                                        <span className="padleft">{facility.profession}</span>
                                        <span className="padleft">{facility.department} Department</span>
                                        </div>
                            
                                        <br />
                                    </div>
                                    
                                    ))}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal ${productModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Store</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        </section>
                                    </div>
                                </div>       
        </div>
    )
}