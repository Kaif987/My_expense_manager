import React,{ useState} from 'react'
import { useUserContext } from './useUserContext'

export default function useLogin() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const {dispatch} = useUserContext()

    const fetchUser = async (email, password ) =>{
        setLoading(true)
        setError(null)

        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })

        const json = await response.json()
        console.log(json)
        
        if(!response.ok){
            setError(json.error)
        }

        console.log(json)
        if(response.ok){
            const {user} = json
            localStorage.setItem("user", JSON.stringify(user)) 
            dispatch({type:"LOGIN", payload: user})
            setLoading(false)
        }
    }

    return {loading, fetchUser, error}
}
