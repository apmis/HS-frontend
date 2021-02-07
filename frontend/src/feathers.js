import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const herok= 'https://healthstack-backend.herokuapp.com'
const url= 'http://localhost:3035'
const API = process.env.NODE_ENV === 'production' ? 'https://healthstack-backend.herokuapp.com' : url;
const socket=io(herok, {
    transports: ['websocket'],
    forceNew: true
  })
const client=feathers()
client.configure(socketio(socket))
client.configure(authentication({
    storage:window.localStorage
}))

export default client