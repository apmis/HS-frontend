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


export default function ProductEntry() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-6 ">
                <ProductExitList />
                </div>
            <div className="column is-6 ">
                {(state.ProductExitModule.show ==='create')&&<ProductExitCreate />}
                {(state.ProductExitModule.show ==='detail')&&<ProductExitDetail  />}
                {(state.ProductExitModule.show ==='modify')&&<ProductExitModify ProductEntry={selectedProductEntry} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function ProductExitCreate(){
  
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

    let medication =state.financeModule.selectedFinance
    console.log("medication", medication)

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
        productEntry.date = date
        productEntry.documentNo= documentNo
        productEntry.type=type
        productEntry.totalamount= totalamount
        productEntry.source=source
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
                   Point of Sale: Sales, Dispense, Audit, Transfer out
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
                    <input className="input is-small" value={date}  name="date" type="text" onChange={e=>setDate(e.target.value)} placeholder="Date" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" name="documentNo" value={documentNo} type="text" onChange={e=>setDocumentNo(e.target.value)} placeholder=" Invoice Number"/>
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
                        <input className="input is-small" value={productId} name="productId" type="text" onChange={e=>setProductId(e.target.value)} placeholder="Product Id" />
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
                    <input className="input is-small" name="quantity" value={quantity} type="text" onChange={ e=> handleQtty(e)} placeholder="Quantity"  />
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
                    <button className="button is-warning is-small" disabled={!productItem.length>0} /* onClick={onSubmit} */>
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

export function ProductExitList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const ProductEntryServ=client.service('productentry')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedProductEntry, setSelectedProductEntry]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newProductExitModule={
            selectedProductEntry:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, ProductExitModule:newProductExitModule}))
       
        

    }
    const handleRow= async(ProductEntry)=>{
        

        

        await setSelectedProductEntry(ProductEntry)

        const    newProductExitModule={
            selectedProductEntry:ProductEntry,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, ProductExitModule:newProductExitModule}))
       

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       ProductEntryServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
                transactioncategory:"debit",
                storeId:state.StoreModule.selectedStore._id,
               facility:user.currentEmployee.facilityDetail._id || "",
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
            if (user.currentEmployee){
            
        const findProductEntry= await ProductEntryServ.find(
                {query: {
                    transactioncategory:"debit",
                    facility:user.currentEmployee.facilityDetail._id,
                    storeId:state.StoreModule.selectedStore._id,
                    $limit:20,
                    $sort: {
                        createdAt: -1
                    }
                    }})

         await setFacilities(findProductEntry.data)
                }
                else {
                    if (user.stacker){
                        const findProductEntry= await ProductEntryServ.find(
                            {query: {
                                transactioncategory:"debit",
                                $limit:20,
                                $sort: {
                                    createdAt: -1
                                }
                                }})
            
                    await setFacilities(findProductEntry.data)

                    }
                }
            }
            
        

            useEffect(() => {
               
                if (!state.StoreModule.selectedStore){
                    toast({
                        message: 'kindly select a store',
                        type: 'is-danger',
                        dismissible: true,
                        pauseOnHover: true,
                      }) 
                      return
                    getFacilities()

                }else{
                }
                ProductEntryServ.on('created', (obj)=>getFacilities())
                ProductEntryServ.on('updated', (obj)=>getFacilities())
                ProductEntryServ.on('patched', (obj)=>getFacilities())
                ProductEntryServ.on('removed', (obj)=>getFacilities())
                return () => {
                
                }
            },[])

            useEffect(() => {
                getFacilities()
                console.log("store changed")
                return () => {
                   
                }
            }, [state.StoreModule.selectedStore])

    return(
        <>
           {state.StoreModule.selectedStore?( <>  
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search ProductEntry"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Product Exits </span></div>
                    <div className="level-right">
                        <div className="level-item"> 
                            <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div>
                    </div>

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Date">Date</abbr></th>
                                        <th><abbr title="Type">Type</abbr></th>
                                        <th>Client</th>
                                        <th><abbr title="Document No">Document No</abbr></th>
                                        <th><abbr title="Total Amount">Total Amount</abbr></th>
                                        <th><abbr title="Enteredby">Entered By</abbr></th>
                                        <th><abbr title="Actions">Actions</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((ProductEntry, i)=>(

                                            <tr key={ProductEntry._id} onClick={()=>handleRow(ProductEntry)}>
                                            <th>{i+1}</th>
                                            <td>{ProductEntry.date}</td>
                                            <th>{ProductEntry.type}</th>
                                            <td>{ProductEntry.source}</td>
                                            <td>{ProductEntry.documentNo}</td>
                                            <td>{ProductEntry.totalamount}</td>
                                            <td>{ProductEntry.enteredby}</td>
                                            <td><span className="showAction"  >...</span></td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>):<div>loading... Choose a Store</div>}
            </>
              
    )
    }


export function ProductExitDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)

   

   const ProductEntry =state.ProductExitModule.selectedProductEntry 

    const handleEdit= async()=>{
        const    newProductExitModule={
            selectedProductEntry:ProductEntry,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, ProductExitModule:newProductExitModule}))
       
       
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
                    <th><abbr title="Selling Price">Selling Price</abbr></th>
                    <th><abbr title="Amount">Amount</abbr></th>
                   
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
                        <td>{ProductEntry.sellingprice}</td>
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

export function ProductExitModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    
    const ProductEntryServ=client.service('productentry')
    
     
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

    const ProductEntry =state.ProductExitModule.selectedProductEntry 

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
    const    newProductExitModule={
        selectedProductEntry:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, ProductExitModule:newProductExitModule}))
           }


        const changeState =()=>{
        const    newProductExitModule={
            selectedProductEntry:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, ProductExitModule:newProductExitModule}))

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
                          { facilities.length>0?"":<div className="dropdown-item"> <span> {val} is not in your inventory</span> </div>}

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