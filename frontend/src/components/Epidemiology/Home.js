import React ,{useContext} from 'react'
import {UserContext,ObjectContext} from '../../context'

export default function InventoryHome() {
    const {state,setState}=useContext(ObjectContext)
    const handleCloseModal = () => {
        state.showStoreModal  =  "modal"                                                                                                                                                        
        setState(state)
        console.log( state.showStoreModal)
    }
    return (
       
            <section className= "section remPadTop">
              <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                    <h1 className="title">
                     Laboratory Module
                    </h1>
                    <h2 className="subtitle">
                        Have fun working today!
                    </h2>
                    </div>
                </div>
            </section>
                                         
            </section>
    )
}
