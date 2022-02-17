/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ProductCreate} from './Products'
import Encounter from '../EncounterMgt/Encounter';
import  ServiceSearch  from '../helpers/ServiceSearch';
var random = require('random-string-generator');

const searchfacility={};

export default function BillLabCreate(){
    
     
     const [success, setSuccess] =useState(false)
     const [message,setMessage] = useState("")
     
     const [facility,setFacility] = useState()
     const ProductEntryServ=client.service('productentry')
     const OrderServ=client.service('order')
     const BillCreateServ=client.service('createbilldirect')
     
     const {user} = useContext(UserContext) 
     
     const [currentUser,setCurrentUser] = useState()
     const [type,setType] = useState("Bill")
     const [documentNo,setDocumentNo] = useState("")
     const [totalamount,setTotalamount] = useState(0)
     const [qamount,setQAmount] = useState(null)
     const [productId,setProductId] = useState("")
     const [source,setSource] = useState("")
     const [date,setDate] = useState("")
     const [name,setName] = useState("")
     const [inventoryId,setInventoryId] = useState("")
     const [baseunit,setBaseunit] = useState("")
     const [quantity,setQuantity] = useState(1)
     const [sellingprice,setSellingPrice] = useState("")
     const [costprice,setCostprice] = useState(0)
     const [invquantity,setInvQuantity] = useState("")
     const [calcamount,setCalcAmount] = useState(0)
     const [productItem,setProductItem] = useState([])
      const [billingId,setBilllingId]=useState("")  
      const [changeAmount, setChangeAmount] = useState(true)
      const [paymentmode, setPaymentMode] = useState("")
      const [paymentOptions, setPaymentOptions]=useState([])
      const [billMode, setBillMode]=useState("")
      const [productModal, setProductModal]=useState(false)
      const [obj, setObj]=useState("")
      const [objService, setObjService]=useState("")
      const [patient, setPatient]=useState("")
      const [contracts, setContracts]=useState("")
      const [category, setCategory]=useState("")

     const {state,setState}=useContext(ObjectContext)
     const inputEl = useRef(0);
     let calcamount1
     let hidestatus
  

    
  let medication =state.medicationModule.selectedMedication
   

  const showDocumentation = async (value)=>{
    setProductModal(true)
  }
  const handlecloseModal =()=>{
    setProductModal(false)
   
    }


    const handleChangeMode= async(value)=>{
       
       await setPaymentMode(value)
       
       let billm= paymentOptions.filter(el=>el.name===value)
       await setBillMode(billm[0])
 

    }

    const handleRow= async(ProductEntry)=>{

            const    newProductEntryModule={
                selectedMedication:ProductEntry,
                show :'detail'
            }
            await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))

        } 
 
     const [productEntry,setProductEntry]=useState({
         productitems:[],
         date,
         documentNo,
         type,
         totalamount,
         source,
 
     })
  
     const productItemI={
         productId,
         name,
         quantity,
         sellingprice,
         amount:calcamount, 
         baseunit,
         costprice,
         category:"Prescription",  
         billingId,
         billMode
 
     }

     const checkPrice= async(contracts,billMode)=>{
         

        if( billMode.type==="HMO Cover"){ 
         if (billMode.detail.plan==="NHIS"){
             
             let contract=contracts.filter(el=>el.source_org_name==="NHIS")
             if (contract.length){
                
               await  setSellingPrice(contract[0].price)     
          }else{
             toast({
                 message: 'Please NHIS does not have cover/price for this service. Either set service price for NHIS, try another service or bill using cash',
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               })
              await setSellingPrice(0)
          }

         }else{

         let contract=contracts.filter(el=>el.source_org===billMode.detail.organizationId)
         if (contract.length){
           
            await setSellingPrice(contract[0].price)
            
          }else{
         toast({
             message: 'Please HMO does not have cover/price for this service. Either set service price for HMO , try another drug, bill using cash or adjust amount ',
             type: 'is-danger',
             dismissible: true,
             pauseOnHover: true,
           })
           await setSellingPrice(0)
      }
     
     }
     }
     if( billMode.type==="Company Cover"){ 
         let contract=contracts.filter(el=>el.source_org===billMode.detail.organizationId)
         if (contract.length){
        
       await   setSellingPrice(contract[0].price)
         
        
        }else{

         toast({
             message: 'Please company does not have cover/price for this service. Either set service price for Company or try another drug or bill using cash',
             type: 'is-danger',
             dismissible: true,
             pauseOnHover: true,
           })
         await  setSellingPrice(0)   
      }

  }
  if( billMode.type==="Cash" || billMode.type==="Family Cover"){ 
     let contract=contracts.filter(el=>el.source_org===el.dest_org)
     if (contract.length){
    
     await setSellingPrice(contract[0].price)
    
    
         }else{

     toast({
         message: 'Please there is no cover/price for this service. Either set service price or try another service. Setting price at zero ',
         type: 'is-danger',
         dismissible: true,
         pauseOnHover: true,
       })
       await setSellingPrice(0)   
  }

  }

    }
     
     
     const getSearchfacility=async (service)=>{
        
       
        if (!service){
            
            setProductId("")
            setName("")
            setBaseunit("")
            setInventoryId("")
            setSellingPrice(0)
            setInvQuantity("")
            setQAmount(null)
            setCostprice("")
            setContracts("")
            setCategory("")
            setInventoryId("")
            setBilllingId("")
           
            return
        }
 
        setContracts(service.contracts)
         setProductId(service.productId)
         setName(service.name)
         setCategory(service.category) 
         setBaseunit(service.baseunit)
         setInventoryId(service.inventoryId)
         setBilllingId(service._id)
         await setObj(service)

       
    }
     useEffect(() => {
     }, [obj])

     useEffect(() => {
         setCurrentUser(user)
         return () => {
         
         }
     }, [user])
 
     const handleUpdateTotal=async ()=>{
        await setTotalamount(prevtotal=>Number(prevtotal) + Number(calcamount))
     }
 
     const handleChangeType=async (e)=>{
         await setType(e.target.value)
     }
 
     const handleAmount= async()=>{
         await setQAmount(null)
     }

     const handleClickProd=async()=>{
        if ( quantity===0||quantity===""|| productId===""||paymentmode==="" ){
            toast({
                message: 'You need to choose a product and quantity to proceed',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              }) 
              return 
        }

         await setSuccess(false)
         await setProductItem(
             prevProd=>prevProd.concat(productItemI)
         )
        handleUpdateTotal()
            const billInfo={
                orderInfo:{
                    orderId:medication._id,
                    orderObj:medication,
                  },
                  serviceInfo:{            
                    price: productItemI.sellingprice,
                    quantity: productItemI.quantity,
                    productId: productItemI.productId,
                    name: productItemI.name,
                    baseunit: productItemI.baseunit,
                    amount:productItemI.amount,
                    billingId:productItemI.billingId,
                    createdby:user._id,
                  },
                  paymentInfo:{
                    amountDue:productItemI.amount,
                    paidup:0,
                    balance:productItemI.amount,
                    paymentDetails:[]
              
                  },
                  participantInfo:{
                    billingFacility:medication.destination,
                    billingFacilityName:medication.destination_name,
                    locationId:state.StoreModule.selectedStore._id, 
                    clientId:medication.clientId,
                    client:medication.client,
                    paymentmode:billMode
                  },
                  createdBy:user.id,
                  billing_status:"Unpaid"
                }

        
        
        OrderServ.patch(medication._id,{
            order_status:"Billed", 
            billInfo,
        }).then((resp)=>{
           
           
             handleRow(resp) 
            

        })
        .catch((err)=>{
            console.log(err)
        })
        
        
        
        
         setName("")
         setBaseunit("")
         setQuantity("")
         setInventoryId("")
         setSellingPrice("")
         setInvQuantity("")
             handleAmount()
        
        await setSuccess(true)
        getSearchfacility(false)
        setObj("")
        setChangeAmount(true)
       
     }
   
 
     const handleQtty=async(e)=>{
         setQuantity(e.target.value)
         if (e.target.vlue===""){
            setQuantity(1)
         }
     }
 
     useEffect( () => {
          setProductEntry({
             
             date,
             documentNo,
             type,
             totalamount,
             source,
         })
        setCalcAmount(quantity*sellingprice) 
         return () => {
             
         }
     },[date])
 
     const resetform=()=>{
      setType("Sales")
     setDocumentNo("")
     setTotalamount("")
     setProductId("")
     setSource("")
     setDate("")
     setName("")
     setBaseunit()
     setCostprice()
     setProductItem([])
     }


     const handleMedicationDone= async()=>{ 
        
    
        
    
       
    
        const    newProductEntryModule={
            selectedMedication:{},
            show :'create'
        }
      await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
       
      
    
    }
 
     const onSubmit = async(e) =>{
         e.preventDefault();
         setMessage("")
         
         setSuccess(false)
         await setProductEntry({
             
             date,
             documentNo,
             type,
             totalamount,
             source,
         })
         productEntry.productitems=productItem
         productEntry.createdby=user._id
         productEntry.transactioncategory="debit"
        
          
           if (user.currentEmployee){
          productEntry.facility=user.currentEmployee.facilityDetail._id  
           }else{
             toast({
                 message: 'You can not remove inventory from any organization',
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               }) 
               return
           }
           
           if (state.StoreModule.selectedStore._id){
             productEntry.storeId=state.StoreModule.selectedStore._id
           }else{
             toast({
                 message: 'You need to select a store before removing inventory',
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               }) 
               return
 
           }
 
    } 
 
    const handleChangeAmount=()=>{
        setChangeAmount((rev)=>(!rev))
        
    }

    const newclient=async ()=>{
        await  setProductItem([])
    }

    useEffect(() => {
        setPatient(medication.client)
        const oldname=medication.clientname
        setSource(medication.clientname)

        const newname=source
        if (oldname!==newname){
        
        setProductItem([])
        setTotalamount(0)

        }
       

        return () => {
           
        }
    }, [medication])

    useEffect(() => {
        
        setProductItem([])
        setTotalamount(0)
        const paymentoptions= []
       
        let billme
       let obj
       patient &&  patient.paymentinfo.forEach((pay,i)=>{ 
           if (pay.active){
       
            switch(pay.paymentmode) {
                case 'Cash':
                  
                  obj=createObj(pay,"Cash","Cash","Cash" )
                
                  paymentoptions.push(obj)
                  setPaymentMode("Cash")
                  billme=obj
                 
                  break;
                case 'Family':
                  
                  obj=createObj(pay,"Family Cover","familyCover", "Family Cover")
                  paymentoptions.push(obj)
                  setPaymentMode("Family Cover")
                  billme=obj
                 
                  break;
                case 'Company':
                  
                  let name="Company: " + pay.organizationName + "(" + pay.plan+")"

                  obj=createObj(pay,name,"CompanyCover", "Company Cover" )
                      paymentoptions.push(obj)
                      setPaymentMode("Company: " + pay.organizationName + "(" + pay.plan+")")
                     billme=obj
                    
                  break;
                case 'HMO':
                  
                 let  sname="HMO: " + pay.organizationName + "(" + pay.plan+")"

                  obj=createObj(pay,sname,"HMOCover", "HMO Cover" )
                      paymentoptions.push(obj)
                      setPaymentMode("HMO: " + pay.organizationName + "(" + pay.plan+")")
                     billme=obj
                   
                  break;
                default:
                  
              }
            }
            })
                    
          
        setPaymentOptions(paymentoptions)
        setBillMode(billme)
       
       
        return () => {
           
        }
    }, [source]) 


     useEffect(() => {
       
         const today=new Date().toLocaleString()
         
         setDate(today)
         const invoiceNo=random(6,'uppernumeric')
         setDocumentNo(invoiceNo)
         return () => {
             
         }
     }, [])

     useEffect(() => {
        
         if (success){
             setSuccess(false)
         }
       
      }, [success])

      const createObj= (pay,name,cover,type)=>{
        let details={}
          details= {...pay}
          details.type=type
  
      return {
              name,
              value:cover,
              detail:details,
              type,
          }
  
      }

      useEffect(() => {
        
        
        if (!!billMode && !!contracts){
           
            checkPrice(contracts,billMode)
        }
       
        return () => {
           
        }
    }, [obj])

     useEffect(() => {
        calcamount1=quantity*sellingprice
         setCalcAmount(calcamount1)
        
         setChangeAmount(true)
        return () => {
            
        }
    }, [quantity,sellingprice])

    useEffect(() => {
       
        if (!!billMode && !!contracts){
            
            checkPrice(contracts,billMode)
        }
        
        return () => {
            
        }
    }, [billMode])


     return (
         <>
             <div className="card card-overflow">
             <div className="card-header">
                 <p className="card-header-title">
                     Bill Product
                 </p>
                 <button className="button is-success is-small btnheight mt-2" onClick={showDocumentation}>Documentation</button>
             </div>
             <div className="card-content ">
    
             <form onSubmit={onSubmit}> {}
             <div className="field is-horizontal">
             <div className="field-body">
             <div className="field">
                     <p className="control has-icons-left has-icons-right">
                         <input className="input is-small" value={source} name="client" type="text" onChange={e=>setSource(e.target.value)} placeholder="Client" />
                         <span className="icon is-small is-left">
                             <i className="fas fa-hospital"></i>
                         </span>                    
                     </p>
                 </div>
                 <div className="field">    
                 <div className="control">
                     <div className="select is-small ">
                         <select name="paymentmode" value={paymentmode} onChange={(e)=>handleChangeMode(e.target.value)} className="selectadd" >
                         <option value="">Billing Mode </option>
                           {paymentOptions.map((option,i)=>(
                               <option key={i} value={option.details}> {option.name}</option>
                           ))}
                           
                            
                         </select>
                     </div>
                 </div>
             </div>
            
             </div>
             </div> 
                <div className="field is-horizontal">
                <div className="field-body">
                <div className="field">
                 <p className="control has-icons-left has-icons-right">
                     <input className="input is-small"  value={date}  name="date" type="text" onChange={e=>setDate(e.target.value)} placeholder="Date" />
                     <span className="icon is-small is-left">
                         <i className="fas fa-map-signs"></i>
                     </span>
                 </p>
             </div>
             <div className="field">
                 <p className="control has-icons-left">
                     <input className="input is-small"  name="documentNo" value={documentNo} type="text" onChange={e=>setDocumentNo(e.target.value)} placeholder=" Invoice Number"/>
                     <span className="icon is-small is-left">
                     <i className="fas fa-phone-alt"></i>
                     </span>
                 </p>
             </div>
             <div className="field">
                 <p className="control has-icons-left">
                     <input className="input is-small" value={totalamount} name="totalamount" type="text" onChange={e=>setTotalamount(e.target.value)} placeholder=" Total Amount"/>
                     <span className="icon is-small is-left">
                     <i className="fas fa-coins"></i>
                     </span>
                 </p>
             </div>
 
                 </div> 
                 </div> 
                
                 </form>   
                
            
         
         <label className="label is-small">Medication:</label>
         <div className="field is-horizontal">
             <div className="field-body">
             <div className="field" style={{width:"40%"}}>
                 <p className="control has-icons-left" >
                     <input className="input is-small" disabled  name="order" value={medication.order} type="text" onChange={ e=> handleQtty(e)} placeholder="Quantity"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-hashtag"></i>
                     </span>
                    
                 </p>
                 <span className="helper is-size-7"><strong>Billing Status: </strong>{medication.order_status}</span>
             </div> 
            
             </div>
             </div>
             <label className="label is-small">Choose Service Item:</label>
          <div className="field is-horizontal">
             <div className="field-body">
             <div className="field is-expanded"  >
                     <ServiceSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                     <p className="control has-icons-left " style={{display:"none"}}>
                         <input className="input is-small"  value={productId} name="productId" type="text" onChange={e=>setProductId(e.target.value)} placeholder="Product Id" />
                         <span className="icon is-small is-left">
                         <i className="fas  fa-map-marker-alt"></i>
                         </span>
                     </p>
                 </div>
             </div>
         </div>
         <div className="field is-horizontal">
             <div className="field-body" >
                 <div className="field" style={{width:"40%"}}>
                 <p className="control has-icons-left" >
                     <input className="input is-small"  name="quantity" value={quantity} type="text" onChange={ e=> handleQtty(e)} placeholder="Quantity"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-hashtag"></i>
                     </span>
                    
                 </p>
         <label >{baseunit}</label>
             </div> 
             <div className="field">
             <label>Amount:</label>
             </div>
             <div className="field" style={{width:"40%"}}>
                 <p className="control has-icons-left ">
                     <input className="input is-small"  name="qamount" disabled={changeAmount} value={calcamount} type="text"  onChange={async e=> await setCalcAmount(e.target.value)}  placeholder="Amount"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-dollar-sign"></i>
                     </span>
                 </p>
                 <button className="button is-small is-success btnheight" onClick={handleChangeAmount}>Adjust</button>
 
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
             
        {(productItem.length>0) && <div>
             <label>Product Items:</label>
             <div class="table-container">
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                 <thead>
                     <tr>
                     <th><abbr title="Serial No">S/No</abbr></th>
                     <th><abbr title="Category">Category</abbr></th>
                     <th><abbr title="Type">Name</abbr></th>
                     <th><abbr title="Type">Quanitity</abbr></th>
                     <th><abbr title="Document No">Unit</abbr></th>
                     <th><abbr title="Cost Price">Selling Price</abbr></th>
                     <th><abbr title="Cost Price">Amount</abbr></th>
                     <th><abbr title="Billing Mode">Mode</abbr></th>
                     <th><abbr title="Actions">Actions</abbr></th>
                     </tr>
                 </thead>
                 <tfoot>
                     
                 </tfoot>
                 <tbody>
                    { productItem.map((ProductEntry, i)=>(
                          <tr key={i}>
                         <th>{i+1}</th>
                         <td>{ProductEntry.category}</td>
                         <td>{ProductEntry.name}</td>
                         <th>{ProductEntry.quantity}</th>
                         <td>{ProductEntry.baseunit}</td>
                         <td>{ProductEntry.sellingprice}</td>
                         <td>{ProductEntry.amount}</td>
                         <td>{ProductEntry.billMode.type}</td>
                         <td><span className="showAction"  >x</span></td>
                         </tr>
                     ))}
                 </tbody>
                 </table>
                 </div>
                 <div className="field mt-2 is-grouped">
                 <p className="control">
                     <button className="button is-success is-small" disabled={!productItem.length>0} onClick={handleMedicationDone}>
                        Done
                     </button>
                 </p>
                 </div>
                 </div>
            
             }
             
             
             </div>
             </div>
             <div className={`modal ${productModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card  modalbkgrnd">
                                        <header className="modal-card-head  btnheight">
                                        <p className="modal-card-title">Documentation</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body modalcolor">
                                      
                                         <Encounter standalone="true" />
                                        </section> 
                                   </div>
                                </div>      
         </>
     )
    
 }

 export  function InventorySearch({getSearchfacility,clear}) {
    
    const productServ=client.service('inventory')
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

   const handleRow= async(obj)=>{
        await setChosen(true)
       getSearchfacility(obj)
       
       await setSimpa(obj.name)
       
        setShowPanel(false)
        await setCount(2)
    }
    const handleBlur=async(e)=>{
    }
    const handleSearch=async(value)=>{
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' 

       
        if (value.length>=3 ){
            productServ.find({query: {     
                 [field]: {
                     $regex:value,
                     $options:'i'
                    
                 },
                 facility: user.currentEmployee.facilityDetail._id,
                 storeId: state.StoreModule.selectedStore._id,
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
                setFacilities(res.data)
                 setSearchMessage(" product  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                toast({
                    message: 'Error creating ProductEntry ' + err,
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

    const handleAddproduct =()=>{
        setProductModal(true) 
    }
    const handlecloseModal =()=>{
        setProductModal(false)
        handleSearch(val)
    }
    useEffect(() => {
       if (clear){
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
                            <DebounceInput className="input is-small  is-expanded" 
                                type="text" placeholder="Search Product"
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
                          { facilities.length>0?"":<div className="dropdown-item" > <span> {val} is not in your inventory</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <div><span>{facility.name}</span></div>
                                        <div><span><strong>{facility.quantity}</strong></span>
                                        <span>{facility.baseunit}(s) remaining</span>
                                        <span className="padleft"><strong>Price:</strong> N{facility.sellingprice}</span></div>
                                        
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