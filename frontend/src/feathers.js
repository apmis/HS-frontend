import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const url= 'https://healthstack-backend.herokuapp.com:8080' /* ||'http://localhost:3035' */
const socket=io(url, {
    transports: ['websocket'],
    forceNew: true
  })
const client=feathers()
client.configure(socketio(socket))
client.configure(authentication({
    storage:window.localStorage
}))

export default client