/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";

import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import FacilityAccount from "./FacilityAccount"

const searchfacility={};


export default function Collections() {
    const {state}=useContext(ObjectContext) 
    
    const [selectedInventory,setSelectedInventory]=useState()
    
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
                <div className="column is-5 ">
                    <CollectionList />
                </div>
           <div className="column is-7 ">
          
                { (state.SelectedClient.show ==='detail') && <ClientAccount />}
               
            </div> 

            </div>                            
            </section>
       
    )
    
}

export function ClientAccount(){
    const { register, handleSubmit,setValue} = useForm(); 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    
    const [facility,setFacility] = useState([])
    const InventoryServ=client.service('subwallettransactions')
    const SubwalletServ=client.service('subwallet')
    
    const {user} = useContext(UserContext) 
    const {state,setState}=useContext(ObjectContext)
    
    const [currentUser,setCurrentUser] = useState()
    const [balance, setBalance]=useState(0)


    const clientSel= state.SelectedClient.client
    const getSearchfacility=(obj)=>{
    }
    
    useEffect(() => {
        setCurrentUser(user)
        
        return () => {
        
        }
    }, [user])


    useEffect(() => {
        getaccountdetails()
        getBalance()
        return () => {
           
        }
    }, [clientSel])



    const getaccountdetails=()=>{
        InventoryServ.find({query: {
            facility:user.currentEmployee.facilityDetail._id,
            client:clientSel.client,
            
            $sort: {
                createdAt: -1
            }
            }})
        .then((res)=>{
                console.log(res)
                setFacility(res.data)
                toast({
                    message: 'Account details succesful',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
            .catch((err)=>{
                toast({
                    message: 'Error getting account details ' + err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
            })
    }

    const getBalance=async ()=>{
        const findProductEntry= await SubwalletServ.find(
            {query: {
               
                client:clientSel.client,
                organization:user.currentEmployee.facilityDetail._id,
                $limit:100,
                $sort: {
                    createdAt: -1
                }
                }})
                 console.log(findProductEntry)
    
         
            if (findProductEntry.data.length>0){
                await setBalance(findProductEntry.data[0].amount)
            }else{
                await setBalance(0) 
                
            } 
    
          
            }   
    

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         
          console.log(data);
          if (user.currentEmployee){
         data.facility=user.currentEmployee.facilityDetail._id  
          }
        

      } 
    

    return (
        <>
            <div className="card cardheight">
                <div className="card-header">
                    <p className="card-header-title">
                        Account Details: {facility[0]?.fromName}
                    </p>
                    <button className="button is-success is-small btnheight mt-2" >
                    Current Balance: N {balance}
                 </button>
                </div>
                <div className="card-content ">
                
            <div className="columns ">
                <div className="column is-6 ">
                    <div className="card cardht80">
                            <div className="card-header">
                                <p className="card-header-title">
                                    Credit
                                </p>
                            </div>
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Cost Price">Date</abbr></th>
                                        <th><abbr title="Quantity">Amount</abbr></th>
                                        <th><abbr title="Base Unit">Mode</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facility.map((Inventory, i)=>(
                                        <>
                                        {Inventory.category==="credit" && 
                                            <tr key={Inventory._id} >
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> 
                                            
                                            <td>{Inventory.amount}</td>
                                            <td>{Inventory.paymentmode}</td>
                                           
                                            </tr>
                                             }
                                             </>
                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
                                   
                            </div>
                    </div>
                </div>
           <div className="column is-6 ">
                <div className="card cardht80">
                            <div className="card-header">
                                <p className="card-header-title">
                                Debit
                                </p>
                            </div>
                            <div className="card-content vscrollable mx-0.5">
                                   
                                    <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable  is-scrollable mx-0.5">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Cost Price">Date</abbr></th>
                                         <th><abbr title="Description">Description</abbr></th> 
                                        
                                        <th><abbr title="Quantity">Amount</abbr></th>
                                        <th><abbr title="Base Unit">Mode</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facility.map((Inventory, i)=>(
                                        <>
                                          {Inventory.category==="debit" && <tr key={Inventory._id} >
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> {/*add time  */}
                                            <th>{Inventory.description}</th>
                                            <td>{Inventory.amount}</td>
                                            <td>{Inventory.paymentmode}</td>
                                           
                                            </tr>

                                            }
                                        </>
                                        ))}
                                    </tbody>
                                    </table>
                                    
                </div>              
                                    
                            </div>
                    </div>
               
            </div> 

            </div>                            
           
            
                </div>
            </div>
        </>
    )
   
}

export function CollectionList(){
   
    
    const [error, setError] =useState(false)
     
    const [success, setSuccess] =useState(false)
     
   const [message, setMessage] = useState("") 
    const InventoryServ=client.service('subwallettransactions')
    
   
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
            client:Inventory,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, SelectedClient:newInventoryModule}))
       

    }

   const handleSearch=(val)=>{
       const field='fromName'
       console.log(val)
       InventoryServ.find({query: {
                [field]: {
                    $regex:val,
                    $options:'i'
                   
                },
               facility:user.currentEmployee.facilityDetail._id || "",
                $limit:20,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                
               setFacilities(res.data)
            })
            .catch((err)=>{
                console.log(err)
                toast({
                    message: 'Error during search ' +err,
                    type: 'is-danger',
                    dismissible: true,
                    pauseOnHover: true,
                  })
               
            })
        }
   
        const getFacilities= async()=>{
            if (user.currentEmployee){
                const DAY_MS = 30*24 * 60 * 60 * 1000;
        const findInventory= await InventoryServ.find(
                {query: {
                    facility:user.currentEmployee.facilityDetail._id,
                   
                    category:"credit",
                    createdAt:{
                        $gt: new Date().getTime() - DAY_MS 

                    },
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
               
                    console.log(facilities)
              
                return () => {
                    

                }
            },[facilities])

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
                                        type="text" placeholder="Search Collections"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Collections in last 30 days </span></div>
                    <div className="level-right">
                    </div>

                </div>
                <div className="table-container pullup ">
                                <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
                                    <thead>
                                        <tr>
                                        <th><abbr title="Serial No">S/No</abbr></th>
                                        <th><abbr title="Cost Price">Date</abbr></th>
                                        <th>Client</th>
                                        <th><abbr title="Quantity">Amount</abbr></th>
                                        <th><abbr title="Base Unit">Mode</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Inventory, i)=>(

                                            <tr key={Inventory._id} onClick={()=>handleRow(Inventory)} className={Inventory._id===(selectedInventory?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <td>{new Date(Inventory.createdAt).toLocaleString('en-GB')}</td> 
                                            <th>{Inventory.fromName}</th>
                                            <td>{Inventory.amount}</td>
                                            <td>{Inventory.paymentmode}</td>                                           
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