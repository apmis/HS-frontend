/* eslint-disable */
import React, {useState,useContext, useEffect,useRef} from 'react'
import Draggable from 'react-draggable';
import { Jutsu } from 'react-jutsu'
//import { useJitsi } from 'react-jutsu' // Custom hook
import {UserContext,ObjectContext} from '../../context'
 
const VideoConference = () => {
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
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
    <Draggable>
    <Jutsu
      roomName={room}
      displayName={name}
      password={password}
      onMeetingEnd={() => setCall(false)}
      loadingComponent={<p>loading ...</p>}
      errorComponent={<><p>Oops, something went wrong</p>   </>} 
      containerStyles={{ width: '100%', height: '250px' }}
      />
    </Draggable>  
  ) : (
    <form>
      {/* <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
      <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} /> */}
     {/*  <input id='password' type='text' placeholder='Password (optional)' value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      <button className="button is-success is-small mt-1" onClick={handleClick} type='submit'>
        Start / Join Teleconsultation
      </button>
    </form>
  )
 
}
 
export default VideoConference