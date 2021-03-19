import React, {useState,useContext, useEffect,useRef} from 'react'
import {Route, Switch,  useRouteMatch, Link, NavLink, useHistory} from 'react-router-dom'
import client from '../../feathers'
import {DebounceInput} from 'react-debounce-input';
import { useForm } from "react-hook-form";
//import {useHistory} from 'react-router-dom'
import {UserContext,ObjectContext} from '../../context'
import {toast} from 'bulma-toast'
import { formatDistanceToNowStrict, format } from 'date-fns'
// eslint-disable-next-line
const searchfacility={};


export default function Appointments() {
    const {state}=useContext(ObjectContext) //,setState
    // eslint-disable-next-line
    const [selectedClient,setSelectedClient]=useState()
    const [selectedAppointment,setSelectedAppointment]=useState()
    //const [showState,setShowState]=useState() //create|modify|detail
    
    return(
        <section className= "section remPadTop">
            <div className="columns ">
           
            <div className="column is-8 ">
                <ClientList />
                </div>
            <div className="column is-4 ">
                {(state.AppointmentModule.show ==='create')&&<AppointmentCreate />}
                {(state.AppointmentModule.show ==='detail')&&<ClientDetail  />}
                {(state.AppointmentModule.show ==='modify')&&<ClientModify Client={selectedClient} />}
               
            </div>

            </div>                            
            </section>
       
    )
    
}

export function AppointmentCreate(){
    const {state,setState}=useContext(ObjectContext) 
    const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset 
    const [error, setError] =useState(false)
    const [success, setSuccess] =useState(false)
    const [message,setMessage] = useState("")
    const [clientId,setClientId] = useState()
    const [type,setType] = useState()
    // eslint-disable-next-line
    const [facility,setFacility] = useState()
    const ClientServ=client.service('appointments')
    //const history = useHistory()
    const {user} = useContext(UserContext) //,setUser
    // eslint-disable-next-line
    const [currentUser,setCurrentUser] = useState()
    const [selectedClient,setSelectedClient]=useState()
    const [selectedAppointment,setSelectedAppointment]=useState()
   // const [appointment_reason,setAppointment_reason]= useState()
    const [appointment_status,setAppointment_status]=useState("")
    const [appointment_type, setAppointment_type]=useState("")
    const [chosen, setChosen]=useState()


   /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
    const handleChangeType=async (e)=>{
        await setAppointment_type(e.target.value)
    }

    const handleChangeStatus=async (e)=>{
        await setAppointment_status(e.target.value)
    }

    const getSearchfacility=(obj)=>{

       setClientId(obj._id)
       setChosen(obj)
       
        if (!obj){
            //"clear stuff"
            setClientId()
            setChosen()
           
        }
    
        
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

  //check user for facility or get list of facility  
    useEffect(()=>{
        //setFacility(user.activeClient.FacilityId)//
      if (!user.stacker){
       /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
      }
    })

    const onSubmit = (data,e) =>{
        e.preventDefault();
        setMessage("")
        setError(false)
        setSuccess(false)
         // data.createdby=user._id
          console.log(data);
          if (user.currentEmployee){
          data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
          }
          data.locationId=state.ClinicModule.selectedClinic._id
          data.appointment_type=appointment_type
         // data.appointment_reason=appointment_reason
          data.appointment_status=appointment_status
          data.clientId=clientId
          data.firstname=chosen.firstname
            data.middlename=chosen.middlename
            data.lastname=chosen.lastname
            data.dob=chosen.dob
            data.gender=chosen.gender
            data.phone=chosen.phone
            data.email=chosen.email
          data.actions=[{
              action:appointment_status,
              actor:user.currentEmployee._id
          }]

        ClientServ.create(data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                e.target.reset();
               setAppointment_type("")
               setAppointment_status("")
               setClientId("")
               /*  setMessage("Created Client successfully") */
                setSuccess(true)
                toast({
                    message: 'Appointment created succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  setSuccess(false)
            })
            .catch((err)=>{
                toast({
                    message: 'Error creating Appointment ' + err,
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
                    Create Appointment
                </p>
            </div>
            <div className="card-content vscrollable">
           {/*  <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
            <form onSubmit={handleSubmit(onSubmit)}>
            <input name="start_time" ref={register ({ required: true })} type="datetime-local" />
           
            <label className="label is-small">Client:</label>
         <div className="field is-horizontal">
            <div className="field-body">
            <div className="field is-expanded"  /* style={ !user.stacker?{display:"none"}:{}} */ >
                    <ClientSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                    <p className="control has-icons-left " style={{display:"none"}}>
                        <input className="input is-small"  /* ref={register ({ required: true }) } */  /* add array no */  value={clientId} name="ClientId" type="text" onChange={e=>setClientId(e.target.value)} placeholder="Product Id" />
                        <span className="icon is-small is-left">
                        <i className="fas  fa-map-marker-alt"></i>
                        </span>
                    </p>
                 {/* {sellingprice &&   "N"}{sellingprice} {sellingprice &&   "per"}  {baseunit} {invquantity} {sellingprice &&   "remaining"}  */}
                </div>
            </div>
        </div>
        <div className="field">    
                <div className="control">
                    <div className="select is-small">
                        <select name="type" value={type} onChange={handleChangeType}>
                           <option value="">Choose Appointment Type  </option>
                            <option value="New">New</option>
                            <option value="Followup">Followup</option>
                            <option value="Readmission with 24hrs">Readmission with 24hrs</option>
                            <option value="Annual Checkup">Annual Checkup</option>
                            <option value="Walk in">Walk-in</option>
                        </select>
                    </div>
                </div>
            </div>
        <div className="field">    
                <div className="control">
                    <div className="select is-small">
                        <select name="appointment_status" value={appointment_status} onChange={handleChangeStatus}>
                           <option value="">Appointment Status  </option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Checked In">Checked In</option>
                            <option value="Vitals Taken">Vitals Taken</option>
                            <option value="With Nurse">With Nurse</option>
                            <option value="With Doctor">With Doctor</option>
                            <option value="No Show">No Show</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Billed">Billed</option>
                        </select>
                    </div>
                </div>
        </div>
        <div className="field">
            <p className="control has-icons-left has-icons-right">
                <input className="input is-small" ref={register()}  name="appointment_reason" type="text" placeholder="Reason For Appointment" />
                <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                </span>                    
            </p>
        </div>
        <div className="field " style={{display:"none"}} >
            <p className="control has-icons-left has-icons-right">
                <input className="input is-small" ref={register()}  name="billingservice" type="text" placeholder="Billing service" />
                <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                </span>                    
            </p>
        </div>
           
        <div className="field  is-grouped mt-2" >
                <p className="control">
                    <button type="submit" className="button is-success is-small" >
                        Save
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p>
               {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
            </div>
     
            </form>
            </div>
            </div>
                 {/*  <div className="field"  style={ !user.stacker?{display:"none"}:{}} >
                <InputSearch  getSearchfacility={getSearchfacility} clear={success} /> 
                <p className="control has-icons-left " style={{display:"none"}}>
                    <input className="input is-small" ref={register ({ required: true }) } name="facility" type="text" placeholder="Facility" />
                    <span className="icon is-small is-left">
                    <i className="fas  fa-map-marker-alt"></i>
                    </span>
                </p>
            </div> */}
         {/*   <div className="field">
                <div className="control has-icons-left">
                    <div className="dropdown ">
                        <div className="dropdown-trigger">
                            <input className="input is-small" ref={register({ required: true })} name="department" type="text" placeholder="Department"/>
                            <span className="icon is-small is-left">
                            <i className="fas fa-hospital-symbol"></i>
                            </span>
                        </div>
                        <div className="dropdown-menu">
                            <div className="dropdown-content">
                                <div className="dropdown-item">
                                    simpa
                                </div>
                                <div className="dropdown-item is-active">
                                    simpa 2
                                </div>
                                <div className="dropdown-item">
                                    simpa 3
                                </div>
                                <div className="dropdown-item">
                                    simpa 4
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>
            </div> */}
        </>
    )
   
}

export function ClientList(){
   // const { register, handleSubmit, watch, errors } = useForm();
    // eslint-disable-next-line
    const [error, setError] =useState(false)
     // eslint-disable-next-line
    const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
   const [message, setMessage] = useState("") 
    const ClientServ=client.service('appointments')
    //const history = useHistory()
   // const {user,setUser} = useContext(UserContext)
    const [facilities,setFacilities]=useState([])
     // eslint-disable-next-line
   const [selectedClient, setSelectedClient]=useState() //
    // eslint-disable-next-line
    const {state,setState}=useContext(ObjectContext)
    // eslint-disable-next-line
    const {user,setUser}=useContext(UserContext)
    
    const [selectedAppointment,setSelectedAppointment]=useState()



    const handleCreateNew = async()=>{
        const newClientModule={
            selectedAppointment:{},
            show :'create'
            }
        await setState((prevstate)=>({...prevstate, AppointmentModule:newClientModule}))
       //console.log(state)
        } 

    
    const handleRow= async(Client)=>{
        await setSelectedAppointment(Client)
        const    newClientModule={
            selectedAppointment:Client,
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, AppointmentModule:newClientModule}))
    }

   const handleSearch=(val)=>{
       const field='firstname'
       console.log(val)
       ClientServ.find({query: {
                $or:[
                    { firstname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { lastname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { middlename: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { phone: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { clientTags: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { mrn: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { specificDetails: {
                        $regex:val,
                        $options:'i' 
                    }},
                ],
              
              facility:user.currentEmployee.facilityDetail._id, // || "",
                $limit:10,
                $sort: {
                    createdAt: -1
                  }
                    }}).then((res)=>{
                console.log(res)
               setFacilities(res.data)
                setMessage(" Client  fetched successfully")
                setSuccess(true) 
            })
            .catch((err)=>{
                console.log(err)
                setMessage("Error fetching Client, probable network issues "+ err )
                setError(true)
            })
        }
   
    const getFacilities= async()=>{
            if (user.currentEmployee){      
            const findClient= await ClientServ.find(
                {query: {
                   // facility:user.currentEmployee.facilityDetail._id,
                    $limit:20,
                    $sort: {
                        createdAt: -1
                    }
                    }})

         await setFacilities(findClient.data)
                }
                else {
                    if (user.stacker){
                        const findClient= await ClientServ.find(
                            {query: {
                                
                                $limit:20,
                                $sort: {
                                    createdAt: -1
                                }
                                }})
            
                    await setFacilities(findClient.data)

                    }
                }
          /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Client  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Client, probable network issues "+ err )
                    setError(true)
                }) */
            }
            
    /* useEffect(() => {
                setTimeout(() => {
                    console.log("happy birthday")
                    //getFacilities(user)
                }, 200);

                return () => {
                    

                }
            },[]) */

    useEffect(() => {
               
                if (user){
                    getFacilities()
                }else{
                    /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
                }
                ClientServ.on('created', (obj)=>getFacilities())
                ClientServ.on('updated', (obj)=>getFacilities())
                ClientServ.on('patched', (obj)=>getFacilities())
                ClientServ.on('removed', (obj)=>getFacilities())
                return () => {
                
                }
            },[])


    //todo: pagination and vertical scroll bar

    return(
        <>
           {user?( <>  
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <div className="field">
                                <p className="control has-icons-left  ">
                                    <DebounceInput className="input is-small " 
                                        type="text" placeholder="Search Appointments"
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
                    <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Appointments </span></div>
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
                                        <th><abbr title="Time">Date/Time</abbr></th>
                                        <th>First Name</th>
                                        <th><abbr title="Middle Name">Middle Name</abbr></th>
                                       <th><abbr title="Last Name">Last Name</abbr></th>
                                       <th><abbr title="Age">Age</abbr></th>
                                        <th><abbr title="Gender">Gender</abbr></th> 
                                        <th><abbr title="Phone">Phone</abbr></th>
                                        <th><abbr title="Email">Email</abbr></th>
                                        <th><abbr title="Type">Type</abbr></th>
                                        <th><abbr title="Status">Status</abbr></th>
                                        <th><abbr title="Reason">Reason</abbr></th>
                                        <th><abbr title="Actions">Actions</abbr></th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        
                                    </tfoot>
                                    <tbody>
                                        {facilities.map((Client, i)=>(

                                            <tr key={Client._id} onClick={()=>handleRow(Client)}  className={Client._id===(selectedAppointment?._id||null)?"is-selected":""}>
                                            <th>{i+1}</th>
                                            <td><strong>{format(new Date(Client.start_time),"dd-MM-yy HH:mm:ss")}</strong></td>
                                            <th>{Client.firstname}</th>
                                            <td>{Client.middlename}</td>
                                           < td>{Client.lastname}</td>
                                           < td>{formatDistanceToNowStrict(new Date(Client.dob))}</td>
                                            <td>{Client.gender}</td>
                                             <td>{Client.phone}</td>
                                            <td>{Client.email}</td>
                                            <td>{Client.appointment_type}</td>
                                            <td>{Client.appointment_status}</td>
                                            <td>{Client.appointment_reason}</td>
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



export function ClientDetail(){
    //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
     // eslint-disable-next-line
    const history =useHistory()
    let { path, url } = useRouteMatch();
    const [error, setError] =useState(false) //, 
    //const [success, setSuccess] =useState(false)
     // eslint-disable-next-line
    const [message, setMessage] = useState("") //,
    //const ClientServ=client.service('/Client')
    //const history = useHistory()
    //const {user,setUser} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const [selectedClient,setSelectedClient]=useState()
    const [selectedAppointment,setSelectedAppointment]=useState()

   

   const Client =state.AppointmentModule.selectedAppointment 
    //const client=Client
    const handleEdit= async()=>{
        const    newClientModule={
            selectedAppointment:Client,
            show :'modify'
        }
       await setState((prevstate)=>({...prevstate, AppointmentModule:newClientModule}))
       //console.log(state)
       
    }
    const handleAttend=async()=>{
        
        const patient = await client.service('client').get(Client.clientId)
        await setSelectedClient(patient)
        const    newClientModule={
            selectedClient:patient, 
            show :'detail'
        }
       await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
        history.push('/app/clinic/encounter')
    }
 
    return (
        <>
        <div className="card ">
            <div className="card-header">
                <p className="card-header-title">
                    Client Details
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <div className="field is-horizontal">
                <div className="field-body">
                {Client.firstname &&  <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <label className="label is-size-7 my-0 "   name="firstname" type="text">First Name </label><label className="is-size-7 my-0 ">{Client.firstname }</label>
                            <span className="icon is-small is-left">
                                <i className="nop-hospital"></i>
                            </span>                    
                        </p>
                    </div>}


                    {Client.middlename &&  <div className="field">
                        <p className="control has-icons-left has-icons-right">
                        <label className="label is-size-7 my-0"   name="middlename" type="text"> Middle Name </label><label className="is-size-7 my-0">{Client.middlename }</label>
                        <span className="icon is-small is-left">
                            <i className="nop-map-signs"></i>
                        </span>
                        
                        </p>
                    </div>}
             {Client.lastname &&
                <div className="field">
                    <p className="control has-icons-left">
                        <label className="label is-size-7 my-0"  name="lastname" type="text">Last Name</label><label className="is-size-7 my-0">{Client.lastname }</label>
                        <span className="icon is-small is-left">
                        <i className=" nop-user-md "></i>
                        </span>
                    </p>
                </div>}
                </div>  
                </div>
                <div className="field is-horizontal">
                <div className="field-body">
                {Client.dob &&<div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="dob" type="text">Date of Birth </label><label className="is-size-7 my-0">{ new Date(Client.dob).toLocaleDateString('en-GB')}</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div> }
                {Client.gender &&<div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="gender" type="text">Gender </label><label className="is-size-7 my-0">{Client.gender }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div> }
                {Client.maritalstatus && <div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="maritalstatus" type="text">Marital Status </label><label className="is-size-7 my-0">{Client.maritalstatus }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div> }
                {Client.mrn && <div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="mrn" type="text">Medical Records Number  </label><label className="is-size-7 my-0">{Client.mrn }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div> }
                </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-body">
                    {Client.religion && <div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="religion" type="text">Religion  </label><label className="is-size-7 my-0">{Client.religion }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div> }
                    {Client.profession &&  <div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="profession" type="text">Profession  </label><label className="is-size-7 my-0">{Client.profession }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div> }
                    {Client.phone &&<div className="field">
                        <p className="control has-icons-left">
                            <label className="label is-size-7 my-0"  name="phone" type="text"> Phone No</label><label className="is-size-7 my-0">{Client.phone }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-phone-alt"></i>
                            </span>
                        </p>
                    </div>}

                    {Client.email && <div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="email" type="email">Email  </label><label className="is-size-7 my-0">{Client.email }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div> }
                    </div>
                </div>

                {Client.address &&<div className="field">
                <p className="control has-icons-left">

                    <label className="label is-size-7 my-0"  name="address" type="text">Residential Address  </label><label className="is-size-7 my-0">{Client.address }</label>
                    <span className="icon is-small is-left">
                    <i className="nop-envelope"></i>
                    </span>
                </p>
                </div>} 
                <div className="field is-horizontal">
                    <div className="field-body">
                        {Client.city && <div className="field">
                            <p className="control has-icons-left">
                            
                                <label className="label is-size-7 my-0"  name="city" type="text">Town/City  </label><label className="is-size-7 my-0">{Client.city }</label>
                                <span className="icon is-small is-left">
                                <i className="nop-envelope"></i>
                                </span>
                            </p>
                        </div> }
                        {Client.lga && <div className="field">
                            <p className="control has-icons-left">
                            
                                <label className="label is-size-7 my-0"  name="lga" type="text">Local Govt Area  </label><label className="is-size-7 my-0">{Client.lga }</label>
                                <span className="icon is-small is-left">
                                <i className="nop-envelope"></i>
                                </span>
                            </p>
                        </div> }
                        {Client.state && <div className="field">
                            <p className="control has-icons-left">
                                <label className="label is-size-7 my-0"  name="state" type="text">State  </label><label className="is-size-7 my-0">{Client.state }</label>
                                <span className="icon is-small is-left">
                                <i className="nop-envelope"></i>
                                </span>
                            </p>
                        </div> }
                        {Client.country &&<div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="country" type="text">Country  </label><label className="is-size-7 my-0">{Client.country }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div>}
                    </div>
                </div> 
                <div className="field is-horizontal">
                <div className="field-body">
                     {Client.bloodgroup &&  <div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="bloodgroup" type="text">Blood Group </label><label className="is-size-7 my-0">{Client.bloodgroup }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div>}
                   
                    {Client.genotype && <div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="genotype" type="text">Genotype  </label><label className="is-size-7 my-0">{Client.genotype }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div> }
                    {Client.disabilities && <div className="field">
                        <p className="control has-icons-left">
                        
                            <label className="label is-size-7 my-0"  name="disabilities" type="text">Disabilities  </label><label className="is-size-7 my-0">{Client.disabilities }</label>
                            <span className="icon is-small is-left">
                            <i className="nop-envelope"></i>
                            </span>
                        </p>
                    </div> }
                </div> 
                </div>  

                <div className="field is-horizontal">
                <div className="field-body">

                {Client.allergies && <div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="allergies" type="text">Allergies  </label><label className="is-size-7 my-0">{Client.allergies }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div> }
                {Client.comorbidities && <div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="comorbidities" type="text">Co-mobidities  </label><label className="is-size-7 my-0">{Client.comorbidities }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div> }
                </div>
                </div>
               {Client.clientTags && <div className="field">
                <p className="control has-icons-left">

                    <label className="label is-size-7 my-0"  name="clientTags" type="text">Tags </label><label className="is-size-7 my-0">{Client.clientTags }</label>
                    <span className="icon is-small is-left">
                    <i className="nop-envelope"></i>
                    </span>
                </p>
                </div> }
                {Client.specificDetails && <div className="field">
                <p className="control has-icons-left">
                    <label className="label is-size-7 my-0"  name="specificDetails" type="text">Specific Details about Client </label><label className="is-size-7 my-0">{Client.specificDetails }</label>
                    <span className="icon is-small is-left">
                    <i className="nop-envelope"></i>
                    </span>
                </p>
                </div> }
                <div className="field is-horizontal">
                <div className="field-body">
                {Client.nok_name && <div className="field">
                    <p className="control has-icons-left">
                        <label className="label is-size-7 my-0"  name="nok_name" type="text">Next of Kin Full Name</label><label className="is-size-7 my-0">{Client.nok_name }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-clinic-medical"></i>
                        </span>
                    </p>
                </div>}
                {Client.nok_phoneno && <div className="field">
                    <p className="control has-icons-left">
                        <label className="label is-size-7 my-0"  name="nok_phoneno" type="text">Next of Kin Phone Number</label><label className="is-size-7 my-0">{Client.nok_phoneno }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-clinic-medical"></i>
                        </span>
                    </p>
                </div> }
                {Client.nok_email && <div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="nok_email" type="email">Next of Kin Email </label><label className="is-size-7 my-0">{Client.nok_email }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div>}
                {Client.nok_relationship && <div className="field">
                    <p className="control has-icons-left">
                    
                        <label className="label is-size-7 my-0"  name="nok_relationship" type="text">Next of Kin Relationship"  </label><label className="is-size-7 my-0">{Client.nok_relationship }</label>
                        <span className="icon is-small is-left">
                        <i className="nop-envelope"></i>
                        </span>
                    </p>
                </div>}
                </div>
                </div> 
            <div className="field is-grouped  mt-2">
                <p className="control">
                    <button className="button is-success is-small" onClick={handleEdit}>
                        Edit Details
                    </button>
                </p>
              {/*   <p className="control">
                    <button className="button is-info is-small" >
                        Financial Info
                    </button>
                </p>
                <p className="control">
                    <button className="button is-warning is-small" >
                        Schedule appointment
                    </button>
                </p> */}
               {/*  <p className="control">
                    <button className="button is-danger is-small" >
                        Check into Clinic 
                    </button>
                </p> */}
                <p className="control">
                    <button className="button is-link is-small" onClick={()=>handleAttend()} >
                        Attend to Client
                    </button>
                </p>

            </div>
            
           
        </div>
        </div>
        </>
    )
   
   
}

export function ClientModify(){
    const { register, handleSubmit, setValue,reset, errors } = useForm(); //watch, errors,
    // eslint-disable-next-line 
    const [error, setError] =useState(false)
    // eslint-disable-next-line 
    const [success, setSuccess] =useState(false)
    // eslint-disable-next-line 
    const [message,setMessage] = useState("")
    // eslint-disable-next-line 
    const ClientServ=client.service('client')
    //const history = useHistory()
     // eslint-disable-next-line
    const {user} = useContext(UserContext)
    const {state,setState} = useContext(ObjectContext)
    const [selectedClient,setSelectedClient]=useState()
    const [selectedAppointment,setSelectedAppointment]=useState()

    const Client =state.AppointmentModule.selectedAppointment

        useEffect(() => {
            setValue("firstname", Client.firstname,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("middlename", Client.middlename,  {
                shouldValidate: true,
                shouldDirty: true
            })
             setValue("lastname", Client.lastname,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("phone", Client.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Client.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("dob", Client.dob,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("gender", Client.gender,  {
                shouldValidate: true,
                shouldDirty: true
            }) 
             setValue("profession", Client.profession,  {
                shouldValidate: true,
                shouldDirty: true
            }) 
            setValue("address", Client.address,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("city", Client.city,  {
                shouldValidate: true,
                shouldDirty: true
            })
             setValue("state", Client.state,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("country", Client.country,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("nok_name", Client.nok_name,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("nok_email", Client.nok_email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("nok_phoneno", Client.nokphoneno,  {
                shouldValidate: true,
                shouldDirty: true
            }) 
             setValue("lga", Client.lga,  {
                shouldValidate: true,
                shouldDirty: true
            }) 
            setValue("bloodgroup", Client.bloodgroup,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("genotype", Client.genotype,  {
                shouldValidate: true,
                shouldDirty: true
            })
             setValue("disabilities", Client.disabilities,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("specificDetails", Client.specificDetails,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("clientTags", Client.clientTags,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("mrn", Client.mrn,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("comorbidities", Client.comorbidities,  {
                shouldValidate: true,
                shouldDirty: true
            }) 
             setValue("allergies", Client.allergies,  {
                shouldValidate: true,
                shouldDirty: true
            }) 
           
            
            return () => {
                
            }
        })

   const handleCancel=async()=>{
    const    newClientModule={
        selectedAppointment:{},
        show :'create'
      }
         await setState((prevstate)=>({...prevstate, AppointmentModule:newClientModule}))
            //console.log(state)
           }


    const changeState =()=>{
        const    newClientModule={
            selectedAppointment:{},
            show :'create'
        }
        setState((prevstate)=>({...prevstate, AppointmentModule:newClientModule}))

        }
    const handleDelete=async()=>{
        let conf=window.confirm("Are you sure you want to delete this data?")
        
        const dleteId=Client._id
        if (conf){
             
        ClientServ.remove(dleteId)
        .then((res)=>{
                //console.log(JSON.stringify(res))
                reset();
               /*  setMessage("Deleted Client successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
                toast({
                    message: 'Client deleted succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                changeState()
            })
            .catch((err)=>{
               // setMessage("Error deleting Client, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error deleting Client, probable network issues or "+ err,
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
       // console.log(data)
      //  data.facility=Client.facility
          //console.log(data);
          
        ClientServ.patch(Client._id,data)
        .then((res)=>{
                //console.log(JSON.stringify(res))
               // e.target.reset();
               // setMessage("updated Client successfully")
                 toast({
                    message: 'Client updated succesfully',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                  })
                  
                changeState()

            })
            .catch((err)=>{
                //setMessage("Error creating Client, probable network issues "+ err )
               // setError(true)
                toast({
                    message: "Error updating Client, probable network issues or "+ err,
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
                    Client Details-Modify
                </p>
            </div>
            <div className="card-content vscrollable">
           
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
        <div className="field-body">
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <label className="label is-size-7"   >First Name </label> <input className="input is-small" ref={register()} name="firstname" type="text"placeholder="First Name " />
                    <span className="icon is-small is-left">
                        <i className="nop-hospital"></i>
                    </span>                    
                </p>
            </div>


            <div className="field">
                <p className="control has-icons-left has-icons-right">
                <label className="label is-size-7"   > Middle Name </label><input className="input is-small" ref={register()} name="middlename" type="text" placeholder="Middle Name " />
                <span className="icon is-small is-left">
                    <i className="nop-map-signs"></i>
                </span>
                
                </p>
            </div>

        <div className="field">
            <p className="control has-icons-left">
                <label className="label is-size-7"  >Last Name</label><input className="input is-small" ref={register()} name="lastname" type="text"placeholder="Last Name " />
                <span className="icon is-small is-left">
                <i className=" nop-user-md "></i>
                </span>
            </p>
        </div>
        </div>  
        </div>
        
        <div className="field is-horizontal">
        <div className="field-body">
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Date of Birth  </label><input className="input is-small" ref={register()} name="dob" type="text"placeholder="Date of Birth " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Gender  </label><input className="input is-small" ref={register()} name="gender" type="text"placeholder="Gender  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Marital Status  </label><input className="input is-small" ref={register()} name="maritalstatus" type="text"placeholder="Marital Status  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  > Records Number </label><input className="input is-small" ref={register()} name="mrn" type="text"placeholder="Records Number  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        </div>
        </div>
        <div className="field is-horizontal">
        <div className="field-body">
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Religion</label><input className="input is-small" ref={register()} name="religion" type="text"placeholder="Religion " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Profession  </label><input className="input is-small" ref={register()} name="profession" type="text" placeholder="Profession" />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
                <label className="label is-size-7"  > Phone No</label><input className="input is-small" ref={register()} name="phone" type="text" placeholder=" Phone No " />
                <span className="icon is-small is-left">
                <i className="nop-phone-alt"></i>
                </span>
            </p>
        </div>

        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Email  </label><input className="input is-small" ref={register()} name="email" type="email"placeholder="Email  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        </div>
        </div>

        <div className="field">
        <p className="control has-icons-left">

            <label className="label is-size-7"  >Residential Address  </label><input className="input is-small" ref={register()} name="address" type="text" placeholder="Residential Address  " />
            <span className="icon is-small is-left">
            <i className="nop-envelope"></i>
            </span>
        </p>
        </div> 
        <div className="field is-horizontal">
        <div className="field-body">
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Town/City  </label><input className="input is-small" ref={register()} name="city" type="text" placeholder="Town/City  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Local Govt Area  </label><input className="input is-small" ref={register()} name="lga" type="text"placeholder="Local Govt Area  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >State  </label><input className="input is-small" ref={register()} name="state" type="text"placeholder="State" />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Country  </label><input className="input is-small" ref={register()} name="country" type="text" placeholder="Country  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div>
        </div>
        </div> 
        <div className="field is-horizontal">
        <div className="field-body">
            <div className="field">
                <p className="control has-icons-left">
                
                    <label className="label is-size-7"  >Blood Group </label><input className="input is-small" ref={register()} name="bloodgroup" type="text"placeholder="Blood Group " />
                    <span className="icon is-small is-left">
                    <i className="nop-envelope"></i>
                    </span>
                </p>
            </div> 
            <div className="field">
                <p className="control has-icons-left">
                
                    <label className="label is-size-7"  >Genotype  </label><input className="input is-small" ref={register()} name="genotype" type="text" placeholder="Genotype " />
                    <span className="icon is-small is-left">
                    <i className="nop-envelope"></i>
                    </span>
                </p>
            </div> 
            <div className="field">
                <p className="control has-icons-left">
                
                    <label className="label is-size-7" >Disabilities  </label><input className="input is-small" ref={register()}  name="disabilities" type="text"placeholder="Disabilities  " />
                    <span className="icon is-small is-left">
                    <i className="nop-envelope"></i>
                    </span>
                </p>
            </div> 
        </div> 
        </div>  

        <div className="field is-horizontal">
        <div className="field-body">

        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Allergies  </label><input className="input is-small" ref={register()} name="allergies" type="text"placeholder="Allergies  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Co-mobidities </label><input className="input is-small" ref={register()} name="comorbidities" type="text"placeholder="Co-mobidities " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div> 
        </div>
        </div>
        <div className="field">
        <p className="control has-icons-left">

            <label className="label is-size-7"  >Tags  </label><input className="input is-small" ref={register()} name="clientTags" type="text" placeholder="Tags " />
            <span className="icon is-small is-left">
            <i className="nop-envelope"></i>
            </span>
        </p>
        </div> 
        <div className="field">
        <p className="control has-icons-left">
            <label className="label is-size-7"  >Specific Details about client  </label><input className="input is-small" ref={register()} name="specificDetails" type="text"placeholder="Specific Details about client " />
            <span className="icon is-small is-left">
            <i className="nop-envelope"></i>
            </span>
        </p>
        </div> 
        <div className="field is-horizontal">
        <div className="field-body">
        <div className="field">
            <p className="control has-icons-left">
                <label className="label is-size-7"  >Next of Kin Full Name</label><input className="input is-small" ref={register()} name="nok_name" type="text"placeholder="Next of Kin Full Name " />
                <span className="icon is-small is-left">
                <i className="nop-clinic-medical"></i>
                </span>
            </p>
        </div>
        <div className="field">
            <p className="control has-icons-left">
                <label className="label is-size-7" >Phone Number</label><input className="input is-small" ref={register()}  name="nok_phoneno" type="text"placeholder=" " />
                <span className="icon is-small is-left">
                <i className="nop-clinic-medical"></i>
                </span>
            </p>
        </div> 
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  >Next of Kin Email  </label><input className="input is-small" ref={register()} name="nok_email" type="email"placeholder="Next of Kin Email  " />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div>
        <div className="field">
            <p className="control has-icons-left">
            
                <label className="label is-size-7"  > Relationship  </label><input className="input is-small" ref={register()} name="nok_relationship" type="text" placeholder="Next of Kin Relationship" />
                <span className="icon is-small is-left">
                <i className="nop-envelope"></i>
                </span>
            </p>
        </div>
        </div>
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
               {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
            </div>
        </div>
        </div>
        </>
    )
   
   
                
}   

export  function ClientSearch({getSearchfacility,clear}) {
    
    const ClientServ=client.service('client')
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
       
       await setSimpa(obj.firstname + " "+ obj.middlename+ " "+obj.lastname + " "+obj.gender+" "+obj.phone )
       
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
    const handleSearch=async(val)=>{
        setVal(val)
        if (val===""){
            setShowPanel(false)
            getSearchfacility(false)
            return
        }
        const field='name' //field variable

       
        if (val.length>=3 ){
            ClientServ.find({query: {
                $or:[
                    { firstname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { lastname: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { middlename: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { phone: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { clientTags: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { mrn: {
                        $regex:val,
                        $options:'i' 
                    }},
                    { specificDetails: {
                        $regex:val,
                        $options:'i' 
                    }},
                ],
              
                 //facility: user.currentEmployee.facilityDetail._id,
                 //storeId: state.StoreModule.selectedStore._id,
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
                            <DebounceInput className="input is-small  is-expanded mb-0" 
                                type="text" placeholder="Search for Client"
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
                          { facilities.length>0?"":<div className="dropdown-item" /* onClick={handleAddproduct} */> <span> {val} is not yet your client</span> </div>}

                              {facilities.map((facility, i)=>(
                                    
                                    <div className="dropdown-item" key={facility._id} onClick={()=>handleRow(facility)}>
                                        
                                        <div><span>{facility.firstname}</span>
                                        <span className="padleft">{facility.middlename}</span>
                                        <span className="padleft">{facility.lastname}</span>
                                        <span className="padleft"> {formatDistanceToNowStrict(new Date(facility.dob))}</span>
                                        <span className="padleft">{facility.gender}</span>
                                        <span className="padleft">{facility.profession}</span>
                                        <span className="padleft">{facility.phone}</span>
                                        <span className="padleft">{facility.email}</span>
                                        </div>
                                       
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
                                        {/* <ProductCreate /> */}
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