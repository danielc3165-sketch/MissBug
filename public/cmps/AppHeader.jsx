const { NavLink } = ReactRouterDOM

import { userService } from "../services/user-service.js"

export function AppHeader({currUser}) {

    function onLogout(){
        userService.logout()
    }

    return <header className="app-header main-content single-row">
        <h1>Miss Bug</h1>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/bug">Bugs</NavLink>
            <NavLink to="/about">About</NavLink>
            {!currUser && <NavLink to="/loginSignup">Login</NavLink>}
            <button onClick={onLogout}>Logout</button>
        </nav>
    </header>
}