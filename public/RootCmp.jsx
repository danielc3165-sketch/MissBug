const Router = ReactRouterDOM.BrowserRouter
const { useState } = React
const { Route, Routes } = ReactRouterDOM

import { UserMsg } from './cmps/UserMsg.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'

import { userService } from './services/user-service.js'

export function App() {

    const [ currUser,setCurrUser ] = useState(userService.getLoggedinUser())
    
    console.log('currUser',currUser)


    return <Router>
        <div className="app-wrapper">
            <UserMsg />
            <AppHeader currUser={currUser} setCurrUser={setCurrUser}/>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/bug" element={<BugIndex currUser={currUser} />} />
                    <Route path="/bug/:bugId" element={<BugDetails />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/userDetails" element={ <UserDetails currUser={currUser}/>} />
                    <Route path="/loginSignup" element={ <LoginSignup 
                    currUser={currUser} 
                    setCurrUser={setCurrUser} />
                    } />
                                                         
                </Routes>
            </main>
            <AppFooter />
        </div>
    </Router>
}
