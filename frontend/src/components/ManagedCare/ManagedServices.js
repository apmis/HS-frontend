/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {FacilitySearch} from '../helpers/FacilitySearch'
import CategorySearch from "../helpers/CategorySearch"
import  ServiceSearch2  from '../helpers/ServiceSearch';
import {OrgList } from './OrgClientList';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemState,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';



import 'react-accessible-accordion/dist/fancy-example.css';
import { StoreModify } from '../inventory/Store';

const searchfacility={};


export default function ManagedServices() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedServices,setSelectedServices]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">

            <div className="column is-6 ">
                <ManagedServicesList />
                </div>
            <div className="column is-6 ">
                {(state.ServicesModule.show ==='create')&&<ManagedServicesCreate />}
            </div>

            </div>                            
            </section>
       
    )
    
}

export function ManagedServicesCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [categoryname, setCategoryName] =useState("")
    const [success, setSuccess] =useState(false)
    const [success2, setSuccess2] =useState(false)
    const [cash,setCash] = useState("Cash")
    
    const [facility,setFacility] = useState()
    const [providerBand,setProviderBand] = useState([])
    const [benefittingPlans1,setBenefittingPlans1] = useState([])
    const ServicesServ=client.service('billing')
    const BandsServ=client.service('bands')
    
    const {user} = useContext(UserContext) 
    
    const [facilityId,setFacilityId] = useState("")
    const [source,setSource] = useState("")
    const [panel,setPanel] = useState(false)
    const [name,setName] = useState("")
    const [benefittingplans,setBenefittingPlans] = useState([])
    const [quantity,setQuantity] = useState()
    const [costprice,setCostprice] = useState("")
    const [orgType,setOrgType] = useState("")
    const [comments,setComments] = useState("")
    const [productItem,setProductItem] = useState([])
    const [plan,setPlan] = useState("")
    const [service,setService] = useState("")
    const [currentUser,setCurrentUser] = useState("")
    const [panelList,setPanelList] = useState([])
    const [successService,setSuccessService] = useState(false)
    const {state}=useContext(ObjectContext)
    const [chosen2, setChosen2]=useState()
    const [modifier, setModifier]=useState([])
    const [subplan, setSubplan]=useState({})
    const [band, setBand]=useState("")
    const [serviceUnavailable, setServiceUnavailable]=useState({
                                                            status:false,
                                                            name:""
                                                            })

   
   
   const [checked, setChecked] = useState(false);
 
   const handleChange = async(e,i,c) => {
   
     c.checked = !c.checked

     const newPlan={
        name:c.name,
        checked:false
    }
    
     if (c.checked){
         
         let planx={
            name:c.name,
            serviceClass:"",
            feeforService:true,
            capitation:false,
            reqAuthCode:false,
            reqCopay:false,
            copay:""
            }
         
        await setBenefittingPlans((prev)=>([...prev, planx])) 

     }else{
       await setBenefittingPlans( prevstate=>prevstate.filter(el=>el.name!==c.name))
     }

   };

  const updateObjectInArray= (array, child) => {
      array.map((item, index) => {
      if (item.name !== child.name) {
        
        return item
      }
      
      
      return {  
        ...child
      }
    })
    return array
  }
   
   const handleChangeMode = async(e) => {
    
    let existingBand=productItem.filter(el=>el.band===e.target.value)
    if (!existingBand.length>0){
        await setBand(e.target.value)
    }else{
        toast({
            message: " This band already exist! Please choose another band ",
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })
          return
    } 
   };


   const handleServType = async(e,i,c) => {
    let currentPlan=benefittingplans.filter(el=>el.name==c.name)[0]
    currentPlan.serviceClass = e.target.value
    currentPlan.capitation = e.target.value==="Capitation"?true:false
    currentPlan.feeforService = e.target.value==="Fee for Service"?true:false
    const updatedplan= updateObjectInArray(benefittingplans,currentPlan)
    await setBenefittingPlans(updatedplan)
   }


   const handleCopay = async(e,i,c) => {
    let currentPlan=benefittingplans.filter(el=>el.name==c.name)[0]
    currentPlan.copay = e.target.value
    currentPlan.reqCopay=currentPlan.copay===""?false:true
    const updatedplan= updateObjectInArray(benefittingplans,currentPlan)
    await setBenefittingPlans(updatedplan)
   };

   const handleAuthCode   = async(e,i,c) => {
     let currentPlan=benefittingplans.filter(el=>el.name==c.name)[0]
     currentPlan.reqAuthCode = e.target.checked
     const updatedplan= updateObjectInArray(benefittingplans,currentPlan)
     await setBenefittingPlans(updatedplan)
   };

   useEffect(() => {
       
       return () => {
          
       }
   }, [benefittingplans])

    const [Services,setServices]=useState({
        productitems:[],
        panel,
        source,

    })
   
  

    
    
    const getSearchfacility=(obj)=>{

        setFacilityId(obj._id)
        setName(obj.facilityName)
        setOrgType(obj.facilityType)

        if(!obj){
       
        setOrgType("")
        setFacilityId("")
        setCostprice("")

        }
        
    }
    const getSearchfacility2=(obj)=>{

        setCategoryName(obj.categoryname)
        setChosen2(obj)
        
         if (!obj){
             
             setCategoryName("")
             setChosen2()
            
         }
     }

    const getSearchService=(obj)=>{
            setService(obj)
        if(!obj){
            setService("")
        }
            setSuccessService(false)
    }

    const notfound= async(obj)=>{

       
       await  setServiceUnavailable(obj)
        await setSuccessService(true)
        if (!obj){
        await  setServiceUnavailable("")
        }
      
       
    }
    
    useEffect(() => {
        setCurrentUser(user)
        
       
        return () => {
        
        }
    }, [user])

   const getBenfittingPlans = async()=>{
    setBenefittingPlans1([])
    if (user.currentEmployee){
            
        const findServices= await ServicesServ.find(
                {query: {
                    facility: user.currentEmployee.facilityDetail._id,
                    'contracts.source_org' : user.currentEmployee.facilityDetail._id ,
                    'contracts.dest_org' : user.currentEmployee.facilityDetail._id ,
                    category:"Managed Care",
                  
                  
               
                    $sort: {
                        category: 1
                    }
                    }})
                    console.log(findServices)
                    if (findServices.total>0){
             
        findServices.groupedOrder[0].services.forEach(async (c)=>{
            const newPlan={
                name:c.name,
                checked:false
            }
            await setBenefittingPlans1((prev)=>(prev.concat(c)))
                })
            }
        }

   }
   const getProviderBand = async()=>{
    if (user.currentEmployee){
            
        const findServices= await BandsServ.find(
                {query: {
                    facility: user.currentEmployee.facilityDetail._id,
                    bandType:(user.currentEmployee.facilityDetail.facilityType==="HMO")?"Provider":"Company",
                    
                  
                  
               
                    $sort: {
                        category: 1
                    }
                    }})
                  
         await setProviderBand(findServices.data)
       
                }
       
}

    useEffect(() => {
      
        setBenefittingPlans1([])
        setFacilityId(user.currentEmployee.facilityDetail._id) 
        setName(user.currentEmployee.facilityDetail.facilityName) 
        setOrgType(user.currentEmployee.facilityDetail.facilityType)
        getProviderBand()
        getBenfittingPlans()
        return () => {
         
        }
    }, [])

    const handleClickProd=async()=>{
        let pricingInfo ={
            band,
            costprice,
            benefittingplans
        }
        
        let productItemI={
            name: service.name,
            categoryname,
            comments,
            pricingInfo      
        }
     
       
                if(!costprice ){
                    toast({
                        message: 'You need to enter price ' ,
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                    }) 
                    return
                }
 
            if( !service.name && !serviceUnavailable.name){
                toast({
                    message: 'You need to enter service name ' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                }) 
                return
            }
            if( !categoryname){
                toast({
                    message: 'You need to enter category ' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                }) 
                return
            }
            if( band===""){
                toast({
                    message: 'You need to choose provider band ' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                }) 
                return
            }
            if( !benefittingplans.length>0){
                
                toast({
                    message: 'You need to add benefiting plan ' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                }) 
               
                return
            }
            let check=  await handleCheck()
            if (check){
                
                return
            }
            productItemI={
               source_org:facilityId, 
               source_org_name:name, 
               dest_org:user.currentEmployee.facilityDetail._id,
               dest_org_name:user.currentEmployee.facilityDetail.facilityName,
               price:costprice,
               billing_type:orgType==="HMO"?"HMO":"Company", 
               plans:benefittingplans,
               comments:comments,
            
               band:band
            } 
            console.log(productItemI)
            await setCash("")
       
       
        await setSuccess(false)
        setProductItem(
            prevProd=>prevProd.concat(productItemI)
        )
       
      
        setCostprice("")
        setBand("")
        setBenefittingPlans([])
        setBenefittingPlans1([])
        getBenfittingPlans()

       await setSuccess(true)
     
    }
 

    const resetform=()=>{
  
    setSource("")
    setPanel(false)
    setComments("")
    setCostprice("")
    setProductItem([])
    setCategoryName("")
   setService("")
    setPanelList([])
    setPlan("")
    setBenefittingPlans([])
    setCash("Cash")
    setOrgType("")
     setServiceUnavailable("")
    setServices("")

    }
    const handleClear=()=>{
        resetform()
            setSuccess(true)
            setSuccess2(true)
            setSuccessService(true)
            toast({
                message: 'Data entry cleared succesfully',
                type: 'is-success',
                dismissible: true,
                pauseOnHover: true,
            })
            setSuccess(false)
            setSuccess2(false)
            setSuccessService(false)
            setProductItem([])
            setPanelList([])
    }

    const onSubmit = async() =>{
        let check= await handleCheck()
        if (check){
            console.log(check)
            return
        }
       if(panel && (panelList.length===0)){
        toast({
            message: "Please choose services that make up panel or uncheck panel ",
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })
          return   
       }

        setSuccess(false)
            
        let data ={
                        name: serviceUnavailable.status? serviceUnavailable.name:service.name, 
                        category:categoryname,
                        facility:user.currentEmployee.facilityDetail._id,
                        facilityname:user.currentEmployee.facilityDetail.facilityName,
                        panel:panel,
                        panelServices:panelList,
                        contracts:productItem,
                        createdBy:user._id
                    }
                    
        ServicesServ.create(data)
        .then((res)=>{
            setSuccessService(true)
                resetform()
                setSuccess(true)
                setSuccess2(true)
                
                toast({
                    message: 'Service created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                })
                setSuccess(false)
                setSuccess2(false)
                setSuccessService(false)
                setProductItem([])
                setPanelList([])
                setServiceUnavailable({
                    status:false,
                    name:""
                })
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Services ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                })
            })
               
        } 
                    
    

const handleBenefit=(e)=>{
   
    setBenefittingPlans(prevstate=>prevstate.concat(plan))
    setPlan("")
    }

const handleRemove=(index, contract)=>{
    if (contract.billing_type==="Cash"){
        toast({
            message: 'You cannot remove cash billing' ,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })
        return
    }

   setProductItem(prevstate=> prevstate.filter((ProductionItem, i) => i !== index));
   
}
const handleAddPanel =()=>{
   let newService={
       serviceId:service._id,
       service_name:service.name,
       panel:service.panel
   }
    setPanelList(prevstate=>prevstate.concat(newService))
    setSuccessService(true)
    newService={}
    setService("")
    console.log("something added")
    
}
const handleCheck= async ()=>{
    
    if (!categoryname){
        toast({
            message: 'Enter Category!',
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          }) 
        return true
    }
   console.log("unavailb:",serviceUnavailable.name)
   console.log("availb:", service.name)
   const resp= await ServicesServ.find({
        query:{
            name: serviceUnavailable.name||service.name, 
            facility: user.currentEmployee.facilityDetail._id,
            category:categoryname
        }
    })
    console.log(resp)
        if (resp.data.length>0){
        toast({
            message: 'Service already exist. Kindly modify it ',
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          }) 
          return true
        }else{
            return false
        }
}
    

    return (
        <>
            <div className="card card-overflow">
            <div className="card-header">
                <p className="card-header-title">
                    Create Services
                </p>
            </div>
            <div className="card-content vscrollable remPad1 ">
   
            <div className="field">
                    <div className="field is-expanded"  >
                        <ServiceSearch  getSearchService={getSearchService} clear={successService} notfound={notfound}  /> 
                        <p className="control has-icons-left " style={{display:"none"}}>
                            <input className="input is-small"  />
                            <span className="icon is-small is-left">
                            <i className="fas  fa-map-marker-alt"></i>
                            </span>
                        </p>
                    </div>  
                </div>
           
                     
          
              
           
                <div className="field is-expanded"   >
                    <CategorySearch  getSearchfacility={getSearchfacility2} clear={success2} /> 
                    <p className="control has-icons-left " style={{display:"none"}}>
                        <input className="input is-small"  value={categoryname} name="categoryname" type="text" onChange={e=>setCategoryName(e.target.value)} placeholder="Category of Service" />
                        <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                        </span>
                    </p>
                </div>
                <div className="field is-expanded"   >
                   
                    <p className="control has-icons-left ">
                        <input className="input is-small"    value={comments} name="comments" type="text" onChange={e=>setComments(e.target.value)} placeholder="Comments" />
                        <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                        </span>
                    </p>
                </div>
       
        
        <label className="label is-small">Add Pricing Info:</label>
        <div className="field is-horizontal">
            <div className="field-body">
                <div className="field">    
                        <div className="control">
                            <div className="select is-small ">
                                <select name="bandType" value={band} onChange={(e)=>handleChangeMode(e)} className="selectadd" >
                                <option value="">{(user.currentEmployee.facilityDetail.facilityType==="HMO")?"Choose Provider Band":"Choose Company Band"}  </option>
                                {providerBand.map((option,i)=>(
                                    <option key={i} value={option.name}> {option.name}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                    </div>

                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input is-small"  name="costprice" value={costprice} type="text" onChange={e=>setCostprice(e.target.value)} placeholder="Price"  />
                        <span className="icon naira is-left">
                        <b>&#8358;</b>
                        </span>
                    </p>
            </div>
            </div>
        </div>
              
      
        
        <label className="label is-small">Benefitting Plans:</label>
        <div className="field is-horizontal">
            <div className="field-body">
            <div className="field">    
                        
                        <div className="field ">
                            {
                                benefittingPlans1.map((c,i) => 
                                    < >
                                    <div className="pb-2">
                                        <div className= "field is-horizontal"> 
                                                    <div className="field-body">
                                                    <div className="field mr-2 ">
                                                    <label  className="label is-small mr-2" key={i}>
                                                        <input className="checkbox is-small " 
                                                            type="checkbox" 
                                                            value={i} 
                                                            name={`selectedPlans +${i}`}
                                                            onChange={(e)=>handleChange(e,i,c)}
                                                            />
                                                            {c.name + " "}
                                                    </label>
                                                </div>

                                         
                                                    <div className={`field  mr-2 ${c.checked?"":"is-hidden"}`}>
                                                    <input className="input smallerinput is-small is-pulled-right "  name={`copay +${i}`} value={benefittingplans.filter(el=>el.name==c.name).copay} type="text" onChange={(e)=>handleCopay(e,i,c)} placeholder="Co-pay Amount"  />
                                                </div>
                                                
                                                </div>
                                                </div>                                                                                                                                                                                                                          
                                        <div className={`field pl-3 ${c.checked?"":"is-hidden"}`}>
                                            <div className="field is-horizontal">
                                                <div className="field-body mt-2">
                                                    <div className="field mr-2">
                                                                <p className="control has-icons-left has-icons-right">
                                                                    <label className="radio label is-small" >
                                                                    <input className=" is-small"  value="Capitation"     name={`servtype +${i}`} type="radio" onChange={(e)=>handleServType(e,i,c)}    />
                                                                    <span>Capitation</span></label>
                                                                </p>
                                                            </div>
                                                    <div className="field mr-2">
                                                <p className="control has-icons-left has-icons-right">
                                                    <label className="radio label is-small" >
                                                    <input className=" is-small" name={`servtype +${i}`} value="Fee for Service"   type="radio" onChange={(e)=>handleServType(e,i,c)}   />
                                                
                                                    <span>Fee for Service</span></label>
                                                </p>
                                            </div>
                                                </div>
                                            </div>                              
                                            <div className="field mr-2">
                                                <p className="control has-icons-left has-icons-right">
                                                    <label className="label is-small" >
                                                    <input className="checkbox is-small"      
                                                        name={`authCode +${i}`} 
                                                        type="checkbox" 
                                                        onChange={(e)=>handleAuthCode(e,i,c)}   
                                                    />
                                                    <span>Requires Pre-Authorization Code</span></label>
                                                </p>
                                            </div> 
                                        </div>
                                        </div> 
                                    </>
                                )
                            }
                        </div>
                        
                    </div>

               

                </div>
              </div>
              <div>
        </div>
           
          <>
              
         <div className="field pb-5 ">
                    <p className="control">
                        <button className="button is-info is-small  is-pulled-left selectadd ">
                        <span className="is-small" onClick={handleClickProd}>Add</span>
                        </button>
                    </p>
                </div>
         </>
       {(productItem.length>0) && <div>
            <label>Service Parameters:</label>
         <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                <thead>
                    <tr>
                    <th><abbr title="Serial No">S/No</abbr></th>
                    <th><abbr title="Source Organization">Organization</abbr></th>
                    <th><abbr title="Band">Band</abbr></th>
                    <th><abbr title="Price">Amount</abbr></th>
                    <th><abbr title="Billing Type">Billing Type</abbr></th>
                    <th><abbr title="Benefitting Plans">Plans</abbr></th>
                    <th><abbr title="Actions">Actions</abbr></th> 
                    </tr>
                </thead>
                <tfoot>
                    
                </tfoot>
                <tbody>
                   { productItem.map((Services, i)=>(
                        <tr key={i}>
                        <th>{i+1}</th>
                        <td>{Services.source_org_name}</td>
                        <td>{Services.band}</td>
                        <th>{Services.price}</th>
                       <td>{Services.billing_type}</td>
                        <td>  {Services.plans.map((plan,i)=>(
                        <span key={i} className="ml-1">
                            <b>{plan.name}</b>:{plan.serviceClass}/{plan.reqAuthCode.toString()}/{plan.copay};<br></br>
                        </span>
                     ))}</td>
                        <td><span className="showAction" onClick={()=>handleRemove(i,Services)} >x</span></td>
                        
                        </tr>

                    ))}
                </tbody>
                </table>
                <div className="field is-grouped mt-2">
                <p className="control">
                    <button className="button is-success is-small" disabled={!productItem.length>0} onClick={onSubmit}>
                        Create
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" type="reset" onClick={handleClear}>
                        Cancel
                    </button>
                </p>
                </div>
                </div>
           
            }
            
            
            </div>
            </div>
        </>
    )
   
}

export function ManagedServicesList(){
  
   
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
   const [message, setMessage] = useState("") 
    const ServicesServ=client.service('billing')
   
  
    const [facilities,setFacilities]=useState([])
    
   const [selectedServices, setSelectedServices]=useState()
   
    const {state,setState}=useContext(ObjectContext)
   
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newServicesModule={
            selectedServices:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, ServicesModule:newServicesModule}))
      
        

    }
    const handleRow= async(Service)=>{
       

       

        await setSelectedServices(Service)

        const    newServicesModule={
            selectedServices:Service,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, ServicesModule:newServicesModule}))
      

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       ServicesServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
              
               facility:user.currentEmployee.facilityDetail._id ,
                $limit:20,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.groupedOrder)
                
            })
            .catch((err)=>{
                console.log(err)
                toast({
                    message: 'Error during search ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
            })
        }
   
   const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findServices= await ServicesServ.find(
                {query: {
                    facility: user.currentEmployee.facilityDetail._id,
                    'contracts.source_org' : state.facilityModule.selectedFacility._id ,
                  
                  
               
                    $sort: {
                        category: 1
                    }
                    }})
                    console.log(findServices)
         await setFacilities(findServices.groupedOrder)
       
                }
                else {
                    if (user.stacker){
                        toast({
                            message: 'You do not qualify to view this',
                            type: 'is-danger',
                            dismissible: true,
                            pauseOnHover: true,
                          }) 
                          return 
                        
                    }
                }
        
            }
            
    useEffect(() => {
            return () => {
                }
            },[])

    useEffect(() => {
                 getFacilities()
                

                ServicesServ.on('created', (obj)=>getFacilities())
                ServicesServ.on('updated', (obj)=>getFacilities())
                ServicesServ.on('patched', (obj)=>getFacilities())
                ServicesServ.on('removed', (obj)=>getFacilities())
                return () => {
                
                }
            },[])


            useEffect(() => {
                getFacilities()
                return () => {
                    
                    
                }
            }, [state.facilityModule.selectedFacility])


    return(
        <>
           {state.StoreModule.selectedStore?( <>  
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search Services"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Services </span></div>
                    <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div>

                </div>
                <div className=" pullup ">
                    <div className=" is-fullwidth vscrollable pr-1">   
                    <Accordion allowZeroExpanded >
                        {facilities.map((Clinic, i)=>(
                            <AccordionItem  key={Clinic.categoryname}  >
                                <AccordionItemHeading >
                                    <AccordionItemButton  >
                                    <strong> {i+1} {Clinic.categoryname} </strong> 
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    
                                    <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                     <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Date">Name</abbr></th>
                                        <th><abbr title="Type">Panel?</abbr></th>
                                        <th>Cash Price</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {Clinic.services.map((Services, i)=>(

                                            <tr key={Services._id} onClick={()=>handleRow(Services)}>
                                            <th>{i+1}</th>
                                            <td>{Services.name}</td>
                                            <th>{Services.panel?"Yes":"No"}</th>
                                            <td>{Services.contracts.map((el,i)=>(
                                                el.source_org===el.dest_org &&
                                                <p key={i}>
                                                    {el.price} 
                                                </p>
                                            ))}</td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                                              
                                </AccordionItemPanel>                    
                            </AccordionItem >
                        ))}
                    </Accordion >
                    </div>  
                </div>
                          
            </>):<div>loading... Choose a Store</div>}
            </>
              
    )
}

export function ManagedServicesDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)

   

   const Services =state.ServicesModule.selectedServices 

    const handleEdit= async()=>{
        const    newServicesModule={
            selectedServices:Services,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, ServicesModule:newServicesModule}))
       
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Services Details
                </p>
            </div>
            <div className="card-content vscrollable">
           
                <table> 
                <tbody>         
                <tr>
                    <td>
                      <label className="label is-small"> <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                       Category 
                        </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="name"> {Services.category} </span>
                    </td>
                    <td>

                    </td>
                    <td>
                        <label className="label is-small padleft"><span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>Name:
                        </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="ServicesType">{Services.name} </span> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="label is-small"> <span className="icon is-small is-left">
                        <i className="fas fa-hospital"></i>
                        </span>                    
                        Panel:
                        </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="name"> {Services.panel?"Yes":"No"} </span>
                    </td>
                    <td>
                                
                    </td>
                    <td> {Services.panel &&
                        <label className="label is-small padleft"><span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>Panel Services:
                        </label>}
                    </td>
                    
                    <td>
                    {Services.panel &&  <p className="is-size-7 padleft"   name="ServicesType">{Services.panelServices.length>0 &&     <p>
                         {Services.panelServices.map((plan,i)=>(
                        <span key={i} className="ml-1">
                            {plan.name};
                            </span>))}
                        </p>
            }     </p> }
                    </td>
                </tr>

                </tbody> 
            </table> 
            <label className="label is-size-7 mt-2">Pricing Info:</label>
        
                 <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                <thead>
                    <tr>
                    <th><abbr title="Serial No">S/No</abbr></th>
                    <th><abbr title="Source Organization">Organization</abbr></th>
                    <th><abbr title="Price">Amount</abbr></th>
                    <th><abbr title="Billing Type">Billing Type</abbr></th>
                    <th><abbr title="Benefitting Plans">Plans</abbr></th>
                    </tr>
                </thead>
                <tfoot>
                    
                </tfoot>
                <tbody>
                   { Services.contracts.map((Services, i)=>(

                        <tr key={i}>
                        <th>{i+1}</th>
                        <td>{Services.source_org_name}</td>
                        <th>{Services.price}</th>
                       <td>{Services.billing_type}</td>
                        <td> { (Services.plans) && Services.plans.map((plan,i)=>(
                        <span key={i} className="ml-1">
                            {plan};
                        </span>
                     ))}</td>
                        
                        </tr>

                    ))}
                </tbody>
                </table>
              <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit
                    </button>
                </p>
            </div>
           
        </div>
        </div>
        </>
    )
   
   
}

export function ManagedServicesModify(){
   
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    const [success2, setSuccess2] =useState(false)
    
    const [message,setMessage] = useState("")
    
    const ServicesServ=client.service('billing')
    
     
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const [facilityId,setFacilityId] = useState("")
    const [source,setSource] = useState("")
    const [panel,setPanel] = useState(false)
    const [name,setName] = useState("")
    const [benefittingplans,setBenefittingPlans] = useState([])
    const [quantity,setQuantity] = useState()
    const [costprice,setCostprice] = useState("")
    const [orgType,setOrgType] = useState("")
    const [productItem,setProductItem] = useState([])
    const [plan,setPlan] = useState("")
    const [service,setService] = useState("")
    const [currentUser,setCurrentUser] = useState("")
    const [panelList,setPanelList] = useState([])
    const [successService,setSuccessService] = useState(false)
  
    const [cash,setCash] = useState("Cash")
    const [categoryname, setCategoryName] =useState("")
    const [facility,setFacility] = useState()
    const [modcon,setModCon] = useState("")
    const [yam,setYam] = useState(false) 
    const [pos,setPos] = useState("") 
    const [chosen2, setChosen2]=useState()

    let Services =state.ServicesModule.selectedServices 
    let productItemI


  useEffect(() => {
    setFacilityId(modcon.source_org)
        setName(modcon.source_org_name)
        setCostprice(modcon.price)
        setOrgType(modcon.billing_type)
        setBenefittingPlans(modcon.plans)
        setYam(true)
     return () => {
        
     }
    }, [modcon]) 

        useEffect(() => {
            //Services
            setFacilityId("")
            setSource(Services.name)
            setPanel(Services.panel)
            setName("")
        
            setCostprice("")
            setProductItem(Services.contracts)
            setCategoryName(Services.category)
            setService("")
            setPanelList(Services.panelServices)
            setPlan("")
            setBenefittingPlans([])
            setCash("")
            setOrgType("")
           
            return () => {
               
            }
        }, [])
        const handleCheck= async ()=>{
    
            if (!categoryname){
                toast({
                    message: 'Enter Category!',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
                return true
            }
            await ServicesServ.find({
                query:{
                    name:source,
                    facility: user.currentEmployee.facilityDetail._id,
                    category:categoryname
                }
            }).then((resp)=>{
                console.log(resp)
                if (resp.data.length>0){
                toast({
                    message: 'Service already exist. Kindly modify it ' , 
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
                  return true
                }
            })
            .catch((err)=>{
                toast({
                    message: 'Error checking services  '+ err ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
            })
        }
          
        const handleClickProd=async()=>{
            if (productItem.length>0){
            
            if(!costprice || !name){
                toast({
                    message: 'You need to enter organization name and price ' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
                return
            }
        }else{
            if(!costprice || !cash){
                toast({
                    message: 'You need to enter organization name and price ' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })  
                return
            }
    
        }
        if (!yam){
            if(cash==="Cash"){
                 productItemI={
                    source_org:user.currentEmployee.facilityDetail._id,
                    source_org_name:user.currentEmployee.facilityDetail.facilityName,
                    dest_org:user.currentEmployee.facilityDetail._id,
                    dest_org_name:user.currentEmployee.facilityDetail.facilityName,
                    price:costprice,
                    billing_type:"Cash",
                    plans:benefittingplans
                 } 
                 await setCash("")
            }else{
                productItemI={
                   source_org:facilityId, 
                   source_org_name:name, 
                   dest_org:user.currentEmployee.facilityDetail._id,
                   dest_org_name:user.currentEmployee.facilityDetail.facilityName,
                   price:costprice,
                   billing_type:orgType==="HMO"?"HMO":"Company", 
                   plans:benefittingplans
    
                } 
                await setCash("")
           }
           
            await setSuccess(false)
            setProductItem(
                prevProd=>prevProd.concat(productItemI)
            )
        }else{
            productItemI={
                source_org:facilityId, 
                source_org_name:name, 
                dest_org:user.currentEmployee.facilityDetail._id,
                dest_org_name:user.currentEmployee.facilityDetail.facilityName,
                price:costprice,
                billing_type:orgType, 
                plans:benefittingplans
 
             } 
             const newProductitem = [...productItem]
             newProductitem.splice(pos,1,productItemI)
             setProductItem(newProductitem)
        }
        setModCon("")
        setYam(false) 
        setPos("")
            setName("")
            setOrgType("")
            setFacilityId("")
            setCostprice("")
           await setSuccess(true)
         
        }
        const resetform=()=>{
  
            setFacilityId("")
            setSource("")
            setPanel(false)
            setName("")
          
            setCostprice("")
            setProductItem([])
            setCategoryName("")
           setService("")
            setPanelList([])
            setPlan("")
            setBenefittingPlans([])
            setCash("Cash")
            setOrgType("")
            }

        const getSearchService=(obj)=>{
                setService(obj)
            if(!obj){
                setService("")
            }
                setSuccessService(false)
        }
      
         const getSearchfacility2=(obj)=>{

            setCategoryName(obj.categoryname)
            setChosen2(obj)
            
             if (!obj){
                 
                 setCategoryName("")
                 setChosen2()
                
             }
         }
        const getSearchfacility=(obj)=>{

            setFacilityId(obj._id)
            setName(obj.facilityName)
            setOrgType(obj.facilityType)
            if(!obj){
            setName("")
            setOrgType("")
            setFacilityId("")
            setCostprice("")
    
            }
            
        }
        const handleBenefit=(e)=>{
   
            setBenefittingPlans(prevstate=>prevstate.concat(plan))
            setPlan("")
            }
        
        const handleRemove=(index, contract)=>{
            if (contract.billing_type==="Cash"){
                toast({
                    message: 'You cannot remove cash billing' ,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                return
            }
        
           setProductItem(prevstate=> prevstate.filter((ProductionItem, i) => i !== index));
           
        }
        const handleAddPanel =()=>{
           let newService={
               serviceId:service._id,
               service_name:service.name,
               panel:service.panel
           }
            setPanelList(prevstate=>prevstate.concat(newService))
            setSuccessService(true)
            newService={}
            setService("")
            console.log("something added")
            
        }
   const handleCancel=async()=>{
    const    newServicesModule={
        selectedServices:Services,
        show :'detail'
      }
   await setState((prevstate)=>({...prevstate, ServicesModule:newServicesModule}))
           }


        const changeState =(resp)=>{
        const    newServicesModule={
            selectedServices:resp,
            show :'detail'
        }
        setState((prevstate)=>({...prevstate, ServicesModule:newServicesModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Services._id
        if (conf){
             
        ServicesServ.remove(dleteId)
        .then((res)=>{
                reset();
                toast({
                    message: 'Services deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting Services, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
    }
        

    const onSubmit = () =>{
       if(panel && (panelList.length===0)){
        toast({
            message: "Please choose services that make up panel or uncheck panel ",
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })
          return   
       }
        
        setSuccess(false)
        let data ={
            name:source,
            category:categoryname,
            facility:user.currentEmployee.facilityDetail._id,
            facilityname:user.currentEmployee.facilityDetail.facilityName,
            panel:panel,
            panelServices:panelList,
            contracts:productItem,
            updatedBy:user._id
        }
        console.log(Services)
        console.log(data)
          
       ServicesServ.patch(Services._id,data)
        .then((res)=>{
                console.log(JSON.stringify(res))
                  toast({
                    message: 'Services updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState(res)

            })
            .catch((err)=>{ 
                toast({
                    message: "Error updating Services, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
 
      } 
     const handleModCon=async (contract,i)=>{
        
         setModCon(contract)
         setYam(true) 
         setPos(i)
        
     }
      
    return (
        
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Services Details-Modify
                </p>
            </div>
            
            <div className="card-content vscrollable">
   
   <div className="field is-horizontal">
   <div className="field-body">
       <div className="field is-expanded"  >
                    <CategorySearch id={Services.category}  getSearchfacility={getSearchfacility2} clear={success2} /> 
                    <p className="control has-icons-left " style={{display:"none"}}>
                        <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                        </span>
                    </p>
                </div>
   <div className="field">
           <p className="control has-icons-left has-icons-right">
               <input className="input is-small"  value={source} name="source" type="text" onChange={e=>setSource(e.target.value)} onBlur={handleCheck} placeholder="Name of Service" autoComplete="false" />
               <span className="icon is-small is-left">
                   <i className="fas fa-hospital"></i>
               </span>                    
           </p>
       </div>
  
   </div>
   </div> 

     
   <div className="field is-horizontal">
      <div className="field-body">
       <div className="field">
           <p className="control has-icons-left has-icons-right">
               <label className="label is-small" >
               <input className="checkbox is-small"  checked={panel}  name="panel" type="checkbox" onChange={e=>setPanel(e.target.checked)} />
           
               <span>Panel</span></label>
           </p>
       </div>

   {panel && <>
       <div className="field">
           <div className="field is-expanded"   >
               <ServiceSearch  getSearchService={getSearchService} clear={successService} /> 
               <p className="control has-icons-left " style={{display:"none"}}>
                   <input className="input is-small"/>
                   <span className="icon is-small is-left">
                   <i className="fas  fa-map-marker-alt"></i>
                   </span>
               </p>
           </div>  
       </div>
       <p className="control">
                   <button className="button is-info is-small  is-pulled-right selectadd">
                   <span className="is-small" onClick={handleAddPanel}> +</span>
                   </button>
               </p>
   </> }

       </div> 
       </div> 

  {(panel && panelList.length>0) &&     <div>
  <strong> Panel Items:</strong> {panelList.map((plan,i)=>(
               <span key={i} className="ml-1">
                   {plan.service_name};
                   </span>))}
    </div>
   }       


<label className="label is-small">Add Pricing Info:</label>
{(productItem.length>0) ? <> 
       <div className="field is-horizontal">
       <div className="field-body">
           <div className="field is-expanded"  >
               <FacilitySearch  getSearchfacility={getSearchfacility} clear={success} /> 
               <p className="control has-icons-left " style={{display:"none"}}>
                   <input className="input is-small" value={facilityId} name="facilityId" type="text" onChange={e=>setFacilityId(e.target.value)} placeholder="Product Id" />
                   <span className="icon is-small is-left">
                   <i className="fas  fa-map-marker-alt"></i>
                   </span>
               </p>
           </div>
       <div className="field">
           <p className="control has-icons-left">
               <input className="input is-small"  name="costprice" value={costprice} type="text" onChange={e=>setCostprice(e.target.value)} placeholder="Price"  />
               <span className="icon is-small is-left">
               <i className="fas fa-dollar-sign"></i>
               </span>
           </p>
       </div>
       <div className="field">
       <p className="control">
               <button className="button is-info is-small  is-pulled-right selectadd">
               <span className="is-small" onClick={handleClickProd}>+</span>
               </button>
           </p>
               </div>
               </div>
           </div>
    <div className="field is-horizontal">
       <div className="field-body">
        <div className="field">
           
           <div className="field has-addons"  >
                     <div className="control">
                         <input  className="input selectadd" type="text" name="plan"  value={plan} onChange={e=>setPlan(e.target.value)} placeholder="Benefitting Plans" />
                         </div> 
                         <div className="control">
                         <button className="button is-info selectadd" onClick={(e)=>handleBenefit(e)}>add</button>
                         </div>
                         </div>
                       
        </div>
        <div className="field is-expanded pull-left">
        {benefittingplans && benefittingplans.map((plan,i)=>(
               <span key={i} className="ml-1">
                   {plan};
               </span>
            ))}
        </div>
       </div>
     </div>
   </>:
   <>
     <div className="field is-horizontal">
       <div className="field-body">
           <div className="field">
               <p className="control has-icons-left">
                   <input className="input is-small"  disabled name="cash" value={cash} type="text" onChange={e=>setCash(e.target.value)} /* placeholder="Cost Price" */  />
                   <span className="icon is-small is-left">
                   <i className="fas fa-dollar-sign"></i>
                   </span>
               </p>
               </div>
           <div className="field">
               <p className="control has-icons-left">
                   <input className="input is-small"  name="costprice" value={costprice} type="text" onChange={e=>setCostprice(e.target.value)} placeholder="Price"  />
                   <span className="icon is-small is-left">
                   <i className="fas fa-dollar-sign"></i>
                   </span>
               </p>
           </div>
           <div className="field">
               <p className="control">
                   <button className="button is-info is-small  is-pulled-right selectadd">
                   <span className="is-small" onClick={handleClickProd}>+</span>
                   </button>
               </p>
           </div>
       </div>
     </div>
    

   </> }
 
   
{(productItem.length>0) && <div>
   <label>Prices:</label>
<table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
       <thead>
           <tr>
           <th><abbr title="Serial No">S/No</abbr></th>
           <th><abbr title="Source Organization">Organization</abbr></th>
           <th><abbr title="Price">Amount</abbr></th>
           <th><abbr title="Billing Type">Billing Type</abbr></th>
           <th><abbr title="Benefitting Plans">Plans</abbr></th>
           <th><abbr title="Actions">Actions</abbr></th> 
           </tr>
       </thead>
       <tfoot>
           
       </tfoot>
       <tbody>
          { productItem.map((Services, i)=>(

               <tr key={i} onClick={()=>handleModCon(Services,i)}>
               <th>{i+1}</th>
               <td>{Services.source_org_name}</td>
               <th>{Services.price}</th>
              <td>{Services.billing_type}</td>
               <td>  {Services.plan && Services.plans.map((plan,i)=>(
               <span key={i} className="ml-1">
                   {plan};
               </span>
            ))}</td>
               <td><span className="showAction" onClick={()=>handleRemove(i,Services)} >x</span>
               </td>
               
               </tr>

           ))}
       </tbody>
       </table>
       </div>
  
   } 
            <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" onClick={onSubmit}>
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" onClick={handleCancel}>
                        Cancel
                    </button>
                </p>
            </div>
        </div>
        </div>
        </>
    )              
}   

export  function ServiceSearch({getSearchService,clear,notfound}) {
    
    const productServ=client.service('billing')
    const [facilities,setFacilities]=useState([])
     
     const [searchError, setSearchError] =useState(false)
     
    const [showPanel, setShowPanel] =useState(false)
     
   const [searchMessage, setSearchMessage] = useState("") 
   
   const [simpa,setSimpa]=useState("")
   
   const [chosen,setChosen]=useState(false)
   
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)
   const [val,setVal]=useState("")
    const [productModal,setProductModal]=useState(false)

   const handleRow= async(obj)=>{
        await setChosen(true)
        await setSimpa(obj.name)
       
        
       getSearchService(obj)
       
      
       
        
        setShowPanel(false)
        await setCount(2)
   
}
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was not chosen")
         }
       
    }
    const handleSearch=async(value)=>{
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchService(false)
            await setFacilities([])
            return
        }
        const field='name' 

       
        if (value.length>=3 ){
            productServ.find({query: {     
                 [field]: {
                     $regex:value,
                     $options:'i'
                    
                 },
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
             
              const uniqueArr = [...new Set(res.data.map(data => data.name ))]
              let uniqueObj=[]
              uniqueArr.forEach((obj)=>{
                uniqueObj.push((res.data.find((el)=>el.name==obj)))
              })
                setFacilities(uniqueObj)
                 setSearchMessage(" product  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error creating Services ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
             })
         }
        else{
            setShowPanel(false)
            await setFacilities([])
        }
    }

    const handleAddproduct =(val)=>{
        setProductModal(true) 
        setShowPanel(false)
        notfound({
            status:true,
            name:val
            })
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
                    <div className={`dropdown ${showPanel?"is-active":""}`}  style={{width:"100%"}}>
                        <div className="dropdown-trigger"  style={{width:"100%"}}>
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Services"
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
                        <div className="dropdown-menu"   style={{width:"100%"}}>
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item" onClick={()=>handleAddproduct(val)}> <span>Add {val} to service list</span>  </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.name} ({facility.category})</span>
                                        
                                    </div>
                                    
                                    ))}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
