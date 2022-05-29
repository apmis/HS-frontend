import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

let url="http://localhost:8080";
if (process.env.NODE_ENV === 'legacy')url="https://healthstack-backend.herokuapp.com";
if (process.env.NODE_ENV === 'development')url="http://dev.healthstack.africa:8080";
if (process.env.NODE_ENV === 'production')url="https://api.healthstack.africa";
const socket=io(url, {
    transports: ['websocket'],
    forceNew: true                                                                
  })
const client=feathers()
client.configure(socketio(socket,{timeout:700000}))
client.configure(authentication({
    storage:window.localStorage
}))  
//client.configure(restClient.axios(axios));

export default client

