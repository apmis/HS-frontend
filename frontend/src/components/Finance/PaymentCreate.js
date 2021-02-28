import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {ProductCreate} from './Products'
import Encounter from '../EncounterMgt/Encounter';
var random = require('random-string-generator');
// eslint-disable-next-line
const searchfacility={};

export default function PaymentCreate(){
    // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
     //const [error, setError] =useState(false)
     const [success, setSuccess] =useState(false)
     const [message,setMessage] = useState("")
     // eslint-disable-next-line
     const [facility,setFacility] = useState()
     const SubwalletTxServ=client.service('subwallettransactions')
     const SubwalletServ=client.service('subwallet')
     const OrderServ=client.service('order')
     //const history = useHistory()
     const {user} = useContext(UserContext) //,setUser
     // eslint-disable-next-line
     const [currentUser,setCurrentUser] = useState()
     const [type,setType] = useState("Bill")
     const [documentNo,setDocumentNo] = useState("")
     const [totalamount,setTotalamount] = useState(0)
     const [description,setDescription] = useState(null)
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
      const [paymentmode, setPaymentMode] = useState("")
      const [paymentOptions, setPaymentOptions]=useState([])
      const [billMode, setBillMode]=useState("")
      const [productModal, setProductModal]=useState(false)
      const [obj, setObj]=useState("")
      const [amountPaid, setAmountPaid]=useState(0)
      const [balance, setBalance]=useState(0)
     
     const {state,setState}=useContext(ObjectContext)
     const inputEl = useRef(0);
     let calcamount1
     let hidestatus
  

    
  let medication =state.financeModule.selectedFinance
  console.log(state.financeModule.state)

  const showDocumentation = async (value)=>{
    setProductModal(true)
  }
  const handlecloseModal =()=>{
    setProductModal(false)
   // handleSearch(val)
    }

    const handleChangeMode= async(value)=>{
        console.log(value)
       await setPaymentMode(value)
        console.log(paymentOptions)
       let billm= paymentOptions.filter(el=>el.name===value)
       await setBillMode(billm)
        console.log(billm)
        // at startup
        // check payment mode options from patient financial info
        // load that to select options
        // default to HMO-->company-->family-->cash
        //when chosen
        //append payment mode to order
        //check service contract for pricing info
        // calculate pricing 
        // pricing


    }

    const handleRow= async(ProductEntry)=>{
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    //await setMedication(ProductEntry)

    const    newProductEntryModule={
        selectedMedication:ProductEntry,
        show :'detail'
    }
  await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
   //console.log(state)
  // ProductEntry.show=!ProductEntry.show

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
         amount:calcamount, //||qamount
         baseunit,
         costprice,
         billingId
 
     }
     // consider batchformat{batchno,expirydate,qtty,baseunit}
     //consider baseunoit conversions
     const getSearchfacility=async (obj)=>{
       await setObj(obj)
        if (!obj){
            //"clear stuff"
            setProductId("")
            setName("")
            setBaseunit("")
            setInventoryId("")
            setSellingPrice("")
            setInvQuantity("")
            setDescription("")
            setCostprice("")
           // setCalcAmount(null)
            return
        }
 
         setProductId(obj.productId)
         setName(obj.name)
         setBaseunit(obj.baseunit)
         setInventoryId(obj.inventoryId)
         setSellingPrice(obj.sellingprice) //modify this based on billing mode
         setInvQuantity(obj.quantity)
         setCostprice(obj.costprice)
         setBilllingId(obj.billingId)

         const contracts=obj.billingDetails.contracts
         //const billingserv=client.service('billing')
        if( billMode.type==="HMO Cover"){ //paymentmode
         let contract=contracts.filter(el=>el.source_org===billMode.detail.hmo)
         console.log(contract[0].price)
         setSellingPrice(contract[0].price)
         console.log(sellingprice)
        
        }
        if( billMode.type==="Company Cover"){ //paymentmode
            let contract=contracts.filter(el=>el.source_org===billMode.detail.company)
            console.log(contract[0].price)
            setSellingPrice(contract[0].price)
            console.log(sellingprice)
           
           }
          
        /*  setValue("facility", obj._id,  {
             shouldValidate: true,
             shouldDirty: true
         }) */
     }

     useEffect(() => {
       /*  console.log(obj)
        console.log(billMode)
        if( paymentmode!=="Cash" && obj){
            const contracts=obj.billingDetails.contracts
            let contract=contracts.filter(el=>el.source_org===billMode.detail.hmo)
           console.log(contract[0].price)
           setSellingPrice(contract[0].price)
           console.log(sellingprice)
       }
         return () => {
            
         } */
     }, [obj])

     useEffect(() => {
         setCurrentUser(user)
         //console.log(currentUser)
         return () => {
         
         }
     }, [user])
 
     const handleUpdateTotal=async ()=>{
        await setTotalamount(prevtotal=>Number(prevtotal) + Number(calcamount))
     }
 
     const handleChangeType=async (e)=>{
         console.log(e.target.value)
         await setType(e.target.value)
     }
 
     const handleAmount= async()=>{
         await setDescription("")
        // alert("Iam chaning qamount")
     }

     const handleClickProd=async()=>{
       /*   console.log("amount: ",productItemI.amount)
         console.log("qamount: ",qamount)
         console.log("calcamount: ",calcamount) */
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
            // generate billing info
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
                  paymentInfo:{},
                  participantInfo:{
                    billingFacility:medication.destination,
                    billingFacilityName:medication.destination_name,
                    locationId:state.StoreModule.selectedStore._id, //selected location,
                    clientId:medication.clientId,
                    client:medication.client,
                    paymentmode:billMode
                  },
                  createdBy:user.id,
                  billing_status:"Unpaid"
                }

        //update order
        
        OrderServ.patch(medication._id,{
            order_status:"Billed",
            billInfo,
        }).then((resp)=>{
           // medication=resp
           // console.log(resp)
             handleRow(resp) 
            //update dispense

        })
        .catch((err)=>{
            console.log(err)
        })
        
        //update status(billed) + action()
        //?attached chosen product to medication
        //dispense helper?
         setName("")
         setBaseunit("")
         setQuantity("")
         setInventoryId("")
         setSellingPrice("")
         setInvQuantity("")
             handleAmount()
        // setCalcAmount(null)
        await setSuccess(true)
        /* console.log(success)
        console.log(qamount)
        console.log(productItem) */
        setChangeAmount(true)
     }
   //check user for facility or get list of facility  
    /*  useEffect(()=>{
         //setFacility(user.activeProductEntry.FacilityId)//
       if (!user.stacker){
           console.log(currentUser)
            /* setValue("facility", user.currentEmployee.facilityDetail._id,  {
             shouldValidate: true,
             shouldDirty: true
         })  
 
       }
     }) */
 
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


     const handleMedicationDone= async()=>{ //handle selected single order
        //console.log("b4",state)
    
        //console.log("handlerow",ProductEntry)
    
       // await setSelectedMedication("")
    
        const    newProductEntryModule={
            selectedMedication:{},
            show :'create'
        }
      await setState((prevstate)=>({...prevstate, medicationModule:newProductEntryModule}))
       //console.log(state)
      // ProductEntry.show=!ProductEntry.show
    
    }
 
     const onSubmit = async(e) =>{
         e.preventDefault();
         setMessage("")
         //setError(false)
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
        
          // console.log("b4 facility",productEntry);
           if (user.currentEmployee){
          productEntry.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
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
    const handleAccept=async()=>{
        let obj={
           // toWallet:{ type: Schema.Types.ObjectId, ref:'facility', }, //receiving money
            //fromWallet:{ type: Schema.Types.ObjectId, ref:'facility', },//sending money
            //subwallet:{ type: Schema.Types.ObjectId, ref:'subwallet', },
            client:medication.participantInfo.client._id,
            organization:user.employeeData[0].facilityDetail._id,
            category:"credit", //debit/credit
            amount:amountPaid,
            description: description,
           
            toName:user.employeeData[0].facilityDetail.facilityName,
            fromName:medication.participantInfo.client.firstname + " "+ medication.participantInfo.client.lastname,
            createdby: user._id,
            
           // refBill:[{ type: Schema.Types.ObjectId, ref:'bills'  }], //billid to be paid : ref invoice to pay
           // info:{ type: Schema.Types.Mixed},
           // status:{ type: String },
            
            facility: user.employeeData[0].facilityDetail._id,
            locationId: state.LocationModule.selectedLocation._id,
            type: "Deposit"

        }
       SubwalletTxServ.create(obj)
       .then((resp)=>{
           console.log(resp)

        toast({
            message: 'Deposit accepted succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          })
          setAmountPaid(0)
       })
       .catch((err)=>{
        toast({
            message: 'Error accepting deposit ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          })

       })

    }

    useEffect(() => {
        const oldname=medication.participantInfo.client.firstname + " "+ medication.participantInfo.client.lastname
        console.log("oldname",oldname)
        setSource(medication.participantInfo.client.firstname + " "+ medication.participantInfo.client.lastname)

        const newname=source
        console.log("newname",newname)
        if (oldname!==newname){
            //newdispense
        
        setProductItem([])
        setTotalamount(0)

        }
        if (state.financeModule.state){
         setProductItem(
            prevProd=>prevProd.concat(medication)
        )
        }else{
            if(productItem.length>0){
                setProductItem(
                    prevProd=>prevProd.filter(el=>el._id!==medication._id)
                )
            }
        }

        const paymentoptions= []
        const info = medication.participantInfo.client.paymentinfo
        let billme={}
        getFacilities()
       
        return () => {
           
        }
    }, [state.financeModule])

    useEffect(() => {
        console.log(productItem)
        setTotalamount(0)
        productItem.forEach(el=>{
            setTotalamount(prevtotal=>Number(prevtotal) + Number(el.serviceInfo.amount) )
        })
        return () => {
        
        }
    }, [productItem])

    const getFacilities= async()=>{
       
        // console.log("here b4 server")
        const findProductEntry= await SubwalletServ.find(
        {query: {
           
            client:medication.participantInfo.client._id,
            organization:user.employeeData[0].facilityDetail._id,
            //storeId:state.StoreModule.selectedStore._id,
            //clientId:state.ClientModule.selectedClient._id,
            $limit:100,
            $sort: {
                createdAt: -1
            }
            }})
             console.log(findProductEntry)

     // console.log("balance", findProductEntry.data[0].amount)
        if (findProductEntry.data.length>0){
            await setBalance(findProductEntry.data[0].amount)
        }else{
            await setBalance(0) 
            
        } 

      //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
        }   



     useEffect(() => {
       // const medication =state.medicationModule.selectedMedication
         const today=new Date().toLocaleString()
         console.log(today)
         setDate(today)
         const invoiceNo=random(6,'uppernumeric')
         setDocumentNo(invoiceNo)


            getFacilities()
            SubwalletServ.on('created', (obj)=>getFacilities())
            SubwalletServ.on('updated', (obj)=>getFacilities())
            SubwalletServ.on('patched', (obj)=>getFacilities())
            SubwalletServ.on('removed', (obj)=>getFacilities())



         return async() => {
            const    newProductEntryModule={
                selectedFinance:{},
                show :'create'
                }
           await setState((prevstate)=>({...prevstate, financeModule:newProductEntryModule}))
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

// console.log("simpa")
     return (
         <>
             <div className="card card-overflow">
             <div className="card-header">
                 <p className="card-header-title">
                     Pay Bill
                 </p>
                 <button className="button is-success is-small btnheight mt-2" >
                    Balance: N {balance}
                 </button>
             </div>
             <div className="card-content ">
    
            {/*  <form onSubmit={onSubmit}>  */}
             <div className="field is-horizontal">
             <div className="field-body">
         
             <div className="field">
                     <p className="control has-icons-left has-icons-right">
                         <input className="input is-small" /* ref={register({ required: true })} */ value={source} name="client" type="text" onChange={e=>setSource(e.target.value)} placeholder="Client" />
                         <span className="icon is-small is-left">
                             <i className="fas fa-hospital"></i>
                         </span>                    
                     </p>
                 </div>
                 <div className="field">
                 <p className="control has-icons-left">
                     <input className="input is-small" /* ref={register} */ name="documentNo" value={documentNo} type="text" onChange={e=>setDocumentNo(e.target.value)} placeholder=" Invoice Number"/>
                     <span className="icon is-small is-left">
                     <i className="fas fa-phone-alt"></i>
                     </span>
                 </p>
             </div>
                 
            
                </div>
             </div>
             <div className="field is-horizontal">
             <div className="field-body" >
             <div className="field">
             <label className="label is-small">Total Amount Due:</label>
             </div>
             <div className="field" style={{width:"40%"}}>
                 <p className="control has-icons-left " /* style={{display:"none"}} */>
                     <input className="input is-small"  disabled={changeAmount} value={totalamount} name="totalamount"  onChange={e=>setTotalamount(e.target.value)} placeholder="Amount"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-dollar-sign"></i>
                     </span>
                 </p>
                
 
             </div> 
            
             </div>
          </div>
                
               {/*   </form>   */} 
                
            
          {/* array of ProductEntry items */}
         
         <label className="label is-small ">Payment Information:</label>
         <div className="field is-horizontal">
             <div className="field-body">
             <div className="field">    
                    <div className="control">
                        <div className="select is-small ">
                            <select name="paymentmode" value={paymentmode} onChange={(e)=>handleChangeMode(e.target.value)} className="selectadd" >
                            <option value="">Payment Mode </option>
                            
                            <option value="Cash">Cash</option>
                                <option value="Wallet">Wallet </option>
                                <option value="Wallet">Bank Transfer </option>
                                <option value="Card">Card</option>
                                <option value="Cheque">Cheque</option> 
                            </select>
                        </div>
                    </div>
                    </div>
             <div className="field" >
                 <p className="control has-icons-left" >
                     <input className="input is-small"  name="order" value={amountPaid} type="text" onChange={ e=> setAmountPaid(e.target.value)} placeholder="Quantity"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-hashtag"></i>
                     </span>
                 </p>
             </div> 
             <div className="field">
                <p className="control">
                     <button className="button is-info is-small  is-pulled-right selectadd">
                       <span className="is-small" onClick={handleAccept}>Accept</span>
                     </button>
                 </p>
             </div>
             </div>
             </div>
            
          
         <div className="field is-horizontal pullup">
             <div className="field-body" >
             <div className="field">
             <label className="label is-small">Payment Details:</label>
             </div>
             <div className="field" >
                 <p className="control has-icons-left " /* style={{display:"none"}} */>
                     <input className="input is-small"  name="description"  value={description} type="text"  onChange={async e=> await setDescription(e.target.value)}  placeholder="Payment Details"  />
                     <span className="icon is-small is-left">
                     <i className="fas fa-dollar-sign"></i>
                     </span>
                 </p>
                
 
             </div> 
            
             </div>
          </div>
             
        {(productItem.length>0) && <>
            <label>Product Items:</label>
        <div className="vscrollable-acc">
             
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                 <thead>
                     <tr>
                     <th><abbr title="Serial No">S/No</abbr></th>
                     <th><abbr title="Category">Category</abbr></th>
                     <th><abbr title="Description">Description</abbr></th>
                     <th><abbr title="Amount">Amount</abbr></th>
                     {/* <th><abbr title="Cost Price">Selling Price</abbr></th>
                     <th><abbr title="Cost Price">Amount</abbr></th> */}
                     {/* <th><abbr title="Actions">Actions</abbr></th> */}
                     </tr>
                 </thead>
                 <tfoot>
                     
                 </tfoot>
                 <tbody>
                    { productItem.map((ProductEntry, i)=>(
                          <tr key={i}>
                         <th>{i+1}</th>
                         <th>{ProductEntry.orderInfo.orderObj.order_category}</th>
                         <td>{ProductEntry.serviceInfo.name}</td>
                         <td>{ProductEntry.serviceInfo.amount}</td>
                        {/*  <td>{ProductEntry.sellingprice}</td>
                         <td>{ProductEntry.amount}</td> */}
                        {/*  <td><span className="showAction"  >x</span></td> */}
                         </tr>
                     ))}
                 </tbody>
                 </table>
                 </div>    
                 <div className="field mt-2 is-grouped">
                    <p className="control">
                        <button className="button is-success is-small" disabled={!productItem.length>0} onClick={handleMedicationDone}>
                            Pay
                        </button>
                    </p>
                  {/* <p className="control">
                     <button className="button is-info is-small" disabled={!productItem.length>0} onClick={onSubmit} >
                         Generate Invoice
                     </button>
                 </p>  */}
                 </div>
        
            </>
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
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer>  */}
                                   </div>
                                </div>      
         </>
     )
    
 }

 export  function InventorySearch({getSearchfacility,clear}) {
    
    const productServ=client.service('inventory')
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
     const [searchError, setSearchError] =useState(false)
     // eslint-disable-next-line
    const [showPanel, setShowPanel] =useState(false)
     // eslint-disable-next-line
   const [searchMessage, setSearchMessage] = useState("") 
   // eslint-disable-next-line 
   const [simpa,setSimpa]=useState("")
   // eslint-disable-next-line 
   const [chosen,setChosen]=useState(false)
   // eslint-disable-next-line 
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)
   const [val,setVal]=useState("")
   const {user} = useContext(UserContext) 
   const {state}=useContext(ObjectContext)
    const [productModal,setProductModal]=useState(false)

   const handleRow= async(obj)=>{
        await setChosen(true)
        //alert("something is chaning")
       getSearchfacility(obj)
       
       await setSimpa(obj.name)
       
        // setSelectedFacility(obj)
        setShowPanel(false)
        await setCount(2)
        /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
   //console.log(state)
    }
    const handleBlur=async(e)=>{
         if (count===2){
             console.log("stuff was chosen")
         }
       
       /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
    }
    const handleSearch=async(value)=>{
        setVal(value)
        if (value===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' //field variable

       
        if (value.length>=3 ){
            productServ.find({query: {     //service
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
                        {/* {searchError&&<div>{searchMessage}</div>} */}
                        <div className="dropdown-menu expanded" style={{width:"100%"}}>
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item" /* onClick={handleAddproduct} */> <span> {val} is not in your inventory</span> </div>}

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