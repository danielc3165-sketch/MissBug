const { Link } = ReactRouterDOM

import { BugPreview } from './BugPreview.jsx'

export function BugList({ bugs, onRemoveBug, onEditBug, currUser }) {

    function isAllowed(bug){
        if(!currUser || !bug.creator) return false
        else{
        if(currUser._id===bug.creator._id) return true
        else return false
        }
    }

    if (!bugs) return <div>Loading...</div>
    return <ul className="bug-list">
        {bugs.map(bug => (
            <li key={bug._id}>
                <BugPreview bug={bug} />
                <section className="actions">
                    <button><Link to={`/bug/${bug._id}`}>Details</Link></button>
                    
                    {isAllowed(bug) && <button onClick={() => onEditBug(bug)}>Edit</button>}
                    {isAllowed(bug) && <button onClick={() => onRemoveBug(bug._id)}>x</button>}
                </section>
            </li>
        ))}
    </ul >
}
