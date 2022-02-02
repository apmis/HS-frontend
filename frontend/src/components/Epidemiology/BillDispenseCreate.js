/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ProductCreate} from './Products'
var random = require('random-string-generator');

const searchfacility={};

export default function BillDispenseCreate(){
    
     const [error, setError] =useState(false)
     const [success, setSuccess] =useState(false)
     const [message,setMessage] = useState("")
     
     const [facility,setFacility] = useState()
     const ProductEntryServ=client.service('productentry')
     
     const {user} = useContext(UserContext) 
     
     const [currentUser,setCurrentUser] = useState()
     const [type,setType] = useState("Sales")
     const [documentNo,setDocumentNo] = useState("")
     const [totalamount,setTotalamount] = useState(0)
     const [qamount,setQAmount] = useState(null)
     const [productId,setProductId] = useState("")
     const [source,setSource] = useState("")
     const [date,setDate] = useState("")
     const [name,setName] = useState("")
     const [inventoryId,setInventoryId] = useState("")
     const [baseunit,setBaseunit] = useState("")
     const [quantity,setQuantity] = useState("")
     const [sellingprice,setSellingPrice] = useState("")
     const [costprice,setCostprice] = useState(0)
     const [invquantity,setInvQuantity] = useState("")
     const [calcamount,setCalcAmount] = useState(0)
     const [productItem,setProductItem] = useState([])
     const [billingId,setBilllingId]=useState("")  
     const [changeAmount, setChangeAmount] = useState(true)
     const {state}=useContext(ObjectContext)
     const inputEl = useRef(0);
     let calcamount1
     let hidestatus
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
         billingId
 
     }
     
     
     const getSearchfacility=(obj)=>{
 
         setProductId(obj.productId)
         setName(obj.name)
         setBaseunit(obj.baseunit)
         setInventoryId(obj.inventoryId)
         setSellingPrice(obj.sellingprice)
         setInvQuantity(obj.quantity)
         setCostprice(obj.costprice)
         setBilllingId(obj.billingId)
         if (!obj){
             
             setProductId("")
             setName("")
             setBaseunit("")
             setInventoryId("")
             setSellingPrice("")
             setInvQuantity("")
             setQAmount(null)
             setCostprice("")
            
 
         }
         
     }
     
     useEffect(() => {
         setCurrentUser(user)
         return () => {
         
         }
     }, [user])
 
     const handleUpdateTotal=()=>{
 
         
         setTotalamount(prevtotal=>Number(prevtotal) + Number(calcamount))
     }
 
     const handleChangeType=async (e)=>{
         await setType(e.target.value)
     }
 
     const handleAmount= async()=>{
         await setQAmount(null)
     }
     const handleClickProd=async()=>{
         console.log("amount: ",productItemI.amount)
         console.log("qamount: ",qamount)
         console.log("calcamount: ",calcamount)
 
         if ( quantity===0||quantity===""|| productId===""){
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
         setName("")
         setBaseunit("")
         setQuantity("")
         setInventoryId("")
         setSellingPrice("")
         setInvQuantity("")
             handleAmount()
        await setSuccess(true)
        setChangeAmount(true)
     }
 
     const handleQtty=async(e)=>{
         if (invquantity<e.target.value){
             toast({
                 message: 'You can not sell more quantity than exist in inventory ' ,
                 type: 'is-danger',
                 dismissible: true,
                 pauseOnHover: true,
               })
             return
         }
         setQuantity(e.target.value)
         calcamount1=quantity*sellingprice
         await setCalcAmount(calcamount1)
         console.log(calcamount)
 
        
 
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
 
     const onSubmit = async(e) =>{
         e.preventDefault();
         setMessage("")
         setError(false)
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
        
           console.log("b4 facility",productEntry);
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
           console.log("b4 create",productEntry);
         ProductEntryServ.create(productEntry)
         .then((res)=>{
                 
                 resetform()
                 setSuccess(true)
                 toast({
                     message: 'ProductExit created succesfully',
                     type: 'is-success',
                     dismissible: true,
                     pauseOnHover: true,
                   })
                   setSuccess(false)
                   setProductItem([])
                   const today=new Date().toLocaleString()
       
                   setDate(today)
                   const invoiceNo=random(6,'uppernumeric')
                 setDocumentNo(invoiceNo)
                 setType("Sales")
             })
             .catch((err)=>{
                 toast({
                     message: 'Error creating ProductExit ' + err,
                     type: 'is-danger',
                     dismissible: true,
                     pauseOnHover: true,
                   })
             })
 
       } 
 
       const handleChangeAmount=()=>{
         setChangeAmount((rev)=>(!rev))
         
     }
 
     useEffect(() => {
         const today=new Date().toLocaleString()
         console.log(today)
         setDate(today)
         const invoiceNo=random(6,'uppernumeric')
         setDocumentNo(invoiceNo)
         return () => {
             
         }
     }, [])
 
     useEffect(() => {
         calcamount1=quantity*sellingprice
          setCalcAmount(calcamount1)
          console.log(calcamount)
          setChangeAmount(true)
         return () => {
             
         }
     }, [quantity])
 
     return (
         <>
             <div className="card card-overflow">
             <div className="card-header">
                 <p className="card-header-title">
                     Create Product Exit: Product Exit- Sales, Dispense, Audit, Transfer out
                 </p>
             </div>
             <div className="card-content ">
    
             <form onSubmit={onSubmit}> 
             <div className="field is-horizontal">
             <div className="field-body">
             <div className="field">    
                 <div className="control">
                     <div className="select is-small">
                         <select name="type" value={type} onChange={handleChangeType} className="selectadd">
                            <option value="">Choose Type </option>
                             <option value="Sales">Sales </option>
                             <option value="In-house">In-House </option>
                             <option value="Dispense">Dispense</option>
                             <option value="Audit">Audit</option>
                         </select>
                     </div>
                 </div>
             </div>
             <div className="field">
                     <p className="control has-icons-left has-icons-right">
                         <input className="input is-small" value={source} name="client" type="text" onChange={e=>setSource(e.target.value)} placeholder="Client" />
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
                
            
         
         <label className="label is-small">Add Product Items:</label>
          <div className="field is-horizontal">
             <div className="field-body">
             <div className="field is-expanded" >
                     <InventorySearch  getSearchfacility={getSearchfacility} clear={success} /> 
                     <p className="control has-icons-left " style={{display:"none"}}>
                         <input className="input is-small"  value={productId} name="productId" type="text" onChange={e=>setProductId(e.target.value)} placeholder="Product Id" />
                         <span className="icon is-small is-left">
                         <i className="fas  fa-map-marker-alt"></i>
                         </span>
                     </p>
                  {sellingprice &&   "N"}{sellingprice} {sellingprice &&   "per"}  {baseunit} {invquantity} {sellingprice &&   "remaining"} 
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
                 <p className="control has-icons-left " >
                     <input className="input is-small" name="qamount" disabled={changeAmount} value={calcamount} type="text"  onChange={async e=> await setCalcAmount(e.target.value)}  placeholder="Amount"   />
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
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                 <thead>
                     <tr>
                     <th><abbr title="Serial No">S/No</abbr></th>
                     <th><abbr title="Type">Name</abbr></th>
                     <th><abbr title="Type">Quanitity</abbr></th>
                     <th><abbr title="Document No">Unit</abbr></th>
                     <th><abbr title="Cost Price">Selling Price</abbr></th>
                     <th><abbr title="Cost Price">Amount</abbr></th>
                     <th><abbr title="Actions">Actions</abbr></th>
                     </tr>
                 </thead>
                 <tfoot>
                     
                 </tfoot>
                 <tbody>
                    { productItem.map((ProductEntry, i)=>(
 
                         <tr key={i}>
                         <th>{i+1}</th>
                         <td>{ProductEntry.name}</td>
                         <th>{ProductEntry.quantity}</th>
                         <td>{ProductEntry.baseunit}</td>
                         <td>{ProductEntry.sellingprice}</td>
                         <td>{ProductEntry.amount}</td>
                         <td><span className="showAction"  >x</span></td>
                         
                         </tr>
 
                     ))}
                 </tbody>
                 </table>
                 <div className="field mt-2 is-grouped">
                 <p className="control">
                     <button className="button is-success is-small" disabled={!productItem.length>0} onClick={onSubmit}>
                         Sell
                     </button>
                 </p>
                 <p className="control">
                     <button className="button is-warning is-small" disabled={!productItem.length>0} >
                         Clear
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
              console.log("product  fetched successfully") 
              console.log(res.data) 
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
            <div className={`modal ${productModal?"is-active":""}` }>
                                    <div className="modal-background"></div>
                                    <div className="modal-card">
                                        <header className="modal-card-head">
                                        <p className="modal-card-title">Choose Store</p>
                                        <button className="delete" aria-label="close"  onClick={handlecloseModal}></button>
                                        </header>
                                        <section className="modal-card-body">
                                        <ProductCreate />
                                        </section>
                                    </div>
                                </div>       
        </div>
    )
}