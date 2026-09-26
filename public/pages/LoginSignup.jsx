
import { userService } from "../services/user-service.js"
import { UserDetails } from "./UserDetails.jsx"

const { useNavigate } = ReactRouter

const { useState } = React

export function LoginSignup({ currUser,setCurrUser }){

    const [ userDetails,setUserDetails ] = useState(userService.getUserDetailsDefult)
    const [ isSignup,setIsSignup ] = useState(false)
    //console.log('isSignup',isSignup)

    const navigate = useNavigate()

    //console.log('UD',userDetails)

    function handleChange({target}){
        const { name: field, value } = target
        setUserDetails(prev=>({...prev,[field]:value}))
    }

    function onSubmit(ev){
        ev.preventDefault()
        return isSignup ? onSignup() : onLogin()
    }

    function onSignup(){
        userService.signup(userDetails)
        .then(user=>{
            setCurrUser(user)
            navigate('/bug')
        })
        .catch(err=>console.log(err))
    }

    function onLogin(){
        userService.login(userDetails)
        .then(user=>{
            setCurrUser(user)
            navigate('/bug')
        })
        .catch(err=>console.log(err))
    }


    return <section>
        <h2>Signup</h2>
    <form onSubmit={onSubmit}>
        <input type="text" placeholder="User-name" name="userName" onChange={ handleChange}/>
        <input type="password" placeholder="Password" name="password" onChange={ handleChange} />
        {isSignup && <input type="text" placeholder="Full-name" name="fullName" onChange= {handleChange} />}
        <button>{isSignup ? 'Signup' : 'Login'}</button>
    </form>
        <a onClick={()=>setIsSignup(!isSignup)}>
            {isSignup ? 'Already a member ?  Login':
            'You are new ? Signup'}
        </a>
    </section>
}