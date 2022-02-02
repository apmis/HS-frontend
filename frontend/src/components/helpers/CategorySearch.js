import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import { formatDistanceToNowStrict, format } from 'date-fns'


export  default function CategorySearch({id,getSearchfacility,clear}) {
    
    const ClientServ=client.service('billing')
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
        console.log(id)
        if(!!id){

            let obj={
                categoryname:id,
    
            }
            console.log(obj)
            handleRow(obj)
       }
    }

        useEffect(() => {
            getInitial(id)
            return () => {
                
            }
        }, [])

   const handleRow= async(obj)=>{
        await setChosen(true)
      
       
       await setSimpa(obj.categoryname)
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
               
                   category: {
                        $regex:val,
                        $options:'i' 
                    },
                 $limit:1000,
                 $sort: {
                    category: 1
                   }
                     }}).then((res)=>{
                setFacilities(res.groupedOrder)
                 setSearchMessage("Service category fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error searching Service category  ' + err,
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
       
        let obj={
            categoryname:val,

        }
        console.log(obj)
        handleRow(obj)
       
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
                                type="text" placeholder="Search for Service Category"
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
                          { facilities.length>0?"":<div className="dropdown-item selectadd dropitem mb-4" onClick={handleAddproduct} > 
                         <strong>{val}</strong> is not a known service category! Add it? </div>}

                              {facilities.map((facility, i)=>(
                                
                                    <div className="dropdown-item selectadd " key={facility.categoryname} onClick={()=>handleRow(facility)}>
                                        
                                        <div ><span>{facility.categoryname}</span>
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