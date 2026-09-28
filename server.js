
import express from 'express'
// import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

import { bugService } from './services/bug-service.js'
import { loggerService } from './services/logger-service.js'
import { userService } from './services/user-service.js'

const app = express()


// app.use(cors({
//     origin: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true
// }))

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.set('query parser', 'extended')


app.get('/api/bug', (req, res) => {

     const filterBy = { 
        txt: req.query.filterBy.txt || '' ,
        minSeverity: +req.query.filterBy.minSeverity || 0,
        labels: req.query.filterBy.labels || []
    }
    //console.log('filterBy:', filterBy)

    const pageIdx = +req.query.pageIdx || 0
    const sortBy = req.query.sortBy || 'title'
    
    bugService.query(filterBy, pageIdx, sortBy)
        .then(results => {
            res.send(results)
            //console.log('bugs', bugs)
        })
        .catch(() => {
            loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot get bugs')
        })
})

app.get('/api/bug/:bugId', (req, res) => {
    
    const { bugId } = req.params
    
    const { visitCountMap = []} = req.cookies 

    if (!visitCountMap.includes(bugId)) {
        if (visitCountMap.length === 3) {
            return res.status(401).send('Wait for a bit')
        } else {
            visitCountMap.push(bugId)
        }
    }

	res.cookie('visitCountMap', visitCountMap, { maxAge: 1000 * 50 })
    console.log('visitCountMap: ', visitCountMap)

    bugService.get(bugId)
        .then(bug => {
           //console.log('bug', bug)
           res.send(bug)
        })
        .catch(() => {
            loggerService.error('Cannot get bug', err)
            res.status(400).send('Cannot get bug')
        })
    
}) 


app.put('/api/bug/:id', (req, res) => {
   
    const bug={
        _id: req.body.id,
        title: req.body.title,
        severity: req.body.severity,
        description: req.body.description,
    }

    console.log('bug', bug)

    bugService.save(bug)
    .then(savedBug => {
        console.log('bug', savedBug)
        res.send(savedBug)
    })
    .catch(() => {
        res.status(400).send('Cannot save bug')
        loggerService.error('Cannot get bug', err)
    })
}) 


app.post('/api/bug', (req, res) => {
    const bug={
        title: req.body.title,
        severity: req.body.severity,
        description: req.body.description,
        creator:req.body.creator || {}
    }

    console.log('bug to add', bug)

    bugService.save(bug)
    .then(savedBug => {
        console.log('bug', savedBug)
        res.send(savedBug)
    })
    .catch(() => {
        loggerService.error('Cannot save bug', err)
        res.status(400).send('Cannot save bug')
    })
}) 


app.delete('/api/bug/:bugId', (req, res) => {

    const { bugId:_id } = req.params
    //console.log('bugId', _id)
    bugService.remove(_id)
    .then(() => {
        res.send('Bug removed')
    })
    .catch(() => {
        loggerService.error('Cannot get bug', err)
        res.status(400).send('Cannot get bug')
    })
})


// User API


app.post('/api/auth/signup', (req, res) =>{
    const user = req.body
    userService.add(user)
    .then((user)=>{
        if(user){
            //console.log('user',user) 
            res.cookie('loginToken',user)
            res.send(user)
        }
        else res.status(400).send('Can not signup')
    })
    .catch(()=>res.status(400).send('Name taken'))

})

app.post('/api/auth/login', (req, res) =>{
    const user = req.body
    userService.checkLogin(user)
    .then(user=>{
        res.cookie('loginToken',user)
        res.send(user)
    })
    .catch(()=>res.status(404).send('Invalid Credentials'))
})

app.post('/api/auth/logout', (req, res) =>{
    res.clearCookie('loginToken')
    res.send('logged-out!')
})

app.get('{*splat}', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


app.listen(3034, () => {
console.log('Server ready at port 3034')
})