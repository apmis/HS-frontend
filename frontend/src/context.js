import {createContext, useEffect,useState} from 'react'
import client from './feathers'


export default function MyUserProvider({children}){
    //const [data, setData] = useState(null)
    const [user,setUser] = useState(null)

    useEffect(() =>{
        (async () => { try{
            const resp = await client.reAuthenticate();
            //console.log(resp)
            await setUser(resp.user)
            /* console.log("lastname:",  user.lastname)
            console.log("reauth tried")
            */
            return
            }
        catch(error){
            console.log(error)
           // history.push("/")
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
