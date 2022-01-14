/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'

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
          console.log(currentUser)
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
         
          console.log(data);
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
       console.log(val)
       InventoryServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "",
                $limit:10,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Inventory  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Inventory, probable network issues "+ err )
                setError(true)
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
            
        const findInventory= await InventoryServ.find(
                {query: {
                    facility:user.currentEmployee.facilityDetail._id,
                    storeId:state.StoreModule.selectedStore._id,
                    $limit:20,
                    $sort: {
                        createdAt: -1
                    }
                    }})

         await setFacilities(findInventory.data)
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
             

                return () => {
                    

                }
            },[])

            useEffect(() => {
               
                if (user){
                    getFacilities()
                }else{
                }
                InventoryServ.on('created', (obj)=>getFacilities())
                InventoryServ.on('updated', (obj)=>getFacilities())
                InventoryServ.on('patched', (obj)=>getFacilities())
                InventoryServ.on('removed', (obj)=>getFacilities())
                return () => {
                
                }
            },[])
        
        useEffect(() => {
            getFacilities()
            return () => {
               
            }
        }, [state.StoreModule.selectedStore])


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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">List of Inventories </span></div>
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
                                        <th>Product</th>
                                        <th><abbr title="Quantity">Quantity</abbr></th>
                                        <th><abbr title="Base Unit">Base Unit</abbr></th>
                                        <th><abbr title="Stock Value">Stock Value</abbr></th>
                                         <th><abbr title="Cost Price">Cost Price</abbr></th>
                                        <th><abbr title="Selling Price">Selling Price</abbr></th>
                                        <th><abbr title="Re-Order Level">Re-Order Level</abbr></th>
                                        <th><abbr title="Expiry">Expiry</abbr></th> 
                                        <th><abbr title="Actions">Actions</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Inventory, i)=>(

                                            <tr key={Inventory._id} onClick={()=>handleRow(Inventory)}>
                                            <th>{i+1}</th>
                                            <th>{Inventory.name}</th>
                                            <td>{Inventory.quantity}</td>
                                            <td>{Inventory.baseunit}</td>
                                            <td>{Inventory.stockvalue}</td>
                                            <td>{Inventory.costprice}</td>
                                            <td>{Inventory.sellingprice}</td>
                                            <td>{Inventory.reorder_level}</td> 
                                            <td>{Inventory.expiry}</td>
                                            <td><span   className="showAction"  >...</span></td>
                                           
                                            </tr>

                                        ))}
                                    </tbody>
                                    </table>
                                    
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
   console.log("selected",Inventory)

   
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

        console.log(findProductEntry)
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
                    <button className="button is-danger is-small" >
                        Audit
                    </button>
                </p>
                <p className="control">
                    <button className="button is-info is-small">
                        Transaction History
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small">
                        Reorder Level
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
            console.log(contractSel,service)
    }
 
        useEffect(() => {
            handleSetPrice()
     
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
        console.log(data)
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
         if (count===2){
             console.log("stuff was chosen")
         }
       
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
              console.log("facility  fetched successfully") 
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
            console.log("less than 3 ")
            console.log(val)
            setShowPanel(false)
            await setFacilities([])
            console.log(facilities)
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