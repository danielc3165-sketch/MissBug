const { Link } = ReactRouterDOM
const { NavLink } = ReactRouterDOM
const { useState } = React

import { BugPreview } from "../cmps/BugPreview.jsx"
import { bugService } from "../services/bug.service.local.js"

export function UserDetails({ currUser }) {
      
    // function isAllowed(bug){
    //     if(!currUser || !bug.creator) return false
    //     else{
    //     if(currUser._id===bug.creator._id) return true
    //     else return false
    //     }
    // }
    

    // if (!bugs) return <div>Loading...</div>
    return <section>
    
    <h1>UserDetails</h1>
    
    <p>Name:{currUser.fullName}</p>
    <p>bugs:</p>
    <br></br>
    <br></br>
    <NavLink to="/bug"><button>back</button></NavLink>

    </section>
//     <ul className="bug-list">
//         {bugs.map(bug => (
//             <li key={bug._id}>
//                 <BugPreview bug={bug} />
//                 <section className="actions">
//                     <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                    
//                     {isAllowed(bug) && <button onClick={() => onEditBug(bug)}>Edit</button>}
//                     {isAllowed(bug) && <button onClick={() => onRemoveBug(bug._id)}>x</button>}
//                 </section>
//             </li>
//         ))}
//     </ul >
//     
 }

