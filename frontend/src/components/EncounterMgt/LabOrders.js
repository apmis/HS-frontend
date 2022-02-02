/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import FacilityPopup from '../helpers/FacilityPopup'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'

const searchfacility={};


export default function LabOrders() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-6 ">
                <LabOrdersList />
                </div>
            <div className="column is-6 ">
                {(state.OrderModule.show ==='create')&&<LabOrdersCreate />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function LabOrdersCreate(){
   
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const ProductEntryServ=client.service('productentry')
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()
    const [type,setType] = useState("Purchase Invoice")
    const [documentNo,setDocumentNo] = useState("")
    const [totalamount,setTotalamount] = useState("")
    const [productId,setProductId] = useState("")
    const [source,setSource] = useState("")
    const [date,setDate] = useState("")
    const [name,setName] = useState("")
    const [destination,setDestination] = useState('')
    const [destinationId,setDestinationId] = useState('')
    const [destinationModal,setDestinationModal] = useState(false)
    const [test,setTest] = useState()
    const [instruction,setInstruction] = useState()
    const [productItem,setProductItem] = useState([])
    const {state}=useContext(ObjectContext)
    const ClientServ=client.service('clinicaldocument')
    
    const [productEntry,setProductEntry]=useState({
        productitems:[],
        date,
        documentNo,
        type,
        totalamount,
        source,

    })
 
    const handlecloseModal =()=>{
        setDestinationModal(false)
        
    }
    const productItemI={
        test,
        destination,
        instruction,
        destinationId

    }
    const getSearchfacility=(obj)=>{

        if (!obj){
            setInstruction("")
            setTest("")
           
        }
        setInstruction(obj.instruction)
        setTest(obj.test)
        
    }
    
    useEffect(() => {
        setCurrentUser(user)
        return () => {
        
        }
    }, [user])

    useEffect(() => {
        
        setDestination(state.DestinationModule.selectedDestination.facilityName)
        setDestinationId(state.DestinationModule.selectedDestination._id)
        return () => {
           
        }
    }, [state.DestinationModule.selectedDestination])

    const handleChangeType=async (e)=>{
        await setType(e.target.value)
    }
    const handleClickProd=async()=>{
        await setSuccess(false)
        if (!(productItemI.test && productItemI.test.length>0 )){
            toast({
                message: 'Test can not be empty ' ,
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
              return
        }
        await setProductItem(
            prevProd=>prevProd.concat(productItemI)
        )
        setName("")
        setTest("")
        setInstruction("")
        setDestination( user.currentEmployee.facilityDetail.facilityName)
        setDestinationId( user.currentEmployee.facilityDetail._id)
       await setSuccess(true)
       console.log(success)
       console.log(productItem)
    }

    const handleChangeDestination=()=>{
        setDestinationModal(true)
    }

    const resetform=()=>{
     setType("Purchase Invoice")
    setDocumentNo("")
    setTotalamount("")
    setProductId("")
    setSource("")
    setDate("")
    setName("")
    setTest("")
    setInstruction("")
    setProductItem([])
    }
    const onSubmit = () =>{
        setMessage("")
        setError(false)
        setSuccess(false)
        let document={}
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=productItem
         console.log(document.documentdetail)
          document.documentname="Lab Orders" 
         document.location=state.employeeLocation.locationName+" "+state.employeeLocation.locationType
         document.locationId=state.employeeLocation.locationId
          document.client=state.ClientModule.selectedClient._id
          document.clientname=state.ClientModule.selectedClient.firstname+ " "+state.ClientModule.selectedClient.middlename+" "+state.ClientModule.selectedClient.lastname
          document.clientobj=state.ClientModule.selectedClient
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status="completed"
          console.log(document)
        ClientServ.create(document)
        .then((res)=>{
                setSuccess(true)
                toast({
                    message: 'Presciption created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
                  setProductItem([])
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating LabOrders ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 

    useEffect(() => {
        setDestination( user.currentEmployee.facilityDetail.facilityName)
        setDestinationId( user.currentEmployee.facilityDetail._id)
        return () => {
            
        }
    }, [])

    return (
        <>
            <div className="card card-overflow">
            <div className="card-header">
                <p className="card-header-title">
                    Create Lab Orders
                </p>
            </div>
            <div className="card-content ">
   
           
               
           
        
        <label className="label is-small">Add Test:</label>
         <div className="field is-horizontal">
            <div className="field-body">
             <div className="field is-expanded"  > 
                    <TestHelperSearch  getSearchfacility={getSearchfacility} clear={success} />  
                  <p className="control has-icons-left " style={{display:"none"}}>
                        <input className="input is-small"  value={test} name="test" type="text" onChange={e=>setTest(e.target.value)} placeholder="test" />
                        <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                        </span>
                    </p> 
                </div>
            
          
            <div className="field">
            <p className="control">
                    <button className="button is-info is-small  is-pulled-right">
                      <span className="is-small" onClick={handleClickProd}> +</span>
                    </button>
                </p>
            </div>
            </div>
         </div>
         <div className="field is-horizontal">
            <div className="field-body">
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small " disabled  name="destination" value={destination===user.currentEmployee.facilityDetail.facilityName?"In-house":destination} type="text" onChange={e=>setDestination(e.target.value)} placeholder="Destination Pharmacy"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                <button className="button is-small is-success btnheight" onClick={handleChangeDestination}>Change</button>
       
            </div>  
            </div> 
            </div> 

       {(productItem.length>0) && <div>
            <label className="label is-size-7">Lab Orders:</label>
         <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                <thead>
                    <tr>
                    <th><abbr title="Serial No">S/No</abbr></th>
                    <th><abbr title="Test">Test</abbr></th>
                    <th><abbr title="Destination">Destination</abbr></th>
                    <th><abbr title="Actions">Actions</abbr></th>
                    </tr>
                </thead>
                <tfoot>
                    
                </tfoot>
                <tbody>
                   { productItem.map((ProductEntry, i)=>(

                        <tr key={i}>
                        <th>{i+1}</th>
                        <td>{ProductEntry.test}<br/>
                        <span className="help">{ProductEntry.instruction}</span></td>
                       <td>{ProductEntry.destination===user.currentEmployee.facilityDetail.facilityName?"In-house":ProductEntry.destination}</td>
                        <td><span className="showAction"  >x</span></td>
                        
                        </tr>

                    ))}
                </tbody>
                </table>
                <div className="field mt-2">
                <p className="control">
                    <button className="button is-success is-small" disabled={!productItem.length>0} onClick={onSubmit}>
                        Create
                    </button>
                </p>
                </div>
                </div>
           
            }
            
            
            </div>
            </div>
            <div className={`modal ${destinationModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Destination</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                            <FacilityPopup facilityType="Laboratory"  closeModal={handlecloseModal}/>
                                        </section>
                                    </div>
                                </div>       
        </>
    )
   
}

export function LabOrdersList({standalone}){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const OrderServ=client.service('order')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedOrder, setSelectedOrder]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newProductEntryModule={
            selectedOrder:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, OrderModule:newProductEntryModule}))
       
        

    }
    const handleDelete=(doc)=>{
        
         let confirm = window.confirm(`You are about to delete a ${doc.order} lab order?`)
         if (confirm){
        OrderServ.remove(doc._id)
         .then((res)=>{
             toast({
                 message: 'Lab order deleted succesfully',
                 type: 'is-success',
                 dismissible: true,
                 pauseOnHover: true,
               })
               setSuccess(false)
         })
         .catch((err)=>{
             toast({
                 message: 'Error deleting Lab order' + err,
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               })
         })
      }
     }
    const handleRow= async(ProductEntry)=>{
        

        

        await setSelectedOrder(ProductEntry)

        const    newProductEntryModule={
            selectedOrder:ProductEntry,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, OrderModule:newProductEntryModule}))
       

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       OrderServ.find({query: {
              $or:[ { order: {
                    $regex:val,
                    $options:'i'
                   
                }},
                {order_status: {
                    $regex:val,
                    $options:'i'
                   
                }}],
                order_category:"Lab Order",
               
               
                $limit:10,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" ProductEntry  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching ProductEntry, probable network issues "+ err )
                setError(true)
            })
        }
   
 const getFacilities= async()=>{
       
            console.log("here b4 server")
            console.log(state.ClientModule.selectedClient._id)
             const findProductEntry= await OrderServ.find(
                {query: {
                    order_category:"Lab Order",
                    
                   
                    
                    clientId:state.ClientModule.selectedClient._id,
                    $limit:20,
                    $sort: {
                        createdAt: -1
                    }
                    }})
         await setFacilities(findProductEntry.data)
         }   

            useEffect(() => {
                console.log("started")
                getFacilities()
              
               
               OrderServ.on('created', (obj)=>getFacilities())
                OrderServ.on('updated', (obj)=>getFacilities())
                OrderServ.on('patched', (obj)=>getFacilities())
                OrderServ.on('removed', (obj)=>getFacilities())
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
                                        type="text" placeholder="Search tests"
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
                   {!standalone && (<><div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Lab Orders </span></div>
                    <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div></>)}

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Date">Date</abbr></th>
                                        <th><abbr title="Order">Test</abbr></th>
                                        <th>Fulfilled</th>
                                        <th><abbr title="Status">Status</abbr></th>
                                        <th><abbr title="Requesting Physician">Requesting Physician</abbr></th>
                                        {!standalone &&     <th><abbr title="Actions">Actions</abbr></th>}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((ProductEntry, i)=>(

                                            <tr key={ProductEntry._id} className={ProductEntry._id===(selectedOrder?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <td><span>{format(new Date(ProductEntry.createdAt),'dd-MM-yy')}</span></td>
                                            <th>{ProductEntry.order}</th>
                                            <td>{ProductEntry.fulfilled==="True"?"Yes":"No"}</td>
                                            <td>{ProductEntry.order_status}</td>
                                            <td>{ProductEntry.requestingdoctor_Name}</td>
                                            {!standalone &&  <td>  <button className="button  sbut" aria-label="more options" onClick={()=>handleDelete (ProductEntry)}>
                                                            <span>x</span>
                                                        </button>  
                                                </td>}
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>
              
    )
    }


export function ProductEntryDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)

   

   const ProductEntry =state.ProductEntryModule.selectedProductEntry 

    const handleEdit= async()=>{
        const    newProductEntryModule={
            selectedProductEntry:ProductEntry,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, ProductEntryModule:newProductEntryModule}))
       
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    ProductEntry Details
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
                        Type
                        </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="name"> {ProductEntry.type} </span>
                    </td>
                    <td>

                    </td>
                    <td>
                        <label className="label is-small padleft"><span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>Supplier:
                        </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="ProductEntryType">{ProductEntry.source} </span> 
                    </td>
                </tr>
                <tr>
                    <td>
                        <label className="label is-small"> <span className="icon is-small is-left">
                        <i className="fas fa-hospital"></i>
                        </span>                    
                        Date:
                        </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="name"> {ProductEntry.date} </span>
                    </td>
                    <td>
                                
                    </td>
                    <td>
                        <label className="label is-small padleft"><span className="icon is-small is-left">
                            <i className="fas fa-map-signs"></i>
                        </span>Invoice No:
                        </label>
                    </td>
                    
                    <td>
                         <span className="is-size-7 padleft"   name="ProductEntryType">{ProductEntry.documentNo} </span> 
                    </td>
                </tr>
                <tr>
                    <td>
                
                        <label className="label is-small"> <span className="icon is-small is-left">
                        <i className="fas fa-hospital"></i>
                    </span>            
                        Total Amount:
                    </label>
                    </td>
                    <td>
                        <span className="is-size-7 padleft"   name="name"> {ProductEntry.totalamount} </span>
                    </td>
                </tr>

                </tbody> 
            </table> 
            <label className="label is-size-7 mt-2">Product Items:</label>
         <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                <thead>
                    <tr>
                    <th><abbr title="Serial No">S/No</abbr></th>
                    <th><abbr title="Type">Name</abbr></th>
                    <th><abbr title="Type">Quanitity</abbr></th>
                    <th><abbr title="Document No">Unit</abbr></th>
                    <th><abbr title="Cost Price">Cost Price</abbr></th>
                    <th><abbr title="Cost Price">Amount</abbr></th>
                   
                    </tr>
                </thead>
                <tfoot>
                    
                </tfoot>
                <tbody>
                   { ProductEntry.productitems.map((ProductEntry, i)=>(

                        <tr key={i}>
                        <th>{i+1}</th>
                        <td>{ProductEntry.name}</td>
                        <th>{ProductEntry.quantity}</th>
                        <td>{ProductEntry.baseunit}</td>
                        <td>{ProductEntry.costprice}</td>
                        <td>{ProductEntry.amount}</td>
                        
                        
                        </tr>

                    ))}
                </tbody>
                </table>
           
        </div>
        </div>
        </>
    )
   
   
}

export function ProductEntryModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    
    const ProductEntryServ=client.service('productentry')
    
     
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const ProductEntry =state.ProductEntryModule.selectedProductEntry 

        useEffect(() => {
            setValue("name", ProductEntry.name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("ProductEntryType", ProductEntry.ProductEntryType,  {
                shouldValidate: true,
                shouldDirty: true
            })
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newProductEntryModule={
        selectedProductEntry:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, ProductEntryModule:newProductEntryModule}))
           }


        const changeState =()=>{
        const    newProductEntryModule={
            selectedProductEntry:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, ProductEntryModule:newProductEntryModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=ProductEntry._id
        if (conf){
             
        ProductEntryServ.remove(dleteId)
        .then((res)=>{
                reset();
                toast({
                    message: 'ProductEntry deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting ProductEntry, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
    }
        

    const onSubmit = (data,e) =>{
        e.preventDefault();
        
        setSuccess(false)
        console.log(data)
        data.facility=ProductEntry.facility
          
        ProductEntryServ.patch(ProductEntry._id,data)
        .then((res)=>{
                 toast({
                    message: 'ProductEntry updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                toast({
                    message: "Error updating ProductEntry, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 
     
      
    return (
        
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    ProductEntry Details-Modify
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label is-small"> Name
                    <p className="control has-icons-left has-icons-right">
                        <input className="input  is-small" ref={register({ required: true })}  name="name" type="text" placeholder="Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                    </label>
                    </div>
                <div className="field">
                <label className="label is-small">ProductEntry Type
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register({ required: true })} disabled name="ProductEntryType" type="text" placeholder="ProductEntry Type" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
                </label>
                </div>
           
           
            </form>
            
            <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" onClick={handleSubmit(onSubmit)}>
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" onClick={handleCancel}>
                        Cancel
                    </button>
                </p>
                <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p>
            </div>
        </div>
        </div>
        </>
    )
   
   
                
}   

export  function TestHelperSearch({getSearchfacility,clear}) {
    
    const productServ=client.service('labhelper')
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
   let value

   const handleRow= async(obj)=>{
        await setChosen(true)
       getSearchfacility(obj)
  
       
       await  setSimpa(obj.test)
      
        setShowPanel(false)
        await setCount(2)
}
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was chosen")
         }
       
    }
    const handleSearch=async(value)=>{
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='test' 

       
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
              console.log("product  fetched successfully") 
              console.log(res) 
                    if(res.total>0){
                        setFacilities(res.data)
                        setSearchMessage(" product  fetched successfully")
                        setShowPanel(true)
                    }else{
                        setShowPanel(false)
                        getSearchfacility({
                            test:value,
                            instruction:""
                        })
                    }
               
             })
             .catch((err)=>{
                toast({
                    message: 'Error fetching test ' + err,
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
    }
    useEffect(() => {
        setSimpa(value)
        return () => {
            
        }
    }, [simpa])
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
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Product"
                                value={simpa}
                                minLength={3}
                                debounceTimeout={400}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu" style={{width:"100%"}} >
                            <div className="dropdown-content">

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.test}</span> 
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