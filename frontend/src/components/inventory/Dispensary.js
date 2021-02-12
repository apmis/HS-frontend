import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import {format, formatDistanceToNowStrict } from 'date-fns'
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
const searchfacility={};


export default function Dispense() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedProductEntry,setSelectedProductEntry]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
           {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}
            <div className="columns ">
            <div className="column is-6 ">
                <DispenseList />
                </div>
            <div className="column is-6 ">
                {(state.DispenseModule.show ==='create')&&<DispenseCreate />}
                {(state.DispenseModule.show ==='detail')&&<DispenseDetail  />}
                {(state.DispenseModule.show ==='modify')&&<DispenseModify ProductEntry={selectedProductEntry} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function DispenseCreate(){
   // const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const ProductEntryServ=client.service('productentry')
    //const history = useHistory()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const [type,setType] = useState("Purchase Invoice")
    const [documentNo,setDocumentNo] = useState("")
    const [totalamount,setTotalamount] = useState("")
    const [productId,setProductId] = useState("")
    const [source,setSource] = useState("")
    const [date,setDate] = useState("")
    const [name,setName] = useState("")
    const [destination,setDestination] = useState("")
    const [medication,setMedication] = useState()
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
 
    const productItemI={
      /*   productId,
        name, */
        medication,
        destination,
        instruction
        /* costprice,
        amount:quantity*costprice,
        baseunit */

    }
    // consider batchformat{batchno,expirydate,qtty,baseunit}
    //consider baseunoit conversions
    const getSearchfacility=(obj)=>{

        setProductId(obj._id)
        setName(obj.name)
       // setBaseunit(obj.baseunit)
        
       /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
    }
    
    useEffect(() => {
        setCurrentUser(user)
        //console.log(currentUser)
        return () => {
        
        }
    }, [user])
   /*  useEffect(() => {
        setProductItem(
            prevProd=>prevProd.concat(productItemI)
        )
        console.log(productItem)
        return () => {
            
        }
    },[productItemI])
 */
    const handleChangeType=async (e)=>{
        await setType(e.target.value)
    }
    const handleClickProd=async()=>{
        await setSuccess(false)
        await setProductItem(
            prevProd=>prevProd.concat(productItemI)
        )
        setName("")
        setMedication("")
        setInstruction("")
        setDestination("")
       await setSuccess(true)
       console.log(success)
       console.log(productItem)
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

    const resetform=()=>{
     setType("Purchase Invoice")
    setDocumentNo("")
    setTotalamount("")
    setProductId("")
    setSource("")
    setDate("")
    setName("")
    setMedication("")
    setInstruction("")
    setProductItem([])
    }
    const onSubmit = () =>{
        //data,e
       // e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
        //write document
        let document={}
         // data.createdby=user._id
         // console.log(data);
          if (user.currentEmployee){
          document.facility=user.currentEmployee.facilityDetail._id 
          document.facilityname=user.currentEmployee.facilityDetail.facilityName // or from facility dropdown
          }
         document.documentdetail=productItem
         console.log(document.documentdetail)
          document.documentname="Prescription" //state.DocumentClassModule.selectedDocumentClass.name
         // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
          document.location=state.ClinicModule.selectedClinic.name+" "+state.ClinicModule.selectedClinic.locationType
          document.locationId=state.ClinicModule.selectedClinic._id
          document.client=state.ClientModule.selectedClient._id
          document.createdBy=user._id
          document.createdByname=user.firstname+ " "+user.lastname
          document.status="completed"
          console.log(document)
        ClientServ.create(document)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Documentation created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Documentation ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      } 






/* 
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
        productEntry.transactioncategory="credit"

          console.log("b4 facility",productEntry);
          if (user.currentEmployee){
         productEntry.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }else{
            toast({
                message: 'You can not add inventory to any organization',
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
                message: 'You need to select a store before adding inventory',
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              }) 
              return

          }
          console.log("b4 create",productEntry);
        ProductEntryServ.create(productEntry)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                resetform()
               /*  setMessage("Created ProductEntry successfully") */
             /*    setSuccess(true)
                toast({
                    message: 'ProductEntry created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
                  setProductItem([])
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating ProductEntry ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })

      }  */ 

    useEffect(() => {
       console.log("Simpa")
        return () => {
            
        }
    }, [])

    return (
        <>
            <div className="card card-overflow">
            <div className="card-header">
                <p className="card-header-title">
                    Create Prescription
                </p>
            </div>
            <div className="card-content ">
   
           {/*  <form onSubmit={onSubmit}> {/* handleSubmit(onSubmit)  </form>  */}
           
               
           
         {/* array of ProductEntry items */}
        
        <label className="label is-small">Add Medication:</label>
         <div className="field is-horizontal">
            <div className="field-body">
            {/* <div className="field is-expanded"  style={ !user.stacker?{display:"none"}:{}}  > */}
                   {/*  <ProductSearch  getSearchfacility={getSearchfacility} clear={success} />  */}
                   {/*  <p className="control has-icons-left " style={{display:"none"}}>
                        <input className="input is-small"  ref={register ({ required: true }) }   add array no  value={productId} name="productId" type="text" onChange={e=>setProductId(e.target.value)} placeholder="Product Id" />
                        <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                        </span>
                    </p> 
                </div>*/}
                <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" /* ref={register({ required: true })} */ name="medication" value={medication} type="text" onChange={e=>setMedication(e.target.value)} placeholder="medication"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
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
                    <input className="input is-small" /* ref={register({ required: true })} */ name="instruction" value={instruction} type="text" onChange={e=>setInstruction(e.target.value)} placeholder="Instructions/Note"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
       
            </div>  
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" /* ref={register({ required: true })} */ name="destination" value={destination} type="text" onChange={e=>setDestination(e.target.value)} placeholder="Destination Pharmacy"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
       
            </div>  
            </div> 
            </div> 

       {(productItem.length>0) && <div>
            <label>Medications:</label>
         <table className="table is-striped  is-hoverable is-fullwidth is-scrollable ">
                <thead>
                    <tr>
                    <th><abbr title="Serial No">S/No</abbr></th>
                   {/*  <th><abbr title="Type">Name</abbr></th> */}
                    <th><abbr title="Medication">Medication</abbr></th>
                    <th><abbr title="Destination">Destination</abbr></th>
                     {/*<th><abbr title="Cost Price">Cost Price</abbr></th>
                    <th><abbr title="Cost Price">Amount</abbr></th> */}
                    <th><abbr title="Actions">Actions</abbr></th>
                    </tr>
                </thead>
                <tfoot>
                    
                </tfoot>
                <tbody>
                   { productItem.map((ProductEntry, i)=>(

                        <tr key={i}>
                        <th>{i+1}</th>
                        {/* <td>{ProductEntry.name}</td> */}
                        <td>{ProductEntry.medication}<br/>
                        <span className="help">{ProductEntry.instruction}</span></td>
                       <td>{ProductEntry.destination}</td>
                         {/* <td>{ProductEntry.costprice}</td>
                        <td>{ProductEntry.amount}</td> */}
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
        </>
    )
   
}

export function DispenseList({standalone}){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const OrderServ=client.service('order')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedDispense, setSelectedDispense]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)



    const handleCreateNew = async()=>{
        const    newProductEntryModule={
            selectedDispense:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
       //console.log(state)
        

    }
    const handleRow= async(ProductEntry)=>{
        //console.log("b4",state)

        //console.log("handlerow",ProductEntry)

        await setSelectedDispense(ProductEntry)

        const    newProductEntryModule={
            selectedDispense:ProductEntry,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
       //console.log(state)

    }

   const handleSearch=(val)=>{
       const field='name'
       console.log(val)
       OrderServ.find({query: {
                order: {
                    $regex:val,
                    $options:'i'
                   
                },
                order_status: {
                    $regex:val,
                    $options:'i'
                   
                },
                order_category:"Prescription",
               // storeId:state.StoreModule.selectedStore._id,
               //facility:user.currentEmployee.facilityDetail._id || "",
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
             const findProductEntry= await OrderServ.find(
                {query: {
                    order_category:"Prescription",
                    fulfilled:false,
                    //destination: user.currentEmployee.facilityDetail._id, need to set this
                   
                    //storeId:state.StoreModule.selectedStore._id,
                    //clientId:state.ClientModule.selectedClient._id,
                    $limit:50,
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
                                        type="text" placeholder="Search Medications"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Prescriptions </span></div>
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
                                        <th><abbr title="Client Name">Client Name</abbr></th> 
                                        <th><abbr title="Order">Medication</abbr></th>
                                        <th>Fulfilled</th>
                                        <th><abbr title="Status">Status</abbr></th>
                                        <th><abbr title="Requesting Physician">Requesting Physician</abbr></th>
                                        
                                        <th><abbr title="Actions">Actions</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((ProductEntry, i)=>(

                                            <tr key={ProductEntry._id} onClick={()=>handleRow(ProductEntry)} className={ProductEntry._id===(selectedDispense?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <td>{/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}<span>{format(new Date(ProductEntry.createdAt),'dd-MM-yy')}</span></td>
                                            <td>{ProductEntry.clientId}</td> 
                                            <th>{ProductEntry.order}</th>
                                            <td>{ProductEntry.fulfilled?"Yes":"No"}</td>
                                            <td>{ProductEntry.order_status}</td>
                                            <td>{ProductEntry.requestingdoctor_Name}</td>
                                            
                                            <td><span className="showAction"  >...</span></td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
            </>
              
    )
    }


export function DispenseDetail(){
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const [error, setError] =useState(false) //, 
    //const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const ProductEntryServ=client.service('/ProductEntry')
    //const history = useHistory()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)

   

   const ProductEntry =state.DispenseModule.selectedDispense

    const handleEdit= async()=>{
        const    newProductEntryModule={
            selectedDispense:ProductEntry,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, DispenseModule:newProductEntryModule}))
       //console.log(state)
       
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Dispense Details
                </p>
            </div>
            <div className="card-content vscrollable">
            {JSON.stringify(ProductEntry,2,10)}
               
            </div>
        </div>
        </>
    )
   
   
}

export function DispenseModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
    // eslint-disable-next-line 
    const [error, setError] =useState(false)
    // eslint-disable-next-line 
    const [success, setSuccess] =useState(false)
    // eslint-disable-next-line 
    const [message,setMessage] = useState("")
    // eslint-disable-next-line 
    const ProductEntryServ=client.service('productentry')
    //const history = useHistory()
     // eslint-disable-next-line
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
           /*  setValue("profession", ProductEntry.profession,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", ProductEntry.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", ProductEntry.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", ProductEntry.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", ProductEntry.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
          /*   setValue("ProductEntryCategory", ProductEntry.ProductEntryCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newProductEntryModule={
        selectedProductEntry:{},
        show :'create'
      }
   await setState((prevstate)=>({...prevstate, ProductEntryModule:newProductEntryModule}))
   //console.log(state)
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
                //console.log(JSON.stringify(res))
                reset();
               /*  setMessage("Deleted ProductEntry successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
                toast({
                    message: 'ProductEntry deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
               // setMessage("Error deleting ProductEntry, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error deleting ProductEntry, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
        }
    }
        

   /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
    const onSubmit = (data,e) =>{
        e.preventDefault();
        
        setSuccess(false)
        console.log(data)
        data.facility=ProductEntry.facility
          //console.log(data);
          
        ProductEntryServ.patch(ProductEntry._id,data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               // setMessage("updated ProductEntry successfully")
                 toast({
                    message: 'ProductEntry updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                //setMessage("Error creating ProductEntry, probable network issues "+ err )
               // setError(true)
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
            {/* <div className="field">
            <label className="label is-small">Profession
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="profession" type="text" placeholder="Profession"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Phone
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="phone" type="text" placeholder="Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
                </label>
                 </div>
            <div className="field">
            <label className="label is-small">Email
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="email" type="email" placeholder="ProductEntry Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Department
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
                </label>
                {errors.department && <span>This field is required</span>}
                </div>
            <div className="field">
            <label className="label is-small">Departmental Unit
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="deptunit" type="text" placeholder="Departmental Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
                </label>
                </div> */}
           {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="ProductEntryCategory" type="text" placeholder="ProductEntry Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
           
           
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

export  function ProductSearch({getSearchfacility,clear}) {
    
    const productServ=client.service('products')
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
            return
        }
        const field='name' //field variable

       
        if (value.length>=3 ){
            productServ.find({query: {     //service
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
                    <div className={`dropdown ${showPanel?"is-active":""}`}>
                        <div className="dropdown-trigger">
                            <DebounceInput className="input is-small " 
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
                        <div className="dropdown-menu" >
                            <div className="dropdown-content">
                          { facilities.length>0?"":<div className="dropdown-item" onClick={handleAddproduct}> <span>Add {val} to product list</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.name}</span>
                                        
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
                                        {/* <StoreList standalone="true" /> */}
                                       {/*  <ProductCreate /> */}
                                        </section>
                                        {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer> */}
                                    </div>
                                </div>       
        </div>
    )
}