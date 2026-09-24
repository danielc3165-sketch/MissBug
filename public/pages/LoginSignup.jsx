
import { userService } from "../services/user-service.js"
import { UserDetails } from "./UserDetails.jsx"

const { useState } = React

export function LoginSignup(){

    const [userDetails,setUserDetails] = useState(userService.getUserDetailsDefult)
    
    //console.log('UD',userDetails)

    function handleChange({target}){
        const { name: field, value } = target
        setUserDetails(prev=>({...prev,[field]:value}))
    }

    function onSignup(ev){
        ev.preventDefault()
        userService.signup(userDetails)
    }


    return <section>
        <h2>Signup</h2>
    <form onSubmit={onSignup}>
        <input type="text" placeholder="User-name" name="userName" onChange={ handleChange}/>
        <input type="password" placeholder="Password" name="password" onChange={ handleChange} />
        <input type="text" placeholder="Full-name" name="fullName" onChange= {handleChange} />
        <button>Signup</button>
    </form>
    </section>
}