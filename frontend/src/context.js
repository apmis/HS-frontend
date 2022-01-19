import {createContext, useEffect,useState} from 'react'
import client from './feathers'


export default function MyUserProvider({children}){
    const [user,setUser] = useState(null)

    useEffect(() =>{
        (async () => { try{
            const resp = await client.reAuthenticate();
            await setUser(resp.user)
            return
            }
        catch(error){
            console.log(error)
        }  
    })()},[])

   const { Provider } = UserContext
   return(
       <Provider value={{user,setUser}}>
           {children}
       </Provider>
   )
}
export const UserContext=createContext()
export const ObjectContext=createContext()
export const MessageContext=createContext()
