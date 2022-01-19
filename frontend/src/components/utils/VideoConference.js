/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import Draggable from 'react-draggable';
import { Jutsu } from 'react-jutsu'
import {UserContext,ObjectContext} from '../../context'
 
const VideoConference = () => {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const {state}=useContext(ObjectContext) 
  const [selectedClient,setSelectedClient]=useState() 
  const client =state.ClientModule.selectedClient
  const {user,setUser}=useContext(UserContext)
 
  const handleClick = event => {
    event.preventDefault()
    setRoom(client._id)
    setName(user.firstname)
    if (room && name) setCall(true)
  }

 
  return call ? (
    
      <div className="mt-2">
    <Jutsu
      roomName={room}
      displayName={name}
      password={password}
      onMeetingEnd={() => setCall(false)}
      loadingComponent={<p>loading ...</p>}
      errorComponent={<><p>Oops, something went wrong</p>   </>} 
      containerStyles={{ width: '100%', height: '250px' }}
      />
      <p className="bckgrnd">
     {`Kindly share link with client and other collaborators: https://meet.jit.si/${client._id}`}
      </p>
      </div>
    
  ) : (
    <form>
      <button className="button is-success is-small mt-1" onClick={(e)=>handleClick(e)} type='submit'>
        Start / Join Teleconsultation
      </button>
    </form>
  )
 
}

export default VideoConference