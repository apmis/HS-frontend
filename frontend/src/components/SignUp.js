import React from 'react'

export default function SignUp() {
    return (
        <section class="section">
        <div class="container">
        <div class="columns">
        <div className="column is-4 is-offset-4">
        <div className="card ">
            <header className="card-header"> 
                <p className="card-header-title">Sign Up</p>
            </header>
            <div className="card-content">
            <div className="field is-small">
                <label className="label is-small  ">Name
                <div className="control ">
                    <input className="input is-small" type="text" placeholder="Text input"/>
                </div>
                </label>

            </div>
           
            <div className="field">
                <label className="label is-small">Username
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-success  is-small" type="text" placeholder="Text input" value={"bulma"} />
                    <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-check"></i>
                    </span>
                </div>
                </label>
                <p className="help is-success">This username is available</p>
            </div>

            <div className="field">
                <label className="label is-small">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input className="input is-danger is-small" type="email" placeholder="Email input" value="hello@" />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                    <i className="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <p className="help is-danger">This email is invalid</p>
            </div>

            <div className="field">
            <label className="label is-small">Subject</label>
            <div className="control is-small">
                <div className="select">
                <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                </select>
                </div>
            </div>
            </div>

            <div className="field">
                <label className="label">Message</label>
                <div className="control">
                    <textarea className="textarea is-small" placeholder="Textarea"></textarea>
                </div>
            </div>

            <div className="field">
                <div className="control is-small">
                    <label className="checkbox">
                    <input type="checkbox"/>
                    I agree to the <a href="./terms">terms and conditions</a>
                    </label>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <label className="radio is-small">
                    <input type="radio" name="question"/>
                    Yes
                    </label>
                    <label className="radio is-small">
                    <input type="radio" name="question" />
                    No
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
            <div className="control">
                <button className="button is-link is-small">Submit</button>
            </div>
            <div className="control">
                <button className="button is-link is-light is-small">Cancel</button>
            </div>
            </div>
            </div>
            </div>
            </div>
          
        </div>
        </div>
        </section>
    )
}
