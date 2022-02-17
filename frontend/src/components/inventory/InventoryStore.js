/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import InfiniteScroll from "react-infinite-scroll-component";
import DatePicker from "react-datepicker";
import { formatDistanceToNowStrict, format, subDays,addDays } from 'date-fns'
import { ProductEntryCreate } from './ProductEntry';

import "react-datepicker/dist/react-datepicker.css";


const searchfacility={};


export default function Inventory() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedInventory,setSelectedInventory]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
            <div className="column is-8 ">
                <InventoryList />
                </div>
            <div className="column is-4 ">
                {(state.InventoryModule.show ==='create')&&<InventoryCreate />}
                {(state.InventoryModule.show ==='detail')&&<InventoryDetail  />}
                {(state.InventoryModule.show ==='modify')&&<InventoryModify Inventory={selectedInventory} />}
                {(state.InventoryModule.show ==='reorder')&&<InventoryReorder Inventory={selectedInventory} />}
                {(state.InventoryModule.show ==='batch')&&<InventoryBatches Inventory={selectedInventory} />}
                {(state.InventoryModule.show ==='audit')&&<ProductEntryCreate  Inventory={selectedInventory} />}
            </div>

            </div>                            
            </section>
       
    )
    
}

export function InventoryCreate(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState()
    const InventoryServ=client.service('inventory')
    
    const {user} = useContext(UserContext) 
    
    const [currentUser,setCurrentUser] = useState()
    


    const getSearchfacility=(obj)=>{
        
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    }
    
    useEffect(() => {
        setCurrentUser(user)
        
        return () => {
        
        }
    }, [user])

  
    useEffect(()=>{
        
      if (!user.stacker){
          
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) 
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         
          
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  
          }
        InventoryServ.create(data)
        .then((res)=>{
                
                e.target.reset();
                setSuccess(true)
                toast({
                    message: 'Inventory created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Inventory ' + err,
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
                    Create Inventory: Product Entry- Initialization, Purchase Invoice, Audit
                </p>
            </div>
            <div className="card-content vscrollable">
   
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">    
                <div class="control">
                    <div class="select is-small">
                        <select>
                            <option>Purchase Invoice </option>
                            <option>Initialization</option>
                            <option>Audit</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <p className="control has-icons-left"> 
                    <input className="input is-small" ref={register({ required: true })} name="type" type="text" placeholder="Type of Product Entry"/>
                    <span className="icon is-small is-left">
                    <i className=" fas fa-user-md "></i>
                    </span>
                </p>
            </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input is-small" ref={register({ required: true })}  name="supplier" type="text" placeholder="Supplier" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                </div>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small" ref={register({ required: true })}  name="date" type="text" placeholder="Date" />
                    <span className="icon is-small is-left">
                        <i className="fas fa-map-signs"></i>
                    </span>
                    
                </p>
            </div>
            
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="totalamount" type="text" placeholder=" Total Amount"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
            </div>
           
         <p className="control">
                    <button className="button is-info is-small  is-pulled-right">
                      <span className="is-small"> +</span>
                    </button>
                </p>
           <div className="field" >
                <ProductSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                <p className="control has-icons-left " style={{display:"none"}}>
                    <input className="input is-small" ref={register ({ required: true }) } name="productId" type="text" placeholder="Product Id" />
                    <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                    </span>
                </p>
            </div>
           
               <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="quantity" type="text" placeholder="Quantity"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                <label className="label is-small">Base Unit</label>
            </div> 
            <div className="field">
                <p className="control has-icons-left">
                    <input className="input is-small" ref={register({ required: true })} name="costprice" type="text" placeholder="Cost Price"  />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div> 
            <div className="field">
                <p className="control">
                    <button className="button is-success is-small">
                        Create
                    </button>
                </p>
            </div>
            
            </form>
            </div>
            </div>
        </>
    )
   
}

export function InventoryList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const InventoryServ=client.service('inventory')
    
   
    const [facilities,setFacilities]=useState([])
     
   const [selectedInventory, setSelectedInventory]=useState() 
    
    const {state,setState}=useContext(ObjectContext)
    
    const {user,setUser}=useContext(UserContext)
    const [page, setPage] = useState(0) 
    const [limit, setLimit] = useState(20) 
    const [total, setTotal] = useState(0) 

   
    let pages =0
    const handleCreateNew = async()=>{
        const    newInventoryModule={
            selectedInventory:{},
            show :'create'
            }
       await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
       
    }

    const handleRow= async(Inventory)=>{
        

        

        await setSelectedInventory(Inventory)

        const    newInventoryModule={
            selectedInventory:Inventory,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
       

    }

    const handleSearch=(val)=>{
       const field='name'
       
       InventoryServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "",
               storeId:state.StoreModule.selectedStore._id,
                $limit:100,
                $sort: {
                    name: 1
                  }
                    }}).then((res)=>{
                
               setFacilities(res.data)
               setTotal(res.total)
                setMessage(" Inventory  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Inventory, probable network issues "+ err )
                setError(true)
            })
    }
   
    const getInventories= async()=>{
            if (user.currentEmployee){
            
              if (page===1){
                  setPage(2)
              }
            const allInventory= await InventoryServ.find(
                    {query: {
                        facility:user.currentEmployee.facilityDetail._id,
                        storeId:state.StoreModule.selectedStore._id,
                        $limit:limit,
                        $skip:page * limit,
                        $sort: {
                            name: 1
                        }
                        }})
                        
           
          
           await setTotal(allInventory.total)
         
           if (allInventory.total > facilities.length){
            await  setPage(page=>page++)
           }

           updatelist(allInventory.data)
          
         console.log(allInventory)
            
        
        
                }
                else {
                    if (user.stacker){
                        const findInventory= await InventoryServ.find(
                            {query: {
                                
                                $limit:20,
                                $sort: {
                                    createdAt: -1
                                }
                                }})
            
                    await setFacilities(findInventory.data)

                    }
                }
    }
    
    const getNewInventories= async()=>{
        if (user.currentEmployee){
        
          
        const allInventory= await InventoryServ.find(
                {query: {
                    facility:user.currentEmployee.facilityDetail._id,
                    storeId:state.StoreModule.selectedStore._id,
                    $limit:limit,
                    $sort: {
                        name: 1
                    }
                    }})
                    console.log("this is data", allInventory)
       
       await setTotal(allInventory.total)
       await setFacilities(allInventory.data)
     
       if (allInventory.total> allInventory.data.length){
       
          setPage(page=>page+1)
       } else{
        
       }    

      
    
        
    
    
            }
            else {
                if (user.stacker){
                    const findInventory= await InventoryServ.find(
                        {query: {
                            
                            $limit:20,
                            $sort: {
                                createdAt: -1
                            }
                            }})
        
                await setFacilities(findInventory.data)

                }
            }
    }

    useEffect(() => {
               
               
                InventoryServ.on('created', (obj)=>rest())
                InventoryServ.on('updated', (obj)=>rest())
                InventoryServ.on('patched', (obj)=>rest())
                InventoryServ.on('removed', (obj)=>rest())
                return () => {
                    
                }
    },[])

    const rest = async ()=>{
       setPage(0) 
       setTotal(0) 
       getNewInventories()

    }

    const updatelist=async(data)=>{
        await setFacilities(prevdata=>prevdata.concat(data))
     }
     
    useEffect(() => {
       
            rest() 
            return () => {
               
            }
    }, [state.StoreModule.selectedStore])

    useEffect(() => {
       console.log(page)
        return () => {
           
        }
    }, [page])


    return(
        <>
           {user?( <>  
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search Inventory"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Inventory </span></div>

                </div>

                <div className="table-container pullup vscrola" id="scrollableDiv" >
                    <InfiniteScroll
                        dataLength={facilities.length}
                        next={getInventories}
                        hasMore={total>facilities.length}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="scrollableDiv"
                    >
                
                    <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                
                        <thead>
                            <tr>
                            <th><abbr title="Serial No">S/No</abbr></th>
                            <th>Product</th>
                            <th><abbr title="Quantity">Quantity</abbr></th>
                            <th><abbr title="Base Unit">Base Unit</abbr></th>
                            <th><abbr title="Stock Value">Stock Value</abbr></th>
                                <th><abbr title="Cost Price">Cost Price</abbr></th>
                            <th><abbr title="Selling Price">Selling Price</abbr></th>
                            <th><abbr title="Re-Order Level">Re-Order Level</abbr></th>
                            <th><abbr title="Expiry">Expiry</abbr></th> 
                            </tr>
                        </thead>
                        <tfoot>
                            
                        </tfoot>
                        <tbody>
                            {facilities.map((Inventory, i)=>(

                                <tr key={Inventory._id} 
                                    onClick={()=>handleRow(Inventory)} 
                                    className={Inventory._id===(selectedInventory?._id||null)?"is-selected":""} 
                                   style={{backgroundColor:Inventory.buy?"pink":""}} 
                                   >
                                <th>{i+1}</th>
                                <th>{Inventory.name}</th>
                                <td>{Inventory.quantity}</td>
                                <td>{Inventory.baseunit}</td>
                                <td>{Inventory.stockvalue.toLocaleString('en-US', {maximumFractionDigits:2})}</td>
                                <td>{Inventory.costprice? Inventory.costprice.toFixed(2):""}</td>
                                <td>{Inventory.sellingprice}</td>
                                <td>{Inventory.reorder_level}</td> 
                                <td style={{backgroundColor:Inventory.expiry?"red":""}} >{Inventory.expiry?"Exist":""}</td>
                                
                                </tr>

                            ))}
                        </tbody>
                        </table>
                        </InfiniteScroll> 
                </div>              
            </>):<div>loading</div>}
            </>
              
    )
    }


export function InventoryDetail(){
    
     
    const [error, setError] =useState(false) 
    
     
    const [message, setMessage] = useState("") 
    
    
    
    const {state,setState} = useContext(ObjectContext)
    const {user} = useContext(UserContext) 
    
   

   const Inventory =state.InventoryModule.selectedInventory 
   

   
  const getFacilities= async()=>{
     const findProductEntry= await client.service('productentry').find(
        {query: {
            'productitems.productId':Inventory.productId,
            facility:user.currentEmployee.facilityDetail._id,
            storeId:state.StoreModule.selectedStore._id,
            $limit:20,
            $sort: {
                createdAt: -1
            }
            }})

        
       }
    
       useEffect(() => {
        getFacilities()
           return () => {
               
           }
       }, [Inventory])

    const handleEdit= async()=>{
        const    newInventoryModule={
            selectedInventory:Inventory,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
       
       
    }
    const handleReorder= async()=>{
        const    newInventoryModule={
            selectedInventory:Inventory,
            show :'reorder'
        }
       await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
       
       
    }
    const handleBatch= async()=>{
        const    newInventoryModule={
            selectedInventory:Inventory,
            show :'batch'
        }
       await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
       
       
    }
    const handleAudit= async()=>{
        const    newInventoryModule={
            selectedInventory:Inventory,
            show :'audit'
        }
       await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
       
       
    }
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Inventory Details
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
                        Product Name: 
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft"   name="name"><strong> {Inventory.name} </strong></span>
                        </td>
                    </tr>
            </tbody> 
            </table> 
           
            <div className="field mt-2 is-grouped">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Set Price
                    </button>
                </p>
                <p className="control">
                    <button className="button is-info is-small" onClick={handleBatch} >
                        Batches
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small"  onClick={handleReorder} >
                        Reorder Level
                    </button>
                </p> 
                <p className="control">
                    <button className="button is-danger is-small"  onClick={handleAudit} >
                       Audit
                    </button>
                </p> 
            </div>
            { error && <div className="message"> {message}</div>}
           
        </div>
        </div>
        </>
    )
   
   
}

export function InventoryModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    const [billservice,setBillService] = useState()
    
    const InventoryServ=client.service('inventory')
    
     
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const billServ=client.service('billing')

    const Inventory =state.InventoryModule.selectedInventory 
    const handleSetPrice = async()=>{
    
        const service = await  billServ.get(Inventory.billingId) 
            const contractSel= service.contracts.filter(element=>(element.source_org===Inventory.facility && element.dest_org===Inventory.facility))
            
            setValue("price", contractSel[0].price,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("oldprice", contractSel[0].price,  {
                shouldValidate: true,
                shouldDirty: true
            })
            await setBillService(service)
            
    }
 
        useEffect(() => {
            handleSetPrice()
     
            return () => {
                
            }
        },[])

   const handleCancel=async()=>{
   
    const    newInventoryModule={
        selectedInventory:{},
        show :'details'
      }
        await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
   
           }


        const changeState =()=>{
            const    newInventoryModule={
                selectedInventory:{},
                show :'detail'
            }
        setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))

        }


    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Inventory._id
        if (conf){
             
        InventoryServ.remove(dleteId)
        .then((res)=>{
                
                reset();
                toast({
                    message: 'Inventory deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
                toast({
                    message: "Error deleting Inventory, probable network issues or "+ err,
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
          const contractSel= billservice.contracts.filter(element=>(element.source_org===Inventory.facility && element.dest_org===Inventory.facility))
          contractSel[0].price=data.price 
          billServ.patch(billservice._id,billservice)
        .then((res)=>{
                 toast({
                    message: 'Price updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                toast({
                    message: "Error updating Price, probable network issues or "+ err,
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
                    Set Price for {Inventory.name} per {Inventory.baseunit}
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label is-small"> New Selling Price
                    <p className="control has-icons-left has-icons-right">
                        <input className="input  is-small" ref={register({ required: true })}  name="price" type="text" placeholder="Name" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                    </label>
                    </div>
                <div className="field">
                <label className="label is-small">Old Price
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register({ required: true })} disabled name="oldprice" type="text" placeholder="Inventory Type" />
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
            </div>
        </div>
        </div>
        </>
    )
   
   
                
}   

export function InventoryReorder(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); 
    
    const [error, setError] =useState(false)
    
    const [success, setSuccess] =useState(false)
    
    const [message,setMessage] = useState("")
    const [billservice,setBillService] = useState()
    
    const InventoryServ=client.service('inventory')
    
     
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const billServ=client.service('billing')

    const Inventory =state.InventoryModule.selectedInventory 
   
   
 
        useEffect(() => {
            setValue("reorder_level", Inventory.reorder_level,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("oldlevel", Inventory.reorder_level,  {
                shouldValidate: true,
                shouldDirty: true
            })
     
            return () => {
                
            }
        },[])

   const handleCancel=async()=>{
   
    const    newInventoryModule={
        selectedInventory:{},
        show :'detail'
      }
        await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
           }


        const changeState =()=>{
            const    newInventoryModule={
                selectedInventory:{},
                show :'detail'
            }
        setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))

        }

    const onSubmit = (data,e) =>{
        e.preventDefault();
      
        setSuccess(false)
          InventoryServ.patch(Inventory._id,{
              reorder_level:data.reorder_level
          })
        .then((res)=>{
                
                 toast({
                    message: 'Reorder level updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
             
                toast({
                    message: "Error updating Reorder level, probable network issues or "+ err,
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
                    Set ReOrder Level for {Inventory.name} 
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                    <label className="label is-small"> New Reorder Level
                    <p className="control has-icons-left has-icons-right">
                        <input className="input  is-small" ref={register({ required: true })}  name="reorder_level" type="text" placeholder="New Reorder Level" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-hospital"></i>
                        </span>                    
                    </p>
                    </label>
                    </div>
                <div className="field">
                <label className="label is-small">Old Reorder Level
                    <p className="control has-icons-left has-icons-right">
                    <input className="input is-small " ref={register()}  disabled  name="oldlevel" type="text" placeholder="Old Reorder Level" />
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
            </div>
        </div>
        </div>
        </>
    )
   
   
                
} 

export function InventoryBatches(){
    const { register, handleSubmit, setValue,reset, errors } = useForm();
   
    const [error, setError] =useState(false)
   
    const [success, setSuccess] =useState(false)
   
    const [message,setMessage] = useState("")
    const [billservice,setBillService] = useState()
   
    const InventoryServ=client.service('inventory')
   
    
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const billServ=client.service('billing')
    const [batchNo,setBatchNo] = useState("")
    const [quantity,setQuantity] = useState("")
    const [expirydate,setExpiryDate] = useState("")
    const [facilities,setFacilities] = useState([])
    const [productItem,setProductItem] = useState([])

    const Inventory =state.InventoryModule.selectedInventory
  
  
  
 
        useEffect(() => {
           setProductItem(Inventory.batches)
     
            return () => {
                
            }
        },[])

        const handleClickProd=async()=>{
            if(!batchNo||!quantity||!expirydate){
                toast({
                    message: 'Kindly enter Batch Number,expiry date and quantity',
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  }) 
                  return
            }
            let productItemI={
                batchNo,
                expirydate,
                quantity
            }
         
            setProductItem(
                prevProd=>prevProd.concat(productItemI)
            )
            setBatchNo("")
            setQuantity("")
            setExpiryDate("")
          
           
         
        
        }

   const handleCancel=async()=>{
   
    const    newInventoryModule={
        selectedInventory:{},
        show :'details'
      }
        await setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))
  
           }


        const changeState =()=>{
            const    newInventoryModule={
                selectedInventory:{},
                show :'details'
            }
        setState((prevstate)=>({...prevstate, InventoryModule:newInventoryModule}))

        }

    const onSubmit = (data,e) =>{
        e.preventDefault();
      
        setSuccess(false)
          InventoryServ.patch(Inventory._id,{
              batches:productItem
          })
        .then((res)=>{
                
                 toast({
                    message: 'Batch updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
             
                toast({
                    message: "Error updating Batch, probable network issues or "+ err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            }) 

      } 

    const handleBatchdel=(obj, i)=>{
        let confirm=window.confirm("Are you sure you want to delete this batch?")
        if (confirm){
          
            setProductItem(obj=>obj.filter((el,index)=>index!==i))
        }
    }
     
      
    return (
        
        <>
        <div className="card  card-overflow">
            <div className="card-header">
                <p className="card-header-title">
                   Batches for {Inventory.name} 
                </p>
            </div>
            <div className="card-content vscrollable">
           
             
            <div className="field is-horizontal">
            <div className="field-body">
                <div className="field">
                    <p className="control ">
                        <input className="input is-small" name="batchNo" value={batchNo} type="text" onChange={e=>setBatchNo(e.target.value)} placeholder="Batch Number"  />
                    </p>
        
                </div> 
                <div className="field">
                    <DatePicker 
                        selected={expirydate} 
                        onChange={date => setExpiryDate(date)} 
                        dateFormat="MM/yyyy"
                        placeholderText="Expiry Date"
                        />
                    
                </div> 
                <div className="field">
                    <p className="control ">
                        <input className="input is-small" name="quantity" value={quantity} type="text" onChange={e=>setQuantity(e.target.value)} placeholder="Quantity"  />
                    </p>
                <label >{Inventory.baseunit}</label>
                </div> 
            
                <div className="field">
                <p className="control">
                        <button className="button is-info is-small  is-pulled-right minHt">
                        <span className="is-small" onClick={handleClickProd}> +</span>
                        </button>
                    </p>
                </div>
            </div>
         </div>
            <div>
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Batch">Batch</abbr></th>
                                        <th><abbr title="Quantity">Quantity</abbr></th>
                                        <th>Expiry Date</th>
                                        <th><abbr title="Actions">Actions</abbr></th> 
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {productItem.map((ProductEntry, i)=>(

                                            <tr key={i}  style={{backgroundColor:ProductEntry.expiry?"red":""}} >
                                            <th>{i+1}</th>
                                            <td>{ProductEntry.batchNo}</td>
                                            <td>{ProductEntry.quantity}</td>
                                            <th>{ProductEntry.expirydate?<>{format(new Date(ProductEntry.expirydate),"MM-yyyy")}</>:""}</th>
                                          <td onClick={()=>handleBatchdel(ProductEntry,i)}><span className="showAction"  >x</span></td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
            </div> 
            
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
            </div>
        </div>
        </div>
        </>
    )
             
} 

export  function ProductSearch({getSearchfacility,clear}) {
    
    const facilityServ=client.service('products')
    const [facilities,setFacilities]=useState([])
     
     const [searchError, setSearchError] =useState(false)
     
    const [showPanel, setShowPanel] =useState(false)
     
   const [searchMessage, setSearchMessage] = useState("") 
   
   const [simpa,setSimpa]=useState("")
   
   const [chosen,setChosen]=useState(false)
   
   const [count,setCount]=useState(0)
   const inputEl=useRef(null)


   const handleRow= async(obj)=>{
        await setChosen(true)
        
       getSearchfacility(obj)
       
       await setSimpa(obj.facilityName)
       
        
        setShowPanel(false)
        await setCount(2)
   
}
    const handleBlur=async(e)=>{
    }
    const handleSearch=async(val)=>{
        
        const field='name' 
       
        if (val.length>=3){
            facilityServ.find({query: {     
                 [field]: {
                     $regex:val,
                     $options:'i'
                    
                 },
                 $limit:10,
                 $sort: {
                     createdAt: -1
                   }
                     }}).then((res)=>{
              
                setFacilities(res.data)
                 setSearchMessage(" facility  fetched successfully")
                 setShowPanel(true)
             })
             .catch((err)=>{
                 console.log(err)
                 setSearchMessage("Error searching facility, probable network issues "+ err )
                 setSearchError(true)
             })
         }
        else{
            
            
            setShowPanel(false)
            await setFacilities([])
            
        }
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
                    <div className={`dropdown ${showPanel?"is-active":""}`}>
                        <div className="dropdown-trigger">
                            <DebounceInput className="input is-small " 
                                type="text" placeholder="Search Product"
                                value={simpa}
                                minLength={1}
                                debounceTimeout={400}
                                onBlur={(e)=>handleBlur(e)}
                                onChange={(e)=>handleSearch(e.target.value)}
                                inputRef={inputEl}
                                  />
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        {searchError&&<div>{searchMessage}</div>}
                        <div className="dropdown-menu" >
                            <div className="dropdown-content">
                            {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <span>{facility.facilityName}</span>
                                        
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