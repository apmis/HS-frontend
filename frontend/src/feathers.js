import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const url= process.env.URL||'http://localhost:3035'
const socket=io(url)
const client=feathers()
client.configure(socketio(socket))
client.configure(authentication({
    storage:window.localStorage
}))

export default client