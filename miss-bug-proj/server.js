
import express from 'express'

import { bugService } from './services/bug-service.js'
import cookieParser from 'cookie-parser'


const app = express()
app.use(cookieParser())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => {
            res.send(bugs)
            //console.log('bugs', bugs)
        })
        .catch(() => res.status(400).send('Cannot get bugs'))
})


app.get('/api/bug/save', (req, res) => {
   
    const { title, severity, description, id: _id }= req.query
    const bug = { title, severity:+severity, description, _id }
    bugService.save(bug)
    .then(savedBug => {
        console.log('bug', savedBug)
        res.send(savedBug)
    })
    .catch(() => res.status(400).send('Cannot save bug'))
}) 

app.get('/api/bug/:bugId', (req, res) => {
    
    const { bugId} = req.params
    console.log('bugId', bugId)
   
   const visitedIds = req.cookies.visitedIds || []

   if (!visitedIds.includes(bugId)){ 
       if (visitedIds.length >= 3) return res.status(403).send('Access forbidden') 
        else {
             visitedIds.push(bugId)
             console.log(visitedIds)
             res.cookie('visitedIds', visitedIds)
        }
    }

    bugService.get(bugId)
        .then(bug => {
           //console.log('bug', bug)
           res.send(bug)
        })
        .catch(() => res.status(400).send('Cannot get bug'))
    
}) 


app.get('/api/bug/:bugId/remove', (req, res) => {
    const { bugId:_id } = req.params
    bugService.remove(_id)
    .then(() => {
        res.send('Bug removed')
    })
    .catch(() => res.status(400).send('Cannot get bug'))
})


app.listen(3034, () => {
console.log('Server ready at port 3034')
})