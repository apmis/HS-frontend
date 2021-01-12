import React, {useState,useContext} from 'react'
import client from '../feathers'
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'
import {UserContext} from '../context'

export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [error, setError] =useState(true)
    const [errorMessage,setErrorMessage] = useState("")
    const userServ=client.service('/users')
    const history = useHistory()
    const {user,setUser} = useContext(UserContext)

   
const onSubmit = (data,e) =>{
        e.preventDefault();
        setErrorMessage("")
        setError(false)
           const  email=data.email
           const password=data.password
          console.log(data);
          
          client.authenticate({
            strategy:'local',
            email,
            password
        }).then(async (res)=>{
                console.log(JSON.stringify(res.user))
                e.target.reset();
               await setUser(res.user)
               console.log(user)
               history.push("/app")

            })
            .catch((err)=>{
                setErrorMessage("Error loggin in User, probable network issues "+ err )
                setError(true)
            })

      } 

    return (
        <section className="section">
        <div className="container">
        <div className="columns is-centered">
        <div className="column is-4 ">
        <div className="card v-centered">
            <div className="card-header">
                <p className="card-header-title">
                    Health Stack
                </p>
            </div>
            <div className="card-content">
            <form onSubmit={handleSubmit(onSubmit)}>
           <div className="field">
            <p className="control has-icons-left has-icons-right">
                <input className="input" ref={register({ required: true })}  name="email" type="email" placeholder="Email" />
                  <span className="icon is-small is-left">
                     <i className="fas fa-envelope"></i>
                </span>
                
            </p>
        </div>
        <div className="field">
            <p className="control has-icons-left">
                <input className="input" ref={register({ required: true })} name="password" type="password" placeholder="Password"/>
                <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div className="field">
            <p className="control">
                <button className="button is-success is-small">
                    Login
                </button>
            </p>
        </div>
        { error && <div className="message"> {errorMessage}</div>}
        </form>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    )
}
