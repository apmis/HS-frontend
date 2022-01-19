import React, {useState} from 'react'
import client from '../feathers'
import { useForm } from "react-hook-form";
import {useHistory} from 'react-router-dom'

export default function SignUp() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [error, setError] =useState(true)
    const [errorMessage,setErrorMessage] = useState("")
    const userServ=client.service('/users')
    const history = useHistory()

   
      const onSubmit = (data,e) =>{
        e.preventDefault();
        setErrorMessage("")
        setError(false)
          if (data.password !==data.password2){
              setErrorMessage("Passwords not identical")
              setError(true)
              return
          }       
          delete data.password2
          console.log(data);
          userServ.create(data)
            .then((res)=>{
                console.log(JSON.stringify(res))
                alert("User Created Successfully")
                e.target.reset();
                history.push("/")

            })
            .catch((err)=>{
                setErrorMessage("Error with creating User, probable network issues "+ err )
                setError(true)
            })
        
        


      } 

    return (
        <section className="section">
            <div className="container signupcenter">
                <div className="columns">
                    <div className="column is-4 is-offset-4">
                        <div className="card ">
                            <header className="card-header"> 
                                <p className="card-header-title">HealthStack: Sign Up</p>
                            </header>
                        <div className="card-content">
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="field is-small">
                                <label className="label is-small">First Name
                                    <div className="control ">
                                        <input className="input is-small"  ref={register({ required: true })}  type="text" placeholder="Enter Full Name" name="firstname"/>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-small">
                                <label className="label is-small">Last Name
                                    <div className="control ">
                                        <input className="input is-small"  ref={register({ required: true })}  type="text" placeholder="Enter Full Name" name="lastname"/>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-small">
                                <label className="label is-small  ">Phone Number
                                    <div className="control ">
                                        <input className="input is-small" ref={register({ required: true })} type="text" placeholder="Enter Phone Number" name="phone"/>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-small">
                                <label className="label is-small  ">Email
                                    <div className="control ">
                                        <input className="input is-small" ref={register({ required: true })} type="text" placeholder="Enter email" name="email"/>
                                    </div>
                                </label>
                            </div>
                            
                            <div className="field is-small">
                                <label className="label is-small  ">Password
                                    <div className="control ">
                                        <input className="input is-small" ref={register({ required: true })} type="password" placeholder="Password" name="password"/>
                                    </div>
                                </label>
                            </div>
                            <div className="field is-small">
                                <label className="label is-small  ">Repeat Password
                                    <div className="control ">
                                        <input className="input is-small" ref={register({ required: true })} type="password" placeholder="Password" name="password2"/>
                                    </div>
                                </label>
                            </div>
                    

                        <div className="field is-grouped">
                            <div className="control">
                                <button type="submit" className="button is-link is-small">Submit</button>
                            </div>
                        </div>
                        { error && 
                        <div className="message"> {errorMessage}                            
                        </div>
                        }
                        </form>

                        </div>
                        </div>
                        </div>
                
                </div>
            </div>
        </section>
    )
}
