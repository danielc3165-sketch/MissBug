const { Link } = ReactRouterDOM
const { NavLink } = ReactRouterDOM
const { useState,useEffect } = React

import { BugPreview } from "../cmps/BugPreview.jsx"
import { bugService } from "../services/bug.service.local.js"

export function UserDetails({ currUser }) {
    
    if(!currUser) return

    const [bugs,setBugs] = useState([])

    useEffect(()=>{
    bugService.queryCurrUserBugs(currUser._id)
    .then(bugs=>setBugs(bugs))
    
     },currUser)
      

    if (!bugs) return <div>Loading...</div>
    return <section>
    
    <h2>UserDetails</h2>
    
    <br></br>

    <h3>Name:{currUser.fullName}</h3>
    
    <ul className="bug-list">
        {bugs.map(bug => (
            <li key={bug._id}>
                <BugPreview bug={bug} />
                <section className="actions">
                    <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                    
                </section>
            </li>
        ))}
    </ul >

    <br></br>

   <NavLink to="/bug"><button>back</button></NavLink>

    </section>
 }

