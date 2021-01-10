import React from 'react'

export default function Login() {
    return (
        <section className="section">
        <div className="container">
        <div className="columns is-centered">
        <div className="column is-3 ">
        <div className="card v-centered">
            <div className="card-header">
                <p class="card-header-title">
                    Health Stack
                </p>
            </div>
            <div className="card-content">
            
           <div className="field">
            <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email" />
                  <span className="icon is-small is-left">
                     <i className="fas fa-envelope"></i>
                </span>
                
            </p>
        </div>
        <div className="field">
            <p className="control has-icons-left">
                <input className="input" type="password" placeholder="Password"/>
                <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div className="field">
            <p className="control">
                <button className="button is-success">
                    Login
                </button>
            </p>
        </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </section>
    )
}
